import MountLine from "./MountLine";
import { GameStruct } from "./GameStruct";
import { Item } from "./GameItem";
import Step from "./Step";
import Player from "./Player";
import { GameModule } from "./GameModule";
import LevelSettingManager from "../GameManager/LevelSettingManager";
import LevelInfoManager from "../GameManager/LevelInfoManager";

var Mounts: number = 2;
var LineSpace: number = 2;

export default class Gamemap extends Laya.Node {
    private m_HeadFloorIdx: number;
    private m_TailFLoorIdx: number;
    private m_MountLines: MountLine[];
    private m_CurIdx: number;
    private m_ItemRange: {};
    private m_SafeLocation: GameStruct.MLocation;
    private m_CurLineBarriers: Array<Item.LineItemInfo>;
    private m_CurLineRewards: Array<Item.LineItemInfo>;
    private m_ItemLayout: Item.ItemLayout;
    private m_Player: Player;
    private m_StartPosition: Laya.Vector3;

    private m_rightSwitchCount: number;
    private m_ShowSteps: number;
    private m_ViewColums: number;

    private get CurLineRewards(): Array<Item.LineItemInfo> {
        return this.m_CurLineRewards;
    }
    private get CurLineBarriers(): Array<Item.LineItemInfo> {
        return this.m_CurLineBarriers;
    }
    private get MountLines(): MountLine[] {
        return this.m_MountLines;
    }
    private get NextID(): number {
        return (this.m_CurIdx + 1) % Mounts;
    }
    get HeadFloor(): MountLine {
        return this.m_MountLines[this.m_HeadFloorIdx];
    }
    get TailFLoor(): MountLine {
        return this.m_MountLines[this.m_TailFLoorIdx];
    }

