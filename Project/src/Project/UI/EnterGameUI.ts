module ui {
    export class EnterGameUI extends ui.EnterSceneUI
    {
        Panel:Laya.Panel;
        constructor()
        {
            super();
            this.Panel = this._Panel;
            this.Panel.vScrollBarSkin = "";
            this.Panel.hScrollBarSkin = "";
        }
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("EnterScene.json");
            this.createView(res);
            super.createChildren();
        }
    }
}

class EnterGameUI extends BaseUI
{
    private _UI:ui.EnterGameUI;
    constructor()
    {
        super();
        this._UI = new ui.EnterGameUI();
        this.addChild(this._UI);
    }
}