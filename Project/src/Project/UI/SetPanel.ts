module ui {
    export class ExtendsSetPanel extends ui.SetPanelUI
    {
        constructor()
        {
            super();
            //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
            this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView();StageAPP.GuiderManager.EnterScene()});
            this.SetPanel();
        }

        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/SetPanel.json");
            this.createView(res);
            super.createChildren();
        }

        SetPanel()
        {
            var info:SetInfo = ControlAPP.GameControler.GetSetInfo();
            this._AudioSwitch.selectedIndex = info.AudioOn?0:1;
            this._OPSwitch.selectedIndex = info.OPIsRight?1:0;
            this._Text.text = info.TextInfo;
        }
        SavePanel()
        {
            var info:SetInfo = new SetInfo();
            info.AudioOn = this._AudioSwitch.selectedIndex == 0;
            info.OPIsRight = this._OPSwitch.selectedIndex == 1;
            ControlAPP.GameControler.SaveSetInfo(info);
        }

        CloseOP()
        {
            this.SavePanel();
        }
    }
}
class SetPanelUI extends BaseUI
{
    static Name():string
    {
        return "SetPanel";
    }
    SetPanel()
    {
        this.UI.SetPanel();
    }
    SavePanel()
    {
        this.UI.SavePanel();
    }

    CloseOP()
    {
        this.UI.CloseOP();
    }
    UI:ui.ExtendsSetPanel;
    constructor(name:string)
    {
        super(name);
        this._UIType = UITypeEnum.Midle;
        this.UI = new ui.ExtendsSetPanel();
        this.addChild(this.UI);
    }

    
}