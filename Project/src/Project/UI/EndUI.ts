module ui {
    export class ExtendEndUI extends ui.EndGameUI {
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/EndGame.json");
            this.createView(res);
            super.createChildren();
        }
        constructor()
        {
            super();
        }

    }
}

class EndGameUI extends BaseUI
{
    static Name():string
    {
        return "EndGameUI";
    }

    UI:ui.ExtendEndUI;
    GameInfo:Array<string>;
    constructor(name:string)
    {
        super(name);
        this._IsMutex = true;
        this.UI = new ui.ExtendEndUI();
        this.addChild(this.UI);
        this.UI._StartBtn.on( Laya.Event.CLICK,null, ()=>{APP.GameManager.GameDir.ReStart()});
        this.UI._MenueBtn.on( Laya.Event.CLICK,null, ()=>{StageAPP.GuiderManager.EnterScene()});
        this.UI._SetBtn.on(Laya.Event.CLICK,null,()=>{APP.UIManager.Show<SetPanelUI>(SetPanelUI)})
        this.UI._PlayerListBtn.on(Laya.Event.CLICK,null,()=>{APP.UIManager.Show<PlayerListUI>(PlayerListUI)});

        this.GameInfo =this.UI._GameInfo.text.split("#");
        this._ShowGameInfo( );

    }
    public SetGameInfo(dis:number,gold:number)
    {
        this.GameInfo[1] = dis.toFixed(0);//.toString();
        this.GameInfo[3] = gold.toString();
        this._ShowGameInfo( );
    }
    private _ShowGameInfo( )
    {
        this.UI._GameInfo.text = this.GameInfo[0] + this.GameInfo[1] +"\n" + this.GameInfo[2] + this.GameInfo[3];
    }

}
