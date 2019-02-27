import SceneManager from "./../FrameWork/SceneManager"
import FrameWork from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import LifeObj from "./../Base/LifeObj"
//导演基类
export default abstract class BaseDirector extends LifeObj
{
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
    _Leave():void
    {
        /*
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
        APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        */
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

    constructor()
    {
        super();
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
    }
    protected _StartComplete()
    {
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        FrameWork.FM.GetManager<UIManager>(UIManager).Clear();
        super._StartComplete();
    }
}