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
    * 获取ID数组
    */
    public GetSellItemIDList(): Array<number> {
        var map = this.m_Map;
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
}

class ItemInfo extends GameManager.BaseInfo {
    private m_ModelName: string;
    private m_ExtendID: string;
    private m_Price: number;
    private m_ItemType:number;
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

    constructor(data: any) {
        super(data);
        this.m_ModelName = data.ModelName ? data.ModelName : "";
        this.m_ExtendID = data.ExtendID ? data.ExtendID : "";
        this.m_Price = data.Price ? Number(data.Price) : 0;
        this.m_ItemType = data.ItemType? Number(data.ItemType):0;
    }
}