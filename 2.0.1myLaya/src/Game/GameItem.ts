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
        RewardList: Array<LayItemMgr>;
        BarrierList: Array<LayItemMgr>;
        constructor() {
            this.RewardList = new Array<LayItemMgr>();
            this.BarrierList = new Array<LayItemMgr>();

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

        TakeLineReward(floor: number) {
            return this.TakeItem(floor, this.RewardList);
        }

        TakeLineDifficulty(floor: number) {
            return this.TakeItem(floor, this.BarrierList);
        }

        TakeItem(floor: number, MgrList: Array<LayItemMgr>): Array<LineItemInfo> {
            var returnInfo = new Array<LineItemInfo>();
            for (var listIdx = 0; listIdx < MgrList.length; ++listIdx) {
                MgrList[listIdx].OnFloor(floor);
                var info: LineItemInfo = MgrList[listIdx].TakeItems(floor);
                if (info.Number > 0) {
                    returnInfo.push(info);
                }
            }
            return returnInfo;
        }
    }

    //该对象的分布图每层等概率分布
    export class LayItemMgr {
        //道具类型
        ItemType: ItemType;
        //当前层数
        CurFloor: number;
        //区间分布总数量
        ItemNum: number;
        //开始分布的层数
        StartFloor: number;
        //分布区间
        //已获取层标记
        TouchedFloor: number;
        ItemList: Array<number>;
        /**
         * 
         * @param range 区间范围
         * @param num 区间范围数量
         * @param itemType 生产的道具类型
         * @param startFloor 从哪一行开始投掷
         */
        constructor(range: number, num: number, itemType: ItemType, startFloor: number = 1) {
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
            this.ItemList = new Array<number>(range);
            this.TouchedFloor = 0;
            this.GenMap(startFloor)
        }
        get Range(): number {
            return this.ItemList.length;
        }
        //层更新函数
        OnFloor(floor: number) {
            if (floor < this.TouchedFloor) {
                this.GenMap(floor);
            }
            if (floor >= this.StartFloor + this.Range) {
                this.GenMap(floor);
            }
        }
        //生成分布图
        GenMap(startFloor: number) {
            this.StartFloor = startFloor;
            var itemNum = this.ItemNum;
            for (let count: number = 0; count < this.ItemList.length; ++count) {
                this.ItemList[count] = 0;
            }
            var itemList = this.ItemList;
            for (var countNum: number = 0; countNum < itemNum; ++countNum) {
                var ItemFloor: number = Math.floor(Math.random() * this.Range);
                this.ItemList[ItemFloor] += 1;
            }
        }

        TakeItems(floor: number) {
            this.TouchedFloor = floor;
            return new LineItemInfo(this.ItemType, this.ItemList[floor - this.StartFloor]);
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
            this.CountFloor = this.GameDir.GamePlay.PlayerFloor - 2;
        }
        Removed() {

        }
        Update() {
            if (this.Time < APP.TimeManager.GameTime) {
                this.RemoveSelf();
            } else {
                if (this.GameDir.GamePlay.PlayerFloor - this.CountFloor + 1 < 0) {
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
            if (closeFloor.FloorNum % 2 != this._FinalLocation.Y % 2) {
                closeFloor = Controler.GameControler.GameDir.GamePlay.GetFloorByFloor(closeFloor.FloorNum + 1);
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
            else
                console.log(this.Model.name);
            this.Touched = true;
        }
        CheckItem(player: Player) {

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

