var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//物品标识
var ItemID = "Item";
var ItemType;
(function (ItemType) {
    ItemType[ItemType["None"] = 0] = "None";
    ItemType[ItemType["Empty"] = 1] = "Empty";
    ItemType[ItemType["Rock"] = 2] = "Rock";
    ItemType[ItemType["Thorn"] = 3] = "Thorn";
    ItemType[ItemType["Protect"] = 11] = "Protect";
    ItemType[ItemType["Fly"] = 12] = "Fly";
    ItemType[ItemType["Rope"] = 13] = "Rope";
    ItemType[ItemType["Vine"] = 14] = "Vine";
    ItemType[ItemType["Collector"] = 15] = "Collector";
    ItemType[ItemType["Coin"] = 20] = "Coin";
})(ItemType || (ItemType = {}));
var LineItemInfo = /** @class */ (function () {
    function LineItemInfo(type, num) {
        this.Type = type;
        this.Number = num;
    }
    return LineItemInfo;
}());
//物品布局
var ItemLayout = /** @class */ (function () {
    function ItemLayout() {
        this.RewardList = new Array();
        this.BarrierList = new Array();
        this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Empty, 10));
        this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Rock, 10));
        this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Thorn, 10));
        this.BarrierList.push(new LayItemMgr(10, 10, ItemType.Protect, 10));
        this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Vine));
        this.RewardList.push(new LayItemMgr(10, 4, ItemType.Fly));
        this.RewardList.push(new LayItemMgr(10, 2, ItemType.Rope));
        this.RewardList.push(new LayItemMgr(10, 10, ItemType.Coin));
        this.RewardList.push(new LayItemMgr(10, 1, ItemType.Collector));
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
        this.StartFloor = startFloor;
        this.Range = range;
        //分布图 物品idx:层数
        this.ItemList = new Array();
    }
    //层更新函数
    LayItemMgr.prototype.OnFloor = function (floor) {
        if (floor >= this.StartFloor) {
            this.GenMap();
        }
    };
    //生成分布图
    LayItemMgr.prototype.GenMap = function () {
        var startFloor = this.StartFloor;
        var itemNum = this.ItemNum;
        this.ItemList = new Array();
        var itemList = this.ItemList;
        for (var countNum = 0; countNum < itemNum; ++countNum) {
            var ItemFloor = Math.floor(Math.random() * this.Range) + startFloor;
            itemList.push(ItemFloor);
        }
        this.StartFloor += this.Range;
    };
    LayItemMgr.prototype.TakeItems = function (floor) {
        var countNum = 0;
        var itemList = this.ItemList;
        for (var itemIdx = 0; itemIdx < itemList.length; ++itemIdx) {
            if (itemList[itemIdx] == floor) {
                ++countNum;
                itemList.splice(itemIdx, 1);
                --itemIdx;
            }
        }
        return new LineItemInfo(this.ItemType, countNum);
    };
    return LayItemMgr;
}());
//该对象的分布图每层等概率分布
//range区间范围
//num 区间范围数量
//itemType 生产的道具类型
//startFloor 从哪一行开始投掷
function ItemFactory(range, num, itemType, startFloor) {
    if (num == undefined)
        num = 1;
    if (startFloor == undefined)
        //第0层是玩家起步位置
        startFloor = 1;
    //道具类型
    this.ItemType = itemType;
    //当前层数
    this.CurFloor = 0;
    //区间分布总数量
    this.rangeNum = num;
    //开始分布的层数
    this.StartFloor = startFloor;
    //分布区间
    this.Range = range;
    //分布图 物品idx:层数
    this.ItemList = new Array();
}
//层更新函数
//floor 当前层
ItemFactory.prototype.onFloor = function (floor) {
    if (floor >= this.StartFloor) {
        this.GenMap();
    }
};
//生成分布图
ItemFactory.prototype.GenMap = function () {
    var startFloor = this.StartFloor;
    var rangeNum = this.rangeNum;
    this.ItemList = new Array();
    var itemList = this.ItemList;
    for (var ItemNum = 0; ItemNum < rangeNum; ++ItemNum) {
        var ItemFloor = Math.floor(Math.random() * this.Range) + startFloor;
        itemList.push(ItemFloor);
    }
    this.StartFloor += this.Range;
};
//拿某层物品数据
ItemFactory.prototype.TakeItems = function (floor) {
    var countNum = 0;
    var itemList = this.ItemList;
    for (var itemIdx = 0; itemIdx < itemList.length; ++itemIdx) {
        if (itemList[itemIdx] == floor) {
            ++countNum;
            itemList.splice(itemIdx, 1);
            --itemIdx;
        }
    }
    return { ItemType: this.ItemType, Num: countNum };
};
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
        if (ItemDictType[itemType] != null && ItemDictType[itemType] != undefined) {
            var clas = ItemDictType[itemType];
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
    }
    Object.defineProperty(StepItem.prototype, "IsDifficulty", {
        get: function () {
            return this.ItemType > 0 && this.ItemType < 10;
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
        this._InitItemModel();
        this.SetEnable();
        if (this.Model != null) {
            this.Step.addChild(this.Model);
        }
    };
    StepItem.prototype.SetDisable = function () {
        if (this.Model == null) {
            return;
        }
        this.Model.active = false;
    };
    StepItem.prototype.SetEnable = function () {
        if (this.Model == null) {
            return;
        }
        this.Model.active = true;
    };
    //消除 把自己存入内存池
    StepItem.prototype.DesPawn = function () {
        this.SetDisable();
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
            /*
            case ItemTypeEnume.Rope:
                if(!this.JudgePlayerInBuff(player))//AddBuff(this.ItemType))
                {
                    var map = Game.CurScene.Map;
                    map.FlyTo(10);
                    Game.CurScene.InputCtrler = new RopeInput(Game.CurScene.InputCtrler);
                    var completeFunc = buff.CompleteFunc;
                    buff.CompleteFunc = function()
                    {
                        Game.CurScene.InputCtrler = Game.CurScene.InputCtrler.Ctrler;
                        completeFunc();
                    }
                }
            break;
            case ItemTypeEnume.Vine:
                if(player.Buff.Type == ItemTypeEnume.Protect)
                {
                    player.CompleteBuff();
                    this.PutItem();
                }else
                {
                    Game.CurScene.InputCtrler = new VineInput(Game.CurScene.InputCtrler);
                }
            break;
            case ItemTypeEnume.Coin:
                map.AddCoins(1);
                this.PutItem();
            break;
            case ItemTypeEnume.Collector:
                if(this.JudgePlayerInBuff(player))
                {
                    break;
                }
                var CurFloor = this.Step.Floor.Floor+1;
                var Time = Laya.timer.currTimer +2000;
                map.LoopAddCoins(CurFloor);
                map.LoopAddCoins(CurFloor -1)
                map.LoopAddCoins(CurFloor -2)
                buff.Type = this.ItemType;
                buff.ActionFunc = function()
                {
                    var floor = map.GetFloorByFloor(CurFloor);
                    while( player.GetPs().z - floor.GetPs().z <SquareDistance/2+0.1 )
                    {
                        map.LoopAddCoins(CurFloor);
                        ++CurFloor;
                        floor = map.GetFloorByFloor(CurFloor);
                    }
                    if(Time<Laya.timer.currTimer)
                    {
                        player.CompleteBuff();
                    }
                }
                this.PutItem();
            break;
        }
        /*
        var buff = player.Buff;
        var map = Game.CurScene.Map;
        switch(this.ItemType)
        {
            case ItemTypeEnume.Thorn:
                if(player.Buff.Type == ItemTypeEnume.Protect)
                {
                    player.CompleteBuff();
                    this.PutItem();
                }else
                    player.PlayerState = PlayerState.Death;
            break;
            case ItemTypeEnume.Protect:
                if(player.AddBuff(this.ItemType,2*1000))
                    this.PutItem;
                break;
            case ItemTypeEnume.Fly:
                if(!this.JudgePlayerInBuff(player))//AddBuff(this.ItemType))
                {
                    var map = Game.CurScene.Map;
                    map.FlyTo(10);
                    Game.CurScene.InputCtrler = new InputCtrler(Game.CurScene.InputCtrler);
                    var completeFunc = buff.CompleteFunc;
                    buff.CompleteFunc = function()
                    {
                        Game.CurScene.InputCtrler = Game.CurScene.InputCtrler.Ctrler;
                        completeFunc();
                    }
                }
            break;
            case ItemTypeEnume.Rope:
                if(!this.JudgePlayerInBuff(player))//AddBuff(this.ItemType))
                {
                    var map = Game.CurScene.Map;
                    map.FlyTo(10);
                    Game.CurScene.InputCtrler = new RopeInput(Game.CurScene.InputCtrler);
                    var completeFunc = buff.CompleteFunc;
                    buff.CompleteFunc = function()
                    {
                        Game.CurScene.InputCtrler = Game.CurScene.InputCtrler.Ctrler;
                        completeFunc();
                    }
                }
            break;
            case ItemTypeEnume.Vine:
                if(player.Buff.Type == ItemTypeEnume.Protect)
                {
                    player.CompleteBuff();
                    this.PutItem();
                }else
                {
                    Game.CurScene.InputCtrler = new VineInput(Game.CurScene.InputCtrler);
                }
            break;
            case ItemTypeEnume.Coin:
                map.AddCoins(1);
                this.PutItem();
            break;*/
        }
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
        var ps = new Laya.Vector3(0, GameManager.StepLength / 2 + 0.06, 0);
        this._GenItemModel(ps);
        return this.Model;
    };
    //由父类统一管理模型生成
    StepItem.prototype._GenItemModel = function (ps) {
        var model = null;
        switch (this.ItemType) {
            case ItemType.Rock:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.5));
                break;
            case ItemType.Rope:
                break;
            case ItemType.Vine:
                break;
        }
        if (model != null) {
            model.transform.position = ps;
        }
        this.Model = model;
    };
    return StepItem;
}());
var Thorn = /** @class */ (function (_super) {
    __extends(Thorn, _super);
    function Thorn(Step) {
        return _super.call(this, ItemType.Thorn, Step) || this;
    }
    //由父类统一管理模型生成
    Thorn.prototype._GenItemModel = function (ps) {
        var model = null;
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.3));
        model.transform.position = ps;
        this.Model = model;
    };
    Thorn.prototype.TouchItem = function (player) {
        if (player.GetBuff(ProtectBuff.Idx) != null && player.BuffArr[ProtectBuff.Idx].Type == ItemType.Protect) {
            player.GetBuff(ProtectBuff.Idx).Complete();
            this.PutItem();
        }
        else
            APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
    };
    return Thorn;
}(StepItem));
ItemDictType[ItemType.Thorn] = Thorn;
var Protect = /** @class */ (function (_super) {
    __extends(Protect, _super);
    function Protect(step) {
        return _super.call(this, ItemType.Protect, step) || this;
    }
    //由父类统一管理模型生成
    Protect.prototype._GenItemModel = function (ps) {
        var model = null;
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1));
        model.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        model.transform.position = ps;
        this.Model = model;
    };
    Protect.prototype.TouchItem = function (player) {
        if (player.GetBuff(ProtectBuff.Idx) != null)
            return;
        this._AddBuffToPlayer(player, new ProtectBuff(3000));
    };
    return Protect;
}(StepItem));
ItemDictType[ItemType.Protect] = Protect;
var ProtectBuff = /** @class */ (function (_super) {
    __extends(ProtectBuff, _super);
    function ProtectBuff(time) {
        if (time === void 0) { time = 0; }
        var _this = _super.call(this, ItemType.Protect, ProtectBuff.Idx) || this;
        _this.Time = APP.SceneManager.CurDir.GameTime + time;
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
        if (this.Time < APP.SceneManager.CurDir.GameTime) {
            this.Complete();
        }
    };
    return ProtectBuff;
}(BasePlayerBuff));
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin(step) {
        return _super.call(this, ItemType.Coin, step) || this;
    }
    Coin.prototype.FlyToPlayer = function (player) {
        var conin = GenAnimObj(AnimCoin, this.Model);
        conin.SetTarget(player);
        APP.GameManager.GameDir.AddGoldUnLogicGold(1);
        this.PutItem();
    };
    Coin.prototype.TouchItem = function (player) {
        StageAPP.GameManager.GameDir.AddGold(1);
        this.PutItem();
    };
    //由父类统一管理模型生成
    Coin.prototype._GenItemModel = function (ps) {
        var model = null;
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.2, 0.2, 0.2));
        model.transform.position = ps;
        this.Model = model;
    };
    return Coin;
}(StepItem));
ItemDictType[ItemType.Coin] = Coin;
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
    Collecter.prototype._GenItemModel = function (ps) {
        var model = null;
        model = new Laya.MeshSprite3D(new Laya.SphereMesh(0.2));
        model.transform.position = ps;
        this.Model = model;
    };
    return Collecter;
}(StepItem));
ItemDictType[ItemType.Collector] = Collecter;
var CollectBuff = /** @class */ (function (_super) {
    __extends(CollectBuff, _super);
    function CollectBuff(time) {
        if (time === void 0) { time = 0; }
        var _this = _super.call(this, ItemType.Protect, CollectBuff.Idx) || this;
        _this.GameDir = APP.GameManager.GameDir;
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
        this.CountFloor = this.GameDir.PlayerFloor - 2;
    };
    CollectBuff.prototype.Update = function () {
        if (this.Time < this.GameDir.GameTime) {
            this.Complete();
        }
        else {
            if (this.GameDir.PlayerFloor - this.CountFloor + 1 < 0) {
                return;
            }
            this.GameDir.LoopDoFloorStep(this.CountFloor, this, this.CountCoins);
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
        player.AddBuff(new FlyBuff());
    };
    //由父类统一管理模型生成
    FLy.prototype._GenItemModel = function (ps) {
        var model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.5, 0.5, 0.1));
        ps.y += 0.3;
        model.transform.position = ps;
        this.Model = model;
    };
    return FLy;
}(StepItem));
ItemDictType[ItemType.Fly] = FLy;
var FlyBuff = /** @class */ (function (_super) {
    __extends(FlyBuff, _super);
    function FlyBuff(speed, floor) {
        if (speed === void 0) { speed = 0.1; }
        if (floor === void 0) { floor = 10; }
        var _this = _super.call(this, ItemType.Rope, ProtectBuff.Idx) || this;
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
        this._FinalZ = player.Position.z - GameManager.StepDistance / 2 * this.Floor;
        var flyCtrl = new PlayerFly(this.Speed);
        flyCtrl.SetPlayer(player);
        player.AddCtrler(flyCtrl);
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput());
        APP.GameManager.GameDir.SetSafePS(this._FinalLocation);
    };
    FlyBuff.prototype.Update = function () {
        if (this.Player == null) {
            return;
        }
        if (this._FinalZ - this.Player.Position.z > -0.2) {
            var step = APP.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            APP.GameManager.GameDir.PopInputCtrler();
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
        player.AddBuff(new RopeBuff());
    };
    //由父类统一管理模型生成
    Rope.prototype._GenItemModel = function (ps) {
        var model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.5, 0.1));
        model.transform.rotate(new Laya.Vector3(30, -45, 0), true, false);
        model.transform.position = ps;
        this.Model = model;
    };
    return Rope;
}(StepItem));
ItemDictType[ItemType.Rope] = Rope;
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
            var step = APP.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
            this.End(step);
        }
    };
    RopeBuff.prototype.End = function (step) {
        this.Player.LayStep(step);
        this.Player.BaseCtrler.StartMove();
        this.Player.PopCtrler();
        APP.GameManager.GameDir.PopInputCtrler();
        _super.prototype.Complete.call(this);
    };
    RopeBuff.prototype.Start = function (player) {
        _super.prototype.Start.call(this, player);
        this._FinalLocation = player.CurStep.Location;
        this._FinalLocation.Y += this.Floor;
        this._FinalZ = player.Position.z - GameManager.StepDistance / 2 * this.Floor;
        var flyCtrl = new PlayerFly(this.Speed);
        flyCtrl.SetPlayer(player);
        player.AddCtrler(flyCtrl);
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput(this, this._Input));
        APP.GameManager.GameDir.SetSafePS(this._FinalLocation);
    };
    RopeBuff.prototype._Input = function (isRight) {
        var closeFloor = APP.GameManager.GameDir.PlayerFloorLine;
        if (closeFloor.FloorNum % 2 != this._FinalLocation.Y % 2) {
            closeFloor = APP.GameManager.GameDir.GetFloorByFloor(closeFloor.FloorNum + 1);
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
        if (curBuff && curBuff.Type == ItemType.Protect) {
            curBuff.Complete;
            this.PutItem();
        }
        else {
            if (curBuff) {
                curBuff.Complete();
            }
            player.AddBuff(new VineBuff());
            this.PutItem();
            return;
        }
    };
    //由父类统一管理模型生成
    Vine.prototype._GenItemModel = function (ps) {
        var model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.7, 0.7, 0.1));
        model.transform.position = ps;
        this.Model = model;
    };
    return Vine;
}(StepItem));
ItemDictType[ItemType.Vine] = Vine;
var VineBuff = /** @class */ (function (_super) {
    __extends(VineBuff, _super);
    function VineBuff(countTime, inputDir) {
        if (countTime === void 0) { countTime = 3; }
        if (inputDir === void 0) { inputDir = IsRight; }
        var _this = _super.call(this, ItemType.Vine, 0) || this;
        _this.CountTime = countTime;
        _this.InputDir = inputDir;
        _this._ShowGameInfo();
        return _this;
    }
    VineBuff.prototype.Start = function (player) {
        _super.prototype.Start.call(this, player);
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput(this, this._Input));
    };
    VineBuff.prototype.Complete = function () {
        APP.GameManager.GameDir.PopInputCtrler();
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
            info = this.InputDir == IsRight ? "Right" : "Left";
        APP.GameManager.GameDir.ShowInputInfo(info);
    };
    return VineBuff;
}(BasePlayerBuff));
//# sourceMappingURL=Item.js.map