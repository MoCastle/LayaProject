import { ui } from "./layaMaxUI"
import BaseUI from "./BaseUI"
import { BaseEnum } from "./../Base/BaseEnum"
import { path } from "./../Utility/Path"
import {GameStruct} from "./../Game/GameStruct"
import GuiderManager from "../Scene/GuiderManager";
import Controler from "./../controler/GameControler"

class ExtendsSetPanelUI extends ui.SetPanelUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("SetPanel")));
    }
    constructor() {
        super();
        //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
    }
}

export default class SetPanelUI extends BaseUI {
    _UI: ExtendsSetPanelUI;
    selectedIndex:number;
    private config = {"img":
        [   
            {key:"bg",textureName:"mainbg.jpg"}
        ],
        "btn":
        [
            {key:"_Return",textureName:"back.png"}
        ]
    };
    constructor(name: string) {
        super(name);
        this._UIType = BaseEnum.UITypeEnum.Midle; 
        this._UI = new ExtendsSetPanelUI();
        this.FixUI(this._UI);
        this._UI._Return.on(Laya.Event.CLICK, this, () => { this._UIManager.CloseCurView(); GuiderManager.Mgr.EnterScene() });
        this._UI.voiceopen.on(Laya.Event.CLICK, this, this.VoiceOpen);
        this._UI.voiceclose.on(Laya.Event.CLICK, this, this.VoiceClose); 
        var info: GameStruct.SetInfo = Controler.GameControler.GetSetInfo();
        this.selectedIndex = info.AudioOn ? 1 : 0;
        this.SetPanel();
        this.Layout();
    }
    static Name(): string {
        return "SetPanelUI";
    }
    
    VoiceOpen() {
        this.selectedIndex = 1;
        this.SetPanel();
    }

    VoiceClose() {
        this.selectedIndex = 0;
        this.SetPanel();
    }

    SetPanel() {
        if(this.selectedIndex == 1) {
            (this._UI.voiceopen.getChildAt(2) as Laya.Image).visible = true;
            (this._UI.voiceclose.getChildAt(1) as Laya.Image).visible = false;
        }
        else
        {
            (this._UI.voiceopen.getChildAt(2) as Laya.Image).visible = false;
            (this._UI.voiceclose.getChildAt(1) as Laya.Image).visible = true;
        }
        //this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        // this._UI._Text.text = info.TextInfo;
    }
    SavePanel() {
        var info: GameStruct.SetInfo = new GameStruct.SetInfo();
        info.AudioOn = this.selectedIndex == 1;
        //info.OPIsRight = this.selectedIndex == 1;
        Controler.GameControler.SaveSetInfo(info);
    }

    Layout() {
        super.Layout();
        if(!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
    }

    CloseOP() {
        this.SavePanel();
    }
    Update()
    {}
}
