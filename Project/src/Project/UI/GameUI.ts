/**作者:Mo
 * 场景UI
 */
module ui {
    export class GameUI extends ui.GameSceneUI
    {
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/GameScene.json");
            this.createView(res);
            super.createChildren();
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
}
class GameUI extends BaseUI
{
    static Name():string
    {
        return "GameUI";
    }
    UI:ui.GameUI;
    AddGold(goldNum:number)
    {
        this._Gold+= goldNum;
        this.GoldNumStr[1] = this._Gold.toString();
        this._ShowGoldNum();
    }
    SetLeftTouch(owner:any,Listener:()=>void):void
    {
        this.UI._Left_LeftTouch.on(Laya.Event.CLICK,owner,Listener);
        this.UI._Right_LeftTouch.on(Laya.Event.CLICK,owner,Listener);
    }

    SetRightTouch(owner:any,Listener:()=>void):void
    {
        this.UI._Left_RightTouch.on(Laya.Event.CLICK,owner,Listener);
        this.UI._Right_RightTouch.on(Laya.Event.CLICK,owner,Listener);
    }

    SetCountTime(info:string ="")
    {
        if(info=="")
        {
            this.UI._CountDownUI.visible = false;
            this.GamePanel = true;
        }
        else
        {
            this.UI.SetCountTime(info);
            this.UI._CountDownUI.visible=true;
            this.GamePanel = false;
        }
    }
    set GamePanel(value:boolean)
    { 
        this.UI._GamePanel.visible = value;
    }
    set Distance(value:number)
    {
        this.DistanceStr[1] = value.toFixed(2);
        this._ShowDistance();
    }
    set GoldNum(value:number)
    {
        this.GoldNumStr[1] = value.toString();
        this._ShowGoldNum();
    }
    ShowInputInfo(info:string)
    {
        this.UI._GameInfo.text = info;
    }
    //
    DistanceStr:Array<string>;
    GoldNumStr:Array<string>;
    _Gold:number;
    constructor(name:string)
    {
        super(name);
        this._IsMutex = true;
        this.UI = new ui.GameUI();
        this.addChild(this.UI);
        
        this._Gold = 0;
        var opIsRight = ControlAPP.GameControler.SetInfo.OPIsRight;
        this.UI._LeftHandBtnList.visible = !opIsRight;
        this.UI._RightHandBtnList.visible = opIsRight;
        this.UI._ItemListBtn.on(Laya.Event.CLICK,null,()=>{APP.UIManager.Show(ItemListUI)})
        this.SetCountTime();
        
        this.DistanceStr= this.UI._TxtDistance.text.split("#");
        this.DistanceStr[1] = "0"
        this._ShowDistance();
        
        this.GoldNumStr = this.UI._TxtGold.text.split("#");
        this.GoldNumStr[1] = "0";
        this._ShowGoldNum();
        
        this.ShowInputInfo("");
    }

    private _ShowDistance()
    {
        this.UI._TxtDistance.text = this.DistanceStr[0]+this.DistanceStr[1];
    }
    
    private _ShowGoldNum()
    {
        this.UI._TxtGold.text = this.GoldNumStr[0] + this.GoldNumStr[1];
    }
}