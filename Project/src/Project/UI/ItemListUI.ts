module ui {
    export class ExtendsItemListUI extends ItemListUI
    {
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/ItemList.json");
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
        BtnListener:Delegate;
        constructor()
        {
            super();
        }
        
        private _RenderHandler(cell:Laya.Box,index:number):void
        {
            var roleElement:ItemElement = cell as ItemElement;
            roleElement.SetBtn(this.BtnListener.Listener,this.BtnListener.Action);
        }
    }
}

class ItemListUI extends BaseUI
{
    static Name():string
    {
        return "ItemListUI";
    }
    UI:ui.ExtendsItemListUI;
    constructor(name:string)
    {
        super(name);
        this.UI = new ui.ExtendsItemListUI();
        this.addChild(this.UI);
        this.UI.BtnListener = new Delegate(this,()=>{APP.UIManager.Close(this)})
        this.UI.SetList();
        this._UIType = UITypeEnum.Midle;
    }

}

class ItemElement extends Laya.Box
    {
        //
        Idx:number;
        private _Btn:Laya.Button;
        get Btn():Laya.Button
        {
            if(this._Btn == null)
            {
                this._Btn = this.getChildAt(1) as Laya.Button;
            }
            return this._Btn;
        }
        SetBtn(owner:any,listener:()=>void)
        {
            this.Btn.on(Laya.Event.CLICK,owner,listener);
        }
        //
        constructor()
        {
            super();
        }
    }