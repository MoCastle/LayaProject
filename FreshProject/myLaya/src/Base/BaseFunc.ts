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

    export class Node<T>
    {
        private _Value:T;
        private _Next:Node<T>;
        constructor( )
        {
        }
        get Value():T
        {
            return this._Value;
        }
        set Value(value:T)
        {
            this._Value = value;
        }
        get Next():Node<T>
        {
            return this._Next;
        }
        set Next(node:Node<T>)
        {
            
            this._Next = node;
        }
    }

    class NodePool<T>
    {
        protected _NodeList:Node<T>;
        PullBack(node:Node<T>)
        {
            node.Value = null;
            node.Next = null;
            if(this._NodeList)
            {
                this._NodeList.Next = node;
            }else
            {
                this._NodeList = node;
            }
        }
        Aquire():Node<T>
        {
            var node:Node<T> = this._NodeList;
            if(node)
            {
                this._NodeList = this._NodeList.Next;
            }else
            {
                node = new Node<T>();
            }
            return node;
        }
           
    }

    export class NodeQueue<T>
    {
        private _Count;
        private _Head:Node<T>
        private _Taile
        constructor()
        {
            this._Count = 0;
        }

        get Count():number
        {
            return this._Count;
        }
        
        public PopNode():Node<T>
        {
            if(this._Count<1)
            {
                return ;
            }
            var node:Node<T> = null;
            node = this._Head;
            this._Head = this._Head.Next;
            node.Next = null;
            --this._Count;
            //别把尾巴带出去了
            if(this._Count == 0)
            {
                this._Taile = null;
            }
            return node;
        }

        public Push(value:T)
        {
            var node:Node<T> = new Node<T>();
            node.Value = value;
            this.PushNode(node);
        }

        public PushNode(node:Node<T>)
        {
            node.Next = null;
            if(this._Count ==0)
            {
                this._Head = node;
            }else
            {
                this._Taile.Next = node;
            }
            this._Taile = node;
            ++this._Count;
        }
        public Clear()
        {
            this._Count = 0;
            this._Taile = null;
            this._Head = null;
        }
        public get HeadNode():Node<T>
        {
            return this.HeadNode;
        }
        public get HeadValue():T
        {
            if(this._Head)
            {
                return this._Head.Value;
            }
        }
        public get TailNode():Node<T>
        {
            return  this.TailNode;
        }
        public get TailValue():T
        {
            if(this._Taile)
            {
                return this._Taile.value;
            }
        }
    }
/*
    export class LinkNodeList<T>
    {
        private _HeadNode:Node<T>;
        private _TailNode:Node<T>;

        private _CountNode:number;
        constructor()
        {
            this._HeadNode = new Node<T>();
            this._HeadNode.Next = this._HeadNode;

            this._TailNode = this._HeadNode;
        }
        /**
         * 获取头结点值
         
        get HeadValue():T
        {
            return  this._HeadNode.Value;
        }
        
        Add(value:T)
        {
            var newNode:Node<T> = new Node<T>();
            newNode.Value = value;
            this.AddNode(newNode);
        }
        AddNode(newNode:Node<T>)
        {
            if(this._TailNode!=this._HeadNode)
            {
                this._TailNode.Next = newNode;
            }else
            {
                this._HeadNode.Next = newNode;
            }
            this._TailNode = newNode;
        }
    }*/

}