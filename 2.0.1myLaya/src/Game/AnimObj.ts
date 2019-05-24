import APP from "./../controler/APP"
import Controler from "./../controler/GameControler"
import {path} from "./../Utility/Path"
 /**
 * 表现用的对象
 */
export module AnimObj
{
    export function Init()
    {
        var name:string = path.GetLH("item_coin_01");
        var model:Laya.Sprite3D = Laya.loader.getRes(name);
        for( let count =0;count < 30;++count )
        {
            GenAnimObj<AnimCoin>(AnimCoin,model);
        }
    }
    export function GenAnimObj<T extends BaseAnimObj>( animClass:{new (name:string,model:Laya.Sprite3D): T; Name():string },model:Laya.Sprite3D ):T
    {
        var animObj = Laya.Pool.getItem(animClass.Name());
        if(animObj==null)
            animObj = new animClass(animClass.Name(),model);
        return animObj;
    }
    
    abstract class BaseAnimObj extends Laya.Sprite3D
    {
        Reset()
        {
            this.active = true;
            APP.SceneManager.CurScene.SceneObj.addChild(this);
            this.frameLoop(1,this,this._FrameFunc)
        }
        Model:Laya.Sprite3D;
    
        private _Name:string;
        constructor(name:string,model:Laya.Sprite3D = null)
        {
            super();
            this.Model = model.clone();
            this.addChild(this.Model);
            this._Name = name;
            this.on(Laya.Event.REMOVED,this,this._LeaveStage);
        }
        
        protected _FrameFunc():void
        {
            if(this._JudgeComplete())
            {
                this.removeSelf();
                return;
            }
            this._FrameLogicFunc();
        }
        //每帧执行逻辑功能
        protected abstract _FrameLogicFunc();
        //判断任务完成
        protected abstract _JudgeComplete():boolean;
        //生命周期结束处理
        protected _LeaveStage():void
        {
            this.clearTimer(this,this._FrameFunc);
            this.removeSelf();
        }
        ForceLeaveStage():void
        {
            this._LeaveStage();
        }
    }
    
    export class AnimCoin extends BaseAnimObj
    {
        static Name():string
        {
            return "AnimCoin";
        }
        
        SetTarget( target:Laya.Sprite3D )    
        {
            this._Target = target;
            super.Reset();
        }
        private _Target:Laya.Sprite3D;
        constructor(name:string,model:Laya.MeshSprite3D = null)
        {
            super(name,model);
            this.transform.position = model.transform.position.clone();
        }
    
        //每帧执行逻辑功能
        protected _FrameLogicFunc():void
        {
            var targetPosition = this._Target.transform.position;
            var position = this.transform.position;
            var addPS = new Laya.Vector3();
            Laya.Vector3.subtract(targetPosition,position,addPS);
            Laya.Vector3.scale(addPS,0.1,addPS);
            Laya.Vector3.add(addPS,position,position);
            this.transform.position = position;
        }
    
        //生命周期结束处理
        protected _LeaveStage():void
        {
            super._LeaveStage();
            Controler.GameControler.GameDir.GamePlay.AddLogicGold(1);
            Laya.Pool.recover(this.name,this);
        }
        
        //判断任务完成
        protected _JudgeComplete():boolean
        {
            var targetPosition = this._Target.transform.position;
            var position = this.transform.position;
            var disDir = new Laya.Vector3();
            Laya.Vector3.subtract(targetPosition,position,disDir);
            if( Laya.Vector3.scalarLengthSquared(disDir)<2)
            {
                return true;
            }
            return false;
        }
    }
}
