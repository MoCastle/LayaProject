module ui {
    export class ExtendsLoadUI extends ui.LoadingUI
    {
            Guider:Laya.Sprite;
            Progress:Laya.ProgressBar;
            Enter:Laya.Button;

            Update()
            {
                var x:number = 0;
                x += this.Progress.width*this.Progress.value;
                this.Guider.pos(x,this.Guider.y);
            }

            createChildren():void
            {
                var res:JSON = Laya.loader.getRes("res/uijson/Loading.json");
                this.createView(res);
                super.createChildren();
            }
            set Value(num:number)
            {
                this.Progress.value =num;
                this.Update();
            }
            Complete(callBack:()=>void)
            {
                this._CallBack = callBack;
                this.Enter.visible = true;
                this.Enter.label = this._Name[0];
            }
            Reload(callBack:()=>void)
            {
                this._CallBack = function(){this.Enter.visible = false;callBack();}
                this.Enter.visible = true;
                this.Enter.label = this._Name[1];
            }

            _Name:Array<string>;
            _CallBack:()=>void;
            constructor()
            {
                super();
                this.Guider = this._Guider;
                this.Progress = this._Progress;
                this.Enter = this._Enter;
                this._Name = this.Enter.label.split("#");
                this.Enter.visible = false;
                this.Enter.on(Laya.Event.CLICK,this,this._OnClickButton);
            }

            _OnClickButton()
            {
                if(this._CallBack!=null)
                {
                    this._CallBack();
                }
            }
    }
}
class LoadUI extends BaseUI
{
    LoadUI:ui.ExtendsLoadUI;
    constructor()
    {
        super();
        this.LoadUI = new ui.ExtendsLoadUI();
        this.addChild(this.LoadUI);
    }
    Update()
    {
        this.LoadUI.Update();
    }

    set Value(num:number)
    {
        this.LoadUI.Value = num;
    }
    Complete(callBack:()=>void)
    {
        this.LoadUI.Complete(callBack);
    }
    Reload(callBack:()=>void)
    {
        this.LoadUI.Reload(callBack);
    }
}