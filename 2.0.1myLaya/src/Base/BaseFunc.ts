import BaseMgr from "../FrameWork/BaseManager";
/**
 * 定义基础结构体
 */
export module BaseFunc {
    enum UITypeEnum { Low, Midle };
    export class Map<T>
    {
        private _Count: number;
        private _Map: { [key: string]: T };
        constructor() {
            this._Map = {};
            this._Count = 0;
        }

        get Count(): number {
            return this._Count;
        }
        forEach(callback: (mgr: T, key: string) => void) {
            for (let mapKey in this._Map) {
                callback(this._Map[mapKey], mapKey);
            }
        }
        /**
         * 
         * @param obj 放入对象
         * @param key 键
         */
        Set(obj: T, key: string) {
            if (!this._Map[key]) {
                ++this._Count;
            }
            this._Map[key] = obj;
        }
        Get(key: string) {
            return this._Map[key];
        }
        /**
         * 
         * @param key 移除某个对象
         * @returns 被移除对象
         */
        Remove(key: string): T {
            var Obj: T = this._Map[key];
            if (Obj) {
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
        Has(key: string): boolean {
            if (this._Map[key]) {
                return true;
            } else
                return false;
        }
    }

    export class Node<T>
    {
        private _Value: T;
        private _Next: Node<T>;
        constructor() {
        }
        get Value(): T {
            return this._Value;
        }
        set Value(value: T) {
            this._Value = value;
        }
        get Next(): Node<T> {
            return this._Next;
        }
        set Next(node: Node<T>) {

            this._Next = node;
        }
    }

    class NodePool<T>
    {
        protected _NodeList: Node<T>;
        PullBack(node: Node<T>) {
            node.Value = null;
            node.Next = null;
            if (this._NodeList) {
                this._NodeList.Next = node;
            } else {
                this._NodeList = node;
            }
        }
        Aquire(): Node<T> {
            var node: Node<T> = this._NodeList;
            if (node) {
                this._NodeList = this._NodeList.Next;
            } else {
                node = new Node<T>();
            }
            return node;
        }

    }

    export class NodeQueue<T>
    {
        private _Count;
        private _Head: Node<T>
        private _Taile
        constructor() {
            this._Count = 0;
        }

        get Count(): number {
            return this._Count;
        }

        public PopNode(): Node<T> {
            if (this._Count < 1) {
                return;
            }
            var node: Node<T> = null;
            node = this._Head;
            this._Head = this._Head.Next;
            node.Next = null;
            --this._Count;
            //别把尾巴带出去了
            if (this._Count == 0) {
                this._Taile = null;
            }
            return node;
        }

        public Push(value: T) {
            var node: Node<T> = new Node<T>();
            node.Value = value;
            this.PushNode(node);
        }

        public PushNode(node: Node<T>) {
            node.Next = null;
            if (this._Count == 0) {
                this._Head = node;
            } else {
                this._Taile.Next = node;
            }
            this._Taile = node;
            ++this._Count;
        }
        public Clear() {
            this._Count = 0;
            this._Taile = null;
            this._Head = null;
        }
        public get HeadNode(): Node<T> {
            return this.HeadNode;
        }
        public get HeadValue(): T {
            if (this._Head) {
                return this._Head.Value;
            }
        }
        public get TailNode(): Node<T> {
            return this.TailNode;
        }
        public get TailValue(): T {
            if (this._Taile) {
                return this._Taile.value;
            }
        }
    }

    export class Queue<T>
    {
        private _NodePool: NodePool<T>;
        private _NodeQueue: NodeQueue<T>;

        constructor() {
            this._NodePool = new NodePool<T>();
            this._NodeQueue = new NodeQueue<T>();
        }

        public Push(value: T) {
            var node: Node<T> = this._NodePool.Aquire();
            node.Value = value;
            this._NodeQueue.PushNode(node);
        }

        public Pop(): T {
            var node: Node<T> = this._NodeQueue.PopNode();
            if (node) {
                return node.Value;
            }
            this._NodePool.PullBack(node);
            return null;
        }

        get Count(): number {
            return this._NodeQueue.Count;
        }
    }

    export class SmoothDamp {
        private m_CurrentVelocity: number;
        private m_SmoothTime: number;
        private m_MaxSpeed: number;
        private m_MaxMoveNum:number;
        
        /**
         * 
         * @param smoothTime 平滑时长
         * @param maxSpeed 最大速度
         */
        constructor(smoothTime: number, maxSpeed: number = 10) {
            this.m_CurrentVelocity = 0;
            this.m_SmoothTime = smoothTime;
            this.m_MaxSpeed = maxSpeed;
            this.m_MaxMoveNum = this.m_MaxSpeed * this.m_SmoothTime;
        }

        /**
         * 
         * @param current 当前值
         * @param target 目标值
         * @param deltaTime 帧率
         */
        public SmoothDamp(current:number,target:number,deltaTime:number = 1/60):number
        {
            var num:number = 2/this.m_SmoothTime;
            var num2:number = num * deltaTime;
            var num3:number = 1/(1+num2+0.48*num2*num2+0.235*num2*num2*num2);
            var num4:number = current - target;
            var num5:number = target;
            var num6:number = this.m_MaxSpeed * this.m_SmoothTime;
            num4 = num4 >-num6&&num4<num6?num4:(num4>num6?num6:-num6);
            target = current - num4;
            var num7:number = (this.m_CurrentVelocity+num*num4)*deltaTime;
            this.m_CurrentVelocity = (this.m_CurrentVelocity - num*num7)*num3;
            var num8:number = target +(num4+num7)*num3;
            if(num5 - current > 0 == num8>num5)
            {
                num8 = num5;
                this.m_CurrentVelocity = (num8 - num5)/deltaTime;
            }
            return num8;
        }
        /*
        public Count(curPS: Laya.Vector3, targetPS: Laya.Vector3, deltaTime: number = 1 / 60):Laya.Vector3 {
            var maxMove: number = this.m_MaxMoveNum;
            var runTimeRate: number = 2 * deltaTime / this.m_SmoothTime;
            var timeRatio: number = 1 / (1 + runTimeRate + 0.48 * runTimeRate * runTimeRate + 0.235 * runTimeRate * runTimeRate * runTimeRate);
            var gap: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(targetPS, curPS, gap);
            var moveDir: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.normalize(gap, moveDir);
            //速度修正
            var moveDistance: number = Laya.Vector3.distance(targetPS, curPS);
            moveDistance = moveDistance < maxMove && moveDistance > -maxMove ? moveDistance : (moveDistance > maxMove ? maxMove : -maxMove);

            var curMoveDistacne:number = ( this.m_CurrentVelocity + 2*(moveDistance/this.m_SmoothTime))*deltaTime;
            this.m_CurrentVelocity = (this.m_CurrentVelocity - 2*curMoveDistacne/this.m_SmoothTime)*timeRatio;
            var endPS:Laya.Vector3 = new Laya.Vector3();

            var scale = (moveDistance + curMoveDistacne)*timeRatio;
            Laya.Vector3.scale(moveDir,scale,endPS);
            //Laya.Vector3.add(targetPS,endPS,endPS)
            Laya.Vector3.add(curPS,endPS,endPS);
            var endMoveDir:Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.subtract(curPS,endPS,endMoveDir);            
            if( Laya.Vector3.dot(moveDir,endMoveDir) < 0 )//Laya.Vector3.distance(targetPS,curPS) * Laya.Vector3.distance(targetPS,endPS)<0 )
            {
                endPS = targetPS;
                this.m_CurrentVelocity = 0;
            }
            return endPS;
            //Laya.Vector3.scale(moveDir,moveDistance,end);
            //targetPS + Laya.Vector3.add(moveDistance,curMoveDistacne,endSpeed) (moveDistance + curMoveDistacne);
        }*/
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