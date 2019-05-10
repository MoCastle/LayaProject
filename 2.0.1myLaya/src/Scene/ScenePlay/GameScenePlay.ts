import { Scene } from "./../../Scene/Scene"
import SceneManager from "./../../FrameWork/SceneManager"
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
import Gamemap from "../../Game/GameMap";
import { GameModule } from "../../Game/GameModule";
import { ModelFunc } from "../../Utility/ModelFunc";

type LineItemInfo = Item.LineItemInfo;
var ItemType = Item.ItemType;
var FallTime: number = 2;
var lineNum: number = 9;
var column: number = 5;

//游戏导演
export default class GameScenePlay extends Scene.BaseScenePlaye {
    //内部功能
    private _CountFloorTime: number;
    private _StartPosition: Laya.Vector3;
    private _GameUpdate: () => void;
    private _PanelUI: GameUI;
    private m_GoldNum: number;
    private _LogicGoldNum: number;
    private _CurBG: BGUI;
    private _SafeLocation: GameStruct.MLocation;
    private m_GameMap: Gamemap;
    private m_BootomFloor: number;
    private m_StartFloor: number;

    Camera: GameCamera;
    Player: Player;
    InputCtrl: Input.BaseGameInput;
    CurLineBarriers: Array<LineItemInfo>;
    name: number;
    FreshBGCount: number;
    get gameMap(): Gamemap {
        return this.m_GameMap;
    }
    get ColumsNum(): number {
        return column;
    }
    get SafeLocation(): GameStruct.MLocation {
        return this._SafeLocation;
    }
    get PanelUI(): GameUI {
        return this._PanelUI;
    }
    set PanelUI(value: GameUI) {
        value.SetLeftTouch(this, () => { ModelFunc.vibrate(25); this.InputCtrl.Input(false); })
        value.SetRightTouch(this, () => { ModelFunc.vibrate(25); this.InputCtrl.Input(true); });
        this._PanelUI = value;
    }
    get PlayerFloor(): number {
        var floor: number = this._StartPosition.z - this.Player.LogicPosition.z;
        floor = floor / GameModule.DSpace;
        floor = Math.round(floor);
        return Math.abs(floor);
    }
    get Distance(): number {
        return Math.floor(this.PlayerFloor)
    }
    get PlayerFloorLine(): MountLine {
        return this.GetFloorByFloor(this.PlayerFloor);
    }
    get GameTime(): number {
        return (this.m_owner as GameDirector).GameTime;
    }
    get GameGold(): number {
        return this.m_GoldNum;
    }
    get CountFloorTime(): number {
        this.m_BootomFloor = this.m_BootomFloor < this.m_GameMap.TailFLoor.FloorNum ? this.m_GameMap.TailFLoor.FloorNum : this.m_BootomFloor;
        var between: number = this.Distance + this.m_StartFloor - this.m_BootomFloor;
        var rangeNum: number = 2;
        between = between > rangeNum ? rangeNum : between;
        return this._CountFloorTime - between / rangeNum * FallTime;
    }

    constructor() {
        super();
        this.Camera = null;
        this.Player = null;
        this.InputCtrl = null;
        this.CurLineBarriers = null;
        this._CountFloorTime = 0;
        this._StartPosition = new Laya.Vector3();
        this._PanelUI = null;
        this._CurBG = APP.SceneManager.BG as BGUI;
        this.FreshBGCount = 0;
        this.m_GameMap = new Gamemap(lineNum, column);
        this.m_StartFloor = 2;
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
        this.m_GoldNum += num;
        this.AddLogicGold(num);
    }

    AddGoldUnLogicGold(num: number) {
        this.m_GoldNum += num;
    }

    AddLogicGold(num: number) {
        this._LogicGoldNum += num;
        this.PanelUI.Gold = this._LogicGoldNum;
        WechatOpen.getInstances().drawpass(this._LogicGoldNum + GameAgent.Agent.CurScore);
    }

    //设置安全位置
    SetSafePS(location: GameStruct.MLocation) {
        this.m_GameMap.SetSafePS(location);
    }

