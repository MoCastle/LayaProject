import UIManager from "./../FrameWork/UIManager"
import FW from "./../FrameWork/FrameWork"
import {BaseEnum} from "./../Base/BaseEnum"
//UI基类
export default abstract class BaseUI extends Laya.Sprite
{
    Open()
    {
    }

    Close()
    {
        //UIManager..Close(this);
        var uiMgr:UIManager = FW.FM.GetManager<UIManager>(UIManager);
    }

    OpenOP()
    {
        this.visible = true;
    }
    CloseOP()
    {
    }

    Destroy( )
    {
        this.destroy();
    }

    get UIType():BaseEnum.UITypeEnum
    {
        return this._UIType;
    }
    
    get IsMutex():boolean
    {
        return this._IsMutex;
    }

    get Name():string
    {
        return this._Name;
    }
    
    //
    protected _UIType:BaseEnum.UITypeEnum;
    protected _IsMutex:boolean;
    protected _Name:string;    
    protected _UIManager:UIManager
    constructor(name:string)
    {
        super();
        this._UIType = BaseEnum.UITypeEnum.Low;
        this._IsMutex = false;
        this._Name = name;
        this._UIManager = FW.FM.GetManager<UIManager>(UIManager);
    }
    /**
     * 对UI进行适配
     * @param UI 适配UI
     */
    public FixUI(UI:Laya.View)
    {
        UI.width = Laya.stage.width;
        UI.height = Laya.stage.height;
        this.addChild(UI);
    }
}