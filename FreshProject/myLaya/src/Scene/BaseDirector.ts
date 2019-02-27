import SceneManager from "./../FrameWork/SceneManager"
import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import LifeObj from "./../Base/LifeObj"
import BaseScene from "./BaseScene";
import APP from "./../controler/APP"
import {MessageMD} from "./../FrameWork/MessageCenter"
export default abstract class BaseDirector extends LifeObj
{
    
    _Leave():void
    {
        ///APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameTimeUp);
        //APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameContinue);
        //var app = APP;
        super._Leave();
    }

    TimeUp():void
    {
    }

    Update()
    {
    }

    ContinueTime():void
    {
    }

    get CurGameTime():number
    {
        return this._StartGameTime + this._TimeUpCount;
    }
    
    //私有属性和功能
    private _StartGameTime:number;
    private _TimeUpCount:number;
    private _TimeUpClock:number;
    protected _UIMgr:UIManager;
    protected _MessageMgr:MessageMD.MessageCenter;
    constructor()
    {
        super();
    }
    protected _StartComplete()
    {
    }
    SceneMgr:SceneManager;

    set GameTime(value:number)
    {
    }
    //外部接口
    Start():void
    {
    }
    protected _Start():void
    {
    }

    abstract ReStart():void;
}
/*

//导演基类
export default abstract class BaseDirector extends LifeObj
{
    
    _Leave():void
    {
        
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
        APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        
        super._Leave();
    }

    TimeUp():void
    {
        if(this._TimeUpClock<=0)
        {
            //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = Laya.timer.currTimer;
        }
    }

    Update()
    {
        if(this._TimeUpClock<=0)
        {
            super.Update();
        }
    }

    ContinueTime():void
    {
        //APP.MessageCenter.Trigger(GameEvent.GameContinue);
        this._TimeUpCount += Laya.timer.currTimer - this._TimeUpClock;
        this._TimeUpClock = -1;
    }

    get CurGameTime():number
    {
        return this._StartGameTime + this._TimeUpCount;
    }
    
    //私有属性和功能
    private _StartGameTime:number;
    private _TimeUpCount:number;
    private _TimeUpClock:number;
    protected _UIMgr:UIManager;
    protected _MessageMgr:MessageMD.MessageCenter;
    constructor()
    {
        super();
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        this._UIMgr = FW.FM.GetManager<UIManager>(UIManager);
        this.SceneMgr = APP.SceneManager;
    }
    protected _StartComplete()
    {
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        this._UIMgr.Clear();
        super._StartComplete();
    }
    SceneMgr:SceneManager;

    get GameTime():number
    {
        if(this._TimeUpClock>0)
        {
            return this._TimeUpClock- this._StartGameTime - this._TimeUpCount;
        }else
        {
            return Laya.timer.currTimer- this._StartGameTime - this._TimeUpCount;
        }
    }
    set GameTime(value:number)
    {
        this._StartGameTime = value;
    }
    //外部接口
    Start():void
    {
        this._Start();
    }
    protected _Start():void
    {
        this._StartGameTime = Laya.timer.currTimer;
        super._Start();
    }

    abstract ReStart():void;
}*/