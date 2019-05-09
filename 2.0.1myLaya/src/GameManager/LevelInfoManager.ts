import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"

export default class LevelInfoManager extends GameManager.BaseManager
{
    constructor() {
        super("LevelInfo");
    }
    protected GenInfo(data): GameManager.BaseInfo
    {
        return new LevelInfo(data);
    }

    public GetTotalLevel(id: number): number {
        var info: LevelInfo = this.GetInfo<LevelInfo>(id);
        if (info)
            return info.totalleval;
    }

    private static g_Mgr: LevelInfoManager;
    public static get Mgr(): LevelInfoManager {
        if (!LevelInfoManager.g_Mgr) {
            LevelInfoManager.g_Mgr = new LevelInfoManager();
        }
        return LevelInfoManager.g_Mgr;
    }
}

class LevelInfo extends GameManager.BaseInfo
{
    public Passscore:number;
    public FallTimeRange:number[][];
    public Empty:number[][];
    public Rock:number[][];
    public Thorn:number[][];
    public Vine:number[][];
    public Shield:number[][];
    public Untouchable:number[][];
    public flyer:number[][];
    public absord:number[][];
    public Coin:number[][];
    public totalleval:number;
    public starnum:number;
    public startscore:number[];

    constructor( data:any )
    {
        super(data);
        this.m_ID = data.ID;

        this.FallTimeRange = data.FallTimeRange;
        this.Empty = data.Empty;
        this.Rock = data.Rock;
        this.Thorn = data.Thorn;

        this.Vine = data.Vine;
        this.Shield = data.Shield;
        this.Untouchable = data.Untouchable;
        this.flyer = data.flyer;

        this.absord = data.absord;
        this.Coin = data.Coin;
        this.totalleval = data.totalleval;
        this.starnum = data.starnum;
        this.startscore = data.startscore;
    }
}