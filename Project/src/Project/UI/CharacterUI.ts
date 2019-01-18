
module ui {
    export class ExtendCharactersUI extends ui.CharactersUI {
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/Characters.json");
            this.createView(res);
            super.createChildren();
        }

        SetList()
        {
            var listArray:Array<any> = ["","","","","","","","","",""];
            this._List.hScrollBarSkin = "";
            this._List.renderHandler = new Laya.Handler(this,this._RenderHandler);
            this._List.array = listArray;
            this._List.scrollBar.elasticBackTime = 200;//设置橡皮筋回弹时间。单位为毫秒。
            this._List.scrollBar.elasticDistance = 50
        }

        constructor()
        {
            super();
            this.SetList();
        }

        private _RenderHandler(cell:Laya.Box,index:number):void
        {
            var roleElement:RoleElement = cell as RoleElement;
            roleElement.Idx = index;
            roleElement.Reset();
        }
    }
}
class CharacterUI extends BaseUI
{
    constructor()
    {
        super();
        this.addChild(new ui.ExtendCharactersUI());
    }
}

class RoleElement extends Laya.Box
{
    //
    Idx:number;
    private _Btn:Laya.Button;
    get Btn():Laya.Button
    {
        if(this._Btn == null)
        {
            this._Btn = this.getChildAt(1) as Laya.Button;
            this._Btn.on(Laya.Event.CLICK,this,()=>{
                ControlAPP.GameControler.SetPlayerID(this.Idx);
                APP.UIManager.CloseCurView();
            })
        }
        return this._Btn;
    }
    Reset()
    {
        if(this.Btn)
        {}
    }
    //
    constructor()
    {
        super();
    }
}