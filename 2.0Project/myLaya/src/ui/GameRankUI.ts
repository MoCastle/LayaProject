import { ui } from "./layaMaxUI"
import BaseUI from "./BaseUI"
import { BaseEnum } from "./../Base/BaseEnum"
import { path } from "./../Utility/Path"
import {GameStruct} from "./../Game/GameStruct"
import GuiderManager from "../Scene/GuiderManager";
import Controler from "./../controler/GameControler"

class ExtendsGameRankUI extends ui.GameRankUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("GameRank")));
    }
    constructor() {
        super();
        //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
    }
}

export default class GameRanklUI extends BaseUI {
    _UI: ExtendsGameRankUI;
    constructor(name: string) {
        super(name);
        this._UIType = BaseEnum.UITypeEnum.Midle;
        this._UI = new ExtendsGameRankUI();
        //this.FixUI(this._UI);
        //this._UI._Return.on(Laya.Event.CLICK, this, () => { this._UIManager.CloseCurView(); GuiderManager.Mgr.EnterScene() });
        this.SetPanel(); 
    }
    static Name(): string {
        return "SetPanelUI";
    }
    SetPanel() {
        var info: GameStruct.SetInfo = Controler.GameControler.GetSetInfo();
        // this._UI._AudioSwitch.selectedIndex = info.AudioOn ? 0 : 1;
        // this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        // this._UI._Text.text = info.TextInfo;
    }
    SavePanel() {
        var info: GameStruct.SetInfo = new GameStruct.SetInfo();
        // info.AudioOn = this._UI._AudioSwitch.selectedIndex == 0;
        // info.OPIsRight = this._UI._OPSwitch.selectedIndex == 1;
        Controler.GameControler.SaveSetInfo(info);
    }

    CloseOP() {
        this.SavePanel();
    }
    Update()
    {}
}
