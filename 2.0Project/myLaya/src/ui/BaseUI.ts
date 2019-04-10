import UIManager from "./../FrameWork/UIManager"
import FW from "./../FrameWork/FrameWork"
import {BaseEnum} from "./../Base/BaseEnum"
import {UIFunc} from "./../Utility/UIFunc"
import {MessageMD} from "./../FrameWork/MessageCenter"

//UI基类
export default abstract class BaseUI extends Laya.Box
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
        // this.left = 0;
	    // this.right = 0;
		// this.bottom = 0;
        // this.top = 0;
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
        this.Open();
    }
    CloseOP()
    {
        //this.visible = false;
        this.Close();
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

    get Showing():boolean
    {
        return this._Showing;
    }

    Layout()
    {

    }

    /**
     * 对UI进行适配
     * @param UI 适配UI
     */
    public FixUI(UI:Laya.View)
    {
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