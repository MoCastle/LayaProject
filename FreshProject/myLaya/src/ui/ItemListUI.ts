
import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";
import {MessageMD} from "./../FrameWork/MessageCenter"
import ItemElement from "./../script/ItemElement"

class ExtendsItemListUI extends ui.ItemListUI
{
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("ItemList")));
    }
    SetList()
    {
        var listArray:Array<any> = ["","","","","","","","","",""];
        this._List.hScrollBarSkin = "";
        this._List.renderHandler = new Laya.Handler(this,this._RenderHandler);
        this._List.array = listArray;
        this._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this._List.scrollBar.elasticDistance = 50
    }
    BtnListener:MessageMD.Delegate;
    constructor()
    {
        super();
    }
        
    private _RenderHandler(cell:Laya.Box,index:number):void
    {
        var roleElement:ItemElement = cell as ItemElement;
        roleElement.SetBtn(this.BtnListener.Listener,this.BtnListener.Action);
    }
}
export default class ItemListUI extends BaseUI
{
    static Name():string
    {
        return "ItemListUI";
    }
    UI:ExtendsItemListUI;
    constructor(name:string)
    {
        super(name);
        this.UI = new ExtendsItemListUI();
        this.FixUI(this.UI);
        this.UI.BtnListener = new MessageMD.Delegate(this,()=>{ this._UIManager.Close(this)})
        this.UI.SetList();
        this._UIType = BaseEnum.UITypeEnum.Midle;
    }

}