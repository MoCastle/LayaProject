//UI基类
abstract class BaseUI extends Laya.Sprite
{
    Open()
    {
    }

    Close()
    {
        UIManager.Mgr.Close(this);
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

    get UIType():UITypeEnum
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
    protected _UIType:UITypeEnum;
    protected _IsMutex:boolean;
    protected _Name:string;    
    constructor(name:string)
    {
        super();
        this._UIType = UITypeEnum.Low;
        this._IsMutex = false;
        this._Name = name;
    }
}