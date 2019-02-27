import UIManager from "./../FrameWork/UIManager"
import FW from "./../FrameWork/FrameWork"
import APP from "./../controler/APP"
//import {GameStruct} from "./../Game/GameStruct"

export default class RoleElement extends Laya.Box
{
    //
    Idx:number;
    private _Btn:Laya.Button;
    UIManager:UIManager;
    get Btn():Laya.Button
    {
        if(this._Btn == null)
        {
            this._Btn = this.getChildAt(1) as Laya.Button;
            this._Btn.on(Laya.Event.CLICK,this,()=>{
                APP.GameControler.SetPlayerID(this.Idx);
                this.UIManager.CloseCurView();
            })
        }
        return this._Btn;
    }
    Reset()
    {
        if(this.Btn)
        {}
    }
    //
    constructor()
    {
        super();
        this.UIManager= FW.FM.GetManager<UIManager>(UIManager);
    }
}