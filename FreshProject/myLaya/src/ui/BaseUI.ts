import UIManager from "./../FrameWork/UIManager"
import FW from "./../FrameWork/FrameWork"
import {BaseEnum} from "./../Base/BaseEnum"
import {UIFunc} from "./../Utility/UIFunc"
//UI基类
export default abstract class BaseUI extends Laya.Sprite
{
    
    
    //
    protected _UIType:BaseEnum.UITypeEnum;
    protected _IsMutex:boolean;
    protected _Name:string;    
    protected _UIManager:UIManager
    private _Dirty:boolean;
    private _Showing:boolean;
    constructor(name:string)
    {
        super();
        this._UIType = BaseEnum.UITypeEnum.Low;
        this._IsMutex = false;
        this._Name = name;
        this._UIManager = FW.FM.GetManager<UIManager>(UIManager);
        this._Showing = true;
    }
    Hide()
    {
        this.visible = false;
    }

    Open()
    {
    }

    Close()
    {
    }

    OpenOP()
    {
        this.visible = true;
    }
    CloseOP()
    {
        this.visible = false;
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

    /**
     * 对UI进行适配
     * @param UI 适配UI
     */
    public FixUI(UI:Laya.View)
    {
       // UIFunc.FixUI(UI);
        this.addChild(UI);
    }
    public SetDirty()
    {
        this._Dirty = true;
    }

    public get Dirty():boolean
    {
        return this._Dirty;
    }

    public ClearDirty()
    {
        this._Dirty = false;
    }
    UIUpdate():void
    {
        if(this._Dirty)
        {
            this.Update();
            this.ClearDirty()
        }
    }
    protected abstract Update():void;
}