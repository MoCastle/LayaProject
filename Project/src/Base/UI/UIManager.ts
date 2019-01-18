/**作者:Mo
 * UI管理
 */
enum UITypeEnum {Low,Midle};
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

    Open(ui:BaseUI)
    {
        var node:Laya.Sprite = null;
        switch(ui.UIType)
        {
            //中层次UI
            case UITypeEnum.Midle:
                node = this._MidleUINode;
            break;
            //默认Ui全是低层次UI
            default:
                node = this._UINode;
            break;
        }
        node.addChild(ui);
        if(this._MidleUINode.numChildren>0)
        {
            //通知导演暂停游戏
            APP.SceneManager.CurScene.CurDir.TimeUp();
        }
        ui.OpenOP();
    }

    Close(ui:BaseUI)
    {
        ui.removeSelf();
        ui.CloseOP();
        if(ui.UIType == UITypeEnum.Midle && this._MidleUINode.numChildren<=0)
        {
            //关闭窗口 通知游戏继续
            APP.SceneManager.CurScene.CurDir.ContinueTime();
        }
    }

    CloseCurView()
    {
        var ui:BaseUI =this._UINode.getChildAt(this._UINode.numChildren-1) as BaseUI;
        this.Close(ui);
    }

    //删除所有节点上的UI
    Clear()
    {
        var uiNode = this._UINode;
        while (uiNode.numChildren) {
            (uiNode.getChildAt(0) as Laya.Sprite).removeSelf();
        }
        uiNode = this._MidleUINode
        while (uiNode.numChildren) {
            (uiNode.getChildAt(0) as Laya.Sprite).removeSelf();
        }
    }

    //内部功能
    private constructor()
    {
        this._UINode = new Laya.Sprite();
        this._MidleUINode = new Laya.Sprite();
        Laya.stage.addChild(this._UINode);
        Laya.stage.addChild(this._MidleUINode);
    }

    private _UINode:Laya.Sprite;
    private _MidleUINode:Laya.Sprite;
}

