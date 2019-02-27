import BaseMgr from "../FrameWork/BaseManager";

/**
 * 定义基础结构体
 */
export module BaseFunc {
    enum UITypeEnum {Low,Midle};
    export class Map<T>
    {
        private _Count:number;
        private _Map:{[key: string]: T};
        constructor()
        {
            this._Map = {};
            this._Count = 0;
        }

        get Count():number
        {
            return  this._Count;
        }
        forEach(callback:(mgr:T,key:string)=>void)
        {
            for(let mapKey in this._Map)
            {
                callback(this._Map[mapKey],mapKey);
            }
        }
        /**
         * 
         * @param obj 放入对象
         * @param key 键
         */
        Set( obj:T, key:string )
        {
            if(!this._Map[key])
            {
                ++this._Count;
            }
            this._Map[key] = obj;
        }
        Get(key:string)
        {
            return  this._Map[key];
        }
        /**
         * 
         * @param key 移除某个对象
         * @returns 被移除对象
         */
        Remove(key:string):T
        {
            var Obj:T = this._Map[key];
            if(Obj)
            {
                this._Map[key] = null;
                --this._Count;
            }
            return Obj;
        }
        /**
         * 
         * @param key 键
         * @returns 是否拥有
         */
        Has(key:string):boolean
        {
            if(this._Map[key])
            {
                return  true;
            }else
                return false;
        }
    }
}