import BaseManager from "./BaseManager";
import {BaseFunc}  from "./../Base/BaseFunc"
export default class FrameWork
{
    _MgrMap:BaseFunc.Map<BaseManager>;//BaseStruct.Map<BaseManager>;
    _TemMgrList:Array<BaseManager>;
    constructor()
    {
        this._MgrMap = new BaseFunc.Map<BaseManager>();
    }
    static _FM:FrameWork;
    static get FM():FrameWork
    {
        if(FrameWork._FM==null)
        {
            FrameWork._FM = new FrameWork();
        }
        return FrameWork._FM;
    }
    //constructor
    public Update()
    {
        var tempMgrList = new Array<BaseManager>(this._MgrMap.Count);
        this._MgrMap.forEach( (mgr:BaseManager , key:string):void =>{
            tempMgrList.push(mgr);
        })
        tempMgrList.forEach((mgr,idx)=>{mgr.Update();});
    }

    public AddManager<T extends BaseManager>( type:{new (): T; Name():string } ):T
    {
        if(this._MgrMap.Has(type.Name()))
        {
            return this._MgrMap.Get(type.Name()) as T;
        }
        var newMgr:T = new type();
        this._MgrMap.Set(newMgr,type.Name());
        return  newMgr;
    }
    
    public GetManager<T extends BaseManager>(type:{new (): T; Name():string }):T{
        return this._MgrMap.Get(type.Name()) as T;
    }
}