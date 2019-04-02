import {Player} from "./PlayerEntity"
import BaseAgent from "./BaseAgent"

export class GameAgent extends BaseAgent {
    private static _Agent: GameAgent;

    static get Agent(): GameAgent {
        if (this._Agent == null) {
            this._Agent = new GameAgent();
        }
        return this._Agent;
    }
    constructor()  {
        super();
    }
    
    public get CurLevel():number
    {
        return this.m_PlayerEntity.HistoryMaxLevel;
    }

    public get CurCharacterID():number
    {
        return this.m_PlayerEntity.CurCharacterID;
    }
    
    public get CurItem():number
    {
        return this.m_PlayerEntity.CurItem;
    }

    public get ItemList():Array<number>
    {
        return this.m_PlayerEntity.ItemList
    }

    public set CurItem(id:number)
    {
        if(!this.ItemList[id])
            return;
        this.m_PlayerEntity.CurItem = id;
    }
}