    Death(): void {
        this.Player.PlayerDeath = true;

        Controler.GameControler.PlayerDeath = true;
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
        if (this.Player.CurStep.locked || this.Player.Locked)
            return;
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
        if (this.Player.BaseCtrler.Time > 0)
            this.Player.CurStep.StandOnGround();
        this.Player.LayStep(step);
        this.Player.StartMove();
        var nextFloorDir = isRight ? 1 : -1;
        this.m_GameMap.PushFLoor(nextFloorDir);
    }

    /**
     * 根据层数获取某层
     * @param {number} floor 
     */
    GetFloorByFloor(floor: number) {
        return this.m_GameMap.GetFloorByFloor(floor);
    }

    /**
     * 通过坐标获取台阶
     * @param location 索引,层数
     */
    GetStepByLocation(location: GameStruct.MLocation, rightSwitchNum: number = 0): Step {
        if (rightSwitchNum * rightSwitchNum > 0.001) {
            var floor: MountLine = this.GetFloorByFloor(location.Y);
            var distance: number = Math.ceil(floor.rightSwitch / 2) - Math.ceil(rightSwitchNum / 2);
            var floorIdx: number = location.X - distance;// - (1 + floor.OddSwitch);
            var getStep: Step = floor.GetStep(floorIdx);
        }
        else
            var getStep: Step = this.GetFloorByFloor(location.Y).GetStep(location.X);

        return getStep;
    }

    //创建相关放这 这里重新开始不会走
    public Start(): void {
        this.Camera = new GameCamera();
        this.Camera.orthographic = true;
        this.Camera.orthographicVerticalSize = 40;
        this.Camera.transform.localRotationEuler = new Laya.Vector3(-30, 0, 0);
        APP.SceneManager.CurScene.PutObj(this.Camera);
        //创建UI
        //创建玩家
        var player = new Player();
        this.Player = player;
        var gameAgent = GameAgent.Agent;
        var playerModel = GameAPP.CharacterMgr.GetCharacterModel(gameAgent.CurCharacterID);
        player.SetPlayerModel(playerModel);
        APP.SceneManager.CurScene.PutObj(this.Player);

        APP.SceneManager.CurScene.PutObj(this.m_GameMap);
        //准备玩家死亡事件
        APP.MessageManager.Regist(MessageMD.GameEvent.PlayerDeath, this.Death, this);
        APP.MessageManager.Regist(MessageMD.GameEvent.WinGame,this.OnWinGame,this);

        this.StartGame();
    }

    //进入游戏的设置放这里 重新开始走这里
    protected StartGame() {
        Controler.GameControler.PlayerDeath = false;
        APP.UIManager.Clear();
        APP.SceneManager.CurScene.SceneObj.ambientColor = new Laya.Vector3(1, 1, 1)
        GameAgent.Agent.ResetGameItem();
        GameAgent.Agent.ResetSkillItem();
        this._SafeLocation = new GameStruct.MLocation(0, 0);
        //创建输入控制器
        this.InputCtrl = new Input.NormGameInput(this);
        this.Player.Reset();
        var startFloor: number = this.m_StartFloor;
        var cameraBasePS: Laya.Vector3 = this.m_GameMap.Init(startFloor, this.Camera, 30);
        this.Player.SetStep(this.m_GameMap.GetSafeStep());
        this.m_GameMap.SetPlayer(this.Player);
        var cameraPs: Laya.Vector3 = this.Player.Position.clone();
        cameraPs.y -= GameModule.VSpace * 2;
        this.Camera.transform.position = cameraPs;
        this.Camera.Init();
        this._StartPosition = this.Player.Position;
        this.Camera.Reset(new Laya.Vector3(), cameraBasePS, this.Player);

        this.m_GoldNum = 0;
        this._LogicGoldNum = 0;

        this.PanelUI = APP.UIManager.Show(GameUI);
        this.PanelUI.RegistClickPlayerItem(this, this.UsePlayerItem);
        this.PanelUI.RegistClickSkillItem(this, this.UseSkillItem);
        this.PanelUI.Gold = 0;
        this._CountFloorTime = APP.TimeManager.GameTime + 4;
        this._GameUpdate = this._StartCount;
        WechatOpen.getInstances().drawpass(0);
        this.m_BootomFloor = startFloor;
    }

    public Update(): void {
        if (this._GameUpdate != null) {
            this._GameUpdate();
        }
    }

    /**
     * 循环设置层台阶
     * @param floor 层
     * @param Owner 
     * @param callBack 循环执行回调
     */
    LoopDoFloorStep(floor: number, Owner: any, callBack: (step: Step) => void): void {
        this.m_GameMap.LoopDoFloorStep(floor, Owner, callBack);
    }

    //正常运行时的每帧逻辑
    private _RunGameUpdate() {
        var dist: number = this.PlayerFloor;
        this.PanelUI.Distance = this.Distance;
        if (this.FreshBGCount > 10) {
            this._CurBG.UpdatePage(dist);
            this.FreshBGCount = 0;
        }
        ++this.FreshBGCount;
        var dDistance: number = this.m_GameMap.TailFLoor.FloorNum;
        var distance = this.PlayerFloor - dDistance + 4;
        if (distance > 4) {
            this._PushFLoor();
        }

        if (this.CountFloorTime < APP.TimeManager.GameTime) {
            this._CountFloorTime = APP.TimeManager.GameTime + FallTime;
            this._DestroyLine(this.m_BootomFloor);
            ++this.m_BootomFloor;
        }
        this.InputCtrl.Update();
    }
    private _GameEndUpdate()
    {

    }

    //开始倒计时期间的每帧逻辑
    private _StartCount() {
        var time: string = ""
        var countTime: number = this._CountFloorTime - APP.TimeManager.GameTime;
        if (countTime > 0.9)
            time += Math.floor(countTime);
        else {
            this.PanelUI.GamePanel = true;
            this._GameUpdate = this._RunGameUpdate;
            this._CountFloorTime = this.GameTime + FallTime;
            GameAgent.Agent.ResetGameItem();
            GameAgent.Agent.ResetSkillItem();
        }
        this.PanelUI.SetCountTime(time);
    }

    //将层向上叠
    protected _PushFLoor() {
        this.m_GameMap.PushFLoor();
    }

    /**
     * 塌陷某一层
     * @param {number}floor 
     */
    _DestroyLine(floor: number) {
        if (this.m_GameMap.GetFloorByFloor(floor)) {
            this.m_GameMap.BreakLine(floor);
        }
    }

    public UseSkillItem() {
        if (GameAgent.Agent.SkillItemNum < 1)
            return;
        if (this.Player.CurStep.locked)
            return;
        GameAgent.Agent.UseSkillItem();
        var characterID: number = GameAgent.Agent.CurCharacterID;
        var ItemID: number = GameAPP.CharacterMgr.GetItemID(characterID);
        var ItemType: number = GameAPP.ItemMgr.GetItemType(ItemID);
        var newBuff: Item.BasePlayerBuff = Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);

    }

    public UsePlayerItem() {
        if (GameAgent.Agent.GameItemNum < 1)
            return;
        if (this.Player.CurStep.locked)
            return;
        GameAgent.Agent.UseGameItem();
        var ItemID: number = GameAgent.Agent.CurItem;
        var ItemType: number = GameAPP.ItemMgr.GetItemType(ItemID);
        var newBuff: Item.BasePlayerBuff = Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);
    }
    private OnWinGame()
    {
        this.OnGameComplete();
    }
    private OnGameComplete() {
        APP.MessageManager.DesRegist(MessageMD.GameEvent.PlayerDeath, this.Death, this);
        APP.MessageManager.DesRegist(MessageMD.GameEvent.WinGame,this.OnWinGame,this);
        var ui: EndGameUI = APP.UIManager.Show<EndGameUI>(EndGameUI);
        GameAgent.Agent.AddGold(this.m_GoldNum);
        GameAgent.Agent.AddScore(this.m_GoldNum * 10 + this.Distance * 10);
    }

    private OnTimePause() {
        this.Player.Pause();
    }
    private OnCountinue() {
        this.Player.Continue();
    }
}