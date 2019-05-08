import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"
export default class LevelSettingManager extends GameManager.BaseManager
{
    constructor() {
        super("LevelSetting1");
    }

    private static g_Mgr: LevelSettingManager;
    public static get Mgr(): LevelSettingManager {
        if (!LevelSettingManager.g_Mgr) {
            LevelSettingManager.g_Mgr = new LevelSettingManager();
        }
        return LevelSettingManager.g_Mgr;
    }

    protected GenInfo(data): GameManager.BaseInfo
    {
        return new LevelSetting(data);
    }

    public GetLevelSettingInfo():any
    {
        return Laya.loader.getRes(path.GetJsonPath("LevelSetting1"));
    }
}

class LevelSetting extends GameManager.BaseInfo
{
    private levelSetting;
    constructor( data:any )
    {
        super(data);
        this.levelSetting = data;
    }
}