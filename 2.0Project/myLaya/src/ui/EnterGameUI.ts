import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {path} from "./../Utility/Path"

export class ExtendEnterGameUI extends ui.EnterUIUI {
    Panel:Laya.Panel;
    createChildren():void
    {
        var res:JSON = Laya.loader.getRes("res/uijson/EnterScene.json");
        this.createView(res);
        super.createChildren();
    }
    constructor()
    {
        super();
        this.Panel = this._Panel;
        this.Panel.vScrollBarSkin = "";
        this.Panel.hScrollBarSkin = "";
        //this._Character.on(Laya.Event.CLICK,null,ControlAPP.GameControler.ShowCharacterPanel);
        //this._SetPanel.on(Laya.Event.CLICK,null,ControlAPP.GameControler.ShowSetPanel);
        //this._Start.on(Laya.Event.CLICK,null,ControlAPP.GameControler.EnterGame);
    }        
}

class EnterGameUI extends BaseUI
{
    static Name():string
    {
        return "EnterGameUI";
    }
    _UI:ExtendEnterGameUI;
    constructor(name:string)
    {
        super(name);
        this._UI= new ExtendEnterGameUI();
        this.FixUI(this._UI);
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{APP.UIManager.Show<PlayerListUI>(PlayerListUI)});
    }
}