
import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";
import {MessageMD} from "./../FrameWork/MessageCenter"


class ExtendsItemListUI extends ui.ItemListUI
{
    createChildren():void
    {
        var res:JSON = Laya.loader.getRes("res/uijson/ItemList.json");
        this.createView(res);
        super.createChildren();
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
        this.addChild(this.UI);
        this.UI.BtnListener = new MessageMD.Delegate(this,()=>{ this._UIManager.Close(this)})
        this.UI.SetList();
        this._UIType = BaseEnum.UITypeEnum.Midle;
    }

}

class ItemElement extends Laya.Box
    {
        //
        Idx:number;
        private _Btn:Laya.Button;
        get Btn():Laya.Button
        {
            if(this._Btn == null)
            {
                this._Btn = this.getChildAt(1) as Laya.Button;
            }
            return this._Btn;
        }
        SetBtn(owner:any,listener:()=>void)
        {
            this.Btn.on(Laya.Event.CLICK,owner,listener);
        }
        //
        constructor()
        {
            super();
        }
    }