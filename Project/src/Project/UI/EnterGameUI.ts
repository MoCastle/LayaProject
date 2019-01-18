
module ui {
    export class ExtendEnterGameUI extends ui.EnterSceneUI {
        Panel:Laya.Panel;
        constructor()
        {
            super();
            this.Panel = this._Panel;
            this.Panel.vScrollBarSkin = "";
            this.Panel.hScrollBarSkin = "";
            this._Character.on(Laya.Event.CLICK,null,ControlAPP.GameControler.ShowCharacterPanel);
            this._SetPanel.on(Laya.Event.CLICK,null,ControlAPP.GameControler.ShowSetPanel);
            this._Start.on(Laya.Event.CLICK,null,ControlAPP.GameControler.EnterGame);
        }
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/EnterScene.json");
            this.createView(res);
            super.createChildren();
        }
    }
}
class EnterGameUI extends BaseUI
{
    UI:ui.ExtendEnterGameUI;
    constructor()
    {
        super();
        this.UI= new ui.ExtendEnterGameUI();
        this.addChild(this.UI);
    }
}