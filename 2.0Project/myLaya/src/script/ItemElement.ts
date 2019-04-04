import { MessageMD } from "./../FrameWork/MessageCenter"
export default class ItemElement extends Laya.Box {
    //
    private m_ItemIdx: number;
    private _Btn: Laya.Button;
    private _Img: Laya.Image;
    private m_NumLabel: Laya.Label;
    private m_LabelString: string[];
    private m_BuyItem: MessageMD.Delegate;
    private m_ChooseItem: MessageMD.Delegate;

    get Btn(): Laya.Button {
        if (this._Btn == null) {
            this._Btn = this.getChildAt(1) as Laya.Button;
        }
        return this._Btn;
    }
    public set ItemIdx(id: number) {
        this.m_ItemIdx = id;
    }
    
    public get Img(): Laya.Image {
        return this._Img;
    }
    public get BuyBtn(): Laya.Button {
        return this._Btn;
    }
    public set BtnLable(str:string)
    {
        if(!str)
            return;
        this._Btn.text.text = str;
    }
    public set IsGray(value: boolean) {
        this.Img.gray = value;
    }
    public get IsGray(): boolean {
        return this.Img.gray;
    }
    public set Num(num: number) {
        this.m_LabelString[1] = "" + num;
        this.m_NumLabel.text = this.m_LabelString[0] + this.m_LabelString[1];
    }
    public set Price(num: number)  {
        this._Btn.text.text = "" + num;
    }
    constructor() {
        super();
    }

    Init() {
        this._Img = this.getChildAt(0) as Laya.Image;
        this._Btn = this.getChildAt(1) as Laya.Button;
        this.m_NumLabel = this.getChildAt(2) as Laya.Label;
        this._Btn.on(Laya.Event.CLICK, this, this.BuyItem);
        this._Img.on(Laya.Event.CLICK, this, this.ChooseImg);
        if (!this.m_LabelString)  {
            this.m_LabelString = this.m_NumLabel.text.split("#");
        }
    }

    public ChooseImg() {
        if (this.m_ChooseItem)
            this.m_ChooseItem.Execute(this.m_ItemIdx);
    }

    public BuyItem() {
        if (this.m_BuyItem)
            this.m_BuyItem.Execute(this.m_ItemIdx);
    }

    public RegistBuy(owner: any, listener: (id: number) => void) {
        var newDelegate = new MessageMD.Delegate(owner, listener);
        this.m_BuyItem = newDelegate;
    }

    public RegistChoose(owner: any, listener: (id: number) => void) {
        var newDelegate = new MessageMD.Delegate(owner, listener);
        this.m_ChooseItem = newDelegate;
    }
}