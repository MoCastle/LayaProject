import { Scene } from "./../../Scene/Scene"
import SceneManager from "./../../FrameWork/SceneManager"
import BaseScene from "./../BaseScene"
import BaseDirector from "./../BaseDirector"
import FW from "./../../FrameWork/FrameWork"
import UIManager from "./../../FrameWork/UIManager"
import EndGameUI from "./../../ui/EndGameUI"
import { MessageMD } from "./../../FrameWork/MessageCenter"
import GameCamera from "./../../Game/GameCamera"
import Player from "./../../Game/Player"
import { Input } from "./../../Game/Input"
import { GameStruct } from "./../../Game/GameStruct"
import GameUI from "./../../ui/GameUI"
import MountLine from "./../../Game/MountLine"
import { Item } from "./../../Game/GameItem"
import Step from "./../../Game/Step"
import APP from "./../../controler/APP"
import Controler from "./../../controler/GameControler"
import BGUI from "./../../ui/BG"
import GameDirector from "./../GameDirector"
import GameScene from "../GameScene";
import { GameAgent } from "./../../Agent/GameAgent"
import GameAPP from "../../controler/GameAPP";
import { WechatOpen } from "../../platform/WechatOpen";
import PlayerGuestAgent from "../../Agent/PlayerGuestAgent";

type ItemLayout = Item.ItemLayout;
type LineItemInfo = Item.LineItemInfo;
var ItemType = Item.ItemType;

//游戏导演
export default class GameScenePlay extends Scene.BaseScenePlaye {
    //内部功能
    private _HeadFloorIdx: number;
    private _TailFLoorIdx: number;
    private _CountTime: number;
    private _BootomFloor: number;
    private _StartPosition: Laya.Vector3;
    private _GameUpdate: () => void;
    private _PanelUI: GameUI;
    private _GoldNum: number;
    private _LogicGoldNum: number;
    private _CurBG: BGUI;
    private _SafeLocation: GameStruct.MLocation;

    Camera: GameCamera;
    GameScene: BaseScene;
    MountLines: MountLine[];
    Player: Player;
    InputCtrl: Input.BaseGameInput;
    ItemLayout: ItemLayout;
    CurLineRewards: Array<LineItemInfo>;
    CurLineBarriers: Array<LineItemInfo>;
    name: number;
    FreshBGCount: number;

    get SafeLocation(): GameStruct.MLocation {
        return this._SafeLocation;
    }
    get PanelUI(): GameUI {
        return this._PanelUI;
    }
    set PanelUI(value: GameUI) {
        value.SetLeftTouch(this, () => { this.InputCtrl.Input(false); })
        value.SetRightTouch(this, () => { this.InputCtrl.Input(true); });
        this._PanelUI = value;
    }
    get HeadFloor(): MountLine {
        return this.MountLines[this._HeadFloorIdx];
    }
    get TailFLoor(): MountLine {
        return this.MountLines[this._TailFLoorIdx];
    }
    get PlayerFloor(): number {
        var floor: number = this._StartPosition.z - this.Player.LogicPosition.z;
        floor = Math.round(floor / (Controler.GameControler.StepDistance / 2));
        return Math.abs(floor);
    }
    public get Distance(): number {
        return Math.floor(this.PlayerFloor)
    }

    get PlayerFloorLine(): MountLine {
        return this.GetFloorByFloor(this.PlayerFloor);
    }
    get GameTime(): number {
        return (this.m_owner as GameDirector).GameTime;
    }

    constructor() {
        super();
        this.Camera = null;
        this.GameScene = null;
        this.MountLines = null;
        this.Player = null;
        this.InputCtrl = null;
        this.ItemLayout = null;
        this.CurLineRewards = null;
        this.CurLineBarriers = null;

        this._HeadFloorIdx = 0;
        this._TailFLoorIdx = 0;
        this._CountTime = 0;
        this._BootomFloor = 0;
        this._StartPosition = new Laya.Vector3();
        this._PanelUI = null;
        this._CurBG = APP.SceneManager.BG as BGUI;
        this.FreshBGCount = 0;
    }

