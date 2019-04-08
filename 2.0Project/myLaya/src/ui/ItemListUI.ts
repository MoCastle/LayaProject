
import {ui} from "./layaMaxUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import {MessageMD} from "./../FrameWork/MessageCenter"
import {Player} from "./../Agent/PlayerEntity"
import {GameAgent} from "./../Agent/GameAgent"
import APP from "./../controler/APP"
import BaseUI from "./BaseUI"
import GuiderManager from "../Scene/GuiderManager";
import ItemElement from "./../script/ItemElement"
import GameControler from "./../controler/GameControler"
import PlayerGuestAgent from "./../Agent/PlayerGuestAgent"
import GameAPP from "./../controler/GameAPP"

class ExtendsItemListUI extends ui.ItemListUI
{
    private m_ItemList:Array<number>
    BtnListener:MessageMD.Delegate;
    constructor()
    {
        super();
        this.m_ItemList = [];
    }
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("ItemList")));
    }
}
export default class ItemListUI extends BaseUI
{
    static Name():string
    {
        return "ItemListUI";
    }
    private UI:ExtendsItemListUI;
    private m_Gold:string[];
    private m_ItemList:Array<number>;

    constructor(name:string)
    {
        super(name);
        this.UI = new ExtendsItemListUI();
        this.addChild(this.UI);
        this.UI.BtnListener = new MessageMD.Delegate(this,()=>{ this._UIManager.Close(this)})
        this._UIType = BaseEnum.UITypeEnum.Midle;
        this.UpdateList();
        //this.m_Gold = this.UI._Gold.text.split("#");
        //this.UI._BG.alpha = 0;
        //this.UI._BG.on(Laya.Event.CLICK,this,this.CloseUI)
    }

    public Open()
    {
        APP.MessageManager.Regist(Player.Event.OnMoneyChange,this.ShowGold,this);
        APP.MessageManager.Regist(Player.Event.OnItemListChange,this.RefreshList,this);
        
        this.ShowGold();
        this.UpdateList();
    }

    public Close()
    {
        APP.MessageManager.DesRegist(Player.Event.OnMoneyChange,this.ShowGold,this);
        APP.MessageManager.DesRegist(Player.Event.OnItemListChange,this.RefreshList,this);
    }

    public UpdateList()
    {
        this.GetItemList();
        this.SetList(this.m_ItemList);
    }

    public RefreshList()
    {
        this.GetItemList();
        this.FreshList(this.m_ItemList);
    }

    public GetItemList()
    {
        this.m_ItemList = GameAPP.ItemMgr.GetSellItemIDList();
    }

    public ShowGold()
    {
        if(!this.Showing)
        {
            return
        }
        this.m_Gold[1] ="" + PlayerGuestAgent.GuestAgent.Money;
        //this.UI._Gold.text = this.m_Gold[0] + this.m_Gold[1];
    }

    private _RenderHandler(cell:Laya.Box,index:number):void
    {
        var roleElement:ItemElement = cell as ItemElement;
        var itemList:Array<number> = GameAgent.Agent.ItemList;
        roleElement.Init();
        roleElement.ItemIdx = this.m_ItemList[index];
        roleElement.RegistBuy(this,this.BuyItem);
        roleElement.RegistChoose(this,this.ChooseItem);
        roleElement.IsGray = itemList[this.m_ItemList[index]]?false:true;
        roleElement.Num = itemList[this.m_ItemList[index]]?itemList[this.m_ItemList[index]]:0;
        roleElement.BtnLable = "" + GameAPP.ItemMgr.GetPrice(this.m_ItemList[index]) + "$";
        //roleElement.SetBtn(this.BtnListener.Listener,this.BtnListener.Action);
    }

    private SetList(listArray:Array<any>)
    {
        //var listArray:Array<any> = this.m_ItemList;
        this.UI._List.hScrollBarSkin = "";
        this.UI._List.renderHandler = new Laya.Handler(this,this._RenderHandler);
        this.UI._List.array = listArray;
        this.UI._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this.UI._List.scrollBar.elasticDistance = 50
    }

    public FreshList(idList)
    {
        this.UI._List.array = idList;
        this.UI._List.refresh();
    }

    Update()
    {

    }
    
    private BuyItem(id:number)
    {
        if(!this.Showing)
            return;
        PlayerGuestAgent.GuestAgent.BuyItem(id);
    }

    private ChooseItem(id:number)
    {
        if(!this.Showing)
            return;
        if(GameAgent.Agent.ItemList[id])
        {
            GameAgent.Agent.CurItem = id;
            APP.UIManager.Close(this);            
        }
    }
    private CloseUI()
    {
        APP.UIManager.Close(this);
    }
}