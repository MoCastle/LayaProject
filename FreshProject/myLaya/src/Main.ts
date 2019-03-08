/**
 * 作者:Mo
 * 启动场景
 */
/*
import {ui} from "./ui/layaMaxUI"
class Main {
    Center:Laya.Sprite3D;
    Dirty:Boolean;
	constructor() {
		Laya3D.init(0,0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.show();
        
        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0, 10));
        camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        this.Center = new Laya.Sprite3D();

        this.Center.addChild(box);
        scene.addChild(this.Center);
        Laya.stage.frameLoop(1,this,this.onUpdate);
        var Another: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        Another.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        box.transform.localPosition = new Laya.Vector3(-1,-1,0);
        Another.transform.localPosition = new Laya.Vector3(1,1,0);
        this.Center.addChild(Another);
        //UIFunc.FixUI(newUI);
        this.Dirty = true;
    }
    
	onUpdate():void
	{
        this.Center.transform.rotate(new Laya.Vector3(0,0,0.01));
	}
}
//激活启动类
new Main();



//激活启动类
new Main();
*/


import FrameWork from "./FrameWork/FrameWork"
import UIManager from "./FrameWork/UIManager"
import SceneManager from "./FrameWork/SceneManager"
import {MessageMD} from "./FrameWork/MessageCenter"
import LoadScene from "./Scene/LoadScene"
import { ui } from "./ui/layaMaxUI";
import APP from "./controler/APP"
import GameConfig from "./GameConfig"
import {path} from "./Utility/Path"
class Game
{
	_Frame:FrameWork;
    constructor()
    {
        var ss = APP;
        
        Laya3D.init(0,0,true);
        GameConfig.init();
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        if(Laya.Browser.onAndroid)
        {
            Laya.stage.frameRate = "slow"
        }
        //开启统计信息
		Laya.Stat.show()
        
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
