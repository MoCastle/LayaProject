import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";
import {GameStruct }  from "./../Game/GameStruct"
import APP from "./../controler/APP"

class ExtendEnterGameUI extends ui.EndGameUI {
    Panel:Laya.Panel;
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("EndGame")));
    }
    constructor()
    {
        super();
        //this.Panel = this.Panel;
        //this.Panel.vScrollBarSkin = "";
        //this.Panel.hScrollBarSkin = "";
        this._MenueBtn.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.ShowCharacterPanel);
        this._SetBtn.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.ShowSetPanel);
        this._StartBtn.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.EnterGame);
    }
}

export default class EnterGameUI extends BaseUI
{
    static Name():string
    {
        return "EnterGameUI";
    }
    UI:ExtendEnterGameUI;
    constructor(name:string)
    {
        super(name);
        this.UI= new ExtendEnterGameUI();
        this.FixUI(this.UI);
        //this.UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ this._UIManager.Show<PlayerListUI>(PlayerListUI)});
    }
}