import { ui } from "./layaMaxUI"
import { path } from "./../Utility/Path"
import BaseUI from "./BaseUI"
import FM from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import PlayerListUI from "./../ui/PlayerListUI"
import GameControler from "./../controler/GameControler"
import { GameAgent } from "./../Agent/GameAgent"
import PlayerGuestAgent from "../Agent/PlayerGuestAgent";
import EndGameUI from "./EndGameUI";
import APP from "./../controler/APP"
import { ModelFunc } from "../Utility/ModelFunc";
import LoadUIScene from "./UnDownload/LoadUIScene";
import LevelRangeManager from "../GameManager/LevelRangeManager";

class ExtendEnterGameUI extends ui.EnterUI {
    Panel: Laya.Panel;
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Enter")));
    }
    constructor() {
        super();
        this._Character.on(Laya.Event.CLICK, this, this.ShowCharacterPanel);
        this._SetPanel.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowSetPanel);
        this._Start.on(Laya.Event.CLICK, this, this.onStart);

        this._CharacterList.visible = false;
        this._Start["initX"] = this._Start.x;
        this._Character["initY"] = this._Character.y;
    }

    ShowCharacterPanel(): void {
        var node = GameControler.GameControler.ShowCharacterPanel();
        node.y = -Laya.stage.height;
        Laya.Tween.to(node, {y: 0}, 500, Laya.Ease.sineOut);
        Laya.Tween.to(this, {y: Laya.stage.height}, 500, Laya.Ease.sineOut);
    }

    onStart():void {
        Laya.Tween.to(this._Rank, {y:this._Rank.y + Laya.stage.height - this._Character.y}, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._SetPanel, {y:this._SetPanel.y  + Laya.stage.height - this._Character.y}, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._Start, {x:this._Start.y  + Laya.stage.width - this._Start.x}, 250, Laya.Ease.sineIn, Laya.Handler.create(GameControler.GameControler, GameControler.GameControler.EnterGame));
        Laya.Tween.to(this._Character, {y:this._Character.y  - Laya.stage.height}, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this.adv, {y:this.adv.y  + Laya.stage.height - this._Character.y}, 150, Laya.Ease.sineIn);
        APP.SceneManager.BG["upateBgTexture"]();
    }
}

export default class EnterGameUI extends BaseUI {
    static Name(): string {
        return "EnterGameUI";
    }

    _gk:Laya.Sprite;
    _gkContent:Laya.Sprite;
    _UI: ExtendEnterGameUI;
    lastX:number = 99999;
    offestX:number = 0;
    cntSelectIndex:number = 0;
    private config = {"img":
        [   
            {key:"bg",textureName:"loadbgstart.png"}
        ],
        "btn":
        [
            {key:"_Character",textureName:"role.png"},
            {key:"_Start",textureName:"start.png"},
            {key:"_SetPanel",textureName:"setting.png"},
            {key:"adv",textureName:"ad.png"}
        ]
    };

    private m_BtnGroup: Array<Laya.Image>;
    constructor(name: string) {
        super(name);
        this._UI = new ExtendEnterGameUI();

        this.FixUI(this._UI);
        var uiMgr: UIManager = this._UIManager;
        this.m_BtnGroup = [];
        var content = this._UI._Panel.getChildByName("content") as Laya.Sprite;
        this.Layout();
        this.updateSelfSceneUI();
        this._gk = content;
        this._UI._Panel.mouseEnabled = true;
        this._gk.mouseEnabled = true;
        this.cntSelectIndex = PlayerGuestAgent.GuestAgent.CurLevel - 1;
        this._gk.x = -this.cntSelectIndex * 630;
        this.initGKListener();
        this.updateButtonState();
        laya.media.SoundManager.playMusic(path.GetSoundpathUIJS("bg"),0);   
    }

    updateDesc() {
        var data = LevelRangeManager.Mgr.GetAllInfo();
        for(var key in data) {
            var da1 = data[key].m_Passscore;
            if(key == "1") {
                this._UI["startnumtxt1"].text = "";
                continue;
            }
            this._UI["startnumtxt" + parseInt(key)].text = da1 + "星解锁"; 
        }
    }

    initGKListener() {
        //this._UI._Panel.on(Laya.Event.MOUSE_DOWN, this, this.downGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_MOVE, this, this.moveGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_UP, this, this.upGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_OVER, this, this.upGKBox);
        this._UI.lastBtn.on(Laya.Event.CLICK, this, this.lastPage);
        this._UI.nextBtn.on(Laya.Event.CLICK, this, this.nextPage);
    }

