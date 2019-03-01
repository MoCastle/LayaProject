
import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {path} from "./../Utility/Path"
import UIManager from "../FrameWork/UIManager";
import FW from "../FrameWork/FrameWork";
import RoleElement from "./../script/RoleElement"

class ExtendCharactersUI extends ui.CharacterUI {
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Character")));
    }

    constructor()
    {
        super();
    }
}

export default class CharacterUI extends BaseUI
{
    
    private _RenderHandler(cell:Laya.Box,index:number):void
    {
        
        var roleElement:RoleElement = cell as RoleElement;
        roleElement.Idx = index;
        roleElement.Reset();
    }
    private _UI:ExtendCharactersUI;
    constructor(name:string)
    {
        super(name);
        this._UI = new ExtendCharactersUI();
        this.FixUI(this._UI);
        this.SetList();
    }
    static Name():string
    {
        return "CharacterUI";
    }
    SetList()
    {
        
        var listArray:Array<any> = ["","","","","","","","","",""];
        this._UI._List.hScrollBarSkin = "";
        this._UI._List.renderHandler = new Laya.Handler(this,this._RenderHandler);
        this._UI._List.array = listArray;
        this._UI._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
        this._UI._List.scrollBar.elasticDistance = 50
        
    }
}

