/**作者:Mo
 * 输入管理相关
 */
//基础输入控制器
abstract class BaseGameInput
{
    //公有
    NextInput:BaseGameInput;
    abstract Input(isRight:boolean);

    //私有
    constructor( input :BaseGameInput = null )
    {
        if(input == null)
        {
            input = this;
        }
        this.NextInput = input;
    }
    
}

class DIYInput extends BaseGameInput
{
    Input(isRight:boolean)
    {
        if(this._Listener)
            this._Listener.call(this._Owner,isRight);
    }

    private _Owner:any;
    private _Listener:(isring:boolean)=>void;
    constructor(owner:any = null,listener:(isring:boolean)=>void = null)
    {
        super();
        this._Owner = owner;
        this._Listener = listener;
    }
}
class NormGameInput extends BaseGameInput
{
    GameDir:GameDirector;
    constructor( dir:GameDirector,input:BaseGameInput = null )
    {
        super(input);
        this.GameDir = dir;
    }
    Input( isRight:boolean )
    {
        this.GameDir.MoveStep(isRight);
    }
}