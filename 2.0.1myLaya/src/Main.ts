/**
 * 作者:Mo
 * 启动场景
 */
import FrameWork from "./FrameWork/FrameWork"
import SceneManager from "./FrameWork/SceneManager"
import LoadScene from "./Scene/LoadScene"
import { ui } from "./ui/layaMaxUI";
import APP from "./controler/APP"
import GameConfig from "./GameConfig"
import {path} from "./Utility/Path"
import UIManager from "./FrameWork/UIManager";
class Game
{
	_Frame:FrameWork;
    constructor()
    {
        var ss = APP;
        Laya3D.init(750,1334);
        GameConfig.init();
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
		Laya.Stat.hide();
        var resCol = [{url:"ui/Resource/localcomp.atlas",type:Laya.Loader.ATLAS},{url:"ui/Resource/LoadUI.json",type:Laya.Loader.JSON}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this.on3DLoaded));

    }

    on3DLoaded()
    {
        var arr3D = ["ui/Resource/zhuyemian_qiu1_idle/zhuyemian_qiu1_idle.lh"];
        Laya.loader.create(arr3D,Laya.Handler.create(this,this.onLoaded),Laya.Handler.create(this,null,null,false));
    }

    onLoaded()
    {
        APP.Init();
        var sceneMgr:SceneManager = APP.SceneManager;
        sceneMgr.ChangeScene(new LoadScene());
        Laya.timer.frameLoop(1,this,this.Update);
    }

    Update( )
    {
        APP.FrameWork.Update();
    }
}
var GM = new Game();
