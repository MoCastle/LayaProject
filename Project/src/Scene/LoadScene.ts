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
        var resCol = [{url:"res/atlas/comp.atlas",type:Laya.Loader.ATLAS},{url:"Loading.json",type:Laya.Loader.JSON}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this._LoadComplete));
    }
    
}

class LoadDirctor extends BaseDirector
{
    UI:LoadUI;

    ReStart():void
    {
    }
    constructor()
    {
        super();
        this.UI = new LoadUI();
        this.Count3DLoad = 0.5;
        this.CountLoad = 0.5;
    }

    //
    CountLoad:number;
    Count3DLoad:number;
    protected _Start()
    {
        APP.UIManager.Open(this.UI);
        this.UI.Update();
        this.Load();
        super._Start();
    }
    protected Load()
    {
        this.CountLoad =0;
        this.Count3DLoad =0;  

        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        var resourceArr = [{url:"https://ldc.layabox.com/index/img/laya2_text.png"},{url:"https://ldc.layabox.com/index/img/cloud_text.png"},{url:"D:/TestProject/TSProject/Project/bin/res/layabox.png"},{url:"C:/Users/Administrator/Desktop/mbg.png"},{url:"https://raw.githubusercontent.com/MoCastle/Resources/master/lbl/Assets/Resource/LBL/tsx_bot129.Out.png"}];
        var resource3DArr = [{url:"sdf.ls"}]
        this._Load(resourceArr,resource3DArr);
    }
    protected _Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        if(arr2D!=null)
        {
            Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
        }
        if(arr3D!=null)
        {
            Laya.loader.create(arr3D,Laya.Handler.create(this,this._onLoaded3D),Laya.Handler.create(this,this._on3DProgress,null,false));
        }
    }
    protected _onError(str:string)
    {
        console.debug(str);
    }
    protected _on3DError(str:string)
    {
        console.debug(str);
    }
    protected _on3DProgress(value:number)
    {
        this.Count3DLoad +=value/2;
        this.UI.Value = (this.CountLoad + this.Count3DLoad);
    }
    protected _on2DProgress(value:number)
    {
        this.CountLoad +=value/2;
        this.UI.Value = this.CountLoad + this.Count3DLoad;
    }
    protected _onLoaded()
    {
        if(this.CountLoad + this.Count3DLoad>=1)
        {
            this.UI.Complete(StageAPP.GuiderManager.EnterScene)
        }else
        {
            this.UI.Reload(this.Load);
        }
    }
    protected _onLoaded3D()
    {
    }
    protected _Update():void
    {
        
    }
}