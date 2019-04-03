import { Player } from "./PlayerEntity"
import BaseAgent from "./BaseAgent"

export class GameAgent extends BaseAgent {
    private static _Agent: GameAgent;

    static get Agent(): GameAgent {
        if (this._Agent == null) {
            this._Agent = new GameAgent();
        }
        return this._Agent;
    }

    public get CurLevel(): number  {
        return this.m_PlayerEntity.HistoryMaxLevel;
    }
    public get CurCharacterID(): number  {
        return this.m_PlayerEntity.CurCharacterID;
    }
    public get CurItem(): number  {
        return this.m_PlayerEntity.CurItem;
    }
    public get ItemList(): Array<number>  {
        return this.m_PlayerEntity.ItemList
    }
    public set CurItem(id: number)  {
        if (!this.ItemList[id])
            return;
        this.m_PlayerEntity.CurItem = id;
    }
    constructor() {
        super();
    }

    public AddGold(gold:number)
    {
        if(!gold || gold<0)
        {
            return
        }
        var money = this.m_PlayerEntity.Money + gold;
        this.m_PlayerEntity.Money = money;
    }

    public AddScore(score:number)
    {
        if(!score || score<0)
        {
            return
        }
        var score = this.m_PlayerEntity.CurScore + score;
        this.m_PlayerEntity.CurScore = score;
    }
    
}
