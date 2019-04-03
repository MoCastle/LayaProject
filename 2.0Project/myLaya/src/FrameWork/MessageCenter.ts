/**作者:Mo
 * 消息控制器
 */
import BaseManager from "./BaseManager";
export module MessageMD {
    export const GameEvent =
        {
            PlayerDeath: "PlayerDeath",
            GameTimeUp: "GameTimeUp",
            GameContinue: "GameContinue"
        }

    export class MessageCenter extends BaseManager  {
        static Name(): string  {
            return "MessageCenter";
        }
        private static _Mgr: MessageCenter;
        private _EventDict: { [Key: string]: MEvent };

        /**
         * 获取事件
         * @param {string} name 消息名字
         */
        private _GetEvent(name: string): MEvent  {
            var event: MEvent = this._EventDict[name];
            if (event == undefined || event == null)  {
                event = new MEvent();
                this._EventDict[name] = event;
            }
            event = this._EventDict[name];
            return event;
        }
        constructor()  {
            super();
            this._EventDict = {};
        }
        
        /**
        * 注册
        * @param {string} name 消息名字
        * @param {Function} action 委托
        * @param {Obj} listener 监听者
        */
        Regist(name: string, action: () => void, listener: Object):MEvent  {
            var getEvent: MEvent = this._GetEvent(name);
            var newDlgt: Delegate = new Delegate(listener, action);
            getEvent.Add(newDlgt);
            return getEvent
        }

        /**
         * 注销某个监听
         * @param {string} name 消息名字
         * @param {Function} action 委托
         * @param {Obj} listener 监听者
         */
        DesRegist(name: string, action: () => void, listener: Object)  {
            var getEvent: MEvent = this._GetEvent(name);
            getEvent.Rmv(action, listener)
        }

        /**
         * 注销某个事件
         * @param {string} name 消息名字
         */
        DesRgistIDK(name: string)  {
            var getEvent: MEvent = this._GetEvent(name);
            getEvent.Reset();
        }

        /**
         * 触发
         * @param {string} name 消息名字
         * @param {any} param 消息名字
         */
        Fire(name: string, param: any = null)  {
            var getEvent: MEvent = this._GetEvent(name);
            getEvent.Execute(param);
        }
        public Update(): void  {

        }
    }
    //委托
    export class Delegate {
        Listener: Object;
        Action: (param:any) => void;
        /**
         * 触发
         * @param {any} param 消息名字
         */
        Execute(param: any = null)  {
            this.Action.call(this.Listener, param);
        }
        constructor(listener: Object, action: (param:any) => void)  {
            this.Listener = listener;
            this.Action = action;
        }

    }
    
    //事件
    export class MEvent {
        DelegateList: Array<Delegate>;
        constructor()  {
            this.Reset();
        }
        /**
        * 添加委托
        * @param {Delegate} dlg 消息名字
        */
        Add(dlg: Delegate)  {
            this.DelegateList.push(dlg);
        }
        /**
        * 移除委托
        * @param {function} action 消息名字
        * @param {Object} listener 消息名字
        */
        Rmv(action: () => void, listener: Object = null)  {
            var dlgtList: Array<Delegate> = this.DelegateList;
            for (var arrIdx: number = dlgtList.length - 1; arrIdx > -1; --arrIdx)  {
                var dlgt = dlgtList[arrIdx];
                if (action == dlgt.Action && listener == dlgt.Listener)  {
                    dlgtList.splice(arrIdx, 1);
                    return;
                }
            }
        }
        //重置
        Reset()  {
            this.DelegateList = []
        }
        /**
        * 触发
        * @param {any} param 消息名字
        */
        Execute(param: any)  {
            var dlgtList: Array<Delegate> = this.DelegateList;
            for (var arrIdx: number = dlgtList.length - 1; arrIdx > -1; --arrIdx)  {
                var dlgt = dlgtList[arrIdx];
                dlgt.Execute(param);
            }
        }
    }
}


