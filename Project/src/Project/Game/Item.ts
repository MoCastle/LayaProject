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
        this.BarrierList.push(new LayItemMgr(10,4,ItemType.Vine))
        
        this.RewardList.push(new LayItemMgr(10,4,ItemType.Fly))
        this.RewardList.push(new LayItemMgr(10,2,ItemType.Rope))
        this.RewardList.push(new LayItemMgr(10,10,ItemType.Coin))
        this.RewardList.push(new LayItemMgr(10,1,ItemType.Collector))
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
    //range区间范围
    //num 区间范围数量
    //itemType 生产的道具类型
    //startFloor 从哪一行开始投掷
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

function StepItemFactory( itemType:ItemType,Step)
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
        if(ItemDictType[itemType]!=null&&ItemDictType[itemType]!=undefined)
        {
            var clas: any = ItemDictType[itemType];
            item = new clas(Step);
        }else
        {
            item = new StepItem(itemType,Step)
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
    Model:Laya.Sprite3D;
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
        this._InitItemModel();
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
            
        }
    }
    constructor( itemType:ItemType,Step:Step )
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
    private _InitItemModel()
    {
        if( this.Model!=null&&!this.Model.destroyed )
        {
            return;
        }
        var ps = new Laya.Vector3(0,GameManager.StepLength,0);
        this._GenItemModel(ps);
        return this.Model;
    }

    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = null;
        
        switch(this.ItemType)
        {
            case ItemType.Rock:
                model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.3, 0.3, 0.5));
            break;
        }
        if(model!= null)
        {
            model.transform.position = ps;
        }
        this.Model = model;    
    }
}

class Rock extends StepItem
{
    public static ModelNum = 3;
    constructor(Step:Step)
    {
        super(ItemType.Rock,Step);
    }
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model:Laya.Sprite3D = null;
        var idx = 1+Math.floor(Math.random()*Rock.ModelNum);
        var road = "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_0"+idx+"/L01_spr_barrier_0"+idx+".lh"
        model = Laya.MeshSprite3D.load(road).clone();
        if(model!= null)
        {
            model.transform.position = ps;
        }
        this.Model = model;    
    }
}
ItemDictType[ItemType.Rock] = Rock;

class Thorn extends StepItem
{
    constructor(Step:Step)
    {
        super(ItemType.Thorn,Step);
    }
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = null;
        
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.1,0.3));
        model.transform.position = ps;
        this.Model = model;    
    }
    TouchItem( player:Player ):void
    {
        if(player.GetBuff(ProtectBuff.Idx)!=null&&player.BuffArr[ProtectBuff.Idx].Type == ItemType.Protect)
        {
            player.GetBuff(ProtectBuff.Idx).Complete();
            this.PutItem();
        }else
            APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
    }
}
ItemDictType[ItemType.Thorn] = Thorn;

class Protect extends StepItem
{
    constructor(step:Step)
    {
        super(ItemType.Protect,step);
    }
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = null;
        
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.1,0.1));
        model.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        model.transform.position = ps;
        this.Model = model;    
    }

    TouchItem( player:Player )
    {
        if(player.GetBuff(ProtectBuff.Idx)!=null)
            return;
        this._AddBuffToPlayer(player,new ProtectBuff(3000));
    }
}
ItemDictType[ItemType.Protect] = Protect;

class ProtectBuff extends BasePlayerBuff
{
    Time:number;
    static get Idx():number
    {
        return 0;
    }
    constructor(time:number = 0)
    {
        super(ItemType.Protect,ProtectBuff.Idx);
        this.Time = APP.SceneManager.CurDir.GameTime+time;
    }
    Update()
    {
        if(this.Time<APP.SceneManager.CurDir.GameTime)
        {
            this.Complete();
        }
    }
}

class Coin extends StepItem
{
    FlyToPlayer(player:Player)
    {
        var conin:AnimCoin = GenAnimObj<AnimCoin>(AnimCoin,this.Model);
        conin.SetTarget(player);
        APP.GameManager.GameDir.AddGoldUnLogicGold(1);
        this.PutItem();
    }
    TouchItem( player:Player )
    {
        StageAPP.GameManager.GameDir.AddGold(1);
        this.PutItem();
    }
    constructor(step:Step)
    {
        super(ItemType.Coin,step);
    }
    
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = null;
        
