import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";
import {GameStruct }  from "./../Game/GameStruct"
import Controler from "./../controler/GameControler"
import GameControler from "../controler/GameControler";
import PlayerGuestAgent from "../Agent/PlayerGuestAgent";

class ExtendEndGameUI extends ui.EndGameUI {
    Panel:Laya.Panel;
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("EndGame")));
    }
    constructor()
    {
        super();
        //this.Panel = this.Panel;
        //this.Panel.vScrollBarSkin = "";
        //this.Panel.hScrollBarSkin = "";
        this._MenueBtn.on(Laya.Event.CLICK,GuiderManager.Mgr,GuiderManager.Mgr.EnterScene);
        this._SetBtn.on(Laya.Event.CLICK,Controler.GameControler,Controler.GameControler.ShowSetPanel);
        this._StartBtn.on(Laya.Event.CLICK,Controler.GameControler,Controler.GameControler.EnterGame);
    }
}

export default class EndGameUI extends BaseUI
{
    static Name():string
    {
        return "EndGameUI";
    }
    UI:ExtendEndGameUI;

    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"},
            {key:"endgametitle",textureName:"endgamedaizi.png"},
            {key:"endgamehentiao",textureName:"infotiao.png"},
            {key:"endgamebgicon",textureName:"inputtextarea.png"},
            {key:"dibg",textureName:"inputtextarea.png"}
        ],
        "btn":
        [
            {key:"_StartBtn",textureName:"restart.png"},
            {key:"_MenueBtn",textureName:"homeBtn.png"},
            {key:"_SetBtn",textureName:"setting.png"},
            {key:"_PlayerListBtn",textureName:"paihang.png"}
        ]
    };

    updateSelfSceneUI() {
        for(var key in this.config) {
            var len = this.config[key].length;
            for(var i = 0;i < len;i ++) {
                this.UI[this.config[key][i].key].skin = (PlayerGuestAgent.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    }

    constructor(name:string)
    {
        super(name);
        this.UI= new ExtendEndGameUI();
        this.FixUI(this.UI);
        //this.UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ this._UIManager.Show<PlayerListUI>(PlayerListUI)});
        this.Layout();
        this.UI.distance.text = GameControler.GameControler.GameDir.GamePlay.Distance + "";
        this.UI.gold.text = GameControler.GameControler.GameDir.GamePlay.GameGold + "";
        this.updateSelfSceneUI();
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
}