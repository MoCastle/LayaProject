/*
作者Mo 通用功能放在这
*/ 
//静态常量定义
//输入常量 左/右
const IsRight:boolean = true;
const PlayerMoveTime:number =0.02*10000;
//const PlayerMoveTime:number =0.02;


enum LifeObjState{ UnStarted,Starting,Updating,Ended }

class MLocation
{
    get X():number
    {
        return this._Arr[0];
    }
    set X(x:number)
    {
        this._Arr[0] =x;
    }
    get Y():number
    {
        return this._Arr[1];
    }
    set Y(y:number)
    {
        this._Arr[1] = y;
    }
    private _Arr:Array<number>;
    constructor( x:number,y:number )
    {
        this._Arr = [x,y];
    }
}

//该对象模板用于有 开始、进行性、结束 三种状态的对象
abstract class LifeObj
{
    ObjState:LifeObjState;
    abstract Start():void;

    Update():void
    {
        if(this.ObjState == LifeObjState.UnStarted)
        {
            this.Start();
        }
        if(this._UpdateFunc !=null)
        {
            this._UpdateFunc();
        }
    }

    //内部功能
    protected _UpdateFunc:()=>void;
    
    constructor()
    {
        this._UpdateFunc=null;
        this.ObjState=LifeObjState.UnStarted;
    }

    //离开时进行配置
    protected _Leave():void
    {
        this._UpdateFunc = this._Leaveing;
    }

    //离开时进行配置 离开逻辑执行完成后进入结束状态
    protected _Leaveing():void
    {
        this._LeaveComplete();
    }

    //离开准备完毕 执行离开逻辑
    protected _LeaveComplete()
    {
        this._UpdateFunc = null;
        this.ObjState= LifeObjState.Ended;
        APP.UIManager.Clear();
    }

    //进入配置
    protected _Start():void
    {
        this.ObjState= LifeObjState.Starting;
        this._UpdateFunc = this._Starting;
    }
    
    //开始准备 准备就绪后正式运行
    protected _Starting():void
    {
        this._StartComplete();
    }

    protected _StartComplete():void
    {
        this._UpdateFunc = this._Update;
        this.ObjState= LifeObjState.Updating;
    }
    //执行过程中的功能
    protected abstract _Update():void;
}