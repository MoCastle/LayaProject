import { GameStruct } from "./GameStruct"
import { MessageMD } from "./../FrameWork/MessageCenter"
import { path } from "./../Utility/Path"
import { AnimObj } from "./../Game/AnimObj"
import Player from "./Player"
import Step from "./Step"
import APP from "./../controler/APP"
import GameDirector from "./../Scene/GameDirector"
import { PlayerControler } from "./PlayerCtrler"
import { Input } from "./Input";
import Controler from "./../controler/GameControler"
import { GameModule } from "./GameModule";
import CharactorAnimator from "./CharacterAnimator";
import { BaseFunc } from "../Base/BaseFunc";
import { LevelItemInfo } from "../GameManager/LevelItemRangeManager"
import ItemManager from "../GameManager/ItemManager";

type AnimCoin = AnimObj.AnimCoin
export module Item {
    //物品标识
    const ItemID: string = "Item";
    const ModelID: string = "Model"

    export enum ModelType {
        Coin
    }
    export enum ItemType {
        None = 0,
        Empty,
        Rock,
        Thorn,
        Vine,
        Protect = 11,
        HolyProtect,
        Fly,
        Rope,
        Collector,
        WinFlag,
        Coin = 20,
    }
    export class LineItemInfo {
        Type: ItemType;
        Number: number;
        constructor(type: ItemType, num: number) {
            this.Type = type;
            this.Number = num;
        }
    }
    export var BuffSlot: { [key: number]: number } = {};
    BuffSlot[ItemType.Collector] = 0;
    BuffSlot[ItemType.Protect] = 1;
    BuffSlot[ItemType.HolyProtect] = 1;
    BuffSlot[ItemType.Fly] = 1;
    BuffSlot[ItemType.Vine] = 2;

    //物品布局
    export class ItemLayout {
        private m_Colum:number;
        rewardList: Array<ItemLayOutData>;
        barrierList: Array<ItemLayOutData>;
        layOutCount: Array<number>;
        startFloor: number;
        range: number
        itemInfo: LevelItemInfo.ItemRangeInfo;
        get endFloor(): number  {
            return this.startFloor + this.itemInfo.GetFloorRange();
        }
        //RewardMap: { [key: number]: LevelItemInfo.ItemInfo } ;
        ///BarrierMap:{ [key: number]: LevelItemInfo.ItemInfo };
        constructor() {
            //this.RewardList = new Array<LayItemMgr>();
            //this.BarrierList = new Array<LayItemMgr>();
            /*
            this.BarrierList.push(new LayItemMgr(10, 1, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 5, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 2, ItemType.Thorn, 10));
            this.RewardList.push(new LayItemMgr(10, 2, ItemType.Vine, 10));
            this.RewardList.push(new LayItemMgr(10, 1, ItemType.Coin));

            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Fly, 20));

            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Collector));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Protect));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.HolyProtect));
            */
        }

        public Reset(floor:number)
        {
            var itemInfo: LevelItemInfo.ItemRangeInfo = LevelItemInfo.LevelItemRangeManager.Mgr.GetFloorInfo(floor);
            this.InitItemLayout(itemInfo);
        }
        private InitItemLayout(itemInfo:LevelItemInfo.ItemRangeInfo)
        {
            this.itemInfo = itemInfo;
            var range: number = itemInfo.GetFloorRange();
            var layOutCount = new Array<number>();
            this.range = range;
            this.startFloor = itemInfo.StartFloor;
            
            for (var startIdx: number = 0; startIdx < range; ++startIdx) {
                if (startIdx % 2 == 0) {
                    layOutCount[startIdx] = this.m_Colum;
                } else {
                    layOutCount[startIdx] = this.m_Colum - 1;
                }
            }
            this.layOutCount = layOutCount;

            var itemDataMap: { [key: number]: LevelItemInfo.ItemInfo } = itemInfo.ItemInfoMap;

            this.rewardList = new Array<ItemLayOutData>();
            this.barrierList = new Array<ItemLayOutData>();

            var barrierList: Array<ItemLayOutData> = this.barrierList;
            var rewardList: Array<ItemLayOutData> = this.rewardList;

            for (var key in ItemType) {
                var theKey: any = key
                if (isNaN(theKey)) {
                    var itemType: any = ItemType[theKey];
                    var itemTypeEnum: ItemType = itemType;
                    if (itemTypeEnum == ItemType.None || itemTypeEnum == ItemType.WinFlag || itemTypeEnum == ItemType.Rope) {
                    }
                    else if (itemTypeEnum < ItemType.Vine) {
                        barrierList.push(new ItemLayOutData(this.layOutCount, itemDataMap[itemType], itemInfo.StartFloor));
                    }
                    else {
                        rewardList.push(new ItemLayOutData(this.layOutCount, itemDataMap[itemType], itemInfo.StartFloor));
                    }
                }
            }
        }
        public Init(LevelID: number, colum: number = 5) {
            var itemInfo: LevelItemInfo.ItemRangeInfo = LevelItemInfo.LevelItemRangeManager.Mgr.GetFloorInfoByLevelID(LevelID);
            this.m_Colum = colum;
            this.InitItemLayout(itemInfo);
        }

