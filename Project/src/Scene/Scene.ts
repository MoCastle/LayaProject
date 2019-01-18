/**作者Mo
 * 场景功能
 */
//场景管理
class SceneManager
{
    protected static _Mgr:SceneManager;
    SceneCtrler:Laya.Node;
    static get Mgr():SceneManager
    {
        if(this._Mgr==null)
        {
            this._Mgr = new SceneManager();
        }
        return this._Mgr;
    }
    private _CurScene:BaseScene;
    get CurScene():BaseScene
    {
        return this._CurScene;
    }
    set CurScene(value:BaseScene)
    {
        this._CurScene =value;
    }

    constructor()
    {
        this.CurScene = null;
        //添加场景管理
        this.SceneCtrler = Laya.stage.addChild(new Laya.Sprite());
    }

    EnterScene(targetScene:BaseScene):void
    {
        if(this.CurScene == null)
            this.CurScene = targetScene;
        else
            this.CurScene.Leave(targetScene);
    }

    Update():void
    {
        if(this.CurScene!=null)
            this.CurScene.Update();
    }
}

//场景基类
abstract class BaseScene extends LifeObj
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
    
    constructor()
    {
        super();
        this.SceneMgr = SceneManager.Mgr;
        this.IsLoading = false;
        this.IsLoadComplete = false
        this.CurDir = null;
        this.Scene = null;

        this._LoadCallBack = null;
        this._NextScene = null;
    }

    protected _Leaving()
    {
        APP.UIManager.Clear();
        if(this.CurDir.ObjState == LifeObjState.Ended)
        {
            super._Leaveing();
        }
    }

    protected _LeaveComplete()
    {
        this.SceneMgr.CurScene = this._NextScene;
        super._LeaveComplete();
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
        if(this.Scene == null)
        {
            console.debug("Error: wrong");
        }
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
        this._GenDir();
        super._StartComplete();
    }
}

//导演基类
abstract class BaseDirector extends LifeObj
{
    SceneMgr:SceneManager;
    GameTime:number;
    //外部接口
    Start():void
    {
        this.GameTime = Laya.timer.currTimer;
        this._Start();
    }

    abstract ReStart():void;
    Leave():void
    {
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
         APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        this._Leave();
    }

    TimeUp():void
    {
        if(this._TimeUpClock>0)
        {
            APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = Laya.timer.currTimer;
        }
    }

    ContinueTime():void
    {
        APP.MessageCenter.Trigger(GameEvent.GameContinue);
        this._TimeUpCount += Laya.timer.currTimer - this._TimeUpClock;
        this._TimeUpClock = -1;
    }

    get CurGameTime():number
    {
        return this._CurGameTime + this._TimeUpCount;
    }
    
    //私有属性和功能
    private _CurGameTime:number;
    private _TimeUpCount:number;
    private _TimeUpClock:number;

    constructor()
    {
        super();
        this.SceneMgr = GM.SceneMgr;
        this._TimeUpCount = 0;
        this._CurGameTime = 0;
        this._TimeUpClock = -1;
    }
}