import BaseUI from "./../BaseUI"
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
import LoadUIScene from "./LoadUIScene";
import {path} from "../../Utility/Path";
module ui {
    export class LoadingUI extends Laya.View {
		public _Progress:Laya.ProgressBar;
		public _Guider:Laya.Image;
		public _Enter:Laya.Button;
        public ErrorInfo:Laya.Label;
        public logo:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Loading");
        }
    }
}

class ExtLoadingUI extends ui.LoadingUI
{
    
    createChildren()
    {
        this.createView(Laya.loader.getRes("ui/Resource/LoadUI.json"));
    }
    constructor()
    {
        super();
    }
}

export default class LoadingUI extends BaseUI
{
    public static Name():string
    {
        return  "LoadingUI";
    }
    _UI:ui.LoadingUI;
    _CallBack:()=>void;
    constructor( name:string )
    {
        super(name);
        //this._UI =new ui.LoadingUI();
        this._UI =new ExtLoadingUI();
        this.FixUI(this._UI );
        this.Value = 0;
        this._UI.ErrorInfo.visible = false;
        this._UI._Enter.visible =false;
        this._UI._Enter.on(Laya.Event.CLICK,this,()=>{
            this._CallBack();
        });
        this.Layout();
        
        this._UI.logo.x = this._UI.logo.width * 0.1 / 2;
        this._UI.logo.scaleX = 0.9;
        this._UI.logo.scaleY = 0.9;
        
        var scene:Laya.Scene3D = Laya.loader.getRes("ui/Resource/LayaScene_MainScene/Conventional/MainScene.ls") as Laya.Scene3D;
        scene.ambientColor = new Laya.Vector3(1, 1, 1);

        var gameObject:Laya.Sprite3D = scene.getChildByName("GameObject") as Laya.Sprite3D;
        var zhuyemian_qiu1_idle:Laya.Sprite3D = scene.getChildByName("zhuyemian_qiu1_idle") as Laya.Sprite3D;

        gameObject.transform.localScale = new Laya.Vector3(0.8, 0.8, 0.8);
        zhuyemian_qiu1_idle.transform.localScale = new Laya.Vector3(0.75, 0.75, 0.75);

        var camera:Laya.Camera = scene.getChildByName("Camera") as Laya.Camera;
        camera.active = false;
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        camera.clearColor=new Laya.Vector4(0,0,0,0);
        var newCamera:Laya.Camera = new Laya.Camera();
        newCamera.transform.position = camera.transform.position;
        newCamera.transform.rotation = camera.transform.rotation;
        scene.addChild(newCamera);
        this._UI["bg"].addChild(scene);
        //this._UI["bg"].addChild(new LoadUIScene());      
    }
    
    Update()
    {
        var x:number = 0;
        x += this._UI._Progress.width*this._UI._Progress.value;
        this._UI._Guider.pos(x,this._UI.y);
    }

    Layout() {
        if(!this._UI || !this._UI["bg"]) {
            return;
        }
        this._UI["bg"].width = Laya.stage.width;
        this._UI["bg"].height = Laya.stage.height;
    }

    set Value(num:number)
    {
        this._UI._Progress.value = num;
        this.Update();
    }

    get value():number
    {
        return this._UI._Progress.value;
    }

    Complete(callBack:()=>void)
    {
        this._UI._Progress.visible = false;
        this._CallBack = callBack;
        this._UI._Enter.visible = true;
        this._UI._Enter.label = "";
    }
    Reload(str, callBack:()=>void)
    {
        this._UI.ErrorInfo.text = str;
        this._UI.ErrorInfo.visible = true;
        this._UI.ErrorInfo.width = Laya.stage.width;
        this._UI.ErrorInfo.height = Laya.stage.height;
    }

}