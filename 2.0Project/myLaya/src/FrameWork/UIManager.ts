import BaseManager from "./BaseManager";
import BaseUI from "./../ui/BaseUI"
import { BaseEnum } from "./../Base/BaseEnum"
import { UIFunc } from "./../Utility/UIFunc"
import { BaseFunc } from "./../Base/BaseFunc"
import APP from "../controler/APP";
enum NodeType {
    Bottom,
    Middle,
}
export default class UIManager extends BaseManager {
    static g_UIWidth = 750;
    static g_UIHeight = 1334;
    //内部功能
    private m_RootNode: Laya.Box;
    private m_BottomNode: Laya.Box;
    private m_MidleNode: Laya.Box;
    private _UIDict: { [name: string]: BaseUI };
    private _UpdateCount: number;
    private m_UpdateTime:number;

    private AddNode(node: NodeType): void  {
        var nodeBox: Laya.Box = new Laya.Box();
        nodeBox.top = 0;
        nodeBox.bottom = 0;
        nodeBox.left = 0;
        nodeBox.right = 0;
        switch (node)  {
            case NodeType.Bottom:
                this.m_BottomNode = nodeBox;
                break;
            default:
                this.m_MidleNode = nodeBox;
                break;
        }
        this.m_RootNode.addChild(nodeBox);
        //Laya.stage.addChild(nodeBox);
    }
    
    static Name(): string  {
        return "UIManager";
    }

    constructor()  {
        super();
        
        var rootBox = new Laya.Box();
        rootBox.width = UIManager.g_UIWidth;
        rootBox.height = UIManager.g_UIHeight;
        Laya.stage.addChild(rootBox);
        this.m_RootNode = rootBox;
        this.onSizeChange();
        Laya.stage.addChild(this.m_RootNode);
        this.m_UpdateTime = 0;

        this.AddNode(NodeType.Bottom);
        this.AddNode(NodeType.Middle);
        
        this._UIDict = {};
        this._UpdateCount = 0;
        Laya.stage.on(Laya.Event.RESIZE, this, this.onSizeChange);
        
    }

    onSizeChange()
    {
        var rootBox = this.m_RootNode;
        UIFunc.FixUI(rootBox,UIManager.g_UIWidth);
        /*
        var scale = UIFunc.CountScaleFix(UIManager.g_UIWidth);
        var rootBox = this.m_RootNode;
        rootBox.scaleX = scale;
        rootBox.scaleY = scale;
        rootBox.height = UIManager.g_UIHeight * scale;
        rootBox.width = UIManager.g_UIWidth;*/
        if(!this.m_BottomNode) {
            return;
        }
        var numChild = this.m_BottomNode.numChildren;
        for(var i = 0;i < numChild;i ++) {
            var node = this.m_BottomNode.getChildAt(i);
            if(node && node["Layout"]) {
                node["Layout"]();
            }
        }

        numChild = this.m_BottomNode.numChildren;
        for(var i = 0;i < numChild;i ++) {
            var node = this.m_BottomNode.getChildAt(i);
            if(node && node["Layout"]) {
                node["Layout"]();
            }
        }

    }    

    public Update()  {
        
        //定帧刷新UI
        if (this.m_UpdateTime <  APP.TimeManager.GameTime)  {
            this.UpdateUI(this.m_BottomNode);
            this.UpdateUI(this.m_MidleNode);
            this._UpdateCount = 0;
            this.m_UpdateTime = APP.TimeManager.GameTime + 0.3;
        }
        
    }

    public UpdateUI(node: Laya.Sprite)  {
        for (let idx: number = 0; idx < node.numChildren; ++idx)  {
            var ui: BaseUI = node.getChildAt(idx) as BaseUI;
            ui.UIUpdate();
        }
    }
    
    public AddUI()  {

    }

    Show<T extends BaseUI>(uiClass: { new(name: string): T; Name(): string }): T  {
        var str: string = uiClass.Name();
        var newUI: BaseUI = this.GetUIByName(str);
        newUI = newUI == null ? this.AddUIByName(str, new uiClass(str)) : newUI;
        var node: Laya.Sprite = null;
        switch (newUI.UIType)  {
            //中层次UI
            case BaseEnum.UITypeEnum.Midle:
                node = this.m_MidleNode;
                if (this.m_MidleNode.numChildren <= 0)  {
                    //通知导演暂停游戏
                    //APP.SceneManager.CurScene.CurDir.TimeUp();
                }
                break;
            //默认Ui全是低层次UI
            default:
                node = this.m_BottomNode;
                break;
        }

        var childNum: number = node.numChildren;
        //把互斥的窗口关掉
        if (newUI.IsMutex && childNum > 0)  {
            var lastUI = node.getChildAt(node.numChildren - 1) as BaseUI;
            if (!lastUI.IsMutex)
                lastUI.Hide();
        }

        node.addChild(newUI);
        newUI.OpenOP();
        if (newUI.UIType == BaseEnum.UITypeEnum.Midle && node.numChildren > 0) {
            node.visible = true;
        }

        return (newUI as T);
    }

    Close(ui: BaseUI)  {
        ui.removeSelf();
        ui.CloseOP();
        var node: Laya.Sprite = null;
        switch (ui.UIType)  {
            //中层次UI
            case BaseEnum.UITypeEnum.Midle:
                node = this.m_MidleNode;

                if (node.numChildren <= 0) {
                    node.visible = false;
                }
               // this.Clear();
                    //关闭窗口 通知游戏继续
                    //APP.SceneManager.CurScene.CurDir.ContinueTime();
            break;
            //默认Ui全是低层次UI
            default:
                node = this.m_BottomNode;
                break;
        }

        var childNum: number = node.numChildren;
        if (childNum > 0)  {
            var lastUI: BaseUI = node.getChildAt(childNum - 1) as BaseUI;
            lastUI.OpenOP();
        }
    }

    CloseCurView()  {
        var ui: BaseUI = this.m_BottomNode.getChildAt(this.m_BottomNode.numChildren - 1) as BaseUI;
        this.Close(ui);
    }

    //删除所有节点上的UI
    Clear()  {
        var uiNode = this.m_BottomNode;
        while (uiNode.numChildren) {
            var closeUI: BaseUI = uiNode.getChildAt(0) as BaseUI;//.removeSelf();
            this.Close(closeUI);
        }
        uiNode = this.m_MidleNode
        while (uiNode.numChildren) {
            var closeUI: BaseUI = uiNode.getChildAt(0) as BaseUI;//.removeSelf();
            this.Close(closeUI);
        }
    }

    GetUIByName(name: string): BaseUI  {
        var ui = this._UIDict[name];
        ui = ui == undefined ? null : ui;
        return ui;
    }
    AddUIByName(name: string, ui: BaseUI): BaseUI  {
        this._UIDict[name] = ui;
        return ui;
    }

}