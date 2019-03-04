/**
 * 作者:Mo
 * 启动场景
 */

import FrameWork from "./FrameWork/FrameWork"
import UIManager from "./FrameWork/UIManager"
import SceneManager from "./FrameWork/SceneManager"
import {MessageMD} from "./FrameWork/MessageCenter"
import LoadScene from "./Scene/LoadScene"
import { ui } from "./ui/layaMaxUI";
import APP from "./controler/APP"
import GameConfig from "./GameConfig"
class Game
{
	_Frame:FrameWork;
    constructor()
    {
        var ss = APP;
        
        Laya3D.init(0, 0);
        GameConfig.init();
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
		Laya.Stat.show();
        
        var resCol = [{url:"ui/Resource/LoadUI.json",type:Laya.Loader.JSON},{url:"ui/Resource/localcomp.atlas",type:Laya.Loader.ATLAS}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this.onLoaded));
    }
    onLoaded()
    {
        this._Frame = FrameWork.FM;
        this._Frame.AddManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        var sceneMgr:SceneManager = this._Frame.AddManager<SceneManager>(SceneManager);
        this._Frame.AddManager<UIManager>(UIManager);
		sceneMgr.EnterScene(new LoadScene());
        Laya.timer.frameLoop(1,this,this.Update);
    }
	
    Update( )
    {
		//this.SceneMgr.Update();
		this._Frame.Update();
    }
}
var GM = new Game();