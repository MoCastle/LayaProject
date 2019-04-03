
import FrameWork from "./../FrameWork/FrameWork"
import {MessageMD} from "./../FrameWork/MessageCenter"
export module Player {
    export class Event
    {
        static OnMoneyChange: string = "OnMoneyChange";
        static OnCurCharacterIDChange: string = "OnCurCharacterIDChange";
        static OnHistoryMaxLevelChange: string = "OnHistoryMaxLevelChange";
        static OnCurLevelChange:string = "OnCurLevelChange";
        static OnCharacterListChange: string = "OnCharacterListChange";
        static OnCurItemChange:string = "OnCurItemChange";
        static OnItemListChange:string = "OnItemListChange";
        static OnCurScoreChange:string = "OnCurScoreChange";
    }
    
    export class PlayerEntity {
        private static m_Entity: PlayerEntity;
        public static get Entity(): PlayerEntity  {
            if (!PlayerEntity.m_Entity)  {
                PlayerEntity.m_Entity = new PlayerEntity;
            }
            return PlayerEntity.m_Entity;
        }
        private m_FrameWork:FrameWork;
        private m_MessageMgr:MessageMD.MessageCenter;
        
        //钱
        private m_Money:number;
        //选中角色ID
        private m_CurCharacterID:number;
        //玩家已解锁的最高关卡
        private m_HistoryMaxLevel:number;
        //当前选中关卡
        private m_CurLevel:number;
        //角色列表
        private m_CharacterList:Array<number>;
        //当前拥选中道具
        private m_CurItem:number;
        //物品列表
        private m_ItemList:Array<number>;
        //积分
        private m_CurScore:number;

        public get Money(): number
        {
            return this.m_Money;
        }
        public set Money(value:number)
        {
            if(value == this.m_Money)
            {
                return;
            }
            this.m_MessageMgr.Fire(Event.OnMoneyChange)
            this.m_Money = value;
        }
        public get CurCharacterID(): number
        {
            return this.m_CurCharacterID;
        }
        public set CurCharacterID(value:number)
        {
            if(value == this.m_CurCharacterID)
            {
                return;
            }
            this.m_CurCharacterID = value;
            this.m_MessageMgr.Fire(Event.OnCurCharacterIDChange);
        }
        public get CurLevel():number
        {
            return this.m_CurLevel?this.m_CurLevel:this.m_HistoryMaxLevel;
        }
        public set CurLevel(value:number)
        {
            if(value == this.CurLevel)
            {
                return;
            }
            this.m_CurLevel = value;
            this.m_MessageMgr.Fire(Event.OnCurLevelChange);
        }
        public get HistoryMaxLevel(): number
        {
            return this.m_HistoryMaxLevel;
        }
        public set HistoryMaxLevel(value:number)
        {
            if(value == this.m_HistoryMaxLevel)
            {
                return;
            }
            this.m_MessageMgr.Fire(Event.OnHistoryMaxLevelChange)
            this.m_HistoryMaxLevel = value;
        }
        public get CharacterList(): Array<number>
        {

            return this.m_CharacterList;
        }
        public set CurItem(value:number)
        {
            if(value == this.m_CurItem)
            {
                return;
            }
            this.m_MessageMgr.Fire(Event.OnCurItemChange)
            this.m_CurItem = value;
        }
        public get CurItem():number
        {
            return this.m_CurItem;
        }
        public get ItemList():Array<number>
        {
            return this.m_ItemList;
        }
        public get CurScore():number
        {
            return this.m_CurScore;
        }
        public set CurScore(value:number)
        {
            if(this.m_CurScore = value)
            {
                return
            }
            this.m_MessageMgr.Fire(Event.OnCurScoreChange);
            this.m_CurScore = value;
        }
        
        constructor()  {
            this.m_Money = 0;
            this.m_CurCharacterID = 0;
            this.m_CharacterList = [1];
            this.m_HistoryMaxLevel = 0;
            this.m_CurItem = 0;
            this.m_FrameWork = FrameWork.FM;
            this.m_MessageMgr = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
            this.m_ItemList = [];
            this.m_CurScore = 0;
        }
        
        public AddCharacter(id:number)
        {
            this.m_CharacterList[id] = 1;
            this.m_MessageMgr.Fire(Event.OnCharacterListChange);
        }

        public AddItem(id:number)
        {
            if(!this.m_ItemList[id]) 
            {
                this.m_ItemList[id] = 0;
            }
            ++this.m_ItemList[id];
            this.m_MessageMgr.Fire(Event.OnItemListChange);
        }
    }

}