
import { ui } from "./layaMaxUI"
import BaseUI from "./BaseUI"
import { path } from "./../Utility/Path"
import GameControler from "./../controler/GameControler"
import APP from "./../controler/APP"
import UIManager from "../FrameWork/UIManager";
import FW from "../FrameWork/FrameWork";
import RoleElement from "./../script/RoleElement"
import PlayerGuestAgent from "./../Agent/PlayerGuestAgent"
import { MessageMD } from "./../FrameWork/MessageCenter"
import { Player } from "./../Agent/PlayerEntity"
import GameAPP from "../controler/GameAPP";
import EnterGameUI from "./EnterGameUI";

class ExtendCharactersUI extends ui.CharacterUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Character")));
    }

    constructor() {
        super();
    }
}

export default class CharacterUI extends BaseUI {

    private m_CharacterList: Array<any>;
    private m_GoldDiscribe: string[];
    private _RenderHandler(cell: Laya.Box, index: number): void {
        var roleElement: RoleElement = cell as RoleElement;
        roleElement.Reset();
        var characterList: Array<number> = PlayerGuestAgent.GuestAgent.CharacterList;
        roleElement.gray = characterList[index] ? false : true;
        roleElement.CharacterID = index;
        roleElement.RegistOnImgClick(() => { this.OnClickImg(index) });
    }
    private _UI: ExtendCharactersUI;
    constructor(name: string) {
        super(name);
        this._UI = new ExtendCharactersUI();
        this.FixUI(this._UI);
        this.GetCharacterList();
        this.SetList();
        this.m_CharacterList = [];
        //this.m_GoldDiscribe = this._UI._Gold.text.split("#");
        this.OnMoneyChange();
        this._UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
        this._UI._Gold.stroke = 2;
        this._UI._Gold.strokeColor = "0xff0000";

        this._UI.backBtn.on(Laya.Event.CLICK, this, this.BackGameBtn);
        this.Layout();

        this.InitPosition();
    }

    InitPosition(): void {
        
    }

    BackGameBtn(): void {
        var enterpanel:EnterGameUI = APP.UIManager.GetUIByName("EnterGameUI") as EnterGameUI;
        enterpanel._UI.y = Laya.stage.height;
        Laya.Tween.to(enterpanel._UI, {y: 0}, 150, Laya.Ease.sineOut);
        Laya.Tween.to(this, {y: -Laya.stage.height}, 150, Laya.Ease.sineOut, Laya.Handler.create(this, ()=>{
            APP.UIManager.Close(this);
        }));
    }

    static Name(): string {
        return "CharacterUI";
    }

    GetCharacterList()  {
        this.m_CharacterList = GameAPP.CharacterMgr.GetIDList();
    }

    Layout() {
        super.Layout();
        if(!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
    }

    SetList() {
        var listArray: Array<any> = this.m_CharacterList;
        this._UI._List.hScrollBarSkin = "";
        this._UI._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        this._UI._List.array = listArray;
        this._UI._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this._UI._List.scrollBar.elasticDistance = 50
    }

    Update() {

    }
    Open()  {
        APP.MessageManager.Regist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.Regist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.Regist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
    }

    Close()  {
        APP.MessageManager.DesRegist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.DesRegist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.DesRegist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
    }

    //事件
    private OnClickImg(id: number) {
        if (id == PlayerGuestAgent.GuestAgent.CharacterID)  {
            APP.UIManager.Close(this);
            return;
        }
        GameControler.GameControler.SetPlayerID(id);
    }

    private OnNeedCloseUI(): void  {
        if (!this.Showing)  {
            return;
        }
        APP.UIManager.Close(this);
    }

    private OnChangeList()  {
        if (!this.Showing)  {
            return;
        }
        this._UI._List.refresh()
    }

    private OnMoneyChange()  {
        if (!this.Showing)  {
            return;
        }
        //this.m_GoldDiscribe[1] = "" + PlayerGuestAgent.GuestAgent.Money;
        //this._UI._Gold.text = this.m_GoldDiscribe[0] + this.m_GoldDiscribe[1];
        this._UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
        this._UI._Gold.stroke = 2;
        this._UI._Gold.strokeColor = "0xff0000";
    }
}

