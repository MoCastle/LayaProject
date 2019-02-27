import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import SceneManager from "./../FrameWork/SceneManager"
import BaseDirector from "./BaseDirector"
import LifeObj from "./../Base/LifeObj"
import {Enum} from "./../Base/LifeObj"
import {MessageMD} from "./../FrameWork/MessageCenter"
//场景基类
export default abstract class BaseScene extends LifeObj
{
    //外部接口
    SceneMgr:SceneManager;
    CurDir:BaseDirector;
    IsLoadComplete:boolean;
    Scene:Laya.Scene;
    IsLoading:boolean;

    //结束场景
    Leave(nextStage:BaseScene):void
    {
        this._NextScene = nextStage;
        nextStage.StartLoad();
        this._Leave();
    }
    StartLoad( )//;//CallBack:()=>void);//)CallBack():void=>);
    {
        this.IsLoading = true;
    }
    
    //开始场景
    Start():void
    {
        if(!this.IsLoadComplete && !this.IsLoading)
            this.StartLoad();
        else
            this._Start();

       if(this.IsLoading && this._LoadCallBack == null)
        {
            this._LoadCallBack = this._Start;
        }
    }
    //放对象
    PutObj(node:Laya.Sprite3D ):void
    {
         this.Scene.addChild(node);  
    }

    //内部功能
    protected _NextScene:BaseScene;//下一个场景
    protected _LoadCallBack:()=>void;
    protected _UIManager:UIManager;
    protected _MessageMgr:MessageMD.MessageCenter;
    
    constructor()
    {
        super();
        this.SceneMgr = FW.FM.GetManager<SceneManager>(SceneManager);
        this.IsLoading = false;
        this.IsLoadComplete = false
        this.CurDir = null;
        this.Scene = null;
        this._UIManager = FW.FM.GetManager<UIManager>(UIManager);
        this._MessageMgr = FW.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        this._LoadCallBack = null;
        this._NextScene = null;
    }

    protected _Leaving()
    {
        this._UIManager.Clear();

        if(this.CurDir.ObjState == Enum.LifeObjState.Ended)
        {
            super._Leaveing();
        }
    }

    protected _LeaveComplete()
    {
        super._LeaveComplete();
        if(this.Scene)
        {
            this.Scene.removeSelf();
            while(this.Scene.numChildren)
            {
                var actor = this.Scene.getChildAt(0);
                actor.removeSelf();
            }
        }
        this._UIManager.Clear();
        this.SceneMgr.CurScene = this._NextScene;
        //zerg 场景不知道会不会内存泄漏
    }

    protected _Update()
    {
        if( this.CurDir!= null)
            this.CurDir.Update();
    }

    protected abstract _GenDir():void;
    
    protected _LoadComplete()
    {
       this.IsLoadComplete = true;
       this.IsLoading = false;
        if(this._LoadCallBack!=null)
        {
            this._LoadCallBack();
            this._LoadCallBack = null;
        }
    }

    protected _Start()
    {
        this.SceneMgr.SceneCtrler.addChild(this.Scene);
        super._Start();
    }
    protected _Starting()
    {
        //资源都没下完就不要走其它逻辑了
        if(this.IsLoading&& this.IsLoadComplete )
        {
            this._LoadComplete();
        }
        else
            super._Starting();
    }
    protected _StartComplete()
    {
        this._UIManager.Clear();

        this._GenDir();
        super._StartComplete();
    }
}

