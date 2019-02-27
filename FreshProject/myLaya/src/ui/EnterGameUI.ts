import {ui} from "./layaMaxUI"
import {path} from "./../Utility/Path"
import BaseUI from "./BaseUI"
import FM from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import PlayerListUI from "./../ui/PlayerListUI"
import APP from "./../controler/APP"

class ExtendEnterGameUI extends ui.EnterUI {
    Panel:Laya.Panel;
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Enter")));
    }
    constructor()
    {
        super();
        this.Panel = this._Panel;
        this.Panel.vScrollBarSkin = "";
        this.Panel.hScrollBarSkin = "";
        this._Character.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.ShowCharacterPanel);
        this._SetPanel.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.ShowSetPanel);
        this._Start.on(Laya.Event.CLICK,APP.GameControler,APP.GameControler.EnterGame);
    }        
}

export default class EnterGameUI extends BaseUI
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
        var uiMgr:UIManager = this._UIManager;
        this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
    }
}