    AddInputCtrler(value: Input.BaseGameInput) {
        this.InputCtrl.Clear();
        value.NextInput = this.InputCtrl;
        this.InputCtrl = value;
    }
    PopInputCtrler() {
        this.InputCtrl = this.InputCtrl.NextInput;
    }
    AddGold(num: number) {
        this._GoldNum += num;
        this.AddLogicGold(num);
    }
    AddGoldUnLogicGold(num: number) {
        this._GoldNum += num;
    }
    AddLogicGold(num: number) {
        this._LogicGoldNum += num;
        this.PanelUI.Gold = this._LogicGoldNum;
        WechatOpen.getInstances().drawpass(this._LogicGoldNum + GameAgent.Agent.CurScore);
    }

    //设置安全位置
    SetSafePS(location: GameStruct.MLocation) {
        this._SafeLocation = location;
        if (location.Y < this.TailFLoor.FloorNum || location.Y > this.HeadFloor.FloorNum) {
            return;
        }
        this.ResetItem(location.Y)
    }

    //从某一层开始一层层重新摆放道具
    ResetItem(floor: number) {
        this.CurLineBarriers = new Array<LineItemInfo>();
        this.CurLineRewards = new Array<LineItemInfo>();
        for (let loopFloor: number = floor; loopFloor <= this.HeadFloor.FloorNum; ++loopFloor) {
            var floorLine = this.GetFloorByFloor(loopFloor);
            floorLine.LayOutDirty = false;
            floorLine.SetLine(floorLine.FloorNum);
            this._PutItemInLine(loopFloor);
        }
    }

    //清理层道具
    ClearFloor(step: Step): void {
        var stepItem = step.StepItem;
        step.PutItem(ItemType.None);
        step.IsDeadRoad = false;
    }

    Death(): void {
        this.Player.PlayerDeath = true;
        this.OnGameComplete();
        //ui.SetGameInfo(this.PlayerDistance,this._GoldNum);
    }

    End(): void {

    }
    //重新开始
    ReStart(): void {
        this.StartGame();
    }
    ShowInputInfo(info: string): void {
        this.PanelUI.ShowInputInfo(info);
    }
    //左右移动
    MoveStep(isRight: boolean) {
        //var buff = this.Buffer;
        //获取下一层的Step
        var step: Step = this.Player.CurStep;
        if (step == null) {
            return;
        }
        if (isRight) {
            step = step.RightParent;
        } else {
            step = step.LeftParent;
        }

        if (step == null || step.StepItem.IsForbiden) {
            return;
        }

        this.Player.LayStep(step);
        this.Player.StartMove();
    }

