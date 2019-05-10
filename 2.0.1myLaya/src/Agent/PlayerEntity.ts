
import { MessageMD } from "./../FrameWork/MessageCenter"
import FrameWork from "./../FrameWork/FrameWork"
import { WechatOpen } from "../platform/WechatOpen";

export module Player {
    export class Event {
        static OnMoneyChange: string = "OnMoneyChange";
        static OnCurCharacterIDChange: string = "OnCurCharacterIDChange";
        static OnHistoryMaxLevelChange: string = "OnHistoryMaxLevelChange";
        static OnCurLevelChange: string = "OnCurLevelChange";
        static OnCharacterListChange: string = "OnCharacterListChange";
        static OnCurItemChange: string = "OnCurItemChange";
        static OnItemListChange: string = "OnItemListChange";
        static OnCurScoreChange: string = "OnCurScoreChange";
        static OnCurItemNumChange: string = "OnCurItemNumChange"
    }

    export class PlayerEntity {
        private static m_Entity: PlayerEntity;
        public static get Entity(): PlayerEntity {
            if (!PlayerEntity.m_Entity) {
                PlayerEntity.m_Entity = new PlayerEntity;
            }
            return PlayerEntity.m_Entity;
        }
        private m_FrameWork: FrameWork;
        private m_MessageMgr: MessageMD.MessageCenter;

        //钱
        private m_Money: number;
        //选中角色ID
        private m_CurCharacterID: number;
        //玩家已解锁的最高关卡
        private m_HistoryMaxLevel: number;
        //当前选中关卡
        private m_CurLevel: number;
        //角色列表
        private m_CharacterList: Array<number>;
        //当前拥选中道具
        private m_CurItem: number;
        //物品列表
        private m_ItemList: Array<number>;
        //积分
        private m_CurScore: number;
        //当前获得总星星数量
        private m_TotalStars: number;

        //没关获得的星星数量
        private m_PerLevelStars: number[];
        /*当前解锁的最大关卡 */
        private m_maxLevel: number;

        public get MaxLevel(): number {
            return this.m_maxLevel;// ? this.m_CurLevel : this.m_HistoryMaxLevel;
        }
        public set MaxLevel(value: number) {
            if (value <= this.m_maxLevel) {
                return;
            }
            this.m_maxLevel = value;
        }

        public get PerTogateStars(): number[] {
            return this.m_PerLevelStars;
        }

        public setPerTogateStars(levelId, startNum) {
            this.m_PerLevelStars[levelId] = startNum;
        }


        public get TotalStart(): number {
            return this.m_TotalStars;
        }

        public get Money(): number {
            return this.m_Money;
        }
        public set Money(value: number) {
            if (value == this.m_Money) {
                return;
            }
            this.m_Money = value;
            this.m_MessageMgr.Fire(Event.OnMoneyChange)
        }
        public get CurCharacterID(): number {
            return this.m_CurCharacterID;
        }
        public set CurCharacterID(value: number) {
            if (value == this.m_CurCharacterID) {
                return;
            }
            this.m_CurCharacterID = value;
            this.m_MessageMgr.Fire(Event.OnCurCharacterIDChange);
        }
        public get CurLevel(): number {
            return this.m_CurLevel;// ? this.m_CurLevel : this.m_HistoryMaxLevel;
        }
        public set CurLevel(value: number) {
            if (value == this.CurLevel) {
                return;
            }
            this.m_CurLevel = value;
            this.m_MessageMgr.Fire(Event.OnCurLevelChange);
        }
        public get HistoryMaxLevel(): number {
            return this.m_HistoryMaxLevel;
        }
        public set HistoryMaxLevel(value: number) {
            if (value == this.m_HistoryMaxLevel) {
                return;
            }
            this.m_HistoryMaxLevel = value;
            this.m_MessageMgr.Fire(Event.OnHistoryMaxLevelChange)
        }
        public get CharacterList(): Array<number> {

            return this.m_CharacterList;
        }
        public set CurItem(value: number) {
            if (value == this.m_CurItem) {
                return;
            }
            this.m_CurItem = value;
            this.m_MessageMgr.Fire(Event.OnCurItemChange)
        }
        public get CurItem(): number {
            return this.m_CurItem;
        }
        public get CurItemNum(): number {
            return this.GetItemNum(this.CurItem);
        }
        public get ItemList(): Array<number> {
            return this.m_ItemList;
        }
        public get CurScore(): number {
            return this.m_CurScore;
        }
        public set CurScore(value: number) {
            if (this.m_CurScore = value) {
                return
            }
            this.m_CurScore = value;
            WechatOpen.getInstances().updateScore(value);
            this.m_MessageMgr.Fire(Event.OnCurScoreChange);
        }

        constructor() {
            var interestinglife = (Laya.LocalStorage.getItem("Interestinglife") != null ? JSON.parse(Laya.LocalStorage.getItem("Interestinglife")) : {});
            this.m_Money = interestinglife.m_Money || 0;
            this.m_CurLevel = interestinglife.m_CurLevel || 1;
            this.m_CurCharacterID = interestinglife.m_CurCharacterID|| 0;
            this.m_CharacterList = interestinglife.m_CharacterList || [1,0,0,0,0];
            this.m_HistoryMaxLevel = interestinglife.m_HistoryMaxLevel || 0;
            this.m_CurItem = interestinglife.m_CurItem || 0;
            this.m_FrameWork = FrameWork.FM;
            this.m_MessageMgr = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
            this.m_ItemList = interestinglife.m_ItemList || [];
            this.m_CurScore = interestinglife.m_CurScore || 0;
            this.m_PerLevelStars = interestinglife.m_PerLevelStars || [];
            this.m_maxLevel = interestinglife.m_maxLevel || 1;
        }

        public saveDataToLocal(): void {
            var localData:any = {};
            localData.m_Money = this.m_Money;
            localData.m_CurLevel = this.m_CurLevel;
            localData.m_CurCharacterID = this.m_CurCharacterID;
            localData.m_CharacterList = this.m_CharacterList;
            localData.m_HistoryMaxLevel = this.m_HistoryMaxLevel;
            localData.m_CurItem = this.m_CurItem;
            localData.m_ItemList = this.m_ItemList;
            localData.m_CurScore = this.m_CurScore;
            localData.m_PerLevelStars = this.m_PerLevelStars;
            localData.m_maxLevel = this.m_maxLevel;
            Laya.LocalStorage.setItem("Interestinglife", localData);
        }
        public AddCharacter(id: number) {
            this.m_CharacterList[id] = 1;
            this.m_MessageMgr.Fire(Event.OnCharacterListChange);
        }

        public AddItem(id: number) {
            if (!this.m_ItemList[id]) {
                this.m_ItemList[id] = 0;
            }
            ++this.m_ItemList[id];
            this.m_MessageMgr.Fire(Event.OnItemListChange);
            if (id == this.CurItem)
                this.m_MessageMgr.Fire(Event.OnCurItemNumChange);
        }

        public ReduceItem(id: number) {
            if (!this.m_ItemList[id] || this.m_ItemList[id] < 1) {
                return
            }
            --this.m_ItemList[id];
            this.m_MessageMgr.Fire(Event.OnItemListChange);
            if (id == this.CurItem)
                this.m_MessageMgr.Fire(Event.OnCurItemNumChange);
        }

        public GetItemNum(id: number) {
            var num: number = this.m_ItemList[id];
            num = num ? num : 0;
            return num;
        }
    }

}