export default class playerEntity
{
    private static m_Entity:any;
    public static get Entity():any
    {
        if(!playerEntity.m_Entity)
        {
            playerEntity.m_Entity = {};
        }
        return playerEntity.m_Entity;
    }
    /*
    Money:number;
    Point:number;
    Distance:number;
    CharacterID:number;
    CharacterList:Array<number>;
    constructor()
    {
        this.Money = 0;
        this.Point = 0;
        this.Distance = 0;
        this.CharacterID = 0;
        this.CharacterList = [];
    }*/
}