    /**
     * 根据层数获取某层
     * @param {number} floor 
     */
    GetFloorByFloor(floor: number) {
        var tailFloor: MountLine = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.FloorNum + this._TailFLoorIdx) % this.MountLines.length;
        return this.MountLines[floorID];
    }

    LoopDoFloorStep(floor: number, Owner: any, callBack: (step: Step) => void): void {
        if (floor < this.TailFLoor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return;
        }
        var floorLine: MountLine = this.GetFloorByFloor(floor);
        for (let idx = 0; idx < floorLine.LogicLength; ++idx) {
            var step = floorLine.GetStep(idx);
            callBack.call(Owner, step);
        }
    }

    /**
     * 通过坐标获取台阶
     * @param location 索引,层数
     */
    GetStepByLocation(location: GameStruct.MLocation): Step {
        var getStep: Step = this.GetFloorByFloor(location.Y).GetStep(location.X);
        return getStep;
    }

    //创建相关放这 这里重新开始不会走
    public Start(): void {
        this.Camera = new GameCamera();
        this.Camera.transform.localRotationEuler = new Laya.Vector3(-30, 0, 0);
        APP.SceneManager.CurScene.PutObj(this.Camera);

        this.MountLines = [];
        var maxLineNum = Controler.GameControler.MaxLineNum;
        for (var lineIdx: number = maxLineNum - 1; lineIdx >= 0; --lineIdx) {
            var newMountLine = new MountLine(lineIdx, lineIdx);
            APP.SceneManager.CurScene.PutObj(newMountLine);
            this.MountLines[lineIdx] = newMountLine;
        }
        //创建UI

        //创建玩家
        var player = new Player();
        this.Player = player;
        var gameAgent = GameAgent.Agent;
        var playerModel = GameAPP.CharacterMgr.GetCharacterModel(gameAgent.CurCharacterID);
        player.SetPlayerModel(playerModel);
        APP.SceneManager.CurScene.PutObj(this.Player);

        //准备玩家死亡事件
        APP.MessageManager.Regist(MessageMD.GameEvent.PlayerDeath, this.Death, this);
        this.StartGame();
    }

    //进入游戏的设置放这里 重新开始走这里
    protected StartGame() {

        APP.SceneManager.CurScene.SceneObj.ambientColor = new Laya.Vector3(1, 1, 1)
        this._SafeLocation = new GameStruct.MLocation(0, 0);
        //重置物品
        this.ItemLayout = new Item.ItemLayout()
        this.CurLineRewards = new Array<LineItemInfo>();
        this.CurLineBarriers = new Array<LineItemInfo>();
        var lines: MountLine[] = this.MountLines;
        //创建输入控制器
        this.InputCtrl = new Input.NormGameInput(this);
        this._HeadFloorIdx = lines.length - 1;
        this._TailFLoorIdx = 0;
        this.Player.Reset();
        for (var idx: number = 0; idx < lines.length; ++idx) {
            var line: MountLine = this.MountLines[idx];
            line.SetLine(idx);
            if (idx > 0)
                lines[idx - 1].SetNextFloor(line);
            else {
                var PlayerStep = line.GetStep(Math.floor(line.LogicLength / 2));
                this.Player.SetStep(PlayerStep);
                this._SafeLocation = PlayerStep.Location;
                this._StartPosition = this.Player.LogicPosition.clone();
            }
            this._PutItemInLine(idx);
        }
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(this.Player.Position.x, Controler.GameControler.StepLength * 10.5, Controler.GameControler.StepLength * 9), this.Player);
        this._GoldNum = 0;
        this._LogicGoldNum = 0;

        this.PanelUI = APP.UIManager.Show(GameUI);
        this.PanelUI.RegistClickPlayerItem(this, this.UsePlayerItem);
        this.PanelUI.RegistClickSkillItem(this, this.UseSkillItem);
        this.PanelUI.Gold = 0;
        this._CountTime = this.GameTime + 4;
        this._BootomFloor = 0;
        this._GameUpdate = this._StartCount;
        WechatOpen.getInstances().drawpass(0);
    }

    public Update(): void {
        if (this._GameUpdate != null) {
            this._GameUpdate();
        }
    }

    //正常运行时的每帧逻辑
    private _RunGameUpdate() {
        var dist: number = this.PlayerFloor;
        this.PanelUI.Distance = this.Distance; //this.Distance();//Math.floor(dist);
        if (this.FreshBGCount > 10) {
            this._CurBG.UpdatePage(dist);
            this.FreshBGCount = 0;
        }
        ++this.FreshBGCount;

        var flooVector: Laya.Vector3 = this.TailFLoor.Position;

        if (flooVector.z - this.Player.Position.z > 3 * Controler.GameControler.StepDistance / 2) {
            this._PushFLoor();
        }
        if (this._CountTime < APP.TimeManager.GameTime) {
            this._CountTime = APP.TimeManager.GameTime + 3;
            this._DestroyLine(this._BootomFloor);
            this._BootomFloor += 1;
        }
        this.InputCtrl.Update();
    }

    //开始倒计时期间的每帧逻辑
    private _StartCount() {
        var time: string = ""
        var countTime: number = this._CountTime - APP.TimeManager.GameTime;
        if (countTime > 0.9)
            time += Math.floor(countTime);
        else {
            this.PanelUI.GamePanel = true;
            this._GameUpdate = this._RunGameUpdate;
            this._CountTime = this.GameTime + 3;
            GameAgent.Agent.ResetGameItem();
            GameAgent.Agent.ResetSkillItem();
        }
        this.PanelUI.SetCountTime(time);
    }

    //将层向上叠
    protected _PushFLoor() {
        var preHead: MountLine = this.HeadFloor;
        this._HeadFloorIdx = (this._HeadFloorIdx + 1) % this.MountLines.length;
        this._TailFLoorIdx = (this._TailFLoorIdx + 1) % this.MountLines.length;
        var Headfloor: number = preHead.FloorNum + 1;
        this.HeadFloor.SetLine(Headfloor);
        preHead.SetNextFloor(this.HeadFloor);
        this._PutItemInLine(Headfloor);

        return true;
    }

    /**
     * 摆放物品
     * @param {number} floor 物品列表
     */
    protected _PutItemInLine(floor: number) {
        var safeCol: { [key: string]: Array<number>; } = {};
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
        {
            //摆放前先计算该层通路情况 
            safeCol = {}
            safeCol["o"] = this._CountRoadInfo(floor);
        }
        //出生点不放道具
        if (floor < 1 || floor == this.SafeLocation.Y) {
            return;
        }
        //获取该行要摆放的物品
        this._TakeItemList(floor)

        //标记一条绝对安全的路
        var safeIdxColl: { [key: string]: number; } = {};
        for (var colKey in safeCol) {
            var list = safeCol[colKey];
            var safeIdx = list[Math.floor(Math.random() * list.length)];
            if (safeIdxColl[safeIdx] == undefined) {
                safeIdxColl[safeIdx] = 1;
            }
        }
        //把需要放道具的格子放入随机池
        var curFloor: MountLine = this.GetFloorByFloor(floor);
        var randomPool: Array<Step> = new Array();
        //把安全的格子暂时移出来
        var safeStepList: Array<Step> = new Array<Step>();
        for (var stepIdx: number = 0; stepIdx < curFloor.LogicLength; ++stepIdx) {
            var getStep: Step = curFloor.GetStep(stepIdx);
            if (safeIdxColl[stepIdx] == undefined) {
                randomPool.push(getStep);
            } else {
                safeStepList.push(getStep);
            }
        }
        //放陷阱
        var barriersList: Array<LineItemInfo> = this.CurLineBarriers;
        this._OrginizePutItem(barriersList, randomPool, true);

        //摆放道具
        for (var safeStepIdx: number = 0; safeStepIdx < safeStepList.length; ++safeStepIdx) {
            randomPool.push(safeStepList[safeStepIdx]);
        }
        var rewardList = this.CurLineRewards;
        this._OrginizePutItem(rewardList, randomPool);
        //再次计算通路情况 
        //this._CountLastFloorRoad(floor);
    }

    /**
     * 摆放物品
     * @param {Array<LineItemInfo>} itemList 物品列表
     * @param {Array<Step>} randomPool 台阶集合
     * @param {boolean} isDeadRoad 是否是死路
     */
    _OrginizePutItem(itemList: Array<LineItemInfo>, randomPool: Array<Step>, isDeadRoad: boolean = null): void {
        for (var itemIdx: number = 0; itemIdx < itemList.length; ++itemIdx) {
            var info: LineItemInfo = itemList[itemIdx];
            for (var difficultyNum: number = 0; difficultyNum < info.Number;) {
                if (randomPool.length < 1) {
                    break;
                }
                //随机把障碍放入格子里
                var randomIdx: number = Math.floor(Math.random() * randomPool.length);
                var step: Step = randomPool[randomIdx];
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
    }

    /**
     *递归计算通路情况
     * @param {number} floorNum 物品列表
     */
    _CountOpenList(floorNum: number): { [key: string]: Array<number>; } {
        for (var floorCount: number = this.PlayerFloor; floorCount <= floorNum; ++floorCount) {
            var floor: MountLine = this.GetFloorByFloor(floorCount);
            if (floor == null)
                return;
            for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
                var step = floor.GetStep(stepIdx);
                step.Mark = undefined;
            }
        }
        var floor: MountLine = this.GetFloorByFloor(this.PlayerFloor);
        for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
            var step = floor.GetStep(stepIdx);
            if (!step.IsDeadRoad) {
                this._MarkSteps(step, stepIdx, floorNum);
            }
        }
        var targetFloor: MountLine = this.GetFloorByFloor(floorNum);
        //找出被标记的点并整理成集合
        var collection: { [key: string]: Array<number>; } = {}
        var name: string = "o"
        for (var openIdx: number = 0; openIdx < targetFloor.LogicLength; ++openIdx) {
            var markedStep: Step = targetFloor.GetStep(openIdx);
            if (markedStep.Mark != undefined) {
                var Name: string = name + markedStep.Mark;
                if (collection[Name] == undefined) {
                    collection[Name] = new Array();
                }

                collection[Name].push(openIdx);
            }
        }
        return collection;
    }
    /**
     *递归标记通路情况
     * @param {Step} step 台阶
     * @param {any} mark 标记
     * @param {number} targetFloorNum 目标层数
     */
    _MarkSteps(step: Step, mark: any, targetFloorNum: number): boolean {
        if (step.IsDeadRoad)
            return false;
        if (step.Floor.FloorNum >= targetFloorNum) {
            if (step.Mark == undefined) {
                step.Mark = mark
            }
            return true;
        }
        var leftOpen: boolean;
        var rightOpen: boolean;
        var leftParent: Step = step.LeftParent;
        if (leftParent != null && !leftParent.IsDeadRoad) {
            if (leftParent.Mark == undefined)
                leftOpen = this._MarkSteps(leftParent, mark, targetFloorNum);
            else
                leftOpen = true;
        }
        var rightParent: Step = step.RightParent;
        if (rightParent != null && !rightParent.IsDeadRoad) {
            if (rightParent.Mark == undefined)
                rightOpen = this._MarkSteps(rightParent, mark, targetFloorNum);
            else
                rightOpen = true;
        }
        if (step.Mark == undefined) {
            step.Mark = mark
        }
        if (!leftOpen && !rightOpen) {
            step.IsDeadRoad = true;
            return false;
        } else {
            return true;
        }
    }

    /**
     * 最后再计算一次该层通路情况
     * @param {number} floorNum 
     */
    _CountLastFloorRoad(floorNum: number): void {
        if (floorNum < this.TailFLoor.FloorNum) {
            return;
        }
        var floor = this.GetFloorByFloor(floorNum);
        var lastFloor = this.GetFloorByFloor(floorNum - 1);
        for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
            var step: Step = floor.GetStep(stepIdx);
            if (!step.IsDeadRoad) {
                var LeftStep = step.LeftChild;
                var RightStep = step.RightChild;
                if (LeftStep != null) {
                    if (!LeftStep.IsDeadRoad) {
                        ++LeftStep.RoadNum;
                    }
                }
                if (RightStep != null) {
                    if (!RightStep.IsDeadRoad) {
                        ++RightStep.RoadNum;
                    }
                }
            }
        }
        for (var lastStepIdx = 0; lastStepIdx < lastFloor.LogicLength; ++lastStepIdx) {
            var step = lastFloor.GetStep(stepIdx);
            if (!step.IsDeadRoad && step.RoadNum < 1) {
                step.IsDeadRoad = true
                //向上递归把所有与之相连的节点数给修正了
            }
        }
    }

    /**
     * 放道具前算通路情况
     * @param {number} floor 
     */
    _CountRoadInfo(floor: number): Array<number> {
        var safeStepList: Array<number> = [];
        var thisFloor: MountLine = this.GetFloorByFloor(floor);

        var roadNum: number = 0;
        var lastFloor: MountLine = this.GetFloorByFloor(floor - 1);
        if (floor == this._SafeLocation.Y)
            this._ResetStepInfo(thisFloor);
        else {
            for (var logicIdx: number = 0; logicIdx < thisFloor.LogicLength; ++logicIdx) {
                var step: Step = thisFloor.GetStep(logicIdx);
                var leftChild: Step = step.LeftChild;
                var rightChild: Step = step.RightChild;
                if (leftChild != null && !leftChild.IsDeadRoad) {
                    safeStepList.push(logicIdx);
                } else if (rightChild != null && !rightChild.IsDeadRoad) {
                    safeStepList.push(logicIdx);
                }
                else {
                    step.IsDeadRoad = true;
                }

            }
        }

        if (floor == this._SafeLocation.Y) {
            var safeStep = thisFloor.GetStep(this._SafeLocation.X);
            safeStep.IsDeadRoad = false;
            safeStepList.push(this._SafeLocation.X);
        }

        return safeStepList;
    }

    _ResetStepInfo(thisFloor: MountLine) {
        if (!thisFloor) {
            return;
        }
        for (var logicIdx: number = 0; logicIdx < thisFloor.LogicLength; ++logicIdx) {
            var step: Step = thisFloor.GetStep(logicIdx);
            step.IsDeadRoad = true;
        }
    }

    /**
     * 获取某道具信息
     * @param {number}floor 
     */
    _TakeItemList(floor: number) {
        var line = this.GetFloorByFloor(floor);
        var itemList = new Array(line.LogicLength);
        var lineRewards = this.ItemLayout.TakeLineReward(floor);
        this.CurLineRewards = this.CurLineRewards.concat(lineRewards);
        if (this.SafeLocation.Y > floor || floor > this.SafeLocation.Y + 1) {
            var lineBarriers = this.ItemLayout.TakeLineDifficulty(floor);
            this.CurLineBarriers = this.CurLineBarriers.concat(lineBarriers);

        }
        else {
            if (this.CurLineBarriers.length > 0)
                this.CurLineBarriers = new Array<LineItemInfo>();
        }
    }
    /**
     * 塌陷某一层
     * @param {number}floor 
     */
    _DestroyLine(floor: number) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return;
        }
        for (var countFloor: number = tailFloor.FloorNum; countFloor <= floor; ++countFloor) {
            var targetFloor: MountLine = this.GetFloorByFloor(countFloor);
            targetFloor.Break();
        }
        this.Player.TouchGround();
    }

    public UseSkillItem()  {
        GameAgent.Agent.UseSkillItem();
        if (GameAgent.Agent.SkillItemNum < 1)
            return;
        var characterID:number = GameAgent.Agent.CurCharacterID;
        var ItemID:number = GameAPP.CharacterMgr.GetItemID(characterID);
        var ItemType:number = GameAPP.ItemMgr.GetItemType(ItemID);
        var newBuff:Item.BasePlayerBuff = Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);
    }

    public UsePlayerItem()  {
        if (GameAgent.Agent.CurItemNum < 1)
            return;
        GameAgent.Agent.UseGameItem();
        var ItemID:number = GameAgent.Agent.CurItem;
        var ItemType:number = GameAPP.ItemMgr.GetItemType(ItemID);
        var newBuff:Item.BasePlayerBuff = Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);
    }

    private OnGameComplete() {
        APP.MessageManager.DesRegist(MessageMD.GameEvent.PlayerDeath, this.Death, this);
        var ui: EndGameUI = APP.UIManager.Show<EndGameUI>(EndGameUI);
        GameAgent.Agent.AddGold(this._GoldNum);
        GameAgent.Agent.AddScore(this._GoldNum * 10 + this.Distance * 10);
    }

    private OnTimePause()
    {
        this.Player.Pause();
    }
    private OnCountinue()
    {
        this.Player.Continue();
    }
}