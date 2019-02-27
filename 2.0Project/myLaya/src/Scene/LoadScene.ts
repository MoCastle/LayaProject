import BaseScene from "./BaseScene"
import BaseDirector from "./BaseDirector"
import {ui} from "./../ui/layaMaxUI"
import FrameWork from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import LoadingUI from "./../ui/LoadingUI"
import FMWork from "./../FrameWork/FrameWork"
import GuiderManager from "./GuiderManager"
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
        var resCol = [{url:"ui/LoadUI.json",type:Laya.Loader.JSON},{url:"ui/Resource/comp.atlas",type:Laya.Loader.ATLAS}];
        
        Laya.loader.load(resCol,Laya.Handler.create(this,this._LoadComplete));
    }
    
}

class LoadDirctor extends BaseDirector
{
    UI:LoadingUI;
    
    ReStart():void
    {
    }

    _Count2DLoad:number;
    _Count3DLoad:number;
    _LoadFaile:boolean;
    _CountValue:number;
    constructor()
    {
        super();
        this._Count3DLoad = 0.5;
        this._Count2DLoad = 0.5;
    }

    //
    
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
        this.UI = FrameWork.FM.GetManager<UIManager>(UIManager).Show<LoadingUI>(LoadingUI);
        Laya.stage.addChild(this.UI);
        this.UI.Update();
    }
    protected Load()
    {
        this._Count2DLoad =0;
        this._Count3DLoad =0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            /*
            {url:"res/uijson/PlayerList.json",type:Laya.Loader.JSON},
            {url:"res/uijson/Characters.json",type:Laya.Loader.JSON},
            {url:"res/uijson/SetPanel.json",type:Laya.Loader.JSON},
            */
            ];
        resource2DArr = null;
        /*
        var resource3DArr = ["http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_01/L01_spr_plat_01.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_02/L01_spr_plat_02.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_03/L01_spr_plat_03.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_01/L01_spr_barrier_01.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_02/L01_spr_barrier_02.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_03/L01_spr_barrier_03.lh",
        "http://www.gsjgame.com/Resource/LayaScene_child_01/child_01.lh"]*/
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        Laya.loader.on(Laya.Event.COMPLETE,this,this._onComplete);
        var resource3DArr = ["C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"]
        this._Load(resource2DArr,resource3DArr);
    }
    protected _Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        if(arr2D!=null)
        {
            //Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
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
            this.UI.Complete(GuiderManager.Mgr.EnterScene);
            
        }
        return;
    }
    
    protected _Update():void
    {
       this.UI.Update();
    }
}