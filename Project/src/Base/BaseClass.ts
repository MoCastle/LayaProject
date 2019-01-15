/**作者:Mo
 * 通用的公共基类
 */
//穿戴模式基类
abstract class Clothe
{
    NextClose:Clothe;
    abstract Update();
    constructor( close:Clothe = null )
    {
        if(close == null)
        {
            close = this;
        }
        this.NextClose = close;
    }
}