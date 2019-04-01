import PlayerEntity from "./PlayerEntity"
import BaseAgent from "./BaseAgent"
export class PlayerGuestAgent extends BaseAgent {
    static _Agent: PlayerGuestAgent;
    static get GuestAgent(): PlayerGuestAgent  {
        if (this._Agent == null)  {
            this._Agent = new PlayerGuestAgent();
        }
        return this._Agent;
    }

    public get Money(): number  {
        return this.m_PlayerEntity.Money;
    }
    public get CharacterID(): number  {
        return this.m_PlayerEntity.CharacterID;
    }
    public CharacterList(): Array<number>  {
        return this.m_PlayerEntity.CharacterList;
    }

    private constructor()  {
        super();
        this.m_PlayerEntity.Money = this.m_PlayerEntity.Money ? this.m_PlayerEntity.Money : 0;
        this.m_PlayerEntity.CharacterID = this.m_PlayerEntity.CharacterID ? this.m_PlayerEntity.CharacterID : 0;
        this.m_PlayerEntity.CharacterList = this.m_PlayerEntity.CharacterList ? this.m_PlayerEntity.CharacterList : [];
    }
}