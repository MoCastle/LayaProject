import PlayerEntity from "./PlayerEntity"
import BaseAgent from "./BaseAgent"

export class GameAgent extends BaseAgent {
    private static _Agent: GameAgent;

    static get GuestAgent(): GameAgent {
        if (this._Agent == null) {
            this._Agent = new GameAgent();
        }
        return this._Agent;
    }
    constructor()  {
        super();
        var playerEntity: any = PlayerEntity.Entity;
        playerEntity.CurLevel = playerEntity.CurLevel ? playerEntity.CurLevel : 0;

    }
    /*
    public get CurLevel():number
    {
        return PlayerEntity
    }*/
}
