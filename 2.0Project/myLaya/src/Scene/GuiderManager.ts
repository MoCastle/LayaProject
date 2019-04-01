import SceneManager from "./../FrameWork/SceneManager"
import BaseScene from "./BaseScene"
import BaseDirector from "./BaseDirector"
import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import EnterGameUI from "./../ui/EnterGameUI"
import {path} from "./../Utility/Path"
import {Scene} from "./../Scene/Scene"
import APP from "../controler/APP";

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
    public get GameDir():GuiderDirector
    {
        return this.CurScene.GuidDir;
    }
    //进入游戏场景走这个接口
    EnterScene():void
    {
        var newGameScene = new GuiderScene();
        APP.SceneManager.ChangeScene(newGameScene);
        this.CurScene = newGameScene;
    }

    //内部功能
    constructor()
    {
        this.CurScene = null;
    }
}

class GuiderScene extends Scene.BaseScene
{
    GuidDir:GuiderDirector;
    CurDir:BaseDirector;
    constructor()
    {
        super();
    }
    
    protected GenDirector():Scene.BaseDirector
    {
        var Director:Scene.BaseDirector = new GuiderDirector();
        return Director;
    }
}

class GuiderDirector extends Scene.BaseDirector
{
    ReStart():void
    {
        
    }

    constructor( )
    {
        super();
    }

    public Start():void
    {
        var load2DList = [{url:path.GetDepathUIJS("Enter") ,type:Laya.Loader.JSON},{url:path.GetDepathUIJS("ItemList") ,type:Laya.Loader.JSON},{url:path.GetAtlPath("comp"),type: Laya.Loader.ATLAS }];
        this.ChangeGamePlay(new Scene.LoadSceneLogic(load2DList,null,new GuiderScenePlay()));
    }
    public Update():void
    {
        
    }
    public End():void
    {

    }
}

class GuiderScenePlay extends Scene.BaseScenePlaye
{
    UI:EnterGameUI;
    constructor()
    {
        super();
    }    
    public Start()
    {
        this.UI = APP.UIManager.Show<EnterGameUI>(EnterGameUI);
    }
    public End()
    {

    }
    public Update()
    {
        
    }
}