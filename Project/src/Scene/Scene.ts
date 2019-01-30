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
    get CurDir():BaseDirector
    {
        return this._CurScene.CurDir;
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
        APP.UIManager.Clear();
        this._GenDir();
        super._StartComplete();
    }
}

//导演基类
abstract class BaseDirector extends LifeObj
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
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
        APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        super._Leave();
    }

    TimeUp():void
    {
        if(this._TimeUpClock<=0)
        {
            APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
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
        APP.MessageCenter.Trigger(GameEvent.GameContinue);
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
        this.SceneMgr = GM.SceneMgr;
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
    }
    protected _StartComplete()
    {
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        APP.UIManager.Clear();
        super._StartComplete();
    }
}