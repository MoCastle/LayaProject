/**作者:Mo
 * 消息控制器
 */
var MessageCenter = /** @class */ (function () {
    function MessageCenter() {
        this._EventDict = {};
    }
    Object.defineProperty(MessageCenter, "Mgr", {
        get: function () {
            if (MessageCenter._Mgr == null) {
                MessageCenter._Mgr = new MessageCenter();
            }
            return MessageCenter._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 注册
    * @param {string} name 消息名字
    * @param {Function} action 委托
    * @param {Obj} listener 监听者
    */
    MessageCenter.prototype.Regist = function (name, action, listener) {
        var getEvent = this._GetEvent(name);
        var newDlgt = new Delegate(listener, action);
        getEvent.Add(newDlgt);
    };
    /**
     * 注销某个监听
     * @param {string} name 消息名字
     * @param {Function} action 委托
     * @param {Obj} listener 监听者
     */
    MessageCenter.prototype.DesRegist = function (name, action, listener) {
        var getEvent = this._GetEvent(name);
        getEvent.Rmv(action, listener);
    };
    /**
     * 注销某个事件
     * @param {string} name 消息名字
     */
    MessageCenter.prototype.DesRgistIDK = function (name) {
        var getEvent = this._GetEvent(name);
        getEvent.Reset();
    };
    /**
     * 触发
     * @param {string} name 消息名字
     * @param {any} param 消息名字
     */
    MessageCenter.prototype.Trigger = function (name, param) {
        if (param === void 0) { param = null; }
        var getEvent = this._GetEvent(name);
        getEvent.Execute(param);
    };
    /**
     * 获取事件
     * @param {string} name 消息名字
     */
    MessageCenter.prototype._GetEvent = function (name) {
        var event = this._EventDict[name];
        if (event == undefined || event == null) {
            event = new MEvent();
        }
        this._EventDict[name] = event;
        return event;
    };
    return MessageCenter;
}());
//委托
var Delegate = /** @class */ (function () {
    function Delegate(listener, action) {
        this.Listener = listener;
        this.Action = action;
    }
    /**
     * 触发
     * @param {any} param 消息名字
     */
    Delegate.prototype.Execute = function (param) {
        if (param === void 0) { param = null; }
        this.Action.call(this.Listener, param);
    };
    return Delegate;
}());
//事件
var MEvent = /** @class */ (function () {
    function MEvent() {
        this.Reset();
    }
    /**
    * 添加委托
    * @param {Delegate} dlg 消息名字
    */
    MEvent.prototype.Add = function (dlg) {
        this.DelegateList.push(dlg);
    };
    /**
    * 移除委托
    * @param {function} action 消息名字
    * @param {Object} listener 消息名字
    */
    MEvent.prototype.Rmv = function (action, listener) {
        if (listener === void 0) { listener = null; }
        var dlgtList = this.DelegateList;
        for (var arrIdx = dlgtList.length - 1; arrIdx > -1; --arrIdx) {
            var dlgt = dlgtList[arrIdx];
            if (action == dlgt.Action && listener == dlgt.Listener) {
                dlgtList.splice(arrIdx, 1);
                return;
            }
        }
    };
    //重置
    MEvent.prototype.Reset = function () {
        this.DelegateList = [];
    };
    /**
    * 触发
    * @param {any} param 消息名字
    */
    MEvent.prototype.Execute = function (param) {
        var dlgtList = this.DelegateList;
        for (var arrIdx = dlgtList.length - 1; arrIdx > -1; --arrIdx) {
            var dlgt = dlgtList[arrIdx];
            dlgt.Execute(param);
        }
    };
    return MEvent;
}());
//# sourceMappingURL=MessageCenter.js.map