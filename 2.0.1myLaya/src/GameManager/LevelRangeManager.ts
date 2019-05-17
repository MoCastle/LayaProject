import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"
export default class LevelRangeManager extends GameManager.BaseManager {
    private static g_Mgr: LevelRangeManager;
    public static get Mgr(): LevelRangeManager {
        if (!LevelRangeManager.g_Mgr) {
            LevelRangeManager.g_Mgr = new LevelRangeManager();
        }
        return LevelRangeManager.g_Mgr;
    }
    
    constructor() {
        super("LevelRange");
    } 

    protected GenInfo(data: any): GameManager.BaseInfo {
        return new LevelRange(data);
    }

    protected GetInfo<T extends GameManager.BaseInfo>(id: number): T {
        if (!id || id < 0) {
            id = 0;
        }
        var BaseInfo = this.m_Map[id];
        if (!BaseInfo) {
            BaseInfo = this.m_Map[this.m_BottomID];
        }
        if (BaseInfo) {
            return BaseInfo as T;
        } else {
            return null;
        }
    }

    public GetAllInfo(): any {
        return this.m_Map;
    }
}

class LevelRange extends GameManager.BaseInfo {
    private m_Passscore: number;
    private m_RewardActorID: number;
    private m_Levelrange: number[];

    public get RewardActorID(): number {
        return this.m_RewardActorID;
    }
    public get Passscore(): number {
        return this.m_Passscore;
    }
    public get Levelrange(): number[] {
        return this.m_Levelrange;
    }

    constructor(data: any) {
        super(data);
        this.m_ID = data.ID ? data.ID : "";
        this.m_Passscore = data.Passscore ? data.Passscore: "";
        this.m_RewardActorID = data.RewardActorID ? data.RewardActorID : "";
        this.m_Levelrange = data.levelrange ? data.levelrange : "";
    }
}