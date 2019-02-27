import BaseManager from "./BaseManager";
import BaseUI from "./../ui/BaseUI"
import {BaseEnum} from "./../Base/BaseEnum"
import {ui} from "./../ui/layaMaxUI"
export default class  UIManager extends BaseManager
{
    //内部功能
    private _UINode:Laya.Sprite;
    private _MidleUINode:Laya.Sprite;
    private _UIDict:{[name:string]:BaseUI};

    constructor()
    {
        super();
        this._UINode = new Laya.Sprite();
        this._UINode.width = Laya.stage.width;
        this._UINode.height = Laya.stage.height;
        this._MidleUINode = new Laya.Sprite();
        Laya.stage.addChild(this._UINode);
        Laya.stage.addChild(this._MidleUINode);
        this._UIDict = {};
    }

    static Name():string
    {
        return  "UIManager";
    }
    public Update()
    {

    }
    public AddUI()
    {

    }

    Show<T extends BaseUI>(uiClass:{new (name:string): T; Name():string }):T
    {
        var str:string = uiClass.Name();    
        var newUI:BaseUI = this.GetUIByName(str);
        newUI = newUI==null?this.AddUIByName(str,new uiClass(str)):newUI;
        newUI.width = 10;//Laya.stage.width;
		newUI.height = 10;//Laya.stage.height;
        var node:Laya.Sprite = null;
        switch(newUI.UIType)
        {
            //中层次UI
            case BaseEnum.UITypeEnum.Midle:
                node = this._MidleUINode;
                if(this._MidleUINode.numChildren<=0)
                {
                    //通知导演暂停游戏
                    //APP.SceneManager.CurScene.CurDir.TimeUp();
                }
            break;
            //默认Ui全是低层次UI
            default:
                node = this._UINode;
            break;
        }

        var childNum:number = node.numChildren;
        //把互斥的窗口关掉
        if(newUI.IsMutex&&childNum>0)
        {
            var lastUI = node.getChildAt(node.numChildren-1) as BaseUI;
            lastUI.visible = !lastUI.IsMutex;
        }

        node.addChild(newUI);
        newUI.OpenOP();

        return newUI as T;
    }

    Close(ui:BaseUI)
    {
        ui.removeSelf();

        ui.CloseOP();
        var node:Laya.Sprite = null;
        switch(ui.UIType)
        {
            //中层次UI
            case BaseEnum.UITypeEnum.Midle:
                node = this._MidleUINode;
                if(node.numChildren<=0)
                    //关闭窗口 通知游戏继续
                    //APP.SceneManager.CurScene.CurDir.ContinueTime();
            break;
            //默认Ui全是低层次UI
            default:
                node = this._UINode;
            break;
        }
        var childNum:number = node.numChildren;
        if(childNum>0)
        {
            var lastUI:BaseUI = node.getChildAt(childNum-1) as BaseUI;
            lastUI.visible = true;
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
           var closeUI: BaseUI = uiNode.getChildAt(0) as BaseUI;//.removeSelf();
           this.Close(closeUI);
        }
        uiNode = this._MidleUINode
        while (uiNode.numChildren) {
           var closeUI: BaseUI = uiNode.getChildAt(0) as BaseUI;//.removeSelf();
           this.Close(closeUI);
        }
    }

    GetUIByName(name:string):BaseUI
    {
        var ui = this._UIDict[name];
        ui = ui==undefined?null:ui;
        return ui;
    }
    AddUIByName(name:string,ui:BaseUI):BaseUI
    {
        this._UIDict[name] = ui;
        return ui;
    }
    
}