
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
import CharacterManager from "../GameManager/CharacterMamager";
import { GameManager } from "../GameManager/GameManager";
import UIButtonTouchEvent from "../Utility/UIButtonTouchEvent";

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
    private cntCharacterId:number;
    private _UI: ExtendCharactersUI;
    private cntSelectSex:number = 1;

    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"}

        ],
        "btn":
        [
            {key:"backBtn",textureName:"back.png"},
            {key:"buyBtn",textureName:"buy.png"},
            {key:"startGame",textureName:"start.png"},
            {key:"characterrole0bg",textureName:"rolebgcircle.png"},
            {key:"characterrole1bg",textureName:"rolebgcircle.png"},
            {key:"characterrole2bg",textureName:"rolebgcircle.png"},
            {key:"characterrole3bg",textureName:"rolebgcircle.png"},
            {key:"characterrole4bg",textureName:"rolebgcircle.png"}
        ]
    };

    constructor(name: string) {
        super(name);
        this._UI = new ExtendCharactersUI();
        this.FixUI(this._UI);
        this.GetCharacterList();
        //this.SetList();
        this.m_CharacterList = [];
        //this.m_GoldDiscribe = this._UI._Gold.text.split("#");
        this.OnMoneyChange();
        this._UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
        this._UI._Gold.stroke = 2;
        this._UI._Gold.strokeColor = "0xff0000";

        this._UI.backBtn.on(Laya.Event.CLICK, this, this.BackGameBtn);
        this._UI._List.visible = false;

        this._UI.nanBtn.on(Laya.Event.CLICK, this, this.nanBtnEvent);
        this._UI.nvBtn.on(Laya.Event.CLICK, this, this.nvBtnEvent);

        this.spriteBgArr.push(this._UI.characterrole0bg);
        this.spriteBgArr.push(this._UI.characterrole1bg);
        this.spriteBgArr.push(this._UI.characterrole2bg);
        this.spriteBgArr.push(this._UI.characterrole3bg);
        this.spriteBgArr.push(this._UI.characterrole4bg);

        this.updateNanNvBtnState();

        var len = this.spriteBgArr.length;
        for(var i = 0; i < len;i ++) {
            this.spriteBgArr[i].name = i + "";
            this.spriteBgArr[i].on(Laya.Event.CLICK, this, this.selectRolePosition);
        }
        this.cntCharacterId = PlayerGuestAgent.GuestAgent.CharacterID;
        this.updateRoleInfo(this.cntCharacterId);

        this._UI.startGame.on(Laya.Event.CLICK, this, this.startEvent);
        this._UI.buyBtn.on(Laya.Event.CLICK, this, this.OnClickImg);
        this.updateSelfSceneUI();

        this._UI.nanBtn.anchorX = this._UI.nanBtn.anchorY =  this._UI.nvBtn.anchorX = this._UI.nvBtn.anchorY = 0.5;

        UIButtonTouchEvent.addButtonTouchEvent(this._UI.nanBtn);
        UIButtonTouchEvent.addButtonTouchEvent(this._UI.nvBtn);
    }

    updateNanNvBtnState(): void {
        if(this.cntSelectSex == 0) {
            this._UI.nanBtn.gray = false;
            this._UI.nvBtn.gray = true;
        }
        else 
        {
            this._UI.nanBtn.gray = true;
            this._UI.nvBtn.gray = false;
        }
    }

    nvBtnEvent(e: Laya.Event): void {
        if(this.cntSelectSex == 1) {
            return;
        }
        this.cntSelectSex = 1;
        this.updateNanNvBtnState();
        this.characterUIScene && this.characterUIScene.updateSelectSex(this.cntSelectSex);
    }

    nanBtnEvent(e: Laya.Event): void {
        if(this.cntSelectSex == 0) {
            return;
        }
        this.cntSelectSex = 0;
        this.updateNanNvBtnState();
        this.characterUIScene && this.characterUIScene.updateSelectSex(this.cntSelectSex);
    }

    updateSelfSceneUI() {
        for(var key in this.config) {
            var len = this.config[key].length;
            if(key == "img") {
                for(var i = 0;i < len;i ++) {
                    this._UI[this.config[key][i].key].graphics.clear();
                    this._UI[this.config[key][i].key].loadImage(PlayerGuestAgent.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if(key == "btn") {
                for(var i = 0;i < len;i ++) {
                    this._UI[this.config[key][i].key].skin = (PlayerGuestAgent.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
        }
    }

    startEvent(): void {
        if(this.cntSelectSex == 1) {
            this.characterUIScene.cntSelectIndex +=5;
        }
        GameControler.GameControler.SetPlayerID(this.characterUIScene.cntSelectIndex);
        APP.UIManager.Close(this);
        GameControler.GameControler.EnterGame();
    }

    checkIsLock(id): boolean {
        var character = PlayerGuestAgent.GuestAgent.CharacterList;
        if(character[id]) {
            return true;
        }
        return false;
    }

    updateRoleInfo(id): void {
        if(this.checkIsLock(id)) {
            this._UI.startGame.visible = true;
            this._UI.buyBtn.visible = false;
            this._UI.goldimg.visible = false;
            this._UI.roleuseNoney.visible = true;
            this._UI.roleuseNoney.text = "已解锁";
        }
        else 
        {
            this._UI.startGame.visible = false;
            this._UI.buyBtn.visible = true;
            this._UI.goldimg.visible = true;
            this._UI.roleuseNoney.visible = true;
            this._UI.roleuseNoney.text = CharacterManager.Mgr.GetPrice(this.cntCharacterId) + "";
        }
        this._UI.roleName.text = CharacterManager.Mgr.GetName(id);
        this._UI.desc.text = CharacterManager.Mgr.GetDesc(id);
        this._UI._Gold.text = PlayerGuestAgent.GuestAgent.Money + "";
    }

    selectRolePosition(e:Laya.Event): void { 
        var cntTarget = e.currentTarget;
        if(!this.characterUIScene || this.characterUIScene.cntSelectIndex == parseInt(cntTarget.name)) {
            return;
        }
        
        this._UI.startGame.visible = false;
        this._UI.buyBtn.visible = false;
        this._UI.goldimg.visible = false;
        this._UI.roleuseNoney.visible = false;

        this.characterUIScene.updateSelectIndex(parseInt(cntTarget.name));
        this.InitPosition(null);
    }

    InitPosition(data): void {
        if(!this.characterUIScene) {
            return;
        }
        if(data) {
            this.cntCharacterId = this.characterUIScene.cntSelectIndex;
            this.updateRoleInfo(this.cntCharacterId);
            return;
        }
        var num = this.characterUIScene.arrayDis.length;
        for(var i = 0;i < 5;i ++) {
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
        this.stopRoateTimer();
        var enterpanel:EnterGameUI = APP.UIManager.GetUIByName("EnterGameUI") as EnterGameUI;
        enterpanel._UI.y = Laya.stage.height;
        Laya.Tween.to(enterpanel._UI, {y: 0}, 500, Laya.Ease.sineOut);
        Laya.Tween.to(this, {y: -Laya.stage.height}, 500, Laya.Ease.sineOut, Laya.Handler.create(this, ()=>{
            APP.UIManager.Close(this);
        }));
        this._UI.removeChild(this.characterUIScene);
    }

    stopRoateTimer(): void {
        if(this.characterUIScene) {
            this.characterUIScene.clearRoateTimer();
        }
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
            this.InitPosition(null);
        }
    }

    Update() {  
        
    }
    Open()  {
        APP.MessageManager.Regist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.Regist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.Regist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
        this.characterUIScene = new CharacterUIScene(this.cntCharacterId , this.InitPosition.bind(this));
        this.characterUIScene.updateSelectSex(this.cntSelectSex);
        this._UI.addChild(this.characterUIScene);
        this.characterUIScene.visible = false;
        var len = this.spriteBgArr.length;
        for(var i = 0; i < len;i ++) {
            this.spriteBgArr[i].visible = false;
        }
        setTimeout(function(){
            this.characterUIScene.visible = true;
            this.InitPosition();
        }.bind(this), 510);
        this.Layout();
        this.updateSelfSceneUI();
    }

    Close()  {
        APP.MessageManager.DesRegist(Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP.MessageManager.DesRegist(Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP.MessageManager.DesRegist(Player.Event.OnCharacterListChange, this.OnChangeList, this);
    }

    //事件
    private OnClickImg(id: number) {
        if (this.checkIsLock(this.characterUIScene.cntSelectIndex))  {
            //this.BackGameBtn();
            return;
        }
        GameControler.GameControler.SetPlayerID(this.characterUIScene.cntSelectIndex);
        this.OnMoneyChange();
        this.updateRoleInfo(this.characterUIScene.cntSelectIndex);
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

