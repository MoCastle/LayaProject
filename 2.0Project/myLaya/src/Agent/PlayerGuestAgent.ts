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
        return this.m_PlayerEntity.CurCharacterID;
    }
    public get CharacterList(): Array<number>  {
        return this.m_PlayerEntity.CharacterList;
    }

    private constructor()  {
        super();
    }
    
    public BuyCharacter(id:number)
    {
        //ToDo
        var prive = 0;
        if(prive > this.m_PlayerEntity.Money)
        {
            return ;
        }
        this.m_PlayerEntity.Money -= id;
        this.m_PlayerEntity.CharacterList[id] = 1;
    }
}