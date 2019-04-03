import { ui } from "./layaMaxUI"
import { path } from "./../Utility/Path"
import BaseUI from "./BaseUI"
import FM from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import PlayerListUI from "./../ui/PlayerListUI"
import GameControler from "./../controler/GameControler"
import { GameAgent } from "./../Agent/GameAgent"

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
        this._Character.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowCharacterPanel);
        this._SetPanel.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowSetPanel);
        this._Start.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.EnterGame);
    }
}

export default class EnterGameUI extends BaseUI {
    static Name(): string {
        return "EnterGameUI";
    }
    _UI: ExtendEnterGameUI;
    private m_BtnGroup: Array<Laya.Image>;
    constructor(name: string) {
        super(name);
        this._UI = new ExtendEnterGameUI();
        this.FixUI(this._UI);
        var uiMgr: UIManager = this._UIManager;
        this.m_BtnGroup = [];
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
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
    }

    Update() {

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