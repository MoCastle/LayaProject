import {GameStruct} from "./GameStruct"
import {PlayerBuff} from "./Buff"
import {MessageMD} from "./../FrameWork/MessageCenter"
import {path} from "./../Utility/Path"
import {AnimObj} from "./../Game/AnimObj"
import Player from "./Player"
import Step from "./Step"
import APP from "./../controler/APP"
import GameDirector from "./../Scene/GameDirector"
import {PlayerControler} from "./PlayerCtrler"
import { Input } from "./Input";
import Controler from "./../controler/GameControler"
type BasePlayerBuff = PlayerBuff.BasePlayerBuff;
type AnimCoin = AnimObj.AnimCoin

export module Item
{
    //物品标识
    const ItemID:string = "Item";
    const ModelID:string ="Model"
    export enum ModelType
    {
        Coin
    }
    export enum ItemType {
        None=0,
        Empty,
        Rock,
        Thorn,
        Protect=11,
        HolyProtect,
        Fly,
        Rope,
        Vine,
        Collector,
        Coin=20,
    }
    
    export class LineItemInfo
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
    export class ItemLayout
    {
        RewardList:Array<LayItemMgr>;
        BarrierList:Array<LayItemMgr>;
        constructor()
        {
            this.RewardList = new Array<LayItemMgr>();
            this.BarrierList = new Array<LayItemMgr>();
            this.BarrierList.push(new LayItemMgr(10,11,ItemType.Empty,10));
            this.BarrierList.push(new LayItemMgr(10,4,ItemType.Rock,10));
            this.BarrierList.push(new LayItemMgr(10,2,ItemType.Thorn,10));
            this.BarrierList.push(new LayItemMgr(15,2,ItemType.Vine))
            
            this.RewardList.push(new LayItemMgr(10,4,ItemType.Coin))
            this.RewardList.push(new LayItemMgr(10,1,ItemType.Collector))
            this.RewardList.push(new LayItemMgr(10,2,ItemType.Fly))
            this.RewardList.push(new LayItemMgr(20,2,ItemType.Protect,3));
            this.RewardList.push(new LayItemMgr(20,2,ItemType.HolyProtect,3));
           //this.RewardList.push(new LayItemMgr(10,10,ItemType.Coin))
           
            //this.BarrierList.push(new LayItemMgr(10,60,ItemType.Fly))
            ResetItemFactory( );
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
    export class LayItemMgr
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
        //已获取层标记
        TouchedFloor:number;
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
            //分布图 物品idx:层数
            this.ItemList = new Array<number>(range);
            this.TouchedFloor = 0;
            this.GenMap(startFloor)
        }
        get Range():number
        {
            return  this.ItemList.length;
        }
        //层更新函数
        OnFloor(floor:number)
        {
            if(floor<this.TouchedFloor)
            {
                this.GenMap(floor);
            }
            if(floor>=this.StartFloor + this.Range)
            {
                this.GenMap(floor);
            }
        }
        //生成分布图
        GenMap(startFloor:number)
        {
            this.StartFloor = startFloor;
            var itemNum = this.ItemNum;
            for(let count:number = 0; count< this.ItemList.length;++count)
            {
                this.ItemList[count] = 0;
            }
            var itemList = this.ItemList;
            for(var countNum:number = 0; countNum<itemNum;++countNum)
            {   
                var ItemFloor:number = Math.floor(Math.random()*this.Range);
                this.ItemList[ItemFloor] +=1;
            }
        }
    
        TakeItems( floor:number )
        {
            this.TouchedFloor = floor;
            return new LineItemInfo(this.ItemType,this.ItemList[floor - this.StartFloor]);
        }
    }
    
