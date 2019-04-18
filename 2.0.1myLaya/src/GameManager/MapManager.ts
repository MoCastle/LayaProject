import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"
export default class MapManager extends GameManager.BaseManager {
    private static g_Mgr: MapManager;
    public static get Mgr(): MapManager {
        if (!MapManager.g_Mgr) {
            MapManager.g_Mgr = new MapManager();
        }
        return MapManager.g_Mgr;
    }
    constructor() {
        super("ItemInfo");
    }

    protected GenInfo(data: any): GameManager.BaseInfo {
        return new MapInfo(data);
    }
}

class MapInfo extends GameManager.BaseInfo {
    private m_ModelName: string;
    private m_ExtendID: string;
    private m_Price: number;
    private m_ItemType:number;
    private m_Icon:string;
    private m_Passscore:string;
    private m_Desc:string;
    public get Desc(): string {
        return this.m_Desc;
    }
    public get Passscore(): string {
        return this.m_Passscore;
    }
    public get Name(): string {
        return this.m_ModelName + this.m_ExtendID;
    }
    public get Price(): number {
        return this.m_Price;
    }
    public get ItemType():number
    {
        return this.m_ItemType;
    }
    public get Icon():string
    {
        return this.m_Icon;
    }
    constructor(data: any) {
        super(data);
        this.m_ID = data.ID ? data.ID : "";
        this.m_Passscore = data.Passscore ? data.Passscore: "";
        this.m_ModelName = data.ModelName ? data.ModelName : "";
        this.m_ExtendID = data.ExtendID ? data.ExtendID : "";
        this.m_Price = data.Price ? Number(data.Price) : 0;
        this.m_ItemType = data.ItemType? Number(data.ItemType):0;
        this.m_Icon = data.Icon?data.Icon:"";
        this.m_Desc = data.Desc?data.Desc:"";
    }
}