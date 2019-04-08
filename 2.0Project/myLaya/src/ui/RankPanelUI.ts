import { ui } from "./layaMaxUI"
import BaseUI from "./BaseUI"
import { BaseEnum } from "./../Base/BaseEnum"
import { WechatOpen } from "../platform/WechatOpen"
import { path } from "./../Utility/Path"
import {GameStruct} from "./../Game/GameStruct"
import GuiderManager from "../Scene/GuiderManager";
import Controler from "./../controler/GameControler"

class ExtendsRankPanelUI extends ui.GameRankUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("GameRank")));
    }
    constructor() {
        super();
        //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
    }
}

export default class RankPanelUI extends BaseUI {
    _UI: ExtendsRankPanelUI;
    rankTexture: Laya.Texture;
    constructor(name: string) {
        super(name);
         this._UIType = BaseEnum.UITypeEnum.Midle;
        this._UI = new ExtendsRankPanelUI();
        this.FixUI(this._UI);
        this._UI.closeBtn.on(Laya.Event.CLICK, this, () => { 
            WechatOpen.getInstances().closeRank();
            this._UIManager.Close(this);
        });
        this.rankPanel();
    }

    static Name(): string {
        return "RankPanelUI";
    }
    
    rankPanel() {
        //WechatOpen.getInstances().updateScore(500);
        WechatOpen.getInstances().openRank();
    }

    SavePanel() {
        // this.rankTexture.bitmap.alwaysChange = false;
        // this.rankTexture.disposeBitmap();
    }

    CloseOP() {
        this.SavePanel();
    }
    Update()
    {}
}
