import { GameManager } from "./GameManager"
import { Item } from "./../Game/GameItem"

export module LevelItemInfo
{
    export class LevelItemRangeManager extends GameManager.BaseManager {
        private static g_Mgr: LevelItemRangeManager;
        public static get Mgr(): LevelItemRangeManager {
            if (!LevelItemRangeManager.g_Mgr) {
                LevelItemRangeManager.g_Mgr = new LevelItemRangeManager();
            }
            return LevelItemRangeManager.g_Mgr;
        }
        constructor() {
            super("LevelItemRange");
        }
        protected GenInfo(data: any): GameManager.BaseInfo {
            return new ItemRangeInfo(data);
        }
        /**
         * 
         * @param targetFloor 起始层
         */
        GetFloorInfo( targetFloor:number ):ItemRangeInfo
        {
            var itemRangeInfo:ItemRangeInfo = null;
            var startRange:number = 0;
            for(var floorIdx:number = 0;floorIdx<this.m_DataArr.length;++floorIdx )
            {
                itemRangeInfo = this.m_DataArr[floorIdx] as ItemRangeInfo;
                startRange += itemRangeInfo.GetFloorRange();
                if(startRange > targetFloor)
                {
                    break;
                }
            } 
            return itemRangeInfo;
        }
    }

    export class ItemInfo {
        protected m_LevelRange: number;
        protected m_Num: Array<number>;
        protected m_Shift: Array<number>;
        protected m_Frequency: Array<number>;
        protected m_ItemType:Item.ItemType;
        get itemType():Item.ItemType
        {
            return this.m_ItemType;
        }

        constructor(itemType:Item.ItemType) {
            this.m_Num = new Array<number>();
            this.m_Shift = new Array<number>();
            this.m_Frequency = new Array<number>();
            this.m_ItemType = itemType;
        }
    
        GetRange(isOdd: boolean): number {
            var idx = isOdd ? 0 : 1;
            return this.m_Frequency[idx] + this.m_Shift[idx];
        }
        /**
         * 
         * @param isOdd 是否是奇数
         */
        GetNum(isOdd: boolean): number {
            var idx = isOdd ? 0 : 1;
            return this.m_Num[idx];
        }
        Init(levelRange: number, num: Array<number>, shift: Array<number>, frequency: Array<number>) {
            this.m_Num = num;
            this.m_Shift = shift;
            this.m_Frequency = frequency;
        }
    }

    export class ItemRangeInfo extends GameManager.BaseInfo {
        private m_FloorRange: number;
        private m_ItemInfos: { [key: number]: ItemInfo };
        
        get ItemInfoMap():{[key:number]:ItemInfo}
        {
            return this.m_ItemInfos;
        }

        constructor(data: any) {
            super(data); 6
            this.m_FloorRange = !isNaN(data.FloorRange) ? Number(data.FloorRange) : 0;
            this.m_ItemInfos = {};
            for (var name in Item.ItemType) {
                var theName: any = name;
                if (!isNaN(theName)) {
                    var itemType = Number(theName);
                    var itemName = Item.ItemType[theName];
                    var itemInfo: ItemInfo = new ItemInfo(itemType);
                    var numb: Array<number> = new Array<number>();
                    var shift: Array<number> = new Array<number>();
                    var frequency: Array<number> = new Array<number>();
                    if (Item.ItemType.None == itemType || Item.ItemType.WinFlag == itemType || Item.ItemType.Rope == itemType)  {
                        continue;
                    }
                    if (itemType != Item.ItemType.Coin) {
                        for (var idx: number = 1; idx < 3; ++idx) {
                            var key: string = itemName + "_" + idx + "_";
                            if ((itemType > 0 && itemType < 10)) {
                                var shiftKey: string = key + "Shift";
                                var numKey: string = key + "Num";
                                numb[idx - 1] = !isNaN(data[numKey]) ? Number(data[numKey]) : 0;
                                shift[idx - 1] = !isNaN(data[shiftKey]) ? Number(data[shiftKey]) : 0;
                                frequency[idx - 1] = idx == 1 ? 6 - (this.m_FloorRange / 50) : 5 - (this.m_FloorRange / 50);
                                frequency[idx - 1] = frequency[idx - 1] < 1 ? 1 : frequency[idx - 1];
                            } else if (itemType > 9 && itemType < 20) {
                                var frequencyKey: string = key + "Frequency";
                                var shiftKey: string = key + "Shift";
                                var numKey: string = key + "Num";
                                numb[idx - 1] = !isNaN(data[numKey]) ? Number(data[numKey]) : 0;
                                shift[idx - 1] = !isNaN(data[shiftKey]) ? Number(data[shiftKey]) : 0;
                                frequency[idx - 1] = !isNaN(data[frequencyKey]) ? Number(data[frequencyKey]) : 0;
                            }
                        }
                    } else {
                        var coinDat: Array<Array<number>> = JSON.parse(data.Coin_Frequency);
                        numb[0] = coinDat[0][1];
                        frequency[0] = coinDat[0][0];
                        numb[1] = coinDat[1][1];
                        frequency[1] = coinDat[1][0];
                        shift[0] = 0;
                        shift[1] = 0;
                    }
                    itemInfo.Init(this.m_FloorRange, numb, shift, frequency);
                    this.m_ItemInfos[itemType] = itemInfo;
                }
            }
        }
        public GetFloorRange():number
        {
            return this.m_FloorRange;
        }
        public GetItemNum(itemType:Item.ItemType,floor:number):number
        {
            return this.m_ItemInfos[itemType].GetNum(floor%2 == 1)
        }
        public GetItemFrequency(itemType:Item.ItemType,floor:number):number
        {
            return this.m_ItemInfos[itemType].GetRange(floor%2 == 1)
        }
    }
}
