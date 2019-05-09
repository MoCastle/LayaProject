import BaseAgent from "./BaseAgent"
import GameAPP from "./../controler/GameAPP"
export default class PlayerGuestAgent extends BaseAgent {
    static _Agent: PlayerGuestAgent;
    static get GuestAgent(): PlayerGuestAgent {
        if (this._Agent == null) {
            this._Agent = new PlayerGuestAgent();
        }
        return this._Agent;
    }

    public get SkinDir():String {
        return "entersceneui/res" + this.m_PlayerEntity.CurLevel + "/";
    }

    public get TotalStart(): number {
        return this.m_PlayerEntity.TotalStart;
    }

    public get PerTogateStars(): number[] {
        return this.m_PlayerEntity.PerTogateStars;
    }

    public setPerTogateStars(levelId, startNum) {
        this.m_PlayerEntity.setPerTogateStars(levelId, startNum);
    }

    public get CurLevel() {
        return this.m_PlayerEntity.CurLevel;
    }

    public set CurLevel(val:number) {
        this.m_PlayerEntity.CurLevel = val;
    }

    public get MaxLevel() {
        return this.m_PlayerEntity.MaxLevel;
    }

    public set MaxLevel(val:number) {
        this.m_PlayerEntity.MaxLevel = val;
    }

    public get Money(): number {
        return this.m_PlayerEntity.Money;
    }
    public get CharacterID(): number {
        return this.m_PlayerEntity.CurCharacterID;
    }
    public get CharacterList(): Array<number> {
        return this.m_PlayerEntity.CharacterList;
    }

    public get ItemList(): Array<number> {
        return this.m_PlayerEntity.ItemList;
    }

    private constructor() {
        super();    
    }

    public BuyCharacter(id: number)  {
        var price = GameAPP.CharacterMgr.GetPrice(id);
        if (id < 0|| price <0 || price > this.m_PlayerEntity.Money)  {0
            return false;
        }
        this.m_PlayerEntity.Money -= price;
        this.m_PlayerEntity.AddCharacter(id);
        return true;
    }

    public BuyItem(id: number)  {
        var price = GameAPP.ItemMgr.GetPrice(id);
        if(id < 0|| price <0 )
        {
            return false;
        }
        if(price > this.m_PlayerEntity.Money)
        {
            return false;
        }
        this.m_PlayerEntity.Money -= price;
        this.m_PlayerEntity.AddItem(id);
        return true;
    }

    public SetCharacter(id)
    {
        var characterList:Array<number> = this.CharacterList;
        if(characterList[id])
        {
            this.m_PlayerEntity.CurCharacterID = id;
        }
    }
}