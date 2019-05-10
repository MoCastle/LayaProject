import { PlayerControler } from "./PlayerCtrler"
import { MessageMD } from "./../FrameWork/MessageCenter"
import APP from "./../controler/APP"
import Step from "./Step"
import { path } from "../Utility/Path"
import Controler from "./../controler/GameControler"
import { Item } from "./GameItem"
import { Character } from "./Character"
import GameAPP from "./../controler/GameAPP"
import CharacterManager from "../GameManager/CharacterMamager";
import { GameModule } from "./GameModule";
import CharactorAnimator from "./CharacterAnimator";
var num: number = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
export default class Player extends Laya.Sprite3D {
    //私有属性
    private m_Idx: number;
    m_LogicPosition: Laya.Vector3;
    private _BuffNode: Laya.Sprite3D;
    private m_PlayerModel: Laya.Sprite3D;
    private _CurStep: Step;
    private _Ctrler: PlayerControler.BasePlayerCtrler;
    private m_PlayerCharacter: PlayerAnimator;
    private m_BuffModel: { [name: number]: Laya.Sprite3D }
    private m_StateMap: {}
    private m_Parent: Laya.Sprite3D;

    public BaseCtrler: PlayerControler.PlayerNormCtrler;
    public BuffArr: Array<Item.BasePlayerBuff>;
    public IdNumber: number;
    public PlayerDeath: boolean;
    public Locked:boolean;

    set CurStep(step: Step) {
        this._CurStep = step;
    }
    get CurStep(): Step {
        return this._CurStep;
    }
    set Position(newPS: Laya.Vector3) {
        var newPS: Laya.Vector3 = newPS.clone();
        this.m_Parent.transform.position = newPS;
    }
    get Position(): Laya.Vector3 {
        return this.m_Parent.transform.position.clone();
    }
    get LogicPosition(): Laya.Vector3 {
        return this.m_LogicPosition;
    }
    get playerModel(): Laya.Sprite3D {
        return this.m_PlayerModel;
    }

    constructor() {
        super();
        this.name = "Player";
        this.m_BuffModel = {};
        this.m_Parent = new Laya.Sprite3D();
        this.m_Parent.name = "PlayerParent";
        APP.SceneManager.CurScene.PutObj(this.m_Parent);
        this.m_Parent.addChild(this);
        this.transform.position = new Laya.Vector3();
        this.transform.rotation = new Laya.Quaternion();
        //添加自定义模型
        this.m_Parent.on(Laya.Event.REMOVED, this, () => { this.destroy() })
        var mgr: CharacterManager = GameAPP.CharacterMgr;
        this.m_Idx = num;
        ++num
    }
    public Pause() {
        this.clearTimer(this, this._Update);
        this.m_PlayerCharacter.speed = 0;
    }
    public Continue() {
        this.frameLoop(1, this, this._Update);
        this.m_PlayerCharacter.speed = 1;
    }
    private m_HeadNode: Laya.Sprite3D;

    private InitBUffModel(playerModel: Laya.Sprite3D) {
        this.m_PlayerModel = playerModel;
        var scale:Laya.Vector3 = this.m_PlayerModel.transform.scale;
        Laya.Vector3.scale(scale,1.2,scale);
        this.m_PlayerModel.transform.scale = scale;

        this.m_HeadNode = new Laya.Sprite3D();
        var HeadNode: Laya.Sprite3D = playerModel.getChildByName("head") as Laya.Sprite3D;
        this.addChild(this.m_HeadNode);
        this.m_HeadNode.transform.position = HeadNode.transform.position.clone();
        this.m_HeadNode.transform.rotation = HeadNode.transform.rotation.clone();
        this.m_HeadNode.transform.scale = HeadNode.transform.scale.clone();
        this.SetModel("item_flyer_01", "R_hand", playerModel, Item.ItemType.Fly);
        this.SetModel("item_shield_01", "head", playerModel, Item.ItemType.Protect);
        this.SetModel("item_untouchable_01", "head", playerModel, Item.ItemType.HolyProtect);
    }

    private SetModel(resourceName: string, nodeName: string, playerModel: Laya.Sprite3D, itemType: Item.ItemType) {
        var model: Laya.Sprite3D = Laya.loader.getRes(path.GetLH(resourceName));
        var buffModel: Laya.Sprite3D = model.clone();

        playerModel.getChildAt(0).addChild(buffModel);
        switch (nodeName) {
            case "head":
                this.m_HeadNode.addChild(buffModel);
                break;
            default:
                this.m_PlayerCharacter.linkSprite3DToAvatarNode(nodeName, buffModel);
                break;
        }

        buffModel.active = false;
        this.m_BuffModel[itemType] = buffModel;
    }

    public FaceModelTo(rotation: Laya.Quaternion) {
        this.m_PlayerModel.transform.rotation = rotation;
    }
    public ModelRotateEular(vector: Laya.Vector3) {
        this.m_PlayerModel.transform.rotationEuler = vector;
    }

    public SetPlayerModel(model: Laya.Sprite3D) {
        this.addChild(model);
        this.m_Parent.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        var animator:Laya.Animator = model.getChildAt(0).getComponent(Laya.Animator);
        this.m_PlayerCharacter = new PlayerAnimator(animator, this);
        this.m_PlayerCharacter.Init();

        var layer: Laya.MapLayer = animator.getControllerLayer()._statesMap;
        this.m_StateMap = {};
        for (var key in layer) {
            this.m_StateMap[key] = 1;
        }
        this.InitBUffModel(model);
    }

    Reset() {
        this.CurStep = null;
        if (this._BuffNode)
            this._BuffNode.destroy();
        this._BuffNode = new Laya.Sprite3D();
        this.addChild(this._BuffNode);
        this.BuffArr = new Array();
        this.BaseCtrler = new PlayerControler.PlayerNormCtrler(this);
        this._Ctrler = this.BaseCtrler;
        this.m_LogicPosition = new Laya.Vector3(0, 0);
        this.frameLoop(1, this, this._Update);
        var defaultAnimState: Laya.AnimatorState = this.m_PlayerCharacter.getDefaultState();
        var stateName: string = defaultAnimState.name;
        this.m_PlayerCharacter.play(stateName);
        this.Locked = false;
    }

    /**
     * 获取玩家BUFF
     * @param idx 槽位检查
     * @returns 空表示没有
     */
    GetBuff(idx: number): Item.BasePlayerBuff {
        return (this.BuffArr[idx] != null && this.BuffArr[idx] != undefined) ? this.BuffArr[idx] : null;
    }

    /**
     * 添加BUFF
     * @param buff 
     */
    AddBuff(buff: Item.BasePlayerBuff): boolean {
        var slot: number = buff.Slot;
        if (this.BuffArr[slot]) {
            this.CompleteBuff(slot);
        }

        var buffModel: Laya.Sprite3D = this.m_BuffModel[buff.Type];
        if (buffModel) {
            buffModel.active = true;
        }

        this.BuffArr[slot] = buff;
        buff.Start();
        return true;
    }

    /**
     * 结束BUFF
     */
    CompleteBuff(slot: number) {
        var buff: Item.BasePlayerBuff = this.BuffArr[slot];
        var buffModel: Laya.Sprite3D = this.m_BuffModel[buff.Type];
        if (buffModel) buffModel.active = false;
        this.BuffArr[slot] = null;
        if (buff == null || buff == undefined) {
            return;
        }
        buff.Removed();
    }

    //摆放角色
    SetStep(putStep: Step): void {
        this.CurStep = putStep;
        var newPS = putStep.position.clone();
        newPS.y += Controler.GameControler.StepLength;
        this.Position = newPS;
        this.m_LogicPosition = putStep.position;
        this.m_PlayerCharacter.play(Character.PlayerAnimName(Character.AnimEnum.Stand));
        if ((this.CurStep.StepItem.ItemType == Item.ItemType.None) && (this.CurStep.IsEmpty || (this.CurStep.LeftParent && this.CurStep.RightParent && this.CurStep.LeftParent.StepItem.IsForbiden && this.CurStep.RightParent.StepItem.IsForbiden))) {
            this.FallDownImd();
            return;
        }
        this.CurStep.StandOnGround(this)
        this.TouchGround();
        this.JumpDown();
    }

    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    LayStep(step: Step): void {
        this.CurStep = step;
        this.m_LogicPosition = step.position;
    }

    StartMove(): void {
        this.BaseCtrler.StartMove();
        this.m_PlayerCharacter.play(Character.PlayerAnimName(Character.AnimEnum.Jump));
    }

    JumpDown(): void {
        this.m_PlayerCharacter.play(Character.PlayerAnimName(Character.AnimEnum.Jumpdown));
    }

    Fly(): void {
        this.m_PlayerCharacter.play(Character.PlayerAnimName(Character.AnimEnum.Fly));
    }
    Die():void
    {
        this.Locked = true;
        this.m_PlayerCharacter.play("die");
    }
    FallDown(): void  {
        this.Locked = true;
        this.ResetParenet();
        this.m_PlayerCharacter.play(Character.PlayerAnimName(Character.AnimEnum.Fall));
    }
    FallDownImd(): void  {
        this.Locked = true;
        this.m_PlayerCharacter.play("fallDownImd")
    }

    //触发台阶
    TouchGround(): void {
        if (this.PlayerDeath || !this.CurStep) {
            return;
        }
        this.CurStep.TouchGround(this);
    }
    
    CheckGround():void{
        this.CurStep.CheckGround(this);
    }

    /**
     * 移动
     * @param {Laya.Vector3} vector 移动向量值
     */
    Translate(vector: Laya.Vector3): void {
        this.m_Parent.transform.translate(vector, false);
        Laya.Vector3.add(this.m_LogicPosition, vector, this.m_LogicPosition);
    }

    /**
     * 添加玩家控制器
     * @param newCtrler 新玩家控制器
     */
    AddCtrler(newCtrler: PlayerControler.BasePlayerCtrler): void {
        if (this._Ctrler)
            this._Ctrler.OnComplete();
        var ctrler: PlayerControler.BasePlayerCtrler = this._Ctrler;
        this._Ctrler = newCtrler;
        newCtrler.NextCtrl = ctrler;
        newCtrler.SetPlayer(this);
        if (this._Ctrler)
            this._Ctrler.OnStart();
    }

    /**
     * 移交控制器
     */
    PopCtrler(): void {
        if (this._Ctrler)
            this._Ctrler.OnComplete();
        this._Ctrler = this._Ctrler.NextCtrl;
        if (this._Ctrler)
            this._Ctrler.OnStart();
    }

    _Update(): void {
        if (this.PlayerDeath)
            return;
        this._Ctrler.Update();
        for (var buffIdx: number = 0; buffIdx < 2; ++buffIdx) {
            if (this.BuffArr[buffIdx] != null || this.BuffArr[buffIdx] != undefined)
                this.BuffArr[buffIdx].Update();
        }
    }

    FlyPrepare() {
        this.CurStep = null;
    }

    ResetParenet()  {
        this.m_Parent.addChild(this);
        this.transform.localPosition = new Laya.Vector3();
        //this.transform.position = this.m_Parent.transform.position.clone();
    }
}

class StepData {
    constructor() { }
    GetData(step: Step) {

    }
}

class PlayerAnimator extends CharactorAnimator {
    private m_Player: Player
    constructor(animator: Laya.Animator, player: Player) {
        super(animator);
        this.m_Player = player;
    }
    Init()  {
        var fallState: Laya.AnimatorState = this.GetState("fallDown");
        var fallScript: Laya.AnimatorStateScript = fallState.addScript(Laya.AnimatorStateScript);
        fallScript.onStateExit = () => { APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath); }

        var fallDownImdState: Laya.AnimatorState = this.GetState("fallDownImd");
        var fallDownImdScript: Laya.AnimatorStateScript = fallDownImdState.addScript(Laya.AnimatorStateScript);
        var player:Player = this.m_Player;
        fallDownImdScript.onStateExit = () => { APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath); }

        var dieState:Laya.AnimatorState = this.GetState("die");
        var dieScript: Laya.AnimatorStateScript = dieState.addScript(Laya.AnimatorStateScript);
        dieScript.onStateExit = () => { setTimeout(() => {
            APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath);
        }, 1000) }
    }
    play(name:string)
    {
        if(name != "idle")
        {
            switch(this.curStateName)
            {
                case "die":
                case "fallDown":
                case "fallDownImd":
                    return;
                break;
            }
        }
        
        super.play(name);
        console.log(name);
    }
}

class FallStateScript extends Laya.AnimatorStateScript {
    private m_Player: Player;
    private m_CountTime: number
    private m_YieldTime: number;
    private m_YieldCallBack;
    constructor()  {
        super();
    }
    Init(player: Player)  {
        this.m_Player = this.m_Player;
        this.m_CountTime = 0;
        this.m_YieldTime = 3;
    }
    onStateEnter()  {
        this.m_Player.Locked = true;
        //this.m_CountTime = APP.TimeManager.GameTime + this.m_YieldTime;
        this.m_YieldCallBack = setTimeout(() => {
            APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath);
        }, 3000);

    }
    onStateExit()  {
        if (this.m_YieldCallBack)
            clearTimeout(this.m_YieldCallBack);
    }

}