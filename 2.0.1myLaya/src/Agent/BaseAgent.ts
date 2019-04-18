import * as PlayerEntity from "./PlayerEntity"
export default class BaseAgent
{
    protected m_PlayerEntity:PlayerEntity.Player.PlayerEntity;
    constructor()
    {
        this.m_PlayerEntity = PlayerEntity.Player.PlayerEntity.Entity;
    }
}