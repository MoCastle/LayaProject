
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
import { GameModule } from "../Game/GameModule";
import Controler from "./../controler/GameControler";
import ItemManager from "../GameManager/ItemManager";

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

class ToolItemUI extends ui.toolItemUI
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
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("toolItem")));
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

    public arrayDis:Laya.Sprite[] = [];
    public cntNum = 5;
    public startao = 270;
    public perao = 360 / this.cntNum;
    public r = 230;
    public startY = 575;
    public startX = 300;
    public cntSelectIndex = 0;

    public camera:Laya.Camera;
    public cntstartao = 90;
    public moveStarao = 2;
    public nextAo = -1;
    public initScalNum = 0.018;

    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"}
        ],
        "btn":
        [
            {key:"backBtn",textureName:"back.png"},
            {key:"buyBtn",textureName:"buy.png"},
            {key:"backBtn",textureName:"start.png"}
        ]
    };

    constructor(name:string)
    {
        super(name);

        this.UI = new ExtendsItemListUI();
        this.addChild(this.UI);
        this.UI.BtnListener = new MessageMD.Delegate(this,()=>{ this._UIManager.Close(this)})
        this._UIType = BaseEnum.UITypeEnum.Midle;
        //this.UpdateList();
        //this.m_Gold = this.UI._Gold.text.split("#");
        this.UI._BG.alpha = 0;
        this.UI._BG.on(Laya.Event.CLICK,this,this.CloseUI);
        this.UI.backBtn.on(Laya.Event.CLICK,this,this.CloseUI);
        this.UI._List.visible = false;
        this.Layout();

        this.cntSelectIndex = 0;//cntSelectIndex;
        
        for(var i = 0 ;i < this.cntNum;i ++) {
            var audt:ToolItemUI = new ToolItemUI();
            audt.toolicon.loadImage(ItemManager.Mgr.GetItemIcon(i));
            audt.toolname.text = ItemManager.Mgr.GetItemInfo(i).Passscore;
            // audt.loadImage(ItemManager.Mgr.GetItemIcon(i));
            audt.name = i  + "";
            this.UI.addChild(audt);
            this.arrayDis.push(audt);
            this.arrayDis[i].on(Laya.Event.CLICK, this, this.selectRolePosition);
        }
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.cntstartao = (this.startao + (this.cntNum - this.cntSelectIndex) * this.perao + 360) % 360;
        this.updateSelect();
        this.updateRoleInfo(this.cntSelectIndex);
        this.UI.buyBtn.on(Laya.Event.CLICK, this, this.BuyItem);
        this.updateSelfSceneUI();
    }

    updateSelfSceneUI() {
        for(var key in this.config) {
            var len = this.config[key].length;
            for(var i = 0;i < len;i ++) {
                this.UI[this.config[key][i].key].skin = (PlayerGuestAgent.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    }

     selectRolePosition(e:Laya.Event): void {
        var cntTarget = e.currentTarget;
        if(this.cntSelectIndex == parseInt(e.currentTarget.name)) {
            return;
        }
        //this.UI.backBtn.visible = false;
        this.UI.buyBtn.visible = false;
        this.UI.ownertxt.visible = false;
        this.UI.goldimg.visible = false;
        this.UI.roleuseNoney.visible = false;

        this.updateSelectIndex(parseInt(cntTarget.name));
    }

    calCntStartao(): void {
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.nextAo = (this.startao + (this.cntNum - this.cntSelectIndex) * this.perao + 360) % 360;

        if((this.nextAo - this.cntstartao + 360) % 360 >= 180) {
            this.moveStarao = -2
        }
        else
        {
            this.moveStarao = 2;
        }
        Laya.timer.loop(0.05, this, this.timeAoChange);
    }

    timeAoChange(): void {
        if(this.cntstartao == this.nextAo) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
            this.updateRoleInfo(this.cntSelectIndex);
            Laya.timer.clear(this, this.timeAoChange);
            return;
        }
        var lascntAo = this.cntstartao;
        this.cntstartao += this.moveStarao;
        if(this.cntstartao < 0 || this.cntstartao == 360) {
            this.cntstartao = (this.cntstartao + 360) % 360;
            lascntAo = this.cntstartao - this.moveStarao;
        }
        else
        {
            this.cntstartao = (this.cntstartao + 360) % 360;
        }
        
        if((lascntAo >= this.nextAo && this.cntstartao <= this.nextAo) || (lascntAo <= this.nextAo && this.cntstartao >= this.nextAo)) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
        }
        if(this.nextAo == -1) {
            this.updateRoleInfo(this.cntSelectIndex);
            Laya.timer.clear(this, this.timeAoChange);
        }
        this.updateSelect();
    }

    updateSelect(): void {
        for(var i = 0;i < this.arrayDis.length;i ++) {
            var ao = (this.cntstartao + i * this.perao) % 360
            var x = this.startX + this.r * Math.cos(ao * 3.14 / 180);
            var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            this.arrayDis[i].x = x;
            this.arrayDis[i].y = y;
            var scale = (y - this.startY) / 2 / (this.r - this.startY) * 0.2;
            if(scale >= 0) {
                this.arrayDis[i].scaleX = this.arrayDis[i].scaleY = (0.8 + scale);
            }
            else{
                this.arrayDis[i].scaleX = this.arrayDis[i].scaleY = 0.8;
            } 
        }
    }

    updateRoleInfo(id): void {
        // if(this.checkIsLock(id)) {
        //     this._UI.startGame.visible = true;
        //     this._UI.buyBtn.visible = false;
        //     this._UI.goldimg.visible = false;
        //     this._UI.roleuseNoney.visible = true;
        //     this._UI.roleuseNoney.text = "已解锁";
        // }
        // else 
        // {
            this.UI.backBtn.visible = true;
            this.UI.buyBtn.visible = true;
            this.UI.goldimg.visible = true;
            this.UI.roleuseNoney.visible = true;
            this.UI.ownertxt.visible = true;;
            this.UI.roleuseNoney.text = ItemManager.Mgr.GetPrice(this.cntSelectIndex) + "";
        //}
        var ownerNum = PlayerGuestAgent.GuestAgent.ItemList[this.cntSelectIndex];
        if(!ownerNum) {
            ownerNum = 0;
        }
        this.UI.ownertxt.text = "已拥有:" + ownerNum;
        var itemInfo = ItemManager.Mgr.GetItemInfo(id);
        this.UI.roleName.text = itemInfo.Passscore;
        this.UI.desc.text = itemInfo.Desc;
        this.UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
    }
    
    clearRoateTimer(): void {
        Laya.timer.clear(this, this.timeAoChange);
    }

    lastRole(): void {
        this.cntSelectIndex --;
        this.calCntStartao();
    }   

    nextRole(): void {
        this.cntSelectIndex ++;
        this.calCntStartao();
    }

    updateSelectIndex(selectIndex:number): void {
        if(selectIndex == this.cntSelectIndex) {
            return;
        }
        this.cntSelectIndex = selectIndex;
        this.calCntStartao();
    } 

    public Open()
    {
        APP.MessageManager.Regist(Player.Event.OnMoneyChange,this.ShowGold,this);
        APP.MessageManager.Regist(Player.Event.OnItemListChange,this.RefreshList,this);
        
        Controler.GameControler.TimePause();
        this.ShowGold();
        this.UpdateList();
    }

    public Close()
    {
        Controler.GameControler.TimeContinue();
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
        // this.m_Gold[1] ="" + PlayerGuestAgent.GuestAgent.Money;
        this.UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
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
        roleElement.BtnLable = "" + GameAPP.ItemMgr.GetPrice(this.m_ItemList[index]) + "";
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

    Layout() {
        super.Layout();
        if(!this.UI || !this.UI.bg) {
            return;
        }
        this.UI.bg.width = Laya.stage.width;
        this.UI.bg.height = Laya.stage.height;
    }
    
    private BuyItem(id:number)
    {
        PlayerGuestAgent.GuestAgent.BuyItem(this.cntSelectIndex);
        this.updateRoleInfo(this.cntSelectIndex);
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
        else
        {
            GameAgent.Agent.CurItem = -1;
        }
    }
    private CloseUI()
    {
        this.ChooseItem(this.cntSelectIndex);
        APP.UIManager.Close(this);
    }
}