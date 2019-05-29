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
import StarItemUI from "./StarItemUI";
import GuiderManager from "../Scene/GuiderManager";

class ExtendSelectLevelUI extends ui.SelectLevelUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("SelectLevel")));
    }

    constructor() {
        super();
    }
}

export default class SelectLevelUI extends BaseUI {
    private _UI: ExtendSelectLevelUI;
    public totalLevelImgPoint;

    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"}
        ],
        "btn":
        [
            {key:"_backBtn",textureName:"back.png"}
        ]
    };

    constructor(name: string) {
        super(name);
        this._UI = new ExtendSelectLevelUI();
        this.FixUI(this._UI);

        this._UI._selectLevelBtn.on(Laya.Event.CLICK, this, this.SelectLevel);
        this._UI._backBtn.on(Laya.Event.CLICK, this, this.BackSelectLevelUI);
        this._UI._Start.on(Laya.Event.CLICK, this, this.onStart);
        this._UI._MenueBtn.on(Laya.Event.CLICK, this, this.MenuEvent);
        this.totalLevelImgPoint = [];
        for(var i = 1;i <= 4;i ++) {
            this.totalLevelImgPoint.push({x:this._UI["g_" + i].x, y:this._UI["g_" + i].y, scaleX:this._UI["g_" + i].scaleX, scaleY:this._UI["g_" + i].scaleY});
        }
    }

    onStart():void {
        GameControler.GameControler.EnterGame();
        APP.SceneManager.BG["upateBgTexture"]();
    }

    MenuEvent():void {
        GuiderManager.Mgr.EnterScene();
    }

    BackSelectLevelUI():void {
        this._UI.bg1.visible = false;
    }

    SelectLevel() {
        this._UI.bg1.visible = true;

        for(var i = 1;i < this._UI.bg1.numChildren; i ++) {
            this._UI.bg1.getChildAt(i).removeSelf();
        }

        for(var i = 1;i < PlayerGuestAgent.GuestAgent.MaxLevel;i ++) {
            var startItem = new StarItemUI();
            this._UI.bg1.addChild(startItem); 
            var disCircle:any = startItem.getChildAt(0);
            startItem.name = i + "";
            disCircle.scaleX = disCircle.scaleY = 0.38;
            disCircle.getChildAt(0).text = i;
            
            startItem.x = 50 + i * 100;
            startItem.y = 200 + Math.floor(i / 7) * 200;

            var startNum = PlayerGuestAgent.GuestAgent.PerTogateStars[i];
            startItem.mouseEnabled = true;
            startItem.on(Laya.Event.CLICK, this, this.ClickLevel);
            for(var j = 1;j < 4;j ++) {
                disCircle.getChildAt(j).visible = false;
                if(!startNum) {
                    continue;
                }
                if(startNum >= j) {
                    disCircle.getChildAt(j).visible = true;
                }
            }
        }
    }

    ClickLevel(e: Laya.Event): void {
        var tartget = e.currentTarget.name;
        PlayerGuestAgent.GuestAgent.CurLevel = parseInt(tartget);
        this.onStart();
    }

    UpdateLevelInfo(): void {
        var cntLevel = PlayerGuestAgent.GuestAgent.CurLevel;
        for(var i = 1;i <= 4 ;i ++) {
            this._UI["g_" + i].x = this.totalLevelImgPoint[i - 1].x;
            this._UI["g_" + i].y = this.totalLevelImgPoint[i - 1].y;
            this._UI["g_" + i].scaleX = this.totalLevelImgPoint[i - 1].scaleX;
            this._UI["g_" + i].scaleY = this.totalLevelImgPoint[i - 1].scaleY;
            var disCircle:any = this._UI["g_" + i].getChildAt(0);
            if(i == 2) {
                disCircle.scaleX = 0.5;
                disCircle.scaleY = 0.5;
            }
            else {
                disCircle.scaleX = 0.38;
                disCircle.scaleY = 0.38;
            }

            if(cntLevel == 1 && i == 1) {
                disCircle.visible = false;
                continue;
            }
            disCircle.visible = true;
            disCircle.getChildAt(0).text = (cntLevel + i - 2);

            var startNum = PlayerGuestAgent.GuestAgent.PerTogateStars[cntLevel + i - 2];

            for(var j = 1;j < 4;j ++) {
                disCircle.getChildAt(j).visible = false;
                if(!startNum) {
                    continue;
                }
                else if(startNum >= j) {
                    disCircle.getChildAt(j).visible = true;
                }
            }
        }
    }

    GoToNextToLevel(): void {
        this._UI._Start.visible = false;
        this._UI._selectLevelBtn.visible = false;

        var cntLevel = PlayerGuestAgent.GuestAgent.CurLevel;
        var startNum = PlayerGuestAgent.GuestAgent.PerTogateStars[cntLevel];

        var disCircle:any = this._UI.g_2.getChildAt(0);
        for(var j = 1;j < 4;j ++) {
            if(!startNum) {
                disCircle.getChildAt(j).visible = false;
            }
            else if(startNum >= j) {
                disCircle.getChildAt(j).visible = true;
            }
        }

        for(var i = 3; i >= 2;i --) {
            Laya.Tween.to(this._UI["g_" + i], {x: this._UI["g_" + (i - 1)].x, y: this._UI["g_" + (i - 1)].y}, 400);
            Laya.Tween.to(this._UI["g_" + i].getChildAt(0), {scaleX:this._UI["g_" + (i - 1)].getChildAt(0).scaleX, scaleY:this._UI["g_" + (i - 1)].getChildAt(0).scaleY}, 400);
        }
        setTimeout(function(){
            this._UI._Start.visible = true;
            this._UI._selectLevelBtn.visible = true;
        }.bind(this), 410);
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

    static Name(): string {
        return "SelectLevel";
    }

    Layout() {   
        super.Layout();
        if(!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
        this._UI.bg1.width = Laya.stage.width;
        this._UI.bg1.height = Laya.stage.height;
    }

    Update() {  
        
    }
    Open()  {
        this.Layout();
        this.updateSelfSceneUI();
        this._UI.bg.visible = true;
        this._UI.bg1.visible = false;

        this.UpdateLevelInfo();
        this._UI.bg1.visible = false;
        this._UI.goldLabel.text = GameControler.GameControler.GameDir.GamePlay.GameGold + "";
        if(!(GameControler.GameControler.PlayerDeath)) {
            PlayerGuestAgent.GuestAgent.setPerTogateStars(PlayerGuestAgent.GuestAgent.CurLevel, 1 + Math.floor(Math.random() * 3));
            this.GoToNextToLevel();
            PlayerGuestAgent.GuestAgent.CurLevel = (PlayerGuestAgent.GuestAgent.CurLevel + 1);
            if(PlayerGuestAgent.GuestAgent.MaxLevel <= PlayerGuestAgent.GuestAgent.CurLevel) {
                PlayerGuestAgent.GuestAgent.MaxLevel = PlayerGuestAgent.GuestAgent.CurLevel;
            }
        }
        GameControler.GameControler.PlayerDeath = true;
    }

    Close()  {

    }

}