    var Reset:boolean;
    export function ResetItemFactory( ):void
    {
        if(Reset)
        {
            return ;
        }
        Reset =true;
        for(var theKey in GameStruct.ItemDictType)
        {
            var type = parseInt(theKey);
            if(type <= 2)
            {
                continue ;
            }
            for( let count =0;count < 30;++count )
            {
                var clas: any = GameStruct.ItemDictType[type];
                var item:Step = new clas(null);
                Laya.Pool.recover(ItemID+theKey,item);
            }
        }
    }
    export function StepItemFactory( itemType:ItemType,Step)
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
            if(GameStruct.ItemDictType[itemType]!=null&&GameStruct.ItemDictType[itemType]!=undefined)
            {
                var clas: any = GameStruct.ItemDictType[itemType];
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
    
    export class StepItem
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
            //this._InitItemModel();
            this.SetEnable();
            if(this.Model!= null)
            {
                this.Step.addChild(this.Model);
            }
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
        /**
         * 突破保护
         * @returns 是否被突破
         */
        BreakProtect(player:Player):boolean
        {
            var curBuff = player.GetBuff(ProtectBuff.Idx);
            if(curBuff)
            {
                switch(curBuff.Type)
                {
                    case ItemType.Protect:
                        curBuff.Complete();
                    case ItemType.HolyProtect:
                    return true;
                }
            }
            return  false;
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
            this._InitItemModel();
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
            var ps = new Laya.Vector3(0,Controler.GameControler.StepLength,0);
            this._GenItemModel();
            if(this.Model)
                this.Model.transform.position = ps;
            return this.Model;
        }
    
        protected _GenItemModel()
        {
            var model:Laya.Sprite3D = null;
            
            switch(this.ItemType)
            {
                case ItemType.Rock:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                break;
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
        protected _GenItemModel()
        {
            var model:Laya.MeshSprite3D = null;
            var idx = 1+Math.floor(Math.random()*Rock.ModelNum);
            var Name:string = path.GetLH("L01_spr_barrier_0"+idx)
            model = Laya.loader.getRes(Name)
            model = model.clone();
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Rock] = Rock;
    
    class Thorn extends StepItem
    {
        constructor(Step:Step)
        {
            super(ItemType.Thorn,Step);
        }
        //由父类统一管理模型生成
        protected _GenItemModel()
        {
            var name:string = path.GetLH("trap_sting_01")
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone();
            this.Model = model;    
        }
        TouchItem( player:Player ):void
        {
            if(this.BreakProtect(player))
                this.PutItem();
            else
                APP.MessageManager.Trigger(MessageMD.GameEvent.PlayerDeath);
        }
    }
    GameStruct.ItemDictType[ItemType.Thorn] = Thorn;
    
    class Protect extends StepItem
    {
        constructor(step:Step)
        {
            super(ItemType.Protect,step);
        }
        //由父类统一管理模型生成
        protected _GenItemModel()
        {
            var name:string = path.GetLH("item_shield_01")
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;    
        }
    
        TouchItem( player:Player )
        {
            if(player.GetBuff(ProtectBuff.Idx)!=null)
                return;
            this._AddBuffToPlayer(player,new ProtectBuff(3000));
        }
    }
    GameStruct.ItemDictType[ItemType.Protect] = Protect;
    
    class ProtectBuff extends PlayerBuff.BasePlayerBuff
    {
        Time:number;
        static get Idx():number
        {
            return 0;
        }
        /**
         * 
         * @param time 持续时间
         * @param IsHoly 是否绝对无敌
         */
        constructor(time:number = 0, IsHoly:boolean = false)
        {
            super(IsHoly ? ItemType.HolyProtect:ItemType.Protect,ProtectBuff.Idx);
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
    class HolyProtect extends StepItem
    {
        constructor(step:Step)
        {
            super(ItemType.HolyProtect,step);
        }
        //由父类统一管理模型生成
        protected _GenItemModel()
        {
            var name:string = path.GetLH("item_untouchable_01")
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;    
        }
    
        TouchItem( player:Player )
        {
            if(player.GetBuff(ProtectBuff.Idx)!=null)
                return;
            this._AddBuffToPlayer(player,new ProtectBuff(3000,true));
        }
    }
    GameStruct.ItemDictType[ItemType.HolyProtect] = HolyProtect;

    class Coin extends StepItem
    {
        FlyToPlayer(player:Player)
        {
            var conin:AnimCoin = AnimObj.GenAnimObj<AnimCoin>(AnimObj.AnimCoin,this.Model);
            conin.SetTarget(player);
            Controler.GameControler.GameDir.AddGoldUnLogicGold(1);
            this.PutItem();
        }
        TouchItem( player:Player )
        {
            Controler.GameControler.GameDir.AddGold(1);
            this.PutItem();
        }
        constructor(step:Step)
        {
            super(ItemType.Coin,step);
        }
        
        //由父类统一管理模型生成
        protected _GenItemModel()
        {
            var name:string = path.GetLH("item_coin_01")
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Coin] = Coin;
    
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
        protected _GenItemModel()
        {
            var Idx = Math.floor(1+ Math.random()*2);
            var name:string = path.GetLH("item_absord");
            var theModel = Laya.loader.getRes(name);
            var model:Laya.Sprite3D = theModel.clone(); 
            
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Collector] = Collecter;
    
    class CollectBuff extends PlayerBuff.BasePlayerBuff
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
            this.GameDir = Controler.GameControler.GameDir;
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
        protected _GenItemModel()
        {
            var Idx = Math.floor(1+ Math.random()*2);
            var name:string = path.GetLH("item_flyer_01");
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone(); 
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Fly] = FLy;
    
    class FlyBuff extends PlayerBuff.BasePlayerBuff
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
            var time:number = Laya.timer.currTimer;
            if(player.CurStep == null)
            {
                this.Complete();
            }
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y +=this.Floor;
            this._FinalZ = player.Position.z - Controler.GameControler.StepDistance/2*this.Floor;
            
            var flyCtrl = new PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player)
            player.AddCtrler(flyCtrl);
            Controler.GameControler.GameDir.AddInputCtrler(new Input.DIYInput());
            Controler.GameControler.GameDir.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
            
        }
    
        private _FinalLocation:GameStruct.MLocation;
        private _FinalZ:number;   
        constructor(speed:number=0.15,floor:number=10)
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
                var step:Step = Controler.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
    
                Controler.GameControler.GameDir.PopInputCtrler();
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
        protected _GenItemModel()
        {
            var model:Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.1,0.5,0.1))
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Rope] = Rope;
    
    class RopeBuff extends PlayerBuff.BasePlayerBuff
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
                var step:Step = Controler.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.End(step);
            }
        }
        End(step:Step)
        {
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            Controler.GameControler.GameDir.PopInputCtrler();
            super.Complete();
        }
        Start(player:Player)
        {
            super.Start(player)
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y +=this.Floor;
            this._FinalZ = player.Position.z - Controler.GameControler.StepDistance/2*this.Floor;
            
            var flyCtrl = new PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player)
            player.AddCtrler(flyCtrl);
            Controler.GameControler.GameDir.AddInputCtrler(new Input.DIYInput(this,this._Input));
            Controler.GameControler.GameDir.SetSafePS(this._FinalLocation);
        }
    
        private _FinalLocation:GameStruct.MLocation;
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
            var closeFloor = Controler.GameControler.GameDir.PlayerFloorLine;
            if(closeFloor.FloorNum%2!= this._FinalLocation.Y%2)
            {
                closeFloor = Controler.GameControler.GameDir.GetFloorByFloor(closeFloor.FloorNum +1 );
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
            if(!this.BreakProtect(player))
            {
                player.AddBuff(new VineBuff());
            }
            this.PutItem();
        }
        constructor(step:Step)
        {
            super(ItemType.Vine,step);
        }
        //由父类统一管理模型生成
        protected _GenItemModel()
        {
            var Idx = Math.floor(1+ Math.random()*2);
            var name:string = Idx == 1? path.GetLH("trap_entangle_01"):path.GetLH("trap_chomper_01")
            //var name:string = path.GetLH("trap_entangle_01")
            //var name:string = path.GetLH("trap_chomper_01")
            
            var model:Laya.Sprite3D = Laya.loader.getRes(name).clone(); 
            this.Model = model;    
        }
    }
    GameStruct.ItemDictType[ItemType.Vine] = Vine;
    
    class VineBuff extends PlayerBuff.BasePlayerBuff
    {
        CountTime:number;
        InputDir:boolean;
        Start(player:Player)
        {
            super.Start(player)
            Controler.GameControler.GameDir.AddInputCtrler(new Input.DIYInput(this,this._Input));
        }
        Complete()
        {
            Controler.GameControler.GameDir.PopInputCtrler();
            super.Complete();
        }
        constructor(countTime:number = 4,inputDir:boolean = true)
        {
            super(ItemType.Vine,0);
            this.CountTime = countTime;
            this.InputDir = inputDir;
            this._ShowGameInfo();
        }
        private _Time;
        private _Input(inputDir:boolean)
        {
            if(this.InputDir == inputDir)
            {
                this.InputDir =!this.InputDir;
                --this.CountTime;
            }
            if(this.CountTime<=0)
            {
                this.Complete();
            }
            this._ShowGameInfo();
        }
        private _ShowGameInfo()
        {
            var info:string;
            if(this.CountTime<=0)
                info = "";
            else
                info = this.InputDir == true?"Right":"Left";
            Controler.GameControler.GameDir.ShowInputInfo(info);
        }
    }
    
}