    /**
     * 
     * @param floorNum 层数
     * @param column 列数
     * @param camera 相机
     * @param distance 距离
     */
    constructor(floorNum: number, column: number) {
        super();
        this.m_ViewColums = column;
        this.m_MountLines = [];
        this.m_CurIdx = 0;
        this.m_HeadFloorIdx = 0;
        this.m_TailFLoorIdx = 0;
        this.m_ItemLayout = new Item.ItemLayout()
        this.m_CurLineBarriers = new Array<Item.LineItemInfo>();
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        this.m_rightSwitchCount = 0;
        this.m_SafeLocation = new GameStruct.MLocation(-1, -1);
        var floorColumNum: number = 7;//floorNum * 2;// + 4;
        for (var idx = 0; idx < floorNum; ++idx) {
            var newMountain = new MountLine(idx, floorColumNum, idx)
            this.m_MountLines[idx] = newMountain;
            this.addChild(newMountain);
        }
    }
    /**
     * 
     * @param startFloor 起始层
     * @param camera 相机
     * @param viewHeight 相机垂直视野
     */
    public Init(startFloor: number, camera: Laya.Camera, viewHeight: number): Laya.Vector3 {
        //var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.VSpace, GameModule.DSpace);
        startFloor = (!startFloor) && (startFloor < 0) && (startFloor >= lines.length) ? 0 : startFloor;
        //var cameraPS: Laya.Vector3 = new Laya.Vector3(0,15,20);
        var cameraPS: Laya.Vector3 = new Laya.Vector3(0, 15, 20);
        var cmeraViewHeight: number = viewHeight / (this.m_MountLines.length + 1);
        GameModule.VSpace = cmeraViewHeight;
        camera.orthographicVerticalSize = viewHeight - 2.5 * cmeraViewHeight;
        //var screenWidht: number = Laya.stage.width;
        var widtthSpace: number = (camera.orthographicVerticalSize * camera.aspectRatio) / (this.m_ViewColums - 0.5);
        GameModule.HSpace = widtthSpace;

        Laya.Vector3.add(cameraPS, new Laya.Vector3(0, GameModule.VSpace * (startFloor), 0), cameraPS)

        var lines: MountLine[] = this.m_MountLines;
        this.m_HeadFloorIdx = lines.length - 1;
        this.m_TailFLoorIdx = 0;
        this.m_rightSwitchCount = 0;

        for (var idx: number = 0; idx < lines.length; ++idx) {
            var line: MountLine = lines[idx];
            line.Init();
            line.SetLine(idx, this.CountNextFloorDirSwith());
            if (idx > 0)
                lines[idx - 1].SetNextFloor(line);
            if (idx == startFloor) {
                var PlayerStep = line.GetStep(Math.floor(line.Length / 2));
                this.m_StartPosition = PlayerStep.position;
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        /*
        for (var startFloorNum: number = 0; startFloorNum < startFloor; ++startFloorNum) {
            lines[startFloorNum].active = false;
        }*/
        lines[0].active = false;
        return cameraPS;
    }
    /**
     * 
     * @param startFloor 
     * @param camera 
     * @param distance 
     * @returns 相机位置
     
    public Init(startFloor: number, camera: Laya.Camera, distance: number): Laya.Vector3 {
        //var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.VSpace, GameModule.DSpace);
        startFloor = (!startFloor) && (startFloor < 0) && (startFloor >= lines.length) ? 0 : startFloor;
        var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.DesighnV, GameModule.DesighnD);
        Laya.Vector3.normalize(lineNormalVector, lineNormalVector);
        var cameraPS: Laya.Vector3 = new Laya.Vector3();
        var cameraMidelNormalVector: Laya.Vector3 = camera.transform.forward;
        var xRotateAngle: number = (Math.PI / 180) * (camera.fieldOfView / 2);

        var xRotateQuaternion: Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromAxisAngle(new Laya.Vector3(1, 0, 0), -xRotateAngle, xRotateQuaternion)
        var cameraBottomNormalVector: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.transformQuat(cameraMidelNormalVector, xRotateQuaternion, cameraBottomNormalVector);

        var bottomAngelCos: number = 0;

        var bottomPointToCameraNormal:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.scale(cameraBottomNormalVector,-1,bottomPointToCameraNormal);
        bottomAngelCos = Laya.Vector3.dot(lineNormalVector, bottomPointToCameraNormal);
        var bottomAngelSin = Math.sqrt(1 - Math.pow(bottomAngelCos, 2));

        var bottomLength: number = distance / bottomAngelSin;
        var cameraBottomVector: Laya.Vector3 = cameraBottomNormalVector.clone();
        Laya.Vector3.scale(cameraBottomNormalVector, -1 * bottomLength, cameraBottomVector);

        cameraPS = new Laya.Vector3();
        Laya.Vector3.add(cameraPS, cameraBottomVector, cameraPS);
        var bottomAngel:number =Math.acos(bottomAngelCos);
        var topAngle: number = 90 * (Math.PI / 180) - bottomAngel;
        var lineLength: number = bottomLength / Math.sin(topAngle) * Math.sin(camera.fieldOfView* (Math.PI / 180));
        var perLength: number = lineLength / (this.m_MountLines.length - 1 );

        var stepSpaceScale: number = perLength / Math.sqrt(GameModule.DesighnV * GameModule.DesighnV + GameModule.DesighnD * GameModule.DesighnD);
        GameModule.VSpace = GameModule.VSpace * stepSpaceScale;
        GameModule.DSpace = GameModule.DSpace * stepSpaceScale;
        var switchFloor = startFloor - 1.5;
        Laya.Vector3.add(cameraPS, new Laya.Vector3(0, -GameModule.VSpace * switchFloor, GameModule.DSpace * switchFloor), cameraPS);

        var lines: MountLine[] = this.m_MountLines;
        this.m_HeadFloorIdx = lines.length - 1;
        this.m_TailFLoorIdx = 0;
        this.m_rightSwitchCount = 0;
        for (var idx: number = 0; idx < lines.length; ++idx) {
            var line: MountLine = lines[idx];
            line.SetLine(idx, this.CountNextFloorDirSwith());
            if (idx > 1)
                lines[idx - 1].SetNextFloor(line);
            if (idx == startFloor) {
                var PlayerStep = line.GetStep(Math.floor(line.Length / 2));
                this.m_StartPosition = PlayerStep.position;
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        for (var startFloorNum: number = 0; startFloorNum < startFloor; ++startFloorNum) {
            lines[startFloorNum].active = false;
        }
        return cameraPS;
    }
*/
    public SetPlayer(player: Player) {
        this.m_Player = player;
    }

    public CountNextFloorDirSwith(): number {
        var switchCount: number = 0;
        if (this.m_Player) {
            var position: Laya.Vector3;
            if (this.m_Player.CurStep && this.m_Player.CurStep.position) {
                position = this.m_Player.CurStep.position;
            } else {
                position = this.m_Player.Position;
            }
            switchCount = (position.x - this.m_StartPosition.x) / (GameModule.HSpace / 2);
        }
       // return switchCount;
       return 0;
    }

    public SetNextFlpprDirSwitch(num: number) {
        this.m_rightSwitchCount = num;
    }

    public GetSafeStep(): Step {
        var floor: MountLine = this.GetFloorByFloor(this.m_SafeLocation.Y);
        if (floor)
            return floor.GetStep(this.m_SafeLocation.X);
        return;
    }

    public BreakLine(floor: number): void {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return;
        }
        var breakFloor: MountLine = this.GetFloorByFloor(floor);
        for (var countFloor: number = tailFloor.FloorNum; countFloor <= floor; ++countFloor) {
            var targetFloor: MountLine = this.GetFloorByFloor(countFloor);
            if (!targetFloor.breaked) {
                targetFloor.Break();
            }
        }

    }

    public GetTaileFloor(): number {
        return
    }

    public Update() {

    }

    //设置安全位置
    SetSafePS(location: GameStruct.MLocation) {
        this.m_SafeLocation = location;
        if (location.Y < this.TailFLoor.FloorNum || location.Y > this.HeadFloor.FloorNum) {
            return;
        }
        this.ResetItem(location.Y)
    }

    //从某一层开始一层层重新摆放道具
    ResetItem(floor: number) {
        this.m_CurLineBarriers = new Array<Item.LineItemInfo>();
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        for (let loopFloor: number = floor; loopFloor <= this.HeadFloor.FloorNum; ++loopFloor) {
            var floorLine = this.GetFloorByFloor(loopFloor);
            floorLine.LayOutDirty = false;
            floorLine.SetLine(floorLine.FloorNum, this.CountNextFloorDirSwith());
            this.PutItemInLine(loopFloor);
        }
    }

    /**
     * 根据层数获取某层
     * @param {number} floor 
     */
    GetFloorByFloor(floor: number) {
        var tailFloor: MountLine = this.TailFLoor;
        if (floor < tailFloor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.FloorNum + this.m_TailFLoorIdx) % this.m_MountLines.length;
        return this.m_MountLines[floorID];
    }

    /**
     * 循环设置层台阶
     * @param floor 层
     * @param Owner 
     * @param callBack 循环执行回调
     */
    LoopDoFloorStep(floor: number, Owner: any, callBack: (step: Step) => void): void {
        if (floor < this.TailFLoor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return;
        }
        var floorLine: MountLine = this.GetFloorByFloor(floor);
        for (let idx = 0; idx < floorLine.Length; ++idx) {
            var step = floorLine.GetStep(idx);
            callBack.call(Owner, step);
        }
    }

    /**
     * 摆放物品
     * @param {number} floor 物品列表
     */
    //protected PutItemInLine(floor: number) {
        // var safeCol: Array<number>;
        // var floorLine = this.GetFloorByFloor(floor);
        // //布置过了不用再布置了
        // if (floorLine.LayOutDirty)
        //     return;
        // floorLine.LayOutDirty = true;
        // var safeIdxColl: { [key: number]: number; } = this.CountRoadInfo(floor);

        // //出生点不放道具
        // if (floor < 1 || floor == this.m_SafeLocation.Y) {
        //     return;
        // }
        // //获取该行要摆放的物品
        // this.TakeItemList(floor)

        // //把需要放道具的格子放入随机池
        //var curFloor: MountLine = this.GetFloorByFloor(floor);
        // var randomPool: Array<Step> = new Array();
        // //把安全的格子暂时移出来
        // var safeStepList: Array<Step> = new Array<Step>();
        // for (var stepIdx: number = 0; stepIdx < curFloor.Length; ++stepIdx) {
        //     var getStep: Step = curFloor.GetStep(stepIdx);
        //     if (safeIdxColl[stepIdx] == undefined) {
        //         randomPool.push(getStep);
        //     } else {
        //         safeStepList.push(getStep);
        //     }
        // }
        // //放陷阱
        // var barriersList: Array<Item.LineItemInfo> = this.m_CurLineBarriers;
        // this.OrginizePutItem(barriersList, randomPool, true);
        // //摆放道具
        // for (var safeStepIdx: number = 0; safeStepIdx < safeStepList.length; ++safeStepIdx) {
        //     randomPool.push(safeStepList[safeStepIdx]);
        // }

        // var rewardList = this.CurLineRewards;
        // this.OrginizePutItem(rewardList, randomPool);
    //}
    protected PutItemInLine(floor: number) {
        if(floor <= 1) {
            return;
        }
        var curFloor: MountLine = this.GetFloorByFloor(floor);
        floor -= 2;
        var setting = LevelSettingManager.Mgr.GetLevelSettingInfo();

        var startIndex = 7;
        var loopLength:number = setting.length;
        loopLength += loopLength%2 == 0?0:1;
        var cntConfIndex = setting.length - floor % (loopLength) - 1;
        if(cntConfIndex % 2 != 0) {
            startIndex = 8;
        }
        var lineItemInfoArr:Array<number> = setting[cntConfIndex];
        var endGameLine:number = LevelInfoManager.Mgr.GetTotalLevel(0);
        for(var i = startIndex;i < startIndex + 14;i = i + 2) {
            var stepIdx = (i - startIndex) / 2;
            var getStep: Step = curFloor.GetStep(stepIdx);
            var type = this.ToolConfToOrginizePutItem(lineItemInfoArr,i);
            if(floor>endGameLine)
            {
                type = Item.ItemType.WinFlag;
            }
            getStep.active = true;
            if(type == -1) {
                continue;
            }
            getStep.PutItem(type);
            //getStep.PutItem(-1);
        }
    }

    /**
     * 
     * @param key 配置表类型转换
     */
    ToolConfToOrginizePutItem(itemIntoArr:Array<number>,idx:number):number {
        if(!itemIntoArr)
        {
            return -1;
        }
        var key:number = itemIntoArr[idx];
        switch(key) {
            case 0:
                return Item.ItemType.Empty;
                break;
            case 1:
                return -1;
                break;
            case 2:
                return Item.ItemType.Coin;
                break;
            case 3:
                return Item.ItemType.Rock;
                break;
            case 4:
                return Item.ItemType.Protect;
                break;
            case 5:
                return Item.ItemType.HolyProtect;
                break;
            case 6:
                return Item.ItemType.Fly;
                break;
            case 7:
                return Item.ItemType.Collector;
                break;
            case 8:
                return Item.ItemType.Thorn;
                break;
            case 9:
                return Item.ItemType.Vine;
                break;
        }
       return Item.ItemType.Empty;
    }

    /**
     * 摆放物品
     * @param {Array<LineItemInfo>} itemList 物品列表
     * @param {Array<Step>} randomPool 台阶集合
     * @param {boolean} isDeadRoad 是否是死路
     */
    OrginizePutItem(itemList: Array<Item.LineItemInfo>, randomPool: Array<Step>, isDeadRoad: boolean = null): void {
        for (var itemIdx: number = 0; itemIdx < itemList.length; ++itemIdx) {
            var info: Item.LineItemInfo = itemList[itemIdx];
            for (var difficultyNum: number = 0; difficultyNum < info.Number;) {
                if (randomPool.length < 1) {
                    break;
                }
                //随机把障碍放入格子里
                var randomIdx: number = Math.floor(Math.random() * randomPool.length);
                var step: Step = randomPool[randomIdx];
                randomPool.splice(randomIdx, 1);
                step.PutItem(info.Type);
                if (isDeadRoad != null)
                    step.IsDeadRoad = isDeadRoad;
                --info.Number;
            }
            if (randomPool.length < 1) {
                break;
            }
        }
        if (itemIdx > 0) {
            itemList.splice(0, itemIdx);
        }
    }

    /**
     * 放道具前算通路情况
     * @param {number} floor 
     */
    CountRoadInfo(floor: number): { [key: number]: number } {
        var safeList: Array<number> = [];
        var safeMap: { [key: number]: number } = {};
        var stepNeedRandomList = [];
        var stepNodeCount: Array<number> = []
        var thisFloor: MountLine = this.GetFloorByFloor(floor);

        var roadNum: number = 0;
        var lastFloor: MountLine = this.GetFloorByFloor(floor - 1);
        if (!lastFloor)
            return safeMap;
        var safeIdx: string = "";
        if (floor == this.m_SafeLocation.Y) {
            this._ResetStepInfo(thisFloor);
            var safeStep = thisFloor.GetStep(this.m_SafeLocation.X);
            safeStep.IsDeadRoad = false;
            safeMap[this.m_SafeLocation.X] = 1;
        }
        else {
            for (var stepIdx: number = 0; stepIdx < lastFloor.Length; ++stepIdx) {
                var step: Step = lastFloor.GetStep(stepIdx);
                if (step.IsDeadRoad)
                    continue;
                var leftStep: Step = step.LeftParent;
                var rightStep: Step = step.RightParent;
                var leftIdx: number = leftStep ? leftStep.Idx : -1;
                var righttIdx: number = rightStep ? rightStep.Idx : -1;
                if (leftIdx > -1) {
                    stepNodeCount[leftIdx] = stepNodeCount[leftIdx] ? stepNodeCount[leftIdx] : 0;
                    stepNodeCount[leftIdx] += 1;
                }
                if (righttIdx > -1) {
                    stepNodeCount[righttIdx] = stepNodeCount[righttIdx] ? stepNodeCount[righttIdx] : 0;
                    stepNodeCount[righttIdx] += 1;
                }
                if (righttIdx > -1 && leftIdx > -1) {
                    stepNeedRandomList.push([righttIdx, leftIdx])
                }
                else {
                    var safeStepIdx: number = leftIdx > 0 ? leftIdx : righttIdx;
                    if (safeStepIdx < 0)
                        continue;
                    safeMap[safeStepIdx] = 1;
                    safeIdx += safeStepIdx;
                }
            }
            for (var countIdx: number = 0; countIdx < stepNeedRandomList.length; ++countIdx) {
                var info = stepNeedRandomList[countIdx];
                var leftIdx: number = info[0];
                var rightIdx: number = info[1];
                if (!safeMap[leftIdx] && !safeMap[rightIdx]) {
                    var rand = Math.random();
                    if (rand > 0.5) {
                        safeMap[leftIdx] = 1;
                        safeIdx += leftIdx;
                    }
                    else {
                        safeMap[rightIdx] = 1;
                        safeIdx += rightIdx;
                    }
                }
            }
            for (var countStepNode: number = 0; countStepNode < thisFloor.Length; ++countStepNode) {
                var stepnum: number = stepNodeCount[countStepNode];
                stepnum = stepnum ? stepnum : 0;
                if (stepnum < 1) {
                    var step: Step = lastFloor.GetStep(countStepNode);
                    step.IsDeadRoad = true;
                }
            }
        }
        return safeMap;
    }

    _ResetStepInfo(thisFloor: MountLine) {
        if (!thisFloor) {
            return;
        }
        for (var logicIdx: number = 0; logicIdx < thisFloor.Length; ++logicIdx) {
            var step: Step = thisFloor.GetStep(logicIdx);
            step.IsDeadRoad = true;
        }
    }

    /**
     * 获取某道具信息
     * @param {number}floor 
     */
    TakeItemList(floor: number) {
        var line = this.GetFloorByFloor(floor);
        var itemList = new Array(line.Length);
        var lineRewards = this.m_ItemLayout.TakeLineReward(floor);
        this.m_CurLineRewards = this.m_CurLineRewards.concat(lineRewards);
        if (this.m_SafeLocation.Y > floor || floor > this.m_SafeLocation.Y + 1) {
            var lineBarriers = this.m_ItemLayout.TakeLineDifficulty(floor);
            this.m_CurLineBarriers = this.m_CurLineBarriers.concat(lineBarriers);
        }
        else {
            if (this.m_CurLineBarriers.length > 0)
                this.m_CurLineBarriers = new Array<Item.LineItemInfo>();
        }
    }

    //将层向上叠
    public PushFLoor(dir: number = 0) {
        var preHead: MountLine = this.HeadFloor;
        this.m_HeadFloorIdx = (this.m_HeadFloorIdx + 1) % this.MountLines.length;
        this.m_TailFLoorIdx = (this.m_TailFLoorIdx + 1) % this.MountLines.length;
        var Headfloor: number = preHead.FloorNum + 1;
        //this.AddSwitch(dir);
        this.HeadFloor.SetLine(Headfloor, this.CountNextFloorDirSwith());
        preHead.SetNextFloor(this.HeadFloor);
        this.PutItemInLine(Headfloor);

        return true;
    }

    public AddSwitch(dir: number = 0) {
        if (dir > 0.01)
            this.m_rightSwitchCount += 1;
        else if (dir < -0.01)
            this.m_rightSwitchCount -= 1;
    }
}

class StepInfo {
    parentID: number;

}