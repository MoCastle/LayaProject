module ui {
    export class ExtendsItemListUI extends ui.ItemListUI
    {
        constructor()
        {
            super();
        }
        createChildren():void
        {
            var res:JSON = Laya.loader.getRes("res/uijson/ItemListUI.json");
            this.createView(res);
            super.createChildren();
        }
    }
}

class ItemListUI extends BaseUI
{
    constructor()
    {
        super();
        this.addChild(new ui.ExtendsItemListUI());
        this._UIType = UITypeEnum.Midle;
    }

}