        TakeLineReward(floor: number) {
            return this.TakeItem(floor, this.rewardList);
        }

        TakeLineDifficulty(floor: number) {
            return this.TakeItem(floor, this.barrierList);
        }

        TakeItem(floor: number, MgrList: Array<ItemLayOutData>): Array<LineItemInfo> {
            var returnInfo = new Array<LineItemInfo>();
            for (var listIdx = 0; listIdx < MgrList.length; ++listIdx) {
                MgrList[listIdx].UpdateFloor(floor);

                var info: LineItemInfo = MgrList[listIdx].TakeItems(floor);
                if (info.Number > 1)  {
                    console.log("why");
                }
                if (info.Number > 0) {
                    returnInfo.push(info);
                }
            }
            return returnInfo;
        }
    }

    //该对象的分布图每层等概率分布
    export class ItemLayOutData {
        //道具类型
        itemType: ItemType;
        //开始分布的层数
        //已获取层标记
        curFloorNum: number;
        //开始层
        protected m_StartFloorArr: Array<number>;
        layoutItemList: Array<number>;
        itemListArr: Array<number>;
        itemNum: Array<number>;
        itemInfo: LevelItemInfo.ItemInfo;

        get Range(): number {
            return this.layoutItemList.length;
        }

        constructor(layout: Array<number>, itemInfo: LevelItemInfo.ItemInfo, startFloor: number) {
            this.m_StartFloorArr = new Array<number>();
            this.itemType = itemInfo.itemType;
            this.layoutItemList = layout;
            this.itemListArr = new Array<number>();
            this.itemInfo = itemInfo;
            var itemNum: Array<number> = new Array<number>();
            this.itemNum = itemNum;
            this.GenMap(0, true);
            this.GenMap(0, false);
        }

        GetEndFloor(isOdd: boolean): number {
            return this.m_StartFloorArr[isOdd ? 0 : 1] + this.itemInfo.GetRange(isOdd);
        }

        //层更新函数
        UpdateFloor(floor: number) {
            var isOdd: boolean = floor % 2 == 0;
            if (this.GetEndFloor(isOdd) < floor) {
                var range: number = this.itemInfo.GetRange(isOdd);
                var startFloor = Math.floor(floor / range) * range;
                this.GenMap(startFloor, isOdd);
            }
            /*
            if (floor >= this.startFloor + this.Range) {
                this.GenMap(floor);
            }
            */
        }

        //生成分布图
        GenMap(startFloor: number, isOdd: boolean) {
            var itemList: Array<number>;
            var itemNum: number = this.itemInfo.GetNum(isOdd);
            var range: number = this.itemInfo.GetRange(isOdd);
            var floorArr: Array<number> = new Array<number>();
            this.itemListArr = this.itemListArr ? this.itemListArr : new Array<number>();
            itemList = this.itemListArr;

            for (var floorIdx: number = startFloor; floorIdx < startFloor + range; floorIdx++) {
                if (isOdd && floorIdx % 2 == 0 && this.layoutItemList[floorIdx] > 0) {
                    if ((this.itemInfo.itemType > Item.ItemType.None && this.itemInfo.itemType < 10) || (this.itemInfo.itemType > 10))  {
                        floorArr.push(floorIdx)
                        itemList[floorIdx - startFloor] = 0;
                    }
                }
                else if (!isOdd && floorIdx % 2 != 0 && this.layoutItemList[floorIdx] > 0) {
                    if ((this.itemInfo.itemType > Item.ItemType.None && this.itemInfo.itemType < 10) || (this.itemInfo.itemType > 10))  {
                        floorArr.push(floorIdx)
                        itemList[floorIdx - startFloor] = 0;
                    }
                }
            }
            while (itemNum > 0) {
                if (floorArr.length < 1) {
                    break;
                }
                var randomLine = Math.floor(Math.random() * floorArr.length);
                var leftItemNum = --this.layoutItemList[floorArr[randomLine]];
                itemList[floorArr[randomLine] - startFloor] += 1;

                if (leftItemNum < 1) {
                    floorArr.splice(randomLine, 1);
                }
                --itemNum;
            }

            this.m_StartFloorArr[isOdd ? 0 : 1] = startFloor;
        }

