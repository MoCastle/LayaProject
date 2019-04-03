import {PlayerControler} from "./PlayerCtrler"
import {PlayerBuff} from "./Buff"
import {MessageMD} from "./../FrameWork/MessageCenter"
import APP from "./../controler/APP"
import Step from "./Step"
import { path } from "../Utility/Path"
import Controler from "./../controler/GameControler"
import {Item} from "./GameItem"
import {Character} from "./Character"
import GameAPP from "./../controler/GameAPP"
import CharacterManager from "../GameManager/CharacterMamager";
var num:number = 0;
type BasePlayerBuff = PlayerBuff.BasePlayerBuff;
//该脚本用于游戏玩家对象管理
//玩家对象
export default class Player extends Laya.Sprite3D
{   
    //私有属性
    _LogicPosition:Laya.Vector3;
    private _BuffNode:Laya.Sprite3D;
    private _PlayerModel:Laya.Sprite3D;
    private _CurStep:Step;
    private _Ctrler:PlayerControler.BasePlayerCtrler;
    private m_Animator:Laya.Animator;
    private m_BuffModel:{[name:number]:Laya.Sprite3D}
    
    BaseCtrler:PlayerControler.PlayerNormCtrler;
    BuffArr:Array<PlayerBuff.BasePlayerBuff>;
    //zerg
    IdNumber:number;

    set CurStep(step:Step)
    {
        this._CurStep = step;
    }
    get CurStep():Step
    {
        return this._CurStep;
    }

    private InitBUffModel( playerModel:Laya.Sprite3D )
    {
        this.SetModel( "item_flyer_01", "R_hand",playerModel, Item.ItemType.Fly);
        this.SetModel( "item_shield_01", "head",playerModel, Item.ItemType.Protect);
        this.SetModel( "item_untouchable_01", "head",playerModel, Item.ItemType.HolyProtect);
    }

    private SetModel( resourceName:string, nodeName:string, playerModel:Laya.Sprite3D, itemType:Item.ItemType )
    {
        var model:Laya.Sprite3D = Laya.loader.getRes(path.GetLH(resourceName));
        var buffModel:Laya.Sprite3D = model.clone();
        
        playerModel.getChildAt(0).addChild(buffModel);
        switch(nodeName)
        {
            case "head":
                var node:Laya.Sprite3D = playerModel.getChildByName(nodeName) as Laya.Sprite3D;
                node.addChild(buffModel);
            break;
            default:
                this.m_Animator.linkSprite3DToAvatarNode(nodeName,buffModel);
            break;
        }
        
        buffModel.active = false;
        this.m_BuffModel[itemType] = buffModel;
    }
    
    constructor()
    {
        super();
        this.m_BuffModel = {};
        /*
        var Name:string = path.GetLH("c001_child_01");
        var PlayerModel = Laya.Loader.getRes(Name);
        var secondPlayer:Laya.Sprite3D = PlayerModel.clone();
        this.addChild(secondPlayer);
        */
        APP.SceneManager.CurScene.PutObj(this);

        //添加自定义模型
        //secondPlayer.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        //this.m_Animator = secondPlayer.getChildAt(0).getComponent(Laya.Animator);
        this.on(Laya.Event.REMOVED,this,()=>{ this.destroy() })
        //this.InitBUffModel(secondPlayer);
        var mgr:CharacterManager = GameAPP.CharacterMgr;
    }
    
    public SetPlayerModel( model:Laya.Sprite3D )
    {
        this.addChild(model);
        model.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        this.m_Animator = model.getChildAt(0).getComponent(Laya.Animator);
        this.InitBUffModel(model);
    }

    Reset()
    {
        this.CurStep = null;
        if(this._BuffNode)
            this._BuffNode.destroy();
        this._BuffNode = new Laya.Sprite3D();
        this.addChild(this._BuffNode);
        this.BuffArr = new Array();
        this.BaseCtrler = new PlayerControler.PlayerNormCtrler(this);
        this._Ctrler = this.BaseCtrler;
        this._LogicPosition = new Laya.Vector3(0,0);
        this.frameLoop(1,this,this._Update);
        var defaultAnimState:Laya.AnimatorState = this.m_Animator.getDefaultState();
        var stateName:string = defaultAnimState.name;
        this.m_Animator.play(stateName);
    }

    /**
     * 获取玩家BUFF
     * @param idx 槽位检查
     * @returns 空表示没有
     */
    GetBuff(idx:number):PlayerBuff.BasePlayerBuff
    {
        return (this.BuffArr[idx] !=null&&this.BuffArr[idx]!=undefined)?this.BuffArr[idx]:null;
    }

