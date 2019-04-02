import GameControler from "./../controler/GameControler"
import APP from "./../controler/APP"

export default class RoleElement extends Laya.Image {
    //
    private _Btn: Laya.Button;
    private _Img: Laya.Image;
    private m_OnClickImg:(id:number)=>void;
    private m_CharacterID:number;
    get Btn(): Laya.Button {
        if (this._Btn == null) {
            this._Btn = this.getChildAt(1) as Laya.Button;
            this._Btn.on(Laya.Event.CLICK, this, () => {
                GameControler.GameControler.SetPlayerID(this.m_CharacterID);
                APP.UIManager.CloseCurView();
            })
        }
        return this._Btn;
    }

    Reset() {
        if (!this._Img) {
            this.Init()
        }
    }

    public SetGray(isGray:boolean)
    {
        this._Img.gray = isGray;
    }

    public RegistOnImgClick(eventFunction:()=>void)
    {
        var id=this.m_CharacterID;
        this._Img.on(Laya.Event.CLICK,null,eventFunction);// owner, ()=>{ eventFunction(id) } )
    }

    public set CharacterID(id:number)
    {
        this.m_CharacterID = id;
    }
    Init()  {
        this._Img = this.getChildAt(0) as Laya.Image;
    }

    constructor() {
        super();
    }
}