        TakeItems(floor: number): LineItemInfo {
            var listItem: Array<number> = this.itemListArr;
            return new LineItemInfo(this.itemType, listItem[floor - this.m_StartFloorArr[floor % 2 == 0 ? 0 : 1]]);
        }
    }

    var Reset: boolean;
    export function ResetItemFactory(): void {
        if (Reset) {
            return;
        }
        Reset = true;
        for (var theKey in GameStruct.ItemDictType) {
            var type = parseInt(theKey);
            if (type <= 2) {
                continue;
            }
            for (let count = 0; count < 30; ++count) {
                var clas: any = GameStruct.ItemDictType[type];
                var item: Step = new clas(null);
                Laya.Pool.recover(ItemID + theKey, item);
            }
        }
    }

    export function StepItemFactory(itemType: ItemType, step) {
        if (step == undefined) {
            return
        }
        if (itemType == undefined) {
            itemType = ItemType.None;
        }
        var item
        var objPool = Laya.Pool;
        item = objPool.getItem(ItemID + itemType)
        if (item == null) {
            if (GameStruct.ItemDictType[itemType] != null && GameStruct.ItemDictType[itemType] != undefined) {
                var clas: any = GameStruct.ItemDictType[itemType];
                item = new clas(step);
            } else {
                item = new StepItem(itemType, step)
            }
        }
        item.Step = step;
        item.ResetItem();
        return item;
    }