    //摆放角色
    SetStep(putStep:Step):void
    {
        this.CurStep = putStep;
        var newPS = putStep.Position.clone();
        newPS.y += Controler.GameControler.StepLength;
        this.Position = newPS;
        this._LogicPosition = putStep.Position;
        this.m_Animator.play(Character.PlayerAnimName(Character.AnimEnum.Stand));
        this.TouchGround();
    }
    set Position( newPS:Laya.Vector3 )
    {
        var newPS:Laya.Vector3 = newPS.clone();
        this.transform.position = newPS;
    }
    get Position():Laya.Vector3
    {
        return this.transform.position.clone();
    }
    get LogicPosition():Laya.Vector3
    {
        return this._LogicPosition;
    }

    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    LayStep(step:Step):void
    {
        this.CurStep = step;
        this._LogicPosition = step.Position;
    }
    
    StartMove():void
    {
        this.m_Animator.play( Character.PlayerAnimName(Character.AnimEnum.Jump) );
        this.BaseCtrler.StartMove();
    }

    JumpDown():void
    {
        this.m_Animator.play(Character.PlayerAnimName(Character.AnimEnum.Jumpdown));
    }

    Fly():void
    {
        this.m_Animator.play(Character.PlayerAnimName(Character.AnimEnum.Fly));
    }
    public PlayerDeath:boolean;
    //触发台阶
    TouchGround():void
    {
        if(this.PlayerDeath || !this.CurStep)
        {
            return ;
        }
        if((this.CurStep.StepItem.ItemType == Item.ItemType.None)&&(this.CurStep.IsEmpty||(this.CurStep.LeftParent&&this.CurStep.RightParent&&this.CurStep.LeftParent.StepItem.IsForbiden&&this.CurStep.RightParent.StepItem.IsForbiden)))
        {
            APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath);
            this.m_Animator.play(Character.PlayerAnimName(Character.AnimEnum.Fall));
            return;
        }
        this.CurStep.StepItem.TouchItem(this);
    }
    
    /**
     * 移动
     * @param {Laya.Vector3} vector 移动向量值
     */
    Translate( vector:Laya.Vector3 ):void
    {
        this.transform.translate(vector);
        Laya.Vector3.add(this._LogicPosition,vector,this._LogicPosition);
    }

    /**
     * 添加玩家控制器
     * @param newCtrler 新玩家控制器
     */
    AddCtrler(newCtrler:PlayerControler.BasePlayerCtrler ):void
    {
        var ctrler:PlayerControler.BasePlayerCtrler = this._Ctrler;
        this._Ctrler = newCtrler;
        newCtrler.NextCtrl =ctrler;
        newCtrler.SetPlayer(this);
    }

    /**
     * 移交控制器
     */
    PopCtrler():void
    {
        this._Ctrler = this._Ctrler.NextCtrl;
    }
    /**
     * 添加BUFF
     * @param buff 
     * @param index 
     */
    AddBuff(buff:PlayerBuff.BasePlayerBuff):boolean
    {
        var index:number = buff.Idx;
        if(this.BuffArr[index]!=null||this.BuffArr[index]!=undefined)
        {
            return false;
        }
        var buffModel:Laya.Sprite3D = this.m_BuffModel[buff.Type];
        if(buffModel) 
        {
            buffModel.active = true;
        }
        this.BuffArr[index] = buff;
        buff.Idx = index;
        buff.Start(this);
        return true;
    }
    /**
     * 添加BUFF模型
     * @param mod 
     */
    AddBuffMode( mod:Laya.Sprite3D )
    {
        return;
        if(mod!=null)
        {
            this._BuffNode.addChild(mod);
        }
    }
    /**
     * 结束BUFF
     */
    CompleteBuff(index:number)
    {
        var buff:BasePlayerBuff = this.BuffArr[index];
        var buffModel:Laya.Sprite3D = this.m_BuffModel[buff.Type];
        if(buffModel) buffModel.active = false;
        this.BuffArr[index]=null;
        if(buff==null||buff==undefined )
        {
            return;
        }
    }
    
    _Update():void
    {
        if(this.PlayerDeath)
            return;
        this._Ctrler.Update();
        for( var buffIdx:number = 0;buffIdx<2;++buffIdx )
        {
            if(this.BuffArr[buffIdx]!=null||this.BuffArr[buffIdx]!=undefined)
                this.BuffArr[buffIdx].Update();
        }
    }
    FlyPrepare()
    {
        this.CurStep = null;
    }
}

class StepData
{
    constructor()
    {}
    GetData( step:Step )
    {

    }
}