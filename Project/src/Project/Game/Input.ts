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