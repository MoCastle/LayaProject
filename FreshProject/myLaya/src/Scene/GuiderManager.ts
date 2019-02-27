import SceneManager from "./../FrameWork/SceneManager"
import BaseScene from "./BaseScene"
import BaseDirector from "./BaseDirector"
import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import EnterGameUI from "./../ui/EnterGameUI"
import {path} from "./../Utility/Path"

export default class GuiderManager 
{
//对外接口
    private static _Mgr:GuiderManager;
    static get Mgr():GuiderManager
    {
        if(GuiderManager._Mgr == null)
        {
            GuiderManager._Mgr = new GuiderManager();
        }
        return GuiderManager._Mgr;
    }
    SceneMgr:SceneManager;
    CurScene:GuiderScene;
    get GameDir():GuiderDirector
    {
        return this.CurScene.GuidDir;
    }
    //进入游戏场景走这个接口
    EnterScene():void
    {
        var newGameScene = new GuiderScene();
        this.SceneMgr.EnterScene(newGameScene);
        this.CurScene = newGameScene;
    }

    //内部功能
    constructor()
    {
        this.SceneMgr = FW.FM.GetManager<SceneManager>(SceneManager);
        this.CurScene = null;
    }
}

class GuiderScene extends BaseScene
{
    GuidDir:GuiderDirector;
    CurDir:BaseDirector;
    constructor()
    {
        super();
    }
    StartLoad( )
    {
        Laya.loader.load([{url:path.GetDepathUIJS("Enter") ,type:Laya.Loader.JSON},{url:path.GetDepathUIJS("ItemList") ,type:Laya.Loader.JSON},{url:"res/atlas/comp.atlas",type: Laya.Loader.ATLAS }],Laya.Handler.create(this,this._LoadComplete));
    }
    protected _GenDir():void
    {
        this.GuidDir = new GuiderDirector();
        this.CurDir = this.GuidDir;
    }
}

class GuiderDirector extends BaseDirector
{
    UI:EnterGameUI;
    ReStart():void
    {
        
    }

    constructor( )
    {
        super();
    }

    protected _Start():void
    {
        super._Start();
    }
    protected _StartComplete():void
    {
        super._StartComplete();
        this.UI = FW.FM.GetManager<UIManager>(UIManager).Show<EnterGameUI>(EnterGameUI);
    }
    protected _Update():void
    {
        
    }
}