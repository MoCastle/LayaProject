class GuiderManager 
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
        SceneManager.Mgr.EnterScene(newGameScene);
        this.CurScene = newGameScene;
    }

    //内部功能
    constructor()
    {
        this.SceneMgr = SceneManager.Mgr;
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
        Laya.loader.load([{url:"EnterScene.json",type:Laya.Loader.JSON},{url:"res/atlas/comp.atlas",type: Laya.Loader.ATLAS }],Laya.Handler.create(this,this._LoadComplete));
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
        this.UI = new EnterGameUI();
        super._Start();
    }
    protected _StartComplete():void
    {
        this.UI.Open();
    }
    protected _Update():void
    {

    }
}