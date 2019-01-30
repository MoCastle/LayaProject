class LoadScene extends BaseScene
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
        var resCol = [{url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS},{url:"res/uijson/Loading.json",type:Laya.Loader.JSON}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this._LoadComplete));
    }
    
}

class LoadDirctor extends BaseDirector
{
    UI:LoadUI;
    
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
        this.Load();
        super._Start();
        this._LoadFaile = false;
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
    }
    protected _StartComplete()
    {
        super._StartComplete();
        this.UI =APP.UIManager.Show<LoadUI>(LoadUI);
        this.UI.Update();
    }
    protected Load()
    {
        this._Count2DLoad =0;
        this._Count3DLoad =0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            {url:"res/uijson/PlayerList.json",type:Laya.Loader.JSON},
            {url:"res/uijson/Characters.json",type:Laya.Loader.JSON},
            {url:"res/uijson/SetPanel.json",type:Laya.Loader.JSON},
            {url:"res/atlas/comp.atlas",type: Laya.Loader.ATLAS }
            ];
        var resource3DArr = ["http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_01/L01_spr_plat_01.lh","http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_01/L01_spr_barrier_01.lh"]
        this._Load(resource2DArr,resource3DArr);
    }
    protected _Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        if(arr2D!=null)
        {
            Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
        }else
        {
             this._CountValue+=0.5;
            this._Count2DLoad = 1;
        }
        if(arr3D!=null)
        {
            Laya.loader.create(arr3D,Laya.Handler.create(this,this._on3DLoaded),Laya.Handler.create(this,this._on3DProgress,null,false));
        }else
        {
             this._CountValue+=0.5;
            this._Count3DLoad = 1;
        }
    }
    protected _onError(str:string)
    {
        this._LoadFaile = true;
        console.debug(str);
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
    protected _onLoaded()
    {
        this.UI.Complete(StageAPP.GuiderManager.EnterScene);
        
        this._CountValue+=0.5
        if(this._LoadFaile)
            {
                var thiDir = this;
                this.UI.Reload(function():void{thiDir.Load()} );
            }else
                this.UI.Complete(StageAPP.GuiderManager.EnterScene)
                
    }
    protected _on3DLoaded()
    {
        this._CountValue+=0.5
        if(this._CountValue >=1)
        {
            if(this._LoadFaile)
            {
                var thiDir = this;
                this.UI.Reload(function():void{thiDir.Load()} );
            }else
                this.UI.Complete(StageAPP.GuiderManager.EnterScene)
        }
    }
    protected _Update():void
    {
        
    }
}