    export function ItemBuffFactory(itemType: ItemType): BasePlayerBuff {
        var buff: BasePlayerBuff = null;
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

    export class StepItem {
        protected m_CharactorAnimator: CharactorAnimator;
        Step: Step;
        ItemType: ItemType;
        Model: Laya.Sprite3D;
        get IsDifficulty(): boolean {
            return this.ItemType > 0 && this.ItemType < 10 && this.ItemType != ItemType.Vine;
        }

        //判断能不能走上去
        get IsForbiden(): boolean {
            return this.ItemType == ItemType.Rock;
        }

        //重置
        ResetItem() {
            //this._InitItemModel();
            this.SetEnable();
            if (this.Model != null) {
                this.Model.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
                this.Step.PutInItem(this.Model);// .addChild(this.Model);
                this.Model.transform.localPosition = Laya.Vector3.ZERO;
            }
        }

        SetEnable() {
            if (this.Model == null) {
                return;
            }
            this.Model.active = true;
        }

        PutItem = function (itemType = ItemType.None) {
            this.DesPawn();
            this.Step.StepItem = StepItemFactory(itemType, this.Step);
        }

        //消除 把自己存入内存池
        DesPawn() {
            if (this.Model != null)
                this.Model.removeSelf();
            var objPool = Laya.Pool;//GM.ObjPool;
            objPool.recover(ItemID + this.ItemType, this);
        }

        /**
         * 触发
         * @param player 
         */
        TouchItem(player: Player) {

        }
        CheckItem(player: Player) {

        }
        public AddBuffToPlayer(player: Player, putBackItem: boolean = true): boolean {
            var Buff: BasePlayerBuff = ItemBuffFactory(this.ItemType);
            var success: boolean = Buff.AddToPlayer(player);
            if (success && putBackItem)
                this.PutItem();
            return success;
        }

        /**
         * 突破保护
         * @returns 是否被突破
         */
        BreakProtect(player: Player): boolean {
            var curBuff = player.GetBuff(BuffSlot[ItemType.Protect]);
            if (curBuff) {
                switch (curBuff.Type) {
                    case ItemType.Protect:
                        curBuff.RemoveSelf();
                    case ItemType.HolyProtect:
                        return true;
                }
            }
            return false;
        }
        constructor(itemType: ItemType, Step: Step) {
            if (itemType == undefined) {
                itemType = ItemType.None;
            }
            this.Step = Step;
            this.ItemType = itemType;
            this.Model = null;
            this._InitItemModel();
        }
        protected SetIdleWave() {
            var idelState: Laya.AnimatorState = this.m_CharactorAnimator.GetState("idle");
            var waveState: WaveStateScript = idelState.addScript(WaveStateScript) as WaveStateScript;
            waveState.Init(this.Model);
        }
        _AddBuffToPlayer(player: Player, buff: BasePlayerBuff) {
            if (player.AddBuff(buff)) {
                this.PutItem();
            }
        }
        private _InitItemModel() {
            if (this.Model != null && !this.Model.destroyed) {
                return;
            }

            this._GenItemModel();
            if (this.Model) {
                var animModel = this.Model.getChildAt(0);
                var animator: Laya.Animator = animModel ? animModel.getComponent(Laya.Animator) : null;
                if (animator)
                    this.m_CharactorAnimator = new CharactorAnimator(animator);
            }
            return this.Model;
        }
        protected _TestGentItemModel() {
            var model: Laya.Sprite3D = null;
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
        }

        protected _GenItemModel() {
            var model: Laya.Sprite3D = null;

            switch (this.ItemType) {
                case ItemType.Rock:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                    break;
            }
            this.Model = model;
        }
    }

    export abstract class BasePlayerBuff {
        private m_Type: ItemType;
        private m_Player: Player;
        public get Type(): Item.ItemType {
            return this.m_Type;
        }
        public get Slot(): number {
            return BuffSlot[this.Type];
        }
        public get player(): Player {
            return this.m_Player;
        }
        constructor(type: Item.ItemType) {
            this.m_Type = type;
        }
        Update() {
        }

        //向玩家添加BUFF
        public AddToPlayer(player: Player): boolean {
            this.m_Player = player;
            player.AddBuff(this);
            return true;
        }

        public abstract Start();
        public RemoveSelf(): void {
            this.player.CompleteBuff(this.Slot);
        }
        public abstract Removed();
    }

    class Rock extends StepItem {
        public static ModelNum = 4;
        constructor(Step: Step) {
            super(ItemType.Rock, Step);
        }
        protected _GenItemModel() {
            var model: Laya.MeshSprite3D = null;

            var idx = 1 + Math.floor(Math.random() * Rock.ModelNum);
            var Name: string = path.GetLH("zhangaiwu_qiu0" + idx)
            model = Laya.loader.getRes(Name)
            model = model.clone();
            this.Model = model;
            var scale: Laya.Vector3 = this.Model.transform.scale.clone();
            Laya.Vector3.scale(scale, 1.5, scale);
            this.Model.transform.scale = scale;
        }
    }
    GameStruct.ItemDictType[ItemType.Rock] = Rock;

    class Thorn extends StepItem {
        constructor(Step: Step) {
            super(ItemType.Thorn, Step);
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var name: string = path.GetLH("trap_sting_01")
            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone();
            this.Model = model;
        }
        TouchItem(player: Player): void {
            this.m_CharactorAnimator.play("trigger");
            player.Die();
        }
        CheckItem(player: Player): void {
            if (this.BreakProtect(player))
                this.PutItem();
            else {
                this.Step.locked = true;
            }
        }
    }
    GameStruct.ItemDictType[ItemType.Thorn] = Thorn;

    class Protect extends StepItem {
        constructor(step: Step) {
            super(ItemType.Protect, step);
            this.SetIdleWave();
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var name: string = path.GetLH("item_shield_01")
            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;
        }

        TouchItem(player: Player) {
            this.AddBuffToPlayer(player);
        }
    }
    GameStruct.ItemDictType[ItemType.Protect] = Protect;

    class ProtectBuff extends BasePlayerBuff {
        Time: number;
        /**
         * 
         * @param time 持续时间
         * @param IsHoly 是否绝对无敌
         */
        constructor(time: number = 0, IsHoly: boolean = false) {
            super(IsHoly ? ItemType.HolyProtect : ItemType.Protect);
            this.Time = APP.TimeManager.GameTime + time;
        }

        Update() {
            if (this.Time < APP.TimeManager.GameTime) {
                this.RemoveSelf();
            }
        }

        public Start() {

        }

        public Removed() {
        }
    }
    class HolyProtect extends StepItem {
        constructor(step: Step) {
            super(ItemType.HolyProtect, step);
            this.SetIdleWave();
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var name: string = path.GetLH("item_untouchable_01")
            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;
        }

        TouchItem(player: Player) {
            this.AddBuffToPlayer(player);
        }
    }
    GameStruct.ItemDictType[ItemType.HolyProtect] = HolyProtect;

    class Coin extends StepItem {
        private m_touched: Boolean

        constructor(step: Step) {
            super(ItemType.Coin, step);
            /*
            var idelState: Laya.AnimatorState = this.m_CharactorAnimator.GetState("idle");
            var waveState: WaveStateScript = idelState.addScript(WaveStateScript) as WaveStateScript;
            waveState.Init(this.Model);
            */
            this.SetIdleWave();
            var triggerState: Laya.AnimatorState = this.m_CharactorAnimator.GetState("trigger");
            var triggerStateScript: GoldJumpUp = triggerState.addScript(GoldJumpUp) as GoldJumpUp;
            triggerStateScript.Init(this.Model, this);
        }

        FlyToPlayer(player: Player) {
            var conin: AnimCoin = AnimObj.GenAnimObj<AnimCoin>(AnimObj.AnimCoin, this.Model);
            conin.SetTarget(player);
            Controler.GameControler.GameDir.GamePlay.AddGoldUnLogicGold(1);
            this.PutItem();
        }

        TouchItem(player: Player) {
            Controler.GameControler.GameDir.GamePlay.AddGold(1);
            this.m_CharactorAnimator.play("trigger")
            //this.PutItem();
        }

        //由父类统一管理模型生成
        protected _GenItemModel() {
            var name: string = path.GetLH("item_coin_01")
            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone()
            this.Model = model;
        }
    }
    GameStruct.ItemDictType[ItemType.Coin] = Coin;

    class Collecter extends StepItem {
        TouchItem(player: Player) {
            this.AddBuffToPlayer(player);
            this.PutItem();
        }
        constructor(step: Step) {
            super(ItemType.Collector, step);
            this.SetIdleWave();
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name: string = path.GetLH("item_absord_01");
            var theModel = Laya.loader.getRes(name);
            var model: Laya.Sprite3D = theModel.clone();

            this.Model = model;
        }
    }
    GameStruct.ItemDictType[ItemType.Collector] = Collecter;

    class CollectBuff extends BasePlayerBuff {
        Time: number;
        GameDir: GameDirector;
        CountFloor: number;
        static get Slot(): number {
            return 1;
        }
        constructor(time: number = 0) {
            super(ItemType.Collector);
            this.GameDir = Controler.GameControler.GameDir;
            this.Time = APP.TimeManager.GameTime + time;
            this.CountFloor = 0;
        }
        Start() {
            this.CountFloor = this.GameDir.GamePlay.PlayerCurFloor;
        }
        Removed() {
        }
        Update() {
            if (this.Time < APP.TimeManager.GameTime) {
                this.RemoveSelf();
            } else {
                if (this.GameDir.GamePlay.PlayerCurFloor + 1 - this.CountFloor < 0) {

                    return;
                }
                this.GameDir.GamePlay.LoopDoFloorStep(this.CountFloor, this, this.CountCoins);
                ++this.CountFloor;
            }
        }
        private CountCoins(step: Step) {
            if (step.StepItem.ItemType == ItemType.Coin) {
                var Coin: Coin = step.StepItem as Coin;
                Coin.FlyToPlayer(this.player);
            }
        }
    }

    class FLy extends StepItem {
        TouchItem(player: Player) {
            this.AddBuffToPlayer(player);
            this.PutItem();
        }

        constructor(step: Step) {
            super(ItemType.Fly, step);
            this.SetIdleWave();
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name: string = path.GetLH("item_flyer_01");
            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone();
            this.Model = model;
        }
    }
    GameStruct.ItemDictType[ItemType.Fly] = FLy;

    class FlyBuff extends BasePlayerBuff {
        static get Slot(): number {
            return 0;
        }
        Speed: number;
        Floor: number;
        private _FinalLocation: GameStruct.MLocation;
        private _FinalZ: number;
        private m_FloorSwitch: number;

        constructor(speed: number = 0.15, floor: number = 10) {
            super(ItemType.Fly);
            this.Speed = speed;
            this.Floor = floor;
            this._FinalLocation = null;
            this._FinalZ = 0;
        }

        Start() {
            var time: number = APP.TimeManager.GameTime;
            var player: Player = this.player;
            if (player.CurStep == null) {
                this.RemoveSelf();
            }
            var curLocation: GameStruct.MLocation = player.CurStep.Location
            this.m_FloorSwitch = player.CurStep.Floor.rightSwitch;

            this._FinalLocation = new GameStruct.MLocation(curLocation.X, curLocation.Y);
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameModule.DSpace * this.Floor;

            var flyCtrl = new PlayerControler.PlayerFly(this.Speed);
            player.AddCtrler(flyCtrl);
            Controler.GameControler.GameDir.GamePlay.AddInputCtrler(new Input.DIYInput());
            Controler.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
        }

        Removed() {
            var step: Step = Controler.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation, this.m_FloorSwitch);

            this.player.LayStep(step);
            this.player.BaseCtrler.StartMove();
            this.player.PopCtrler();
            Controler.GameControler.GameDir.GamePlay.PopInputCtrler();
        }

        Update() {
            if (this.player == null) {
                return;
            }
            if (this._FinalZ - this.player.Position.z > -0.2) {
                super.RemoveSelf();
            }
        }
    }