        model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.2, 0.2, 0.2));
        model.transform.position = ps;
        this.Model = model;    
    }
}
ItemDictType[ItemType.Coin] = Coin;

class Collecter extends StepItem
{
    TouchItem( player:Player )
    {
        if(player.GetBuff(CollectBuff.Idx)!=null)
            return;
        player.AddBuff(new CollectBuff(10000));
        this.PutItem();
    }
    constructor(step:Step)
    {
        super(ItemType.Collector,step);
    }
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = null;
        model = new Laya.MeshSprite3D(new Laya.SphereMesh(0.2));
        model.transform.position = ps;
        this.Model = model;    
    }
}
ItemDictType[ItemType.Collector] = Collecter;

class CollectBuff extends BasePlayerBuff
{
    Time:number;
    GameDir:GameDirector;
    CountFloor:number;
    static get Idx():number
    {
        return 1;
    }
    constructor(time:number = 0)
    {
        super(ItemType.Protect,CollectBuff.Idx);
        this.GameDir = APP.GameManager.GameDir;
        this.Time = this.GameDir.GameTime+time;
        this.CountFloor = 0;
    }
    Start(player:Player)
    {
        super.Start(player);
        this.CountFloor = this.GameDir.PlayerFloor - 2;
    }
    Update()
    {
        if(this.Time<this.GameDir.GameTime)
        {
            this.Complete();
        }else
        {
            if(this.GameDir.PlayerFloor - this.CountFloor+1<0)
            {
                return;
            }
            this.GameDir.LoopDoFloorStep(this.CountFloor,this,this.CountCoins);
            ++this.CountFloor;
        }
    }
    private CountCoins(step:Step)
    {
        if(step.StepItem.ItemType == ItemType.Coin)
        {
            var Coin:Coin = step.StepItem as Coin;
            Coin.FlyToPlayer(this.Player);
        }
    }
}

class FLy extends StepItem
{
    TouchItem( player:Player )
    {
        if(player.GetBuff(0))
            return;
        player.AddBuff(new FlyBuff());
    }
    constructor(step:Step)
    {
        super(ItemType.Fly,step);
    }
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model = new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.1))
        ps.y+= 0.3;
        model.transform.position = ps;
        this.Model = model;    
    }
}
ItemDictType[ItemType.Fly] = FLy;

class FlyBuff extends BasePlayerBuff
{
    Speed:number;
    Floor:number;
    
    static get Idx():number
    {
        return 0;
    }
    Start(player:Player)
    {
        super.Start(player)
        this._FinalLocation = player.CurStep.Location;
        this._FinalLocation.Y +=this.Floor;
        this._FinalZ = player.Position.z - GameManager.StepDistance/2*this.Floor;
        
        var flyCtrl = new PlayerFly(this.Speed);
        flyCtrl.SetPlayer(player)
        player.AddCtrler(flyCtrl);
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput());
        APP.GameManager.GameDir.SetSafePS(this._FinalLocation);
    }

    private _FinalLocation:MLocation;
    private _FinalZ:number;   
    constructor(speed:number=0.1,floor:number=10)
    {
        super(ItemType.Rope,ProtectBuff.Idx);
        this.Speed = speed;
        this.Floor = floor;
        this._FinalLocation = null;
        this._FinalZ = 0; 
        
    }
    Update()
    {
        if(this.Player == null)
        {
            return;
        }
        if(this._FinalZ - this.Player.Position.z>-0.2)
        {
            var step:Step = APP.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();

            APP.GameManager.GameDir.PopInputCtrler();
            super.Complete();
        }
    }
}

class Rope extends StepItem
{
    TouchItem( player:Player )
    {
        if(player.GetBuff(0))
            return;
        player.AddBuff(new RopeBuff());
    }
    constructor(step:Step)
    {
        super(ItemType.Rope,step);
    }

    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.1,0.5,0.1))
        model.transform.rotate(new Laya.Vector3(30, -45, 0), true, false);
        model.transform.position = ps;
        this.Model = model;    
    }
}
ItemDictType[ItemType.Rope] = Rope;

class RopeBuff extends BasePlayerBuff
{
    Speed:number;
    Floor:number;
    
    static get Idx():number
    {
        return 0;
    }
    Update()
    {
        if(this.Player == null)
        {
            return;
        }
        if(this._FinalZ - this.Player.Position.z>-0.2)
        {
            var step:Step = APP.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
            this.End(step);
        }
    }
    End(step:Step)
    {
        this.Player.LayStep(step);
        this.Player.BaseCtrler.StartMove();
        this.Player.PopCtrler();
        APP.GameManager.GameDir.PopInputCtrler();
        super.Complete();
    }
    Start(player:Player)
    {
        super.Start(player)
        this._FinalLocation = player.CurStep.Location;
        this._FinalLocation.Y +=this.Floor;
        this._FinalZ = player.Position.z - GameManager.StepDistance/2*this.Floor;
        
        var flyCtrl = new PlayerFly(this.Speed);
        flyCtrl.SetPlayer(player)
        player.AddCtrler(flyCtrl);
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput(this,this._Input));
        APP.GameManager.GameDir.SetSafePS(this._FinalLocation);
    }

    private _FinalLocation:MLocation;
    private _FinalZ:number;   
    constructor(speed:number=0.1,floor:number=10)
    {
        super(ItemType.Rope,ProtectBuff.Idx);
        this.Speed = speed;
        this.Floor = floor;
        this._FinalLocation = null;
        this._FinalZ = 0; 
        
    }
    private _Input(isRight:boolean):void
    {
        var closeFloor = APP.GameManager.GameDir.PlayerFloorLine;
        if(closeFloor.FloorNum%2!= this._FinalLocation.Y%2)
        {
            closeFloor = APP.GameManager.GameDir.GetFloorByFloor(closeFloor.FloorNum +1 );
        }
        var step:Step = closeFloor.GetStep( this._FinalLocation.X );
        if(isRight)
            step = step.RightParent;
        else
            step = step.LeftParent;
        if(step.StepItem.IsForbiden)
        {
            return
        }
        this.End(step);
    }
}

class Vine extends StepItem
{
    TouchItem( player:Player )
    {
        var curBuff:BasePlayerBuff = player.GetBuff(0);
        if(curBuff&&curBuff.Type == ItemType.Protect)
        {
            curBuff.Complete;
            this.PutItem();
        }
        else
        {
            if(curBuff)
            {
                curBuff.Complete();
            }
            player.AddBuff(new VineBuff());
            this.PutItem();
            return;
        }
        
    }
    constructor(step:Step)
    {
        super(ItemType.Vine,step);
    }
    //由父类统一管理模型生成
    protected _GenItemModel(ps:Laya.Vector3)
    {
        var model:Laya.MeshSprite3D = new Laya.MeshSprite3D(new Laya.BoxMesh(0.7,0.7,0.1))
        model.transform.position = ps;
        this.Model = model;    
    }
}
ItemDictType[ItemType.Vine] = Vine;

class VineBuff extends BasePlayerBuff
{
    CountTime:number;
    InputDir:boolean;
    Start(player:Player)
    {
        super.Start(player)
        APP.GameManager.GameDir.AddInputCtrler(new DIYInput(this,this._Input));
    }
    Complete()
    {
        APP.GameManager.GameDir.PopInputCtrler();
        super.Complete();
    }
    constructor(countTime:number = 3,inputDir:boolean = IsRight)
    {
        super(ItemType.Vine,0);
        this.CountTime = countTime;
        this.InputDir = inputDir;
        this._ShowGameInfo();
    }
    private _Time;
    private _Input(isRight:boolean)
    {
        if(this.InputDir == isRight)
        {
            this.InputDir =!this.InputDir;
            --this.CountTime;
        }
        if(this.CountTime<0)
        {
            this.Complete();
        }
        this._ShowGameInfo();
    }
    private _ShowGameInfo()
    {
        var info:string;
        if(this.CountTime<0)
            info = "";
        else
            info = this.InputDir == IsRight?"Right":"Left";
        APP.GameManager.GameDir.ShowInputInfo(info);
    }
}
