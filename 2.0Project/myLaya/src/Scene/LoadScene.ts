import BaseScene from "./BaseScene"
import BaseDirector from "./BaseDirector"
import {ui} from "./../ui/layaMaxUI"
import {path} from "./../Utility/Path"
import {Scene} from "./../Scene/Scene"
import FrameWork from "./../FrameWork/FrameWork"
import LoadingUI from "./../ui/UnDownload/LoadingUI"
import FMWork from "./../FrameWork/FrameWork"
import GuiderManager from "./GuiderManager"
import APP from "./../controler/APP"
import BG from "./../ui/BG"

export default class LoadScene extends Scene.BaseScene
{
    constructor()
    {
        super();
    }
    
    protected GenDirector():Scene.BaseDirector
    {
        return new LoadDirctor();
    }
}



class LoadDirctor extends Scene.BaseDirector
{
    constructor()
    {
        super();
    }

    public Start()
    {
        var loadList2D = [{url:"ui/Resource/LoadUI.json",type:Laya.Loader.JSON},{url:"ui/Resource/localcomp.atlas",type:Laya.Loader.ATLAS}];
        this.ChangeGamePlay( new Scene.LoadSceneLogic(loadList2D,null,new LoadScenePlaye()) );
    }

    public End()
    {

    }

    ReStart():void
    {
    }
}

//加载场景逻辑
class LoadScenePlaye extends Scene.BaseScenePlaye
{
    private m_Count2DLoad:number;
    private m_Count3DLoad:number;
    private m_LoadFaile:boolean;
    private m_CountValue:number;
    private m_LoadingUI:LoadingUI;
    
    constructor()
    {
        super();
        this.m_Count2DLoad = 0;
        this.m_Count3DLoad = 0;
        this.m_LoadFaile = false;
        this.m_CountValue = 0;
    }

    private StartLoad()
    {
        this.m_CountValue = 0;
        this.m_LoadFaile = false;
        var resource2DArr = [
            path.GetDepathUIJS("Enter"),
            path.GetDepathUIJS("GameRank"),
            path.GetDepathUIJS("SetPanel"),
            path.GetDepathUIJS("ItemList"),
            path.GetDepathUIJS("Character"),
            path.GetDepathUIJS("PlayerList"),
            path.GetDepathUIJS("BG"),
            path.GetAtlPath("comp")
            ];
        
        Laya.loader.once(Laya.Event.ERROR,this,this.onError);
        Laya.loader.once(Laya.Event.COMPLETE,this,this.onComplete);
        var resource3DArr = [ 
            path.GetLH("c001_child_01") ,
            path.GetLH("L01_spr_barrier_01"),
            path.GetLH("L01_spr_barrier_02"),
            path.GetLH("L01_spr_barrier_03"),
            path.GetLH("L01_spr_barrier_04"),
            path.GetLH("L01_spr_plat_01"),
            path.GetLH("L01_spr_plat_02"),
            path.GetLH("L01_spr_plat_03"),
            path.GetLH("item_coin_01"),
            path.GetLH("item_flyer_01"),
            path.GetLH("item_shield_01"),
            path.GetLH("item_untouchable_01"),
            path.GetLH("trap_chomper_01"),
            path.GetLH("trap_entangle_01"),
            path.GetLH("trap_sting_01"),
            path.GetLH("item_absord_01"),
        ]
        this.Load(resource2DArr,resource3DArr);
    }

