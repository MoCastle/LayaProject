import SceneManager from "./../FrameWork/SceneManager"
import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import LifeObj from "./../Base/LifeObj"
import BaseScene from "./BaseScene";
import APP from "./../controler/APP"
import {MessageMD} from "./../FrameWork/MessageCenter"
import BG from "./../ui/BG"

//导演基类
export default abstract class BaseDirector extends LifeObj
{
    
    _Leave():void
    {
        
        APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameTimeUp);
        APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameContinue);
        
        super._Leave();
    }

    TimeUp():void
    {
        if(this._TimeUpClock<=0)
        {
            //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = APP.TimeManager.GameTime;
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
        this._TimeUpCount += APP.TimeManager.GameTime - this._TimeUpClock;
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
    private _BG:BG;
    constructor()
    {
        super();
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        this._UIMgr = FW.FM.GetManager<UIManager>(UIManager);
        this.SceneMgr = APP.SceneManager;
        this._BG = APP.SceneManager.BG as BG;
        
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
            return APP.TimeManager.GameTime- this._StartGameTime - this._TimeUpCount;
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
        this._StartGameTime = APP.TimeManager.GameTime;
        super._Start();
    }

    abstract ReStart():void;
}