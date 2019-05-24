import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"
export default class ItemManager extends GameManager.BaseManager {
    private static g_Mgr: ItemManager;
    public static get Mgr(): ItemManager {
        if (!ItemManager.g_Mgr) {
            ItemManager.g_Mgr = new ItemManager();
        }
        return ItemManager.g_Mgr;
    }
    
    constructor() {
        super("ItemInfo");
    }

    protected GenInfo(data: any): GameManager.BaseInfo {
        return new ItemInfo(data);
    }
    
    /**
     * 获取道具价格
     * @param id 道具ID
     */
    public GetPrice(id: number): number {
        var info: ItemInfo = this.GetInfo<ItemInfo>(id);
        if (info)
            return info.Price;
    }
    
    /**
     * 获取道具价格
     * @param id 道具ID
     */
    public GetItemIcon(id: number): string {
        var info: ItemInfo = this.GetInfo<ItemInfo>(id);
        if (info)
            return info.Icon;
    }

    /**
    * 获取ID数组
    */
    public GetSellItemIDList(): Array<number> {
        var map = this.m_DataArr;
        var IDList: Array<number> = []
        for (var key in map) {
            var data: any = map[key]
            if (data) {
                var itemInfo: ItemInfo = data as ItemInfo;
                if (itemInfo.Price >= 0)
                    IDList.push(data.ID);
            }
        }
        return IDList;
    }
    
    public GetItemType(id:number):number
    {
        var info: ItemInfo = this.GetInfo<ItemInfo>(id);
        if (info)
            return info.ItemType;
    }

    public GetItemInfo(id:number):ItemInfo
    {
        var info: ItemInfo = this.GetInfo<ItemInfo>(id);
        return info;
    }
}

class ItemInfo extends GameManager.BaseInfo {
    private m_ModelName: string;
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
        return this.m_ModelName;
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
        this.m_Price = data.Price ? Number(data.Price) : 0;
        this.m_ItemType = data.ItemType? Number(data.ItemType):0;
        this.m_Icon = data.Icon?data.Icon:"";
        this.m_Desc = data.Desc?data.Desc:"";
    }
}