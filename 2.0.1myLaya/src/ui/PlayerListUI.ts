import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";

class ExtendPlayerList extends ui.PlayerListUI
{
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("PlayerList")));
    }
    constructor()
    {
        super();
    }
}
export default class PlayerListUI extends BaseUI
{
    static Name():string
    {
        return "PlayerListUI";
    }

    _UI:ExtendPlayerList;
    constructor(name:string)
    {
        super(name);
        this._UIType = BaseEnum.UITypeEnum.Midle;
        this._UI = new ExtendPlayerList();
        this.addChild(this._UI);
        this.FixUI(this._UI);
        this._UI._ReturnMain.on(Laya.Event.CLICK,null,()=>{
            GuiderManager.Mgr.EnterScene();
        });
    }

    public ShowList()
    {

    }
    
    Update()
    {}
}
