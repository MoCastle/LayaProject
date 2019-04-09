import BaseUI from "./../BaseUI"
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;

module ui {
    export class LoadingUI extends Laya.View {
		public _Progress:Laya.ProgressBar;
		public _Guider:Laya.Image;
		public _Enter:Laya.Button;
		public ErrorInfo:Laya.Label;
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

        callBack();
        // this._CallBack = callBack;
        // this._UI._Enter.visible = true;
        // this._UI._Enter.label = "Enter";//this._Name[0];
    }
    Reload(callBack:()=>void)
    {
        this._UI.ErrorInfo.visible = true;
    }

}