import PlayerEntity from "./PlayerEntity"
export default class BaseAgent
{
    protected m_PlayerEntity:any;
    constructor()
    {
        this.m_PlayerEntity = PlayerEntity.Entity;
    }
}