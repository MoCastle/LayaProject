
export module Enum {
    export enum LifeObjState{ UnStarted,Starting,Updating,Ended }
}
//该对象模板用于有 开始、进行性、结束 三种状态的对象
export default abstract class LifeObj
{
    ObjState:Enum.LifeObjState;
    abstract Start():void;

    Update():void
    {
        if(this.ObjState == Enum.LifeObjState.UnStarted)
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
        this.ObjState=Enum.LifeObjState.UnStarted;
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
        this.ObjState= Enum.LifeObjState.Ended;
    }

    //进入配置
    protected _Start():void
    {
        this.ObjState= Enum.LifeObjState.Starting;
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
        this.ObjState= Enum.LifeObjState.Updating;
    }
    //执行过程中的功能
    protected abstract _Update():void;
}