    class Rope extends StepItem {
        TouchItem(player: Player) {
            this.AddBuffToPlayer(player, false);
        }
        constructor(step: Step) {
            super(ItemType.Rope, step);
        }

        //由父类统一管理模型生成
        protected _GenItemModel() {
            var model: Laya.MeshSprite3D = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.1, 0.5, 0.1))
            this.Model = model;
        }
    }
    GameStruct.ItemDictType[ItemType.Rope] = Rope;

    class RopeBuff extends BasePlayerBuff {
        Speed: number;
        Floor: number;

        static get Slot(): number {
            return 0;
        }
        Update() {
            if (this.player == null) {
                return;
            }
            if (this._FinalZ - this.player.Position.z > -0.2) {
                this.RemoveSelf();
            }
        }
        Start() {
            var player: Player = this.player;
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameModule.DSpace * this.Floor;

            var flyCtrl = new PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player)
            player.AddCtrler(flyCtrl);
            Controler.GameControler.GameDir.GamePlay.AddInputCtrler(new Input.DIYInput(this, this._Input));
            Controler.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
        }
        Removed() {
            var step: Step = Controler.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
            this.player.LayStep(step);
            this.player.BaseCtrler.StartMove();
            this.player.PopCtrler();
            Controler.GameControler.GameDir.GamePlay.PopInputCtrler();
        }

        private _FinalLocation: GameStruct.MLocation;
        private _FinalZ: number;
        constructor(speed: number = 0.1, floor: number = 10) {
            super(ItemType.Rope);
            this.Speed = speed;
            this.Floor = floor;
            this._FinalLocation = null;
            this._FinalZ = 0;

        }
        private _Input(isRight: boolean): void {
            var closeFloor = Controler.GameControler.GameDir.GamePlay.PlayerFloorLine;
            if (closeFloor.floorNum % 2 != this._FinalLocation.Y % 2) {
                closeFloor = Controler.GameControler.GameDir.GamePlay.GetFloorByFloor(closeFloor.floorNum + 1);
            }
            var step: Step = closeFloor.GetStep(this._FinalLocation.X);
            if (isRight)
                step = step.RightParent;
            else
                step = step.LeftParent;
            if (step.StepItem.IsForbiden) {
                return
            }
            this.RemoveSelf();
        }
    }

    class Vine extends StepItem {
        private m_BeTouched: boolean;
        get Touched(): boolean {
            return this.m_BeTouched;
        }
        set Touched(value: boolean) {
            this.m_BeTouched = value
        }
        TouchItem(player: Player) {
            if (this.Touched)
                return
            this.AddBuffToPlayer(player, false);
            if (this.m_CharactorAnimator)
                this.m_CharactorAnimator.play("trigger");
            this.Touched = true;
        }
        CheckItem(player: Player) {
            this.Step.locked = true;
        }
        constructor(step: Step) {
            super(ItemType.Vine, step);
            this.Touched = false;
        }
        //由父类统一管理模型生成
        protected _GenItemModel() {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name: string = Idx == 1 ? path.GetLH("trap_entangle_01") : path.GetLH("trap_chomper_01")

            var model: Laya.Sprite3D = Laya.loader.getRes(name).clone();
            this.Model = model;
            var scale: Laya.Vector3 = this.Model.transform.scale.clone();
            Laya.Vector3.scale(scale, 1.2, scale);
            this.Model.transform.scale = scale;
        }
        //消除 把自己存入内存池
        DesPawn() {
            this.Touched = false;
            super.DesPawn();
        }
    }
    GameStruct.ItemDictType[ItemType.Vine] = Vine;

    class VineBuff extends BasePlayerBuff {
        CountTime: number;
        InputDir: boolean;
        Start() {
            Controler.GameControler.GameDir.GamePlay.AddInputCtrler(new Input.DIYInput(this, this._Input));
        }

        Removed() {
            Controler.GameControler.GameDir.GamePlay.PopInputCtrler();
            this.player.CurStep.locked = false;
        }

        constructor(countTime: number = 4, inputDir: boolean = true) {
            super(ItemType.Vine);
            this.CountTime = countTime;
            this.InputDir = inputDir;
            this._ShowGameInfo();
        }
        private _Time;
        private _Input(inputDir: boolean) {
            if (this.InputDir == inputDir) {
                this.InputDir = !this.InputDir;
                --this.CountTime;
            }
            this._ShowGameInfo();
            if (this.CountTime <= 0) {
                this.RemoveSelf();
            }
        }
        private _ShowGameInfo() {
            var info: string;
            if (this.CountTime <= 0)
                info = "";
            else
                info = this.InputDir == true ? "Right" : "Left";
            Controler.GameControler.GameDir.GamePlay.ShowInputInfo(info);
        }
    }

    class GoldJumpUp extends Laya.AnimatorStateScript {
        private m_Model: Laya.Sprite3D;
        private m_FlyUpTime;
        private m_CountPS: BaseFunc.SmoothDamp;
        private m_YSwitch: number;
        private m_OriginalY: number;
        private m_StepItem: StepItem;
        constructor() {
            super();
        }
        Init(model: Laya.Sprite3D, stepItem: StepItem) {
            this.m_Model = model;
            this.m_StepItem = stepItem;
        }

        private SetYPosition() {
            var localPosition: Laya.Vector3 = this.m_Model.transform.localPosition;
            localPosition.y = this.m_OriginalY + this.m_YSwitch;
            this.m_Model.transform.localPosition = localPosition;
        }

        onStateEnter() {
            this.m_YSwitch = 0.5;
            this.m_OriginalY = this.m_Model.transform.localPosition.y;
            this.SetYPosition();
        }
        onStateExit() {
            this.m_StepItem.PutItem();
            this.m_YSwitch = 0;
            this.SetYPosition();
        }
        onStateUpdate() {

        }

    }

    class WaveStateScript extends Laya.AnimatorStateScript {
        private m_Model: Laya.Sprite3D;
        private m_OriginalY: number;
        private m_RoundTime: number;
        private m_Distance: number;
        private m_CountTime: number;

        private m_MoveDistanceCount: number;

        get CountRound(): number {
            return (APP.TimeManager.GameTime - this.m_CountTime) / this.m_RoundTime;
        }
        get TimeRoundRate(): number {
            var timeScale = (APP.TimeManager.GameTime - this.m_CountTime) % this.m_RoundTime;
            timeScale = (timeScale / this.m_RoundTime) * Math.PI;
            return timeScale;
        }
        constructor() {
            super();
            this.m_RoundTime = 3;
            this.m_Distance = 0.5
        }

        Init(model: Laya.Sprite3D) {
            this.m_Model = model;
            this.m_OriginalY = this.m_Model.transform.position.y;
            this.m_MoveDistanceCount = 0;
        }

        private SetYPosition() {
            var localPosition: Laya.Vector3 = this.m_Model.transform.localPosition;
            localPosition.y = this.m_OriginalY + this.m_MoveDistanceCount;
            this.m_Model.transform.localPosition = localPosition;
        }

        onStateEnter() {
            this.m_CountTime = APP.TimeManager.GameTime;
        }

        onStateExit() {
        }

        onStateUpdate() {
            this.m_MoveDistanceCount = Math.sin(this.TimeRoundRate) * this.m_Distance;
            this.SetYPosition();
        }
    }

    class WinFlag extends StepItem {

        constructor(Step: Step) {
            super(ItemType.WinFlag, Step);
        }
        TouchItem(player: Player): void {
            APP.MessageManager.Fire(MessageMD.GameEvent.WinGame);
        }
        CheckItem(player: Player) {
            this.Step.locked = true;
        }
    }
    GameStruct.ItemDictType[ItemType.WinFlag] = WinFlag;
}

