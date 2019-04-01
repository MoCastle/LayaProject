
import FrameWork from "./../FrameWork/FrameWork"
import {MessageMD} from "./../FrameWork/MessageCenter"
export module Player {
    export class Event
    {
        static OnMoneyChange: string = "OnMoneyChange";
        static OnCurCharacterIDChange: string = "OnCurCharacterIDChange";
        static OnHistoryMaxLevelChange: string = "OnHistoryMaxLevelChange";
        static OnCharacterListChange: string = "OnCharacterListChange";
        static OnCurItemChange:string = "OnCurItemChange";
    }
    
    export class PlayerEntity {
        private static m_Entity: PlayerEntity;
        public static get Entity(): PlayerEntity  {
            if (!PlayerEntity.m_Entity)  {
                PlayerEntity.m_Entity = new PlayerEntity;
            }
            return PlayerEntity.m_Entity;
        }
        private m_Money:number;
        private m_CurCharacterID:number;
        private m_HistoryMaxLevel:number;
        private m_CharacterList:Array<number>;
        private m_FrameWork:FrameWork;
        private m_MessageMgr:MessageMD.MessageCenter;
        //当前拥选中道具
        private m_CurItem:number;

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
            return this.m_Money;
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
        constructor()  {
            this.m_Money = 0;
            this.m_CurCharacterID = 0;
            this.m_CharacterList = [1];
            this.m_HistoryMaxLevel = 0;
            this.m_CurItem = 0;
            this.m_FrameWork = FrameWork.FM;
            this.m_MessageMgr = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }
        
        public AddCharacter(id:number)
        {
            this.m_CharacterList[id] = 1;
            this.m_MessageMgr.Fire(Event.OnCharacterListChange);
        }

    }

}