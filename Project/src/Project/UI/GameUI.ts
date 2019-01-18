/**作者:Mo
 * 场景UI
 */
module ui {
    export class ExtendsGameSceneUI extends ui.GameSceneUI
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
            this.SetCountTime();
        }
    }
}
class GameUI extends BaseUI
{
    UI:ui.GameSceneUI;
    constructor()
    {
        super();
        this.UI = new ui.ExtendsGameSceneUI();
        this.addChild(this.UI);
    }
    
    get LeftTouch():Laya.Button
    {
        return this.UI.LeftTouch
    }
    get RightTouch():Laya.Button
    {
        return this.UI.RightTouch;
    }
		public _CountTime:Laya.Label;
    
}