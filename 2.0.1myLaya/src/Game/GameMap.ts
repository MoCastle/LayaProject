import MountLine from "./MountLine";
import { GameStruct } from "./GameStruct";
import { Item } from "./GameItem";
import Step from "./Step";
import Player from "./Player";
import { GameModule } from "./GameModule";
import LevelSettingManager from "../GameManager/LevelSettingManager";
import LevelInfoManager from "../GameManager/LevelInfoManager";
import PlayerGuestAgent from "../Agent/PlayerGuestAgent";

var Mounts: number = 2;
var LineSpace: number = 2;

export default class Gamemap extends Laya.Node {
    private m_HeadFloorIdx: number;
    private m_TailFLoorIdx: number;
    private m_MountLines: MountLine[];
    private m_CurIdx: number;
    private m_SafeLocation: GameStruct.MLocation;
    private m_CurLineBarriers: Array<Item.LineItemInfo>;
    private m_CurLineRewards: Array<Item.LineItemInfo>;
    private m_ItemLayout: Item.ItemLayout;
    private m_Player: Player;
    private m_StartPosition: Laya.Vector3;
    private m_JumpFloor: number;
    private m_rightSwitchCount: number;
    private m_ShowSteps: number;
    private m_ViewColums: number;

    get EndFloor():number
    {
        return this.m_JumpFloor + this.m_ItemLayout.range;
    }
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
        var floorColumNum: number = column;//floorNum * 2;// + 4;
        for (var idx = 0; idx < floorNum; ++idx) {
            var newMountain = new MountLine(idx, floorColumNum, idx)
            this.m_MountLines[idx] = newMountain;
            this.addChild(newMountain);
        }
    }
    /**
     * 
     * @param jumpFloor 跳过的层
     * @param camera 相机
     * @param viewHeight 相机垂直视野
     */
    public Init(jumpFloor: number, camera: Laya.Camera, viewHeight: number, gameStartFloor: number = 0): Laya.Vector3 {
        this.m_ItemLayout.Init(gameStartFloor, 5);
        jumpFloor = (!jumpFloor) && (jumpFloor < 0) && (jumpFloor >= lines.length) ? 0 : jumpFloor;
        this.m_JumpFloor = jumpFloor;
        var cameraPS: Laya.Vector3 = new Laya.Vector3(0, 15, 20);
        var cmeraViewHeight: number = viewHeight / (this.m_MountLines.length + 1);
        
        GameModule.VSpace = cmeraViewHeight;
        camera.orthographicVerticalSize = viewHeight - 2.5 * cmeraViewHeight;
        var widtthSpace: number = (camera.orthographicVerticalSize * camera.aspectRatio) / (this.m_ViewColums - 0.5 + 0.4);
        GameModule.HSpace = widtthSpace;

        Laya.Vector3.add(cameraPS, new Laya.Vector3(0, GameModule.VSpace * (jumpFloor), 0), cameraPS)

        var lines: MountLine[] = this.m_MountLines;
        this.m_HeadFloorIdx = lines.length - 1;
        this.m_TailFLoorIdx = 0;
        this.m_rightSwitchCount = 0;

        for (var idx: number = 0; idx < lines.length; ++idx) {
            var line: MountLine = lines[idx];
            line.Init();
            line.startFloor = this.m_JumpFloor;
            line.SetLine(idx);
            if (idx > 0)
                lines[idx - 1].SetNextFloor(line);
            if (idx == jumpFloor) {
                var PlayerStep = line.GetStep(Math.ceil(line.Length / 2) - 1);
                this.m_StartPosition = PlayerStep.position;
                PlayerStep.isDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        lines[0].active = false;
        return cameraPS;
    }

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
        if (floor < tailFloor.floorNum) {
            return;
        }
        var breakFloor: MountLine = this.GetFloorByFloor(floor);
        for (var countFloor: number = tailFloor.floorNum; countFloor <= floor; ++countFloor) {
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
        if (location.Y < this.TailFLoor.floorNum || location.Y > this.HeadFloor.floorNum) {
            return;
        }
        this.ResetItem(location.Y)
    }

    //从某一层开始一层层重新摆放道具
    ResetItem(floor: number) {
        this.m_CurLineBarriers = new Array<Item.LineItemInfo>();
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        for (let loopFloor: number = floor; loopFloor <= this.HeadFloor.floorNum; ++loopFloor) {
            var floorLine = this.GetFloorByFloor(loopFloor);
            floorLine.LayOutDirty = false;
            floorLine.SetLine(floorLine.floorNum);
            this.PutItemInLine(loopFloor);
        }
    }

    /**
     * 根据层数获取某层
     * @param {number} floor 
     */
    GetFloorByFloor(floor: number) {
        var tailFloor: MountLine = this.TailFLoor;
        if (floor < tailFloor.floorNum || floor > this.HeadFloor.floorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.floorNum + this.m_TailFLoorIdx) % this.m_MountLines.length;
        return this.m_MountLines[floorID];
    }

    /**
     * 循环设置层台阶
     * @param floor 层
     * @param Owner 
     * @param callBack 循环执行回调
     */
    LoopDoFloorStep(floor: number, Owner: any, callBack: (step: Step) => void): void {
        if (floor < this.TailFLoor.floorNum || floor > this.HeadFloor.floorNum) {
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
    protected PutItemInLine(floor: number) {
        var floorLine = this.GetFloorByFloor(floor);

        var safeCol: Array<number>;
        //布置过了不用再布置了
        if (floorLine.LayOutDirty)
            return;
        floorLine.LayOutDirty = true;
        var safeIdxColl: { [key: number]: number; } = this.CountRoadInfo(floor);

        //出生点不放道具
        if (floor <= this.m_JumpFloor || floor == this.m_SafeLocation.Y) {
            return;
        }
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        //获取该行要摆放的物品
        this.TakeItemList(floor)

        //把需要放道具的格子放入随机池
        var curFloor: MountLine = this.GetFloorByFloor(floor);
        var randomPool: Array<Step> = new Array();
        //把安全的格子暂时移出来
        var safeStepList: Array<Step> = new Array<Step>();
        for (var stepIdx: number = 0; stepIdx < curFloor.Length; ++stepIdx) {
            var getStep: Step = curFloor.GetStep(stepIdx);
            if (safeIdxColl[stepIdx] == undefined) {
                randomPool.push(getStep);
            } else {
                safeStepList.push(getStep);
            }
        }
        //放陷阱
        var barriersList: Array<Item.LineItemInfo> = this.m_CurLineBarriers;

        var testGetBarrierNum: number = 0;
        barriersList.forEach(element => {
            testGetBarrierNum += element.Number;
        });
        
        this.OrginizePutItem(barriersList, randomPool, true);
        if (barriersList.length > 0)//障碍物放不下 把一部分通路毙掉 障碍物 重新放进去
        {
            var countBarrierNum = 0;
            barriersList.forEach(element => {
                countBarrierNum += element.Number;
            });
            var NumberArr: Array<number> = this.FindSafeStep(floor);
            if (countBarrierNum <= NumberArr.length) {
                var putInfStep: Array<Step> = []
                while (barriersList.length > 0) {
                    var info: Item.LineItemInfo = barriersList[0]
                    var putinIdx: number = NumberArr[Math.floor(Math.random() * NumberArr.length)];
                    var putinStep:Step = floorLine.GetStep(putinIdx);
                    putinStep.PutItem(info.Type);
                    for (var safeStepIdx: number = 0; safeStepIdx < safeStepList.length; ++safeStepIdx)  {
                        var safeStep:Step = safeStepList[safeStepIdx];
                        if(putinIdx == safeStep.Idx)
                        {
                            safeStepList.splice(safeStepIdx,1);
                            break;
                        }
                    }
                    --info.Number;
                    if(info.Number <1)
                    {
                        barriersList.shift();
                    }
                }
            }
            else {
                var NumberArr: Array<number> = this.FindSafeStep(floor);
                while (barriersList.length > 0) {
                    var info: Item.LineItemInfo = barriersList[0]
                    var safeStepIdx: number = Math.floor(Math.random() * safeStepList.length);
                    var safeStep:Step = safeStepList[safeStepIdx];
                    safeStepList.splice(safeStepIdx,1);
                    --info.Number;
                    if(info.Number <1)
                    {
                        barriersList.shift();
                    }
                }
            }
        }

        //摆放道具
        for (var safeStepIdx: number = 0; safeStepIdx < safeStepList.length; ++safeStepIdx) {
            randomPool.push(safeStepList[safeStepIdx]);
        }

        var rewardList = this.CurLineRewards;
        this.OrginizePutItem(rewardList, randomPool);
    }

    public GetStepByPosition(location: GameStruct.MLocation) {
        var floor: MountLine = this.GetFloorByFloor(location.Y);
        if(!floor)
        {
            return null;
        }
        var step: Step = floor.GetStep(location.X);
        return step;
    }

    protected FindSafeStep(floor: number): Array<number> {
        var stepContainer: Array<number> = new Array<number>();
        var startStep: Step = this.m_Player && this.m_Player.CurStep ? this.m_Player.CurStep:this.GetStepByPosition(this.m_SafeLocation);
        if(startStep)
        {
             this.SearchingCurFloor(startStep, floor, stepContainer);
        }
        
        return stepContainer;
    }

    protected SearchingCurFloor(curStep: Step, targetFloor: number, targetStepContainer: Array<number>) {
        if (curStep.Floor.floorNum == targetFloor) {
            targetStepContainer.push(curStep.Idx);
            return;
        }
        else {
            var leftParent = curStep.LeftParent;
            if (leftParent && !leftParent.isDeadRoad) {
                this.SearchingCurFloor(leftParent, targetFloor, targetStepContainer);
            }
            var rightParent = curStep.RightParent;
            if (rightParent && !rightParent.isDeadRoad) {
                this.SearchingCurFloor(rightParent, targetFloor, targetStepContainer);
            }
        }
    }

    // protected PutItemInLine(floor: number) {
    //     if(floor <= 1) {
    //         return;
    //     }
    //     var curFloor: MountLine = this.GetFloorByFloor(floor);
    //     floor -= 2;
    //     var setting = LevelSettingManager.Mgr.GetLevelSettingInfo();

    //     var startIndex = 8;
    //     var loopLength:number = setting.length;
    //     loopLength += loopLength%2 == 0?0:1;
    //     var cntConfIndex = setting.length - floor % (loopLength) - 1;
    //     if(cntConfIndex % 2 != 0) {
    //         startIndex = 9;
    //     }
    //     var lineItemInfoArr:Array<number> = setting[cntConfIndex];
    //     var endGameLine:number = LevelInfoManager.Mgr.GetTotalLevel(0);
    //     for(var i = startIndex;i < startIndex + 14;i = i + 2) {
    //         var stepIdx = (i - startIndex) / 2;
    //         var getStep: Step = curFloor.GetStep(stepIdx);
    //         var type = this.ToolConfToOrginizePutItem(lineItemInfoArr,i);
    //         if(floor>endGameLine)
    //         {
    //             type = Item.ItemType.WinFlag;
    //         }
    //         getStep.active = true;
    //         if(type == -1) {
    //             continue;
    //         }
    //         getStep.PutItem(type);
    //         //getStep.PutItem(-1);
    //     }
    // }

    /**
     * 
     * @param key 配置表类型转换
     */
    ToolConfToOrginizePutItem(itemIntoArr: Array<number>, idx: number): number {
        if (!itemIntoArr) {
            return -1;
        }
        var key: number = itemIntoArr[idx];
        switch (key) {
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
        while (itemList.length > 0) {
            var info: Item.LineItemInfo = itemList[0];
            while (info.Number > 0) {
                if (randomPool.length < 1) {
                    break;
                }
                //随机把障碍放入格子里
                var randomIdx: number = Math.floor(Math.random() * randomPool.length);
                var step: Step = randomPool[randomIdx];
                randomPool.splice(randomIdx, 1);
                step.PutItem(info.Type);
                if (isDeadRoad != null)
                    step.isDeadRoad = isDeadRoad;
                --info.Number;
            }
            if (info.Number < 1) {
                itemList.shift();
            }
            if (randomPool.length < 1) {
                break;
            }
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
            safeStep.isDeadRoad = false;
            safeMap[this.m_SafeLocation.X] = 1;
        }
        else {
            for (var stepIdx: number = 0; stepIdx < lastFloor.Length; ++stepIdx) {
                var step: Step = lastFloor.GetStep(stepIdx);
                if (step.isDeadRoad)
                    continue;
                var leftStep: Step = step.LeftParent;
                var rightStep: Step = step.RightParent;
                var leftIdx: number = leftStep && !leftStep.isDeadRoad ? leftStep.Idx : -1;
                var righttIdx: number = rightStep && !rightStep.isDeadRoad ? rightStep.Idx : -1;
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
                    }
                    else {
                        safeMap[rightIdx] = 1;
                    }
                }
            }
            for (var countStepNode: number = 0; countStepNode < thisFloor.Length; ++countStepNode) {
                var stepnum: number = stepNodeCount[countStepNode];
                stepnum = stepnum ? stepnum : 0;
                if (stepnum < 1) {
                    var step: Step = thisFloor.GetStep(countStepNode);
                    step.isDeadRoad = true;
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
            step.isDeadRoad = true;
        }
    }

    /**
     * 获取某道具信息
     * @param {number}floor 
     */
    TakeItemList(floor: number) {
        if(floor < this.m_JumpFloor)
        {
            return;
        }
        floor -= this.m_JumpFloor
        var line = this.GetFloorByFloor(floor);
        this.m_CurLineRewards = new Array<Item.LineItemInfo>();
        this.m_CurLineBarriers = new Array<Item.LineItemInfo>();
        this.m_CurLineRewards = this.m_ItemLayout.TakeLineReward(floor);
        if (this.m_SafeLocation.Y > floor || floor > this.m_SafeLocation.Y + 1) {
            var lineBarriers = this.m_ItemLayout.TakeLineDifficulty(floor);
            this.m_CurLineBarriers = this.m_CurLineBarriers.concat(lineBarriers);
        }
    }

    //将层向上叠
    public PushFLoor(dir: number = 0) {
        var preHead: MountLine = this.HeadFloor;
        this.m_HeadFloorIdx = (this.m_HeadFloorIdx + 1) % this.MountLines.length;
        this.m_TailFLoorIdx = (this.m_TailFLoorIdx + 1) % this.MountLines.length;
        var Headfloor: number = preHead.floorNum + 1;
        //this.AddSwitch(dir);
        this.HeadFloor.SetLine(Headfloor);
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