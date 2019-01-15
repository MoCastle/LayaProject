/**作者:Mo
 * UI管理
 */
class UIManager
{
    //对外接口
    private static _Mgr:UIManager;
    static get Mgr():UIManager {
        if(UIManager._Mgr == null)
        {
            UIManager._Mgr = new UIManager();
        }
        return UIManager._Mgr;
    }

    Open(ui:Laya.Sprite)
    {
        this._UINode.addChild(ui);
    }

    Close(ui:Laya.Sprite)
    {
        ui.removeSelf();
    }
    //删除所有节点上的UI
    Clear()
    {
        var uiNode = this._UINode;
        while (uiNode.numChildren) {
            (uiNode.getChildAt(0) as Laya.Sprite).removeSelf();
        }
    }
    //内部功能
    private constructor()
    {
        this._UINode = new Laya.Sprite();
        Laya.stage.addChild(this._UINode);
    }

    private _UINode;
}

//UI基类
abstract class BaseUI extends Laya.Sprite
{
    Open()
    {
        UIManager.Mgr.Open(this);
    }
    Close()
    {
        UIManager.Mgr.Close(this);
    }
    Destroy( )
    {
        this.destroy();
    }
    constructor()
    {
        super();
    }
}