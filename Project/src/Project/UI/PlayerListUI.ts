
module ui {
    export class PlayerList extends ui.PlayerListUI
    {
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/PlayerList.json");
            this.createView(res);
            super.createChildren();
        }
        constructor()
        {
            super();
        }
    }
}

class PlayerListUI extends BaseUI
{
    static Name():string
    {
        return "PlayerListUI";
    }

    UI:ui.PlayerList;
    constructor(name:string)
    {
        super(name);
        this._UIType = UITypeEnum.Midle;
        this.UI = new ui.PlayerList();
        this.addChild(this.UI);
        
        this.UI._ReturnMain.on(Laya.Event.CLICK,null,()=>{
            StageAPP.GuiderManager.EnterScene();
        });
    }
}
