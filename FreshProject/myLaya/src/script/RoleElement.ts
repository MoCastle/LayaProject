import GameControler from "./../controler/GameControler"
import APP from "./../controler/APP"

export default class RoleElement extends Laya.Image
{
    //
    Idx:number;
    private _Btn:Laya.Button;
    get Btn():Laya.Button
    {
        if(this._Btn == null)
        {
            this._Btn = this.getChildAt(1) as Laya.Button;
            this._Btn.on(Laya.Event.CLICK,this,()=>{
                GameControler.GameControler.SetPlayerID(this.Idx);
                APP.UIManager.CloseCurView();
            })
        }
        return this._Btn;
    }
    Reset()
    {
        if(this.Btn)
        {}
    }

    constructor()
    {
        super();
    }
}