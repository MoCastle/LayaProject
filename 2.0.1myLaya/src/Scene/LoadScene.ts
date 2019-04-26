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
    private m_LoadFaile:string;
    private m_CountValue:number;
    private m_LoadingUI:LoadingUI;
    
    constructor()
    {
        super();
        this.m_Count2DLoad = 0;
        this.m_Count3DLoad = 0;
        this.m_LoadFaile = "";
        this.m_CountValue = 0;
    }

    private StartLoad()
    {
        this.m_CountValue = 0;
        this.m_LoadFaile = "";
        var resource2DArr = [
            path.GetDepathUIJS("Enter"),
            path.GetDepathUIJS("Game"),
            path.GetDepathUIJS("GameRank"),
            path.GetDepathUIJS("SetPanel"),
            path.GetDepathUIJS("ItemList"),
            path.GetDepathUIJS("toolItem"),
            path.GetDepathUIJS("Character"),
            path.GetDepathUIJS("PlayerList"),
            path.GetDepathUIJS("BG"),
            path.GetAtlPath("entersceneui"),
            path.GetAtlPath("entersceneui/res1"),
            path.GetAtlPath("entersceneui/res2"),
            path.GetAtlPath("entersceneui/res3"),
            path.GetAtlPath("entersceneui/res4"),
            path.GetAtlPath("entersceneui/res5"),
            path.GetAtlPath("entersceneui/gk"),
            path.GetAtlPath("comp"),
            path.GetJsonPath("CharacterInfo"),
            path.GetJsonPath("ItemInfo"),
            path.GetJsonPath("LevelInfo"),
            path.GetJsonPath("ObstacleInfo"),
            path.GetSoundpathUIJS("bg")
        ];
        
        Laya.loader.once(Laya.Event.ERROR,this,this.onError);
        Laya.loader.once(Laya.Event.COMPLETE,this,this.onComplete);
        var resource3DArr = [ 
            path.GetLH("c001_child_01"),
            path.GetLH("c001_baby_01"),
            path.GetLH("c001_adult_01"),
            path.GetLH("c001_senior_01"),
            path.GetLH("c001_teen_01"),
            path.GetLH("c002_child_01"),
            path.GetLH("c002_baby_01"),
            path.GetLH("c002_teen_01"),
            path.GetLH("L01_spr_barrier_01"),
            path.GetLH("L01_spr_barrier_02"),
            path.GetLH("L01_spr_barrier_03"),
            path.GetLH("L01_spr_barrier_04"),
            path.GetLH("dizuo_qiu01"),
            path.GetLH("dizuo_qiu02"),
            path.GetLH("dizuo_qiu03"),
            path.GetLH("L01_spr_plat_01"),
            path.GetLH("L01_spr_plat_02"),
            path.GetLH("L01_spr_plat_03"),
            path.GetLH("zhangaiwu_qiu01"),
            path.GetLH("zhangaiwu_qiu02"),
            path.GetLH("zhangaiwu_qiu03"),
            path.GetLH("zhangaiwu_qiu04"),
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
        this.m_LoadFaile += str;
        console.debug("LoadError:"+str);
    }

    protected onComplete(data)
    {   
        if(this.m_LoadFaile)
        {
            var thiDir = this;
            this.m_LoadingUI.Reload(this.m_LoadFaile,function():void{thiDir.Load()} );
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
        this.m_LoadFaile = "";
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