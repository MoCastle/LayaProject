/**
 * 作者:Mo
 * 启动场景
 */
import FrameWork from "./FrameWork/FrameWork"
import UIManager from "./FrameWork/UIManager"
import SceneManager from "./FrameWork/SceneManager"
import LoadScene from "./Scene/LoadScene"
import { ui } from "./ui/layaMaxUI";
import LoadingUI from "./ui/LoadingUI";
class Game
{
	//MainUI:ui.LoadingUI;
	_Frame:FrameWork;
    //SceneMgr:SceneManager;
    constructor()
    {
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
		//Laya.Stat.show();
		
		//this._Frame = FrameWork.FM;
		//this._Frame.AddManager<UIManager>(UIManager);
		//var sceneMgr:SceneManager = this._Frame.AddManager<SceneManager>(SceneManager);
		//sceneMgr.EnterScene(new LoadScene());
		//Laya.timer.frameLoop(1,this,this.Update);
    }
	
    Update( )
    {
		//this.SceneMgr.Update();
		//this._Frame.Update();
    }
}
var GM = new Game();
