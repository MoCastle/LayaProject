import { Player } from "./PlayerEntity"
import { GameModule } from "./../Game/GameModule"
import { GameManager } from "./../GameManager/GameManager"
import APP from "./../controler/APP"
import GameAPP from "../controler/GameAPP";
import BaseAgent from "./BaseAgent"

export class GameAgent extends BaseAgent {
    private static _Agent: GameAgent;
    static get Agent(): GameAgent {
        if (this._Agent == null) {
            this._Agent = new GameAgent();
        }
        return this._Agent;
    }
    private m_UseItemNum: number;
    private m_SkillItemID: number;
    private m_SkillItemNum: number;

    public get CurLevel(): number {
        return this.m_PlayerEntity.CurLevel;
    }
    public set CurLevel(value: number) {
        this.m_PlayerEntity.CurLevel = value;
    }
    public get CurMaxLevel(): number {
        return this.m_PlayerEntity.HistoryMaxLevel;
    }
    public get CurCharacterID(): number {
        return this.m_PlayerEntity.CurCharacterID;
    }
    public get CurItem(): number {
        return this.m_PlayerEntity.CurItem;
    }
    public get ItemList(): Array<number> {
        return this.m_PlayerEntity.ItemList
    }
    public set CurItem(id: number) {
        if (!this.ItemList[id])
            return;
        this.m_PlayerEntity.CurItem = id;
    }
    public get GameItemNum(): number {
        return this.m_PlayerEntity.CurItemNum < this.m_UseItemNum ? this.m_PlayerEntity.CurItemNum : this.m_UseItemNum;
    }
    public get SkillItemNum(): number  {
        return this.m_SkillItemNum;
    }

    constructor() {
        super();
    }

    public AddGold(gold: number) {
        if (!gold || gold < 0) {
            return
        }
        var money = this.m_PlayerEntity.Money + gold;
        this.m_PlayerEntity.Money = money;
    }

    public AddScore(score: number) {
        if (!score || score < 0) {
            return
        }
        var score = this.m_PlayerEntity.CurScore + score;
        this.m_PlayerEntity.CurScore = score;
    }

    public get CurScore(): number {
        return this.m_PlayerEntity.CurScore;
    }

    public ResetGameItem() {
        APP.MessageManager.Fire(Player.Event.OnCurItemNumChange);
        this.m_UseItemNum = 1;
    }

    public ResetSkillItem() {
        var CharacterID: number = this.m_PlayerEntity.CurCharacterID;
        this.m_SkillItemNum = GameAPP.CharacterMgr.GetSkillItem(CharacterID) < 0 ? 0 : 1;
        APP.MessageManager.Fire(GameModule.Event.OnCharacterItemChange);
        this.m_SkillItemNum = 1;
    }

    public UseGameItem() {
        if (this.GameItemNum < 1) {
            return
        }
        --this.m_UseItemNum;
        this.m_PlayerEntity.ReduceItem(this.CurItem);
    }

    public UseSkillItem() {
        if (this.SkillItemNum < 1)  {
            return;
        }
        --this.m_SkillItemNum;
        APP.MessageManager.Fire(GameModule.Event.OnCharacterItemChange);
    }
}
