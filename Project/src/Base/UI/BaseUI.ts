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

    OpenOP()
    {
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

    //
    protected _UIType:UITypeEnum;
    
    constructor()
    {
        super();
        this._UIType = UITypeEnum.Low;
    }
}