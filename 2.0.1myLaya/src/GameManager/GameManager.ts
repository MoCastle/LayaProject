import { path } from "../Utility/Path";
export module GameManager {
    export abstract class BaseManager {
        protected m_DataArr: Array<BaseInfo>;  //{ [name: string]: BaseInfo };
        protected m_BottomID: number;
        constructor(name: string) {
            this.m_DataArr = new Array<BaseInfo>();
            this.m_BottomID = -1;
            var configInfo: object = Laya.loader.getRes(path.GetJsonPath(name));
            for (var key in configInfo) {
                var data = configInfo[key];
                var dataInfo: BaseInfo = this.GenInfo(data);
                this.m_DataArr[dataInfo.ID] = dataInfo;
                if (dataInfo.ID != -1)
                    this.m_BottomID = dataInfo.ID;
            }
        }
        protected abstract GenInfo(data): BaseInfo;
        protected GetInfo<T extends BaseInfo>(id: number): T {
            if (!id || id < 0) {

                id = 0;
            }
            var BaseInfo = this.m_DataArr[id];
            if (!BaseInfo) {
                BaseInfo = this.m_DataArr[this.m_BottomID];
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
            var map: Array<BaseInfo> = this.m_DataArr;
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