    private Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        
        if(arr2D!=null)
        {
            Laya.loader.load(arr2D,null,Laya.Handler.create(this,this.on2DProgress,null,false));
            this.m_Count2DLoad = 0;
            this.m_CountValue -=0.5;
        }
        if(arr3D!=null)
        {
            Laya.loader.create(arr3D,Laya.Handler.create(this,null),Laya.Handler.create(this,this.on3DProgress,null,false));
            this.m_Count3DLoad = 0;
            this.m_CountValue -=0.5;
        }
    }

    private on3DProgress(value:number)
    {
        if(this.m_LoadFaile)
        {
            return;
        }
        this.m_Count3DLoad =value/2;
        this.m_LoadingUI.Value = (this.m_Count2DLoad + this.m_Count3DLoad);
    }
    private on2DProgress(value:number)
    {
        
        if(this.m_LoadFaile)
        {
            return;
        }
        this.m_Count2DLoad =value/2;
        this.m_LoadingUI.Value = (this.m_Count2DLoad + this.m_Count3DLoad);
    }
    private onError(str:string)
    {
        this.m_LoadFaile = true;
        console.debug("LoadError:"+str);
    }

    protected onComplete(data)
    {
        if(this.m_LoadFaile)
        {
            var thiDir = this;
            this.m_LoadingUI.Reload(function():void{thiDir.Load()} );
        }else
        {
            APP.SceneManager.BG = new BG();
            this.m_LoadingUI.Complete(()=>{GuiderManager.Mgr.EnterScene()});
        }
        return;
    }
    
    public Start()
    {
        this.m_LoadingUI = APP.UIManager.Show<LoadingUI>(LoadingUI);
        this.m_Count3DLoad = 0.5;
        this.m_Count2DLoad = 0.5;
        this.m_CountValue = 1;
        this.m_LoadFaile = false;
        this.StartLoad();
    }
    
    public End()
    {
        console.log("LoadComplete");
    }

    public Update()
    {
    }
}
/*
export default class LoadScene extends BaseScene
{
    CurDir:BaseDirector;

    constructor()
    {
        super();
    }
    protected _GenDir():void
    {
        this.CurDir = new LoadDirctor();
    }
    
    StartLoad():void
    {
        var resCol = [{url:"ui/Resource/LoadUI.json",type:Laya.Loader.JSON},{url:"ui/Resource/localcomp.atlas",type:Laya.Loader.ATLAS}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this._LoadComplete));
    }
    
}
*/
/*
class LoadDirctor extends BaseDirector
{
    UI:LoadingUI;
    
    ReStart():void
    {
    }

    _Count2DLoad:number;
    _Count3DLoad:number;
    _LoadFaile:boolean;
    constructor()
    {
        super();
        this._Count3DLoad = 0.5;
        this._Count2DLoad = 0.5;
    }

    protected _Start()
    {
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        Laya.loader.on(Laya.Event.COMPLETE,this,this._onComplete);
        this.Load();
        super._Start();
        this._LoadFaile = false;
    }

    protected _StartComplete()
    {
        super._StartComplete();
        this.UI = APP.UIManager.Show<LoadingUI>(LoadingUI);
        this.UI.Update();
    }
    protected Load()
    {
        this._Count2DLoad =0;
        this._Count3DLoad =0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            path.GetDepathUIJS("Enter"),
            path.GetDepathUIJS("SetPanel"),
            path.GetDepathUIJS("ItemList"),
            path.GetDepathUIJS("Character"),
            path.GetDepathUIJS("PlayerList"),
            path.GetDepathUIJS("BG"),
            path.GetAtlPath("comp")
            ];
        //resource2DArr = null;
        
        
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        Laya.loader.on(Laya.Event.COMPLETE,this,this._onComplete);
        //var resource3DArr = ["C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        var resource3DArr = [ 
            path.GetLH("c001_child_01") ,
            path.GetLH("L01_spr_barrier_01"),
            path.GetLH("L01_spr_barrier_02"),
            path.GetLH("L01_spr_barrier_03"),
            path.GetLH("L01_spr_barrier_04"),
            path.GetLH("L01_spr_plat_01"),
            path.GetLH("L01_spr_plat_02"),
            path.GetLH("L01_spr_plat_03"),
            path.GetLH("item_coin_01"),
            path.GetLH("item_flyer_01"),
            path.GetLH("item_shield_01"),
            path.GetLH("item_untouchable_01"),
            path.GetLH("trap_chomper_01"),
            path.GetLH("trap_entangle_01"),
            path.GetLH("trap_sting_01"),
            path.GetLH("item_absord_01"),
        
        
        ]// "C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        this._Load(resource2DArr,resource3DArr);
    }
    
    protected _Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        
        if(arr2D!=null)
        {
           // Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
            Laya.loader.load(arr2D,null,Laya.Handler.create(this,this._on2DProgress,null,false));
            
        }else
        {
             this._CountValue+=0.5;
            this._Count2DLoad = 1;
        }
        if(arr3D!=null)
        {
            Laya.loader.create(arr3D,Laya.Handler.create(this,null),Laya.Handler.create(this,this._on3DProgress,null,false));
        }else
        {
             this._CountValue+=0.5;
            this._Count3DLoad = 1;
        }
    }
    protected _onError(str:string)
    {
        this._LoadFaile = true;
        console.debug("LoadError:"+str);
    }

    protected _on3DProgress(value:number)
    {
        if(this._LoadFaile)
        {
            return;
        }
        this._Count3DLoad =value/2;
        this.UI.Value = (this._Count2DLoad + this._Count3DLoad);
    }
    protected _on2DProgress(value:number)
    {
        
        if(this._LoadFaile)
        {
            return;
        }
        this._Count2DLoad =value/2;
        this.UI.Value = this._Count2DLoad + this._Count3DLoad;
    }
    protected _onComplete(data)
    {
        if(this._LoadFaile)
        {
            var thiDir = this;
            this.UI.Reload(function():void{thiDir.Load()} );
        }else
        {
            APP.SceneManager.BG = new BG();
            this.UI.Complete(()=>{GuiderManager.Mgr.EnterScene()});
        }
        return;
    }
    
    protected _Update():void
    {
       this.UI.Update();
    }
}*/