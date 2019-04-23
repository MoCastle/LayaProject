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

    LeftParent: Step;
    RightParent: Step;
    LeftChild: Step;
    RightChild: Step;
    StepItem: StepItem;
    RoadNum: number;
    Mark: any;
    Floor: MountLine;
    Idx: number;
    locked: Boolean;
    //公有接口
    set Position(newPS: Laya.Vector3) {
        this.transform.position = newPS.clone();
    }
    get Position() {
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
            //var Idx =  Math.floor(1 + Math.random() * Step.stepModelNum);
            var Idx =  Math.random() * Step.stepModelNum;
            Idx = Idx > 0.5 ? 2:1;
            var name: string = path.GetLH("dizuo_qiu0" + Idx)
            //var name: string = path.GetLH("dizuo_qiu01")
            var model = Laya.loader.getRes(name);
        }
        //model = new Laya.MeshSprite3D( Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)) ;//loader.getRes(name);
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
            this.Position = newPs;
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
    }

    public TouchGround(player: Player) {
        this.StepItem.TouchItem(player);
    }
    public StandOnGround(player = null) {
        if (player) {
            var newSprite: Laya.Sprite3D = this.m_StandPoint;
            newSprite.addChild(player);
        }
        this.m_CharacterAnimator.play("fall")
    }
    public PutInItem(sprite3D: Laya.Sprite3D) {
        this.m_StandPoint.addChild(sprite3D);
    }
    public Break() {
        this.m_CharacterAnimator.play("fallDown");
    }
}

class StepAnimator extends CharactorAnimator {
    m_Step: Step;
    constructor(animator: Laya.Animator, step: Step) {
        super(animator);
        this.m_Step = step;
    }
    Init() {
        var stepFallState: Laya.AnimatorState = this.GetState("fall")
        var stepFallScript: Laya.AnimatorStateScript = stepFallState.addScript(Laya.AnimatorStateScript);
        var stepAnimator = this;
        stepFallScript.onStateExit = () => {
            stepAnimator.play("idle")
        };
        var fallDownState: Laya.AnimatorState = this.GetState("fallDown");
        var fallDownScript: FallDownScript = fallDownState.addScript(FallDownScript) as FallDownScript;
        fallDownScript.Init(this.m_Step, this.m_Aniamtor);
        return;
    }
}

class FallDownScript extends Laya.AnimatorStateScript {
    private m_Step: Step;
    private m_Speed: number;
    private m_TimeCount: number;
    private m_CountinueTime: number;
    private m_Animator: Laya.Animator;
    private m_Player: Player;
    private m_TimeOut;
    constructor() {
        super();
        this.m_Speed = 0;
        this.m_CountinueTime = 1;
    }

    public Init(step: Step, animator: Laya.Animator) {
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
        if( this.m_TimeOut)
            clearTimeout(this.m_TimeOut);
    }

    public onStateUpdate(): void {
        if (!this.m_Player && this.m_Step.standPoint.numChildren > 0)  {
            this.m_Player = this.m_Step.standPoint.getChildByName("Player") as Player;
            if (this.m_Player)  {
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
        var position: Laya.Vector3 = this.m_Step.Position;
        position.y -= this.m_Speed;
        this.m_Step.Position = position;
    }
}
