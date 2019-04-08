/**作者:Mo
 * 场景UI
 */
import {ui} from "./layaMaxUI"
import BaseUI from "./BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {path} from "./../Utility/Path"
import GuiderManager from "../Scene/GuiderManager";
import ItemListUI from "./ItemListUI"
import GameControler from "./../controler/GameControler"
class ExtendsGameUI extends ui.GameUI
{
    createChildren():void
    {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("Game")));
    }
    SetCountTime(info:string ="")
    {
        this._CountTime.text =info;
    }
    constructor()
    {
        super();
    }
}
export default class GameUI extends BaseUI
{
    private _UI:ExtendsGameUI;
    //
    public DistanceStr:Array<string>;
    public GoldNumStr:Array<string>;

    set GamePanel(value:boolean)
    { 
        this._UI._GamePanel.visible = value;
    }
    set Distance(value:number)
    {
        var dis = "" + value;
        if(dis == this.DistanceStr[1])
        {
            return
        }
        this.DistanceStr[1] = dis;
        this.SetDirty();
    }
    set GoldNum(value:number)
    {
        this.GoldNumStr[1] = value.toString();
        this.SetDirty();
    }
    private _ShowDistance()
    {
        this._UI._TxtDistance.text = this.DistanceStr[0]+this.DistanceStr[1];
    }
    
    private _ShowGoldNum()
    {
        this._UI._TxtGold.text = this.GoldNumStr[0] + this.GoldNumStr[1];
    }
    static Name():string
    {
        return "GameUI";
    }
    set Gold(gold:number)
    {
        this.GoldNumStr[1] = gold.toString();
        this.SetDirty();
    }
    constructor(name:string)
    {
        super(name);
        this._IsMutex = true;
        this._UI = new ExtendsGameUI();
        this.FixUI(this._UI);
        var opIsRight = GameControler.GameControler.SetInfo.OPIsRight;
        this._UI._ItemListBtn.on(Laya.Event.CLICK,null,()=>{ 
            this._UIManager.Show<ItemListUI>(ItemListUI)})
        this.SetCountTime();
        
        this.DistanceStr= this._UI._TxtDistance.text.split("#");
        this.DistanceStr[1] = "0"
        this._ShowDistance();
        
        this.GoldNumStr = this._UI._TxtGold.text.split("#");
        this.GoldNumStr[1] = "0";
        this._ShowGoldNum();
        
        this.ShowInputInfo("");
    }
    
    SetLeftTouch(owner:any,Listener:()=>void):void
    {
        //this._UI._LeftTouch.on(Laya.Event.CLICK,owner,Listener);
    }

    SetRightTouch(owner:any,Listener:()=>void):void
    {
        //this._UI._RightTouch.on(Laya.Event.CLICK,owner,Listener);
    }

    SetCountTime(info:string ="")
    {
        if(info=="")
        {
            this._UI._CountDownUI.visible = false;
            this.GamePanel = true;
        }
        else
        {
            this._UI._CountDownUI.visible=true;
            this.GamePanel = false;
        }
        this._UI.SetCountTime(info);
    }
    
    ShowItem()
    {
        
    }

    ShowInputInfo(info:string)
    {
        this._UI._GameInfo.text = info;
    }

    Update()
    {
        //显示金币信息
        this._ShowGoldNum();
        //显示距离信息
        this._ShowDistance();
    }
}