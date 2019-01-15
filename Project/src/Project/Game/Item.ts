//物品标识
const ItemID:string = "Item";
enum ItemType {
    None=0,
    Empty,
    Rock,
    Thorn,
    Protect=11,
    Fly,
    Rope,
    Vine,
    Collector,
    Coin=20,
}

class LineItemInfo
{
    Type:ItemType;
    Number:number;
    constructor( type:ItemType,num:number )
    {
        this.Type = type;
        this.Number = num;
    }
}

//物品布局
class ItemLayout
{
    RewardList:Array<LayItemMgr>;
    BarrierList:Array<LayItemMgr>;
    constructor()
    {
        this.RewardList = new Array<LayItemMgr>();
        this.BarrierList = new Array<LayItemMgr>();
    
        this.BarrierList.push(new LayItemMgr(10,4,ItemType.Empty,10));
        this.BarrierList.push(new LayItemMgr(10,4,ItemType.Rock,10));
        this.BarrierList.push(new LayItemMgr(10,4,ItemType.Thorn,10));
        this.BarrierList.push(new LayItemMgr(10,10,ItemType.Protect,10));
        this.RewardList.push(new LayItemMgr(10,3,ItemType.Fly))
    //this.ItemList.push(new ItemMgr(10,3,ItemType.Rope))
    //this.ItemList.push(new ItemMgr(10,4,ItemType.Vine))
    //this.ItemList.push(new ItemMgr(10,6,ItemType.Coin))
    //this.ItemList.push(new ItemMgr(10,1,ItemType.Collector))
    }
    
    TakeLineReward(floor:number)
    {
        return this.TakeItem(floor,this.RewardList);
    }
    
    TakeLineDifficulty(floor:number)
    {
        return this.TakeItem(floor,this.BarrierList);
    }

    TakeItem(floor:number, MgrList:Array<LayItemMgr>):Array<LineItemInfo>
    {
        var returnInfo = new Array<LineItemInfo>();
        for( var listIdx = 0; listIdx < MgrList.length; ++listIdx )
        {
            MgrList[listIdx].OnFloor(floor);
            var info:LineItemInfo = MgrList[listIdx].TakeItems(floor);
            if(info.Number>0)
            {
                returnInfo.push(info);
            }
        }
        return returnInfo;
    }
}


//该对象的分布图每层等概率分布
//range区间范围
//num 区间范围数量
//itemType 生产的道具类型
//startFloor 从哪一行开始投掷
class LayItemMgr
{
    //道具类型
    ItemType:ItemType;
    //当前层数
    CurFloor:number;
    //区间分布总数量
    ItemNum:number;
    //开始分布的层数
    StartFloor:number;
    //分布区间
    Range:number;
    ItemList:Array<number>;
    constructor( range:number,num:number,itemType:ItemType,startFloor:number = 1 )
    {
        if(num == undefined)
                num = 1;
        if(startFloor == undefined)
            //第0层是玩家起步位置
            startFloor = 1;
        this.ItemType = itemType;
        this.CurFloor = 0;
        this.ItemNum = num;
        this.StartFloor = startFloor;
        this.Range = range;
        //分布图 物品idx:层数
        this.ItemList = new Array<number>();
    }
    //层更新函数
    OnFloor(floor:number)
    {
        if(floor>=this.StartFloor)
        {
            this.GenMap();
        }
    }
    //生成分布图
    GenMap()
    {
        var startFloor = this.StartFloor;
        var itemNum = this.ItemNum;
        this.ItemList = new Array();
        var itemList = this.ItemList;
        for(var countNum:number = 0; countNum<itemNum;++countNum)
        {   
            var ItemFloor:number = Math.floor(Math.random()*this.Range) + startFloor;
            itemList.push(ItemFloor);
        }
        this.StartFloor += this.Range;
    }

    TakeItems( floor:number )
    {
        var countNum = 0;
        var itemList = this.ItemList;
        for(var itemIdx = 0;itemIdx<itemList.length;++itemIdx)
        {
            if(itemList[itemIdx] == floor)
            {
                ++countNum;
                itemList.splice(itemIdx,1);
                --itemIdx;
            }
        }
        return new LineItemInfo(this.ItemType,countNum);
    }
}

