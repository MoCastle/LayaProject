import { ui } from "./layaMaxUI"
import { path } from "./../Utility/Path"
import BaseUI from "./BaseUI"
import FM from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import PlayerListUI from "./../ui/PlayerListUI"
import GameControler from "./../controler/GameControler"
import { GameAgent } from "./../Agent/GameAgent"
import PlayerGuestAgent from "../Agent/PlayerGuestAgent";

class ExtendEnterGameUI extends ui.EnterUI {
    Panel: Laya.Panel;
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Enter")));
    }
    constructor() {
        super();
        this.Panel = this._Panel;
        this.Panel.vScrollBarSkin = "";
        this.Panel.hScrollBarSkin = "";
        this._Character.on(Laya.Event.CLICK, this, this.ShowCharacterPanel);
        //this._Character.on(Laya.Event.CLICK, this, this.showCharacter);
        this._SetPanel.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowSetPanel);
        //this._Rank.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowRankPanel);
        //this._Start.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.EnterGame);
        this._Start.on(Laya.Event.CLICK, this, this.onStart);

        this._CharacterList.visible = false;
        this.Panel.visible = false;

        this._Rank["initX"] = this._Rank.x;
        this._Rank["initY"] = this._Rank.y;
        this._SetPanel["initX"] = this._SetPanel.x;
        this._SetPanel["initY"] = this._SetPanel.y;
        this._Start["initX"] = this._Start.x;
        this._Start["initY"] = this._Start.y;
        this._Character["initX"] = this._Character.x;
        this._Character["initY"] = this._Character.y;
        this.adv["initX"] = this.adv.x;
        this.adv["initY"] = this.adv.y;
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
        Laya.Tween.to(this._logo, {alpha:0.2}, 100, Laya.Ease.sineIn);
    }
}

export default class EnterGameUI extends BaseUI {
    static Name(): string {
        return "EnterGameUI";
    }

    _UI: ExtendEnterGameUI;
    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"}
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
        // var img = new Laya.Image();
        // img.loadImage("urere");
        // this.addChild(img);
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
        this.Layout();
        this.updateSelfSceneUI();
    }

    updateSelfSceneUI() {
        for(var key in this.config) {
            var len = this.config[key].length;
            for(var i = 0;i < len;i ++) {
                this._UI[this.config[key][i].key].skin = (PlayerGuestAgent.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    }

    private InitBtnGroup() {
        var CurMaxLevel = GameAgent.Agent.CurMaxLevel;
        var curLevel = GameAgent.Agent.CurLevel;
        var btnNum = this._UI._Group.numChildren;
        var group = this.m_BtnGroup;
        for (var idx = 0; idx < btnNum; ++idx) {
            var btn: any = this._UI._Group.getChildAt(idx) as Laya.Image;
            btn.idx = idx;
            btn.on(Laya.Event.CLICK, this, this.OnChoose)
            btn.gray = true;
            group.push(btn);
        }
        group[curLevel].gray = false;
    }

    public Open() {
        this.InitBtnGroup();
        this.y = 0;
        this._UI._logo.alpha = 1;
        if(!this._UI._Rank["initX"]) {
            return;
        }
        this._UI._Rank.x = this._UI._Rank["initX"];
        this._UI._Rank.y = this._UI._Rank["initY"];
        this._UI._SetPanel.x = this._UI._SetPanel["initX"];
        this._UI._SetPanel.y = this._UI._SetPanel["initY"];
        this._UI._Start.x = this._UI._Start["initX"];
        this._UI._Start.y = this._UI._Start["initY"];
        this._UI._Character.x = this._UI._Character["initX"];
        this._UI._Character.y = this._UI._Character["initY"];
        this._UI.adv.x = this._UI.adv["initX"];
        this._UI.adv.y = this._UI.adv["initY"];
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