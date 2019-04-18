import { path } from "../Utility/Path";
export module GameManager {
    export abstract class BaseManager {
        protected m_Map: { [name: string]: BaseInfo };
        protected m_BottomID: number;
        constructor(name: string) {
            this.m_Map = {};
            this.m_BottomID = -1;
            var configInfo: object = Laya.loader.getRes(path.GetJsonPath(name));
            for (var key in configInfo) {
                var data = configInfo[key];
                var dataInfo: BaseInfo = this.GenInfo(data);
                this.m_Map[dataInfo.ID] = dataInfo;
                if (dataInfo.ID != -1)
                    this.m_BottomID = dataInfo.ID;
            }
        }
        protected abstract GenInfo(data): BaseInfo;
        protected GetInfo<T extends BaseInfo>(id: number): T {
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
        /**
         * 获取ID数组
         */
        public GetIDList(): Array<number> {
            var map: { [ID: number]: BaseInfo } = this.m_Map;
            var IDList: Array<number> = []
            for (var key in map) {
                var data = map[key]
                if (data)
                    IDList.push(data.ID);
            }
            return IDList;
        }
    }

    export class BaseInfo {
        protected m_ID: number;
        public get ID(): number {
            return this.m_ID;
        }

        constructor(data: any) {
            this.m_ID = data.ID ? Number(data.ID) - 1 : -1;
        }
    }
}