//该对象的分布图每层等概率分布
//range区间范围
//num 区间范围数量
//itemType 生产的道具类型
//startFloor 从哪一行开始投掷
function ItemFactory( range,num,itemType,startFloor )
{
    if(num == undefined)
        num = 1;
    if(startFloor == undefined)
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
ItemFactory.prototype.onFloor= function(floor)
{
    if(floor>=this.StartFloor)
    {
        this.GenMap();
    }
}
//生成分布图
ItemFactory.prototype.GenMap = function()
{
    var startFloor = this.StartFloor;
    var rangeNum = this.rangeNum;
    this.ItemList = new Array();
    var itemList = this.ItemList;
    for(var ItemNum = 0; ItemNum<rangeNum;++ItemNum)
    {
        var ItemFloor = Math.floor(Math.random()*this.Range) + startFloor;
        itemList.push(ItemFloor);
    }
    
    this.StartFloor += this.Range;
}
//拿某层物品数据
ItemFactory.prototype.TakeItems = function( floor )
{
    var countNum = 0;
    var itemList = this.ItemList;
    for(var itemIdx = 0;itemIdx<itemList.length;++itemIdx)
    {
        if(itemList[itemIdx] == floor)
        {
            ++countNum;
            itemList.splice(itemIdx,1);
            --itemIdx;
        }
    }
    return {ItemType:this.ItemType, Num:countNum};
}

function StepItemFactory( itemType,Step)
{
    if(Step == undefined)
    {
        return
    }
    if(itemType == undefined)
    {
        itemType = ItemType.None;
    }
    var item
    var objPool = Laya.Pool;
    item = objPool.getItem(ItemID+itemType)
    if(item==null)
    {
        switch(itemType)
        {
            default:
                item = new StepItem(itemType,Step)
            break;
        }
    }
    item.Step = Step;
    item.ResetItem();
    return item;
}

class StepItem
{
    Step:Step;
    ItemType:ItemType;
    Model:Laya.MeshSprite3D;
    get IsDifficulty():boolean
    {
        return this.ItemType>0&&this.ItemType<10;
    }

    //判断能不能走上去
    get IsForbiden():boolean
    {
        return this.ItemType == ItemType.Rock;
    }
    //重置
    ResetItem()
    {
        this._GenItemModel();
        this.SetEnable();
        if(this.Model!= null)
        {
            this.Step.addChild(this.Model);
        }
    }
    SetDisable()
    {
        if(this.Model==null)
        {
            return;
        }
        this.Model.active = false;
    }

    SetEnable()
    {
        if(this.Model==null)
        {
            return;
        }
        this.Model.active =true;
    }
    PutItem = function( itemType = ItemType.None )
    {
        this.DesPawn();
        this.Step.StepItem = StepItemFactory(itemType,this.Step);
    }

    //消除 把自己存入内存池
    DesPawn()
    {
        this.SetDisable();
        if(this.Model!=null)
            this.Model.removeSelf();
        var objPool = Laya.Pool;//GM.ObjPool;
        objPool.recover(ItemID+this.ItemType,this);
    }
    /**
     * 触发
     * @param player 
     */
    TouchItem( player:Player )
    {
        switch(this.ItemType)
        {
            case ItemType.Thorn:
               /* if(player.Buff.Type == ItemTypeEnume.Protect)
                {
                    player.CompleteBuff();
                    this.PutItem();
                }else*/
                    APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
            break;
            
            case ItemType.Protect:
                this._AddBuffToPlayer(player,new BasePlayerBuff(this.ItemType));
                break;

            case ItemType.Fly:
                player.AddCtrler(new PlayerFly(0.1,10));
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
    }
    constructor( itemType,Step )
    {
        if(itemType == undefined)
        {
            itemType = ItemType.None;
        }
        this.Step = Step;
        this.ItemType = itemType;
        this.Model= null;
    }

    _AddBuffToPlayer(player:Player,buff:BasePlayerBuff)
    {
        if(player.AddBuff(buff))
        {
            this.PutItem();
        }
    }
    //由父类统一管理模型生成
    _GenItemModel()
    {
        if( this.Model!=null&&!this.Model.destroyed )
        {
            return;
        }
        var model = null;
        var ps = new Laya.Vector3(0,GameManager.StepLength/2+0.06,0);
        switch(this.ItemType)
        {
            case ItemType.Rock:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.5));
            break;
            case ItemType.Thorn:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.1,0.3));
            break;
            case ItemType.Protect:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.1,0.1));
                model.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            break;
            case ItemType.Fly:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.1))
                ps.y+= 0.3;
            break;
            case ItemType.Rope:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.5,0.1))
                model.transform.rotate(new Laya.Vector3(30, -45, 0), true, false);
                ps.y+= 0.3;
            break
            case ItemType.Vine:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.7,0.7,0.1))
            break;
            case ItemType.Coin:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.2, 0.2, 0.2));
            break;
            case ItemType.Collector:
                model = new Laya.MeshSprite3D(new Laya.SphereMesh(0.2));
            break;
        }
        if(model!= null)
        {
            model.transform.position = ps;
        }
        this.Model = model;    
        return model;
    }
}










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