    updateButtonState(): void {
        this._UI.lastBtn.visible = true;
        this._UI.nextBtn.visible = true;
        if(this.cntSelectIndex == 0) {
            this._UI.lastBtn.visible = false;
        }
        if(this.cntSelectIndex == 4) {
            this._UI.nextBtn.visible = false;
        }
    }

    nextPage(e:Laya.Event) {
        if(this.cntSelectIndex < 4) {
            Laya.Tween.clearTween(this._gk);
            this._gk.x = -this.cntSelectIndex * 630;
            this.cntSelectIndex ++;
        }
        Laya.Tween.to(this._gk,{x:-this.cntSelectIndex * 630},200, Laya.Ease.sineIn);
        PlayerGuestAgent.GuestAgent.CurLevel = this.cntSelectIndex + 1;
        this.updateSelfSceneUI();
        this.updateButtonState();
    }

    lastPage(e:Laya.Event) {
        if(this.cntSelectIndex > 0) {
            Laya.Tween.clearTween(this._gk);
            this._gk.x = -this.cntSelectIndex * 630;
            this.cntSelectIndex --;
        }
        Laya.Tween.to(this._gk,{x:-this.cntSelectIndex * 630},200, Laya.Ease.sineIn);
        PlayerGuestAgent.GuestAgent.CurLevel = this.cntSelectIndex + 1;
        this.updateSelfSceneUI();
        this.updateButtonState();
    }

    downGKBox(e:Laya.Event) {
        this.lastX = e.target.mouseX;
    }

    moveGKBox(e: Laya.Event) {
        if(this.lastX == 99999 || this._gk.x > 0 || this._gk.x < -630 * 4) {
            return;
        }
        this.offestX = (e.target.mouseX - this.lastX);
        this._gk.x += this.offestX;
        if(this._gk.x > 0) {
            this._gk.x = 0;
        }
        if(this._gk.x < -4 * 630) {
            this._gk.x = -4 * 630; 
        }
        this.lastX = e.target.mouseX;
    }

    upGKBox(e: Laya.Event) {
        var nextX = 0;
        if(Math.abs(this.offestX) <= 5) {
            return;
        }
        this.lastX = 99999;
        if(this.offestX > 0) {
            if(this._gk.x < 0) {
                nextX = Math.floor(this._gk.x / 630);
            }
        }
        else if(this.offestX < 0) {
            if(this._gk.x > -4 * 630) {

            }
        }
        Laya.Tween.to(this._gk, {x:nextX}, Math.abs(this.offestX));
        this.cntSelectIndex = -nextX / 630;
        this.offestX = 0;
    }

    // initGK() {
    //     for(var i = 1;i <= 5;i ++) {
    //         var spr = new Laya.Image();
    //         spr.loadImage("entersceneui/gk/gk" + i + ".png");
    //         spr.x = (i - 1) * 630;
    //         this._gkContent.addChild(spr);
    //     }
    // }

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

    private InitBtnGroup() {
        // var CurMaxLevel = GameAgent.Agent.CurMaxLevel;
        // var curLevel = GameAgent.Agent.CurLevel;
        // var btnNum = this._UI._Group.numChildren;
        // var group = this.m_BtnGroup;
        // for (var idx = 0; idx < btnNum; ++idx) {
        //     var btn: any = this._UI._Group.getChildAt(idx) as Laya.Image;
        //     btn.idx = idx;
        //     btn.on(Laya.Event.CLICK, this, this.OnChoose)
        //     btn.gray = true;
        //     group.push(btn);
        // }
        //group[curLevel].gray = false;
    }

    public Open() {
        //this.InitBtnGroup();
        this.y = 0;
        this._UI._Rank.y = Laya.stage.height - this._UI._Rank.bottom - this._UI.adv.height;
        this._UI._SetPanel.y = Laya.stage.height - this._UI._SetPanel.bottom - this._UI.adv.height;
        this._UI.adv.y = Laya.stage.height - this._UI.adv.bottom - this._UI.adv.height;
        this._UI._Start.x = this._UI._Start["initX"];
        this._UI._Character.y = this._UI._Character["initY"];
        this.updateSelfSceneUI();
        this.updateDesc();
    }

    Update() {

    }

    Layout() {
        super.Layout();
        if(!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
    }

    //事件
    OnChoose(info: Event) {
        var target:any = info.target;
        var idx: number = target.idx;
        GameAgent.Agent.CurLevel = idx;
        this.m_BtnGroup.forEach((img: Laya.Image) => {
            img.gray = true;
        });
        this.m_BtnGroup[idx].gray = false;
    }
}