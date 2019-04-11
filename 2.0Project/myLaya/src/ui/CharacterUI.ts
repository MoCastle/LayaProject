
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
import CharacterUIScene from "../Scene/CharacterUIScene";
import EndGameUI from "./EndGameUI";

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
    private spriteBgArr:Laya.Sprite[] = [];
    private characterUIScene:CharacterUIScene;

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
        
        this._UI._List.visible = false;

        this.spriteBgArr.push(this._UI.characterrole0bg);
        this.spriteBgArr.push(this._UI.characterrole1bg);
        this.spriteBgArr.push(this._UI.characterrole2bg);
        this.spriteBgArr.push(this._UI.characterrole3bg);
        this.spriteBgArr.push(this._UI.characterrole4bg);

        var len = this.spriteBgArr.length;
        for(var i = 0; i < len;i ++) {
            this.spriteBgArr[i].name = i + "";
            this.spriteBgArr[i].on(Laya.Event.CLICK, this, this.selectRolePosition);
        }
    }

    selectRolePosition(e:Laya.Event): void {
        var cntTarget = e.currentTarget;
        this.characterUIScene.updateSelectIndex(parseInt(cntTarget.name));
        this.InitPosition();
    }

    InitPosition(): void {
        if(!this.characterUIScene) {
            return;
        }
        var num = this.characterUIScene.arrayDis.length;
        for(var i = 0;i < num;i ++) {
            var _outPos:Laya.Vector3 = new Laya.Vector3();
            this.characterUIScene.camera.viewport.project(this.characterUIScene.arrayDis[i].transform.position, this.characterUIScene.camera.projectionViewMatrix, _outPos);
            var _outPos1 = new Laya.Point(_outPos.x, _outPos.y);
            this._UI.layoutbg.globalToLocal(_outPos1);
            this.spriteBgArr[i].pos(_outPos1.x / Laya.stage.clientScaleX, _outPos1.y / Laya.stage.clientScaleY);
            this.spriteBgArr[i].pivotX = 207 / 2;
            this.spriteBgArr[i].pivotY = this.spriteBgArr[i].height - 5;
            this.spriteBgArr[i].visible = true;

            this.spriteBgArr[i].scaleX = 0.8 + ((this.characterUIScene.arrayDis[i].transform.localScaleX - this.characterUIScene.initScalNum) / 0.004) * 0.2;
            this.spriteBgArr[i].scaleY = 0.8 + ((this.characterUIScene.arrayDis[i].transform.localScaleX - this.characterUIScene.initScalNum) / 0.004) * 0.2;
        }
    }

    BackGameBtn(): void {
        var enterpanel:EnterGameUI = APP.UIManager.GetUIByName("EnterGameUI") as EnterGameUI;
        enterpanel._UI.y = Laya.stage.height;
        Laya.Tween.to(enterpanel._UI, {y: 0}, 500, Laya.Ease.sineOut);
        Laya.Tween.to(this, {y: -Laya.stage.height}, 500, Laya.Ease.sineOut, Laya.Handler.create(this, ()=>{
            APP.UIManager.Close(this);
        }));
        this._UI.removeChild(this.characterUIScene);
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

        var scaleX = Laya.stage.width / Laya.stage.height;
        var scaleY = 750 / 1334;
        if(scaleX > scaleY) {
            scaleY = scaleY / scaleX;
            this._UI.layoutbg.pivotX = 750 / 2;
            this._UI.layoutbg.pivotY = 1334 / 2;
            var _outPos:Laya.Vector3 = new Laya.Vector3();
            this.characterUIScene.camera.viewport.project(new Laya.Vector3(0, -this.characterUIScene.startY - 0.01, 0), this.characterUIScene.camera.projectionViewMatrix, _outPos);
            this._UI.layoutbg.x = _outPos.x;
            this._UI.layoutbg.y = _outPos.y;
            this._UI.layoutbg.scaleX = this._UI.layoutbg.scaleY = scaleY;
            this.InitPosition();
        }
    }

    SetList() {
        // var listArray: Array<any> = this.m_CharacterList;
        // this._UI._List.hScrollBarSkin = "";
        // this._UI._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        // this._UI._List.array = listArray;
        // this._UI._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        // this._UI._List.scrollBar.elasticDistance = 50
    }

    Update() {

    }
    Open()  {
        APP.MessageManager.Regist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.Regist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.Regist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
        this.characterUIScene = new CharacterUIScene(this.InitPosition.bind(this));
        this._UI.addChild(this.characterUIScene);
        this.characterUIScene.visible = false;
        var len = this.spriteBgArr.length;
        for(var i = 0; i < len;i ++) {
            this.spriteBgArr[i].visible = false;
        }
        setTimeout(function(){
            this.characterUIScene.visible = true;
            this.InitPosition();
        }.bind(this), 480);
        this.Layout();
    }

    Close()  {
        APP.MessageManager.DesRegist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.DesRegist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.DesRegist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
       
    }

    //事件
    private OnClickImg(id: number) {
        if (id == PlayerGuestAgent.GuestAgent.CharacterID)  {
            this.BackGameBtn();
            return;
        }
        GameControler.GameControler.SetPlayerID(id);
    }

    private OnNeedCloseUI(): void  {
        if (!this.Showing)  {
            return;
        }
        this.BackGameBtn();
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

