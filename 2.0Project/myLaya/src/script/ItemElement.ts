export default class ItemElement extends Laya.Box  {
    //
    Idx: number;
    private _Btn: Laya.Button;
    get Btn(): Laya.Button  {
        if (this._Btn == null)  {
            this._Btn = this.getChildAt(1) as Laya.Button;
        }
        return this._Btn;
    }
    SetBtn(owner: any, listener: () => void)  {
        this.Btn.on(Laya.Event.CLICK, owner, listener);
    }
    //
    constructor()  {
        super();
    }
}