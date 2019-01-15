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
        this.RewardList.push(new LayItemMgr(10, 3, ItemType.Fly));
        //this.ItemList.push(new ItemMgr(10,3,ItemType.Rope))
        //this.ItemList.push(new ItemMgr(10,4,ItemType.Vine))
        //this.ItemList.push(new ItemMgr(10,6,ItemType.Coin))
        //this.ItemList.push(new ItemMgr(10,1,ItemType.Collector))
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
//range区间范围
//num 区间范围数量
//itemType 生产的道具类型
//startFloor 从哪一行开始投掷
var LayItemMgr = /** @class */ (function () {
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
        switch (itemType) {
            default:
                item = new StepItem(itemType, Step);
                break;
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
        this._GenItemModel();
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
            case ItemType.Thorn:
                /* if(player.Buff.Type == ItemTypeEnume.Protect)
                 {
                     player.CompleteBuff();
                     this.PutItem();
                 }else*/
                APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
                break;
            case ItemType.Protect:
                this._AddBuffToPlayer(player, new BasePlayerBuff(this.ItemType));
                break;
            case ItemType.Fly:
                player.AddCtrler(new PlayerFly(0.1, 10));
                /*
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
                    */
                break;
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
            break;*/
        }
    };
    StepItem.prototype._AddBuffToPlayer = function (player, buff) {
        if (player.AddBuff(buff)) {
            this.PutItem();
        }
    };
    //由父类统一管理模型生成
    StepItem.prototype._GenItemModel = function () {
        if (this.Model != null && !this.Model.destroyed) {
            return;
        }
        var model = null;
        var ps = new Laya.Vector3(0, GameManager.StepLength / 2 + 0.06, 0);
        switch (this.ItemType) {
            case ItemType.Rock:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.5));
                break;
            case ItemType.Thorn:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.3));
                break;
            case ItemType.Protect:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.1, 0.1));
                model.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
                break;
            case ItemType.Fly:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.5, 0.5, 0.1));
                ps.y += 0.3;
                break;
            case ItemType.Rope:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1, 0.5, 0.1));
                model.transform.rotate(new Laya.Vector3(30, -45, 0), true, false);
                ps.y += 0.3;
                break;
            case ItemType.Vine:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.7, 0.7, 0.1));
                break;
            case ItemType.Coin:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.2, 0.2, 0.2));
                break;
            case ItemType.Collector:
                model = new Laya.MeshSprite3D(new Laya.SphereMesh(0.2));
                break;
        }
        if (model != null) {
            model.transform.position = ps;
        }
        this.Model = model;
        return model;
    };
    return StepItem;
}());
/*
//触发
StepItem.prototype.*/
/*
//设置玩家Buff
StepItem.prototype.SetPlayerBuff = function(player,type,time,compFunc)
{
    var buff = player.Buff;
    buff.Type = type;
    if(time!=undefined)
    {
        buff.Time = time;
    }else
    {
        buff.Time = -1;
    }
    if(compFunc!= undefined)
    {
        buff.compFunc = compFunc;
    }
}
//判断玩家是否已经捡到BUFF
StepItem.prototype.JudgePlayerInBuff = function(player)
{
     return player.Buff.Type >9&&player.Buff.Type!=ItemType.Vine;
}

function VineInput( ctrler )
{
    var countTime = 3;
    var inputDir = IsRight;
    var thisInput = this;
    var map = Game.CurScene.Map;
    map.GuideInfoUI.visible = true;
    if(inputDir==IsRihgt)
    {
        map.GuideInfoUI.text = "R";
    }
    else
    {
        map.GuideInfoUI.text = "L";
    }
    this.Input = function(isRight)
    {
        if(isRight == inputDir)
        {
            inputDir = !inputDir;
            if(inputDir==IsRihgt)
            {
                map.GuideInfoUI.text = "R";
            }
            else
            {
                map.GuideInfoUI.text = "L";
            }
            --countTime;
            if(countTime<0)
            {
                Game.CurScene.InputCtrler = thisInput.Ctrler;
                map.GuideInfoUI.visible =false;
            }
        }
    }
    arguments.callee.superClass.constructor.call(this,ctrler);
}
extend(VineInput,InputCtrler);

function RopeInput( ctrler )
{
    var map = Game.CurScene.Map;
    map.StartLocation = map.Player.GetLocation();

    this.Input = function( isRight )
    {
        map.JumpRope( isRight );
    }
    arguments.callee.superClass.constructor.call(this,ctrler);
}
extend( RopeInput,InputCtrler );
*/ 
//# sourceMappingURL=Item.js.map