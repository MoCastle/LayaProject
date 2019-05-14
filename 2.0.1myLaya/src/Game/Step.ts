import { Item } from "./GameItem"
import MountLine from "./MountLine"
import { GameStruct } from "./GameStruct"
import { path } from "./../Utility/Path"
import APP from "./../controler/APP"
import Player from "./Player"
import CharactorAnimator from "./CharacterAnimator";
import Controler from "../controler/GameControler";
type StepItem = Item.StepItem;
type MLocation = GameStruct.MLocation;
//步
export default class Step extends Laya.Sprite3D {
    private m_CharacterAnimator: StepAnimator;
    //模型个数
    public static stepModelNum: number = 2;
    private m_StandPoint: Laya.Sprite3D;
    private _IsDeadRoad: boolean;
    private m_StepModel: Laya.Sprite3D;
    private m_YieldFunc;

    LeftParent: Step;
    RightParent: Step;
    LeftChild: Step;
    RightChild: Step;
    StepItem: StepItem;
    RoadNum: number;
    Mark: any;
    Floor: MountLine;
    Idx: number;
    locked: boolean
    
    //公有接口
    set position(newPS: Laya.Vector3) {
        this.transform.position = newPS.clone();
    }
    get position() {
        return this.transform.position.clone();
    }
    get Location(): MLocation {
        return new GameStruct.MLocation(this.Idx, this.Floor.FloorNum);
    }
    get IsDeadRoad(): boolean {
        return this._IsDeadRoad || !this.active || this.StepItem.IsDifficulty;
    }
    set IsDeadRoad(value: boolean) {
        this._IsDeadRoad = value;
    }
    get IsForbiden(): boolean {
        return this.StepItem.IsForbiden;
    }
    get IsEmpty(): boolean {
        return !(this.active && this.Floor.active);
    }
    get standPoint(): Laya.Sprite3D {
        return this.m_StandPoint;
    }
    constructor(floor: MountLine, idx: number) {
        super();
        if (this.Idx != 0) {
            var Idx = Math.random() * Step.stepModelNum;
            Idx = Idx > 0.5 ? 2 : 1;
            var name: string = path.GetLH("dizuo_qiu0" + Idx)
            var model = Laya.loader.getRes(name);
        }
        var cloneModel: Laya.Sprite3D = model.clone();
        this.m_CharacterAnimator = new StepAnimator(cloneModel.getChildAt(0).getComponent(Laya.Animator), this);
        this.m_CharacterAnimator.Init();
        cloneModel.transform.position = new Laya.Vector3();
        this.m_StepModel = cloneModel;

        var standPoint: Laya.Sprite3D = new Laya.Sprite3D;
        this.m_StepModel.getChildAt(0).addChild(standPoint);
        this.m_CharacterAnimator.linkSprite3DToAvatarNode("PlayerFootPoint", standPoint);
        this.m_StandPoint = standPoint;
        standPoint.transform.position = new Laya.Vector3();

        this.addChild(cloneModel);

        this.transform.position = new Laya.Vector3();
        this.StepItem = Item.StepItemFactory(Item.ItemType.None, this);
        this.StepItem.ResetItem();
        this.Floor = floor;
        this.Idx = idx;

        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;

        this._IsDeadRoad = false;
        this.RoadNum = 0;
        this.locked = false;
    }
    PutItem(itemEnume: Item.ItemType) {
        if (itemEnume == Item.ItemType.Empty) {
            this.active = false;
            this.locked = true;
            return;
        } else {
            this.active = true;
        }
        this.StepItem.PutItem(itemEnume);
    }
    ResetStep(newPs: Laya.Vector3 = null) {
        if (newPs)
            this.position = newPs;
        this.StepItem.PutItem(Item.ItemType.None);

        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;
        this._IsDeadRoad = false;
        this.RoadNum = 0;
        this.active = true;
        this.locked = false;
        this.m_CharacterAnimator.play("idle")
        var position: Laya.Vector3 = this.transform.localPosition;
        position.y = 0;
        this.transform.localPosition = position;
        if(this.m_YieldFunc)
        {
            clearTimeout(this.m_YieldFunc);
        }
    }

    public TouchGround(player: Player) {
        this.StepItem.TouchItem(player);
    }
    public CheckGround(player: Player) {
        this.StepItem.CheckItem(player);
    }

    public StandOnGround(player,standOnGround:boolean = false) {
        if (player) {
            var newSprite: Laya.Sprite3D = this.m_StandPoint;
            newSprite.addChild(player);
        }
        this.m_CharacterAnimator.play("fall")
        this.TouchGround(player)
    }

    public PutInItem(sprite3D: Laya.Sprite3D) {
        this.m_StandPoint.addChild(sprite3D);
    }
    
    public Break() {
        var randomTime = 1000 * Math.random();
        var step:Step = this;
        this.m_YieldFunc = setTimeout(() => {
            step.YieldBreak();
        }, randomTime);
    }
    private YieldBreak()
    {
        this.m_CharacterAnimator.play("warning");
        this.m_YieldFunc = null;
    }
}

class StepAnimator extends CharactorAnimator {
    private m_Step: Step;
    constructor(animator: Laya.Animator, step: Step) {
        super(animator);
        this.m_Step = step;
    }
    Init() {
        var stepFallState: Laya.AnimatorState = this.GetState("fall")
        var stepFallScript: Laya.AnimatorStateScript = stepFallState.addScript(Laya.AnimatorStateScript);
        var stepAnimator = this;
        var fallDownState: Laya.AnimatorState = this.GetState("fallDown");
        var fallDownScript: FallDownScript = fallDownState.addScript(FallDownScript) as FallDownScript;
        fallDownScript.Init(this.m_Step, this);

        var warningState: Laya.AnimatorState = this.GetState("warning");
        var warningScript: WarningScript = warningState.addScript(WarningScript) as WarningScript;
        warningScript.Init(this.m_Step, this);
    }
    play(name: string)  {
        var animatorStateName: string = this.curStateName;
        switch (name)  {
            case "fallDown":
            case "warning":
            case "idle":
                super.play(name);
                break;
            default:
                if (animatorStateName != "fallDown" && animatorStateName != "warning")  {
                    super.play(name);
                }
                break;
        }
    }
}

class FallDownScript extends Laya.AnimatorStateScript {
    private m_Step: Step;
    private m_Speed: number;
    private m_TimeCount: number;
    private m_CountinueTime: number;
    private m_Animator: CharactorAnimator;
    private m_Player: Player;
    private m_TimeOut;
    constructor() {
        super();
        this.m_Speed = 0;
        this.m_CountinueTime = 1;
    }

    public Init(step: Step, animator: CharactorAnimator) {
        this.m_Step = step;
        this.m_Speed = 0;
        this.m_Animator = animator;
    }

    public onStateEnter(): void {
        this.m_Step.locked = true;
        this.m_TimeCount = APP.TimeManager.GameTime + this.m_CountinueTime;
    }

    public onStateExit(): void {
        var stepPosition: Laya.Vector3 = this.m_Step.transform.localPosition;
        this.m_Step.transform.localPosition = stepPosition;
        if (this.m_TimeOut)
            clearTimeout(this.m_TimeOut);
    }

    public onStateUpdate(): void {
        if (!this.m_Player && this.m_Step.standPoint.numChildren > 0) {
            this.m_Player = this.m_Step.standPoint.getChildByName("Player") as Player;
            if (this.m_Player) {
                this.m_Player.ResetParenet();
                this.m_TimeOut = setTimeout(() => {
                    this.m_Player.FallDown();
                }, 150);
            }
        }
        var lastFrameTime = this.m_TimeCount - APP.TimeManager.GameTime;
        if (lastFrameTime < 0) {
            return;
        }
        if (this.m_Speed < 1)
            this.m_Speed += (this.m_CountinueTime - lastFrameTime) * 0.5;
        var position: Laya.Vector3 = this.m_Step.position;
        position.y -= this.m_Speed;
        this.m_Step.position = position;
    }
}

class WarningScript extends Laya.AnimatorStateScript {
    private m_Step: Step;
    private m_Animator: CharactorAnimator;
    private m_TimeCount: number;
    private m_CountinueTime: number;
    private m_StartXPositin: number;
    private m_SwitchNum: number;
    private m_ShakeTimeCount: number;

    get EndTimePoint(): number {
        return this.m_TimeCount + this.m_CountinueTime;
    }

    constructor() {
        super();
        this.m_CountinueTime = 1;
    }

    public Init(step: Step, animator: CharactorAnimator) {
        this.m_Step = step;
        this.m_Animator = animator;
        this.m_ShakeTimeCount = 0;
    }

    public onStateEnter(): void {
        this.m_TimeCount = APP.TimeManager.GameTime;
        this.m_CountinueTime = 1;
        this.m_StartXPositin = this.m_Step.transform.position.x;
        this.m_SwitchNum = 0.06;
    }

    public onStateExit(): void {
        var stepPosition: Laya.Vector3 = this.m_Step.transform.localPosition;
        this.m_Step.transform.localPosition = stepPosition;
    }

    public onStateUpdate(): void {
        var curGameTime: number = APP.TimeManager.GameTime;
        if (curGameTime < this.EndTimePoint) {
            if (this.m_ShakeTimeCount > 2) {
                this.m_SwitchNum *= -1;
                var newXPosition = this.m_SwitchNum + this.m_StartXPositin;
                var stepPosition: Laya.Vector3 = this.m_Step.position;
                stepPosition.x = newXPosition;
                this.m_Step.position = stepPosition;
                this.m_ShakeTimeCount;
                this.m_ShakeTimeCount = 0;
            }
            else  {
                ++this.m_ShakeTimeCount;
            }

        } else {
            this.m_Animator.play("fallDown");
        }
    }
}