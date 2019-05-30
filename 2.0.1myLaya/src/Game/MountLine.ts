import Step from "./Step"
import { Item } from "./GameItem"
import APP from "./../controler/APP"
import Controler from "./../controler/GameControler"
import { GameModule } from "./GameModule";
type StepItem = Item.StepItem;
var Space: number;
var DSpace: number;
/**作者:Mo
*场景内对象 
*/
//管理一整行
export default class MountLine extends Laya.Sprite3D {
    private m_RightSwitch: number;
    m_StepList: Step[];
    LayOutDirty: boolean;
    LineIdx: number;
    floorNum: number;
    StepItem: StepItem;
    OddSwitch: number;
    breaked: boolean;
    Length: number;
    startFloor: number;

    get rightSwitch(): number {
        return this.m_RightSwitch;
    }
    private set Position(newPS: Laya.Vector3) {
        this.transform.position = newPS;
    }
    private get Position() {
        return this.transform.position.clone();
    }

    constructor(lineIdx: number, columb: number, floor: number = 0) {
        columb = 5;
        var lineColumns: number = columb + 2;
        super();
        this.startFloor = 0;
        this.Length = columb;
        this.m_RightSwitch = 1;//0;
        this.LineIdx = lineIdx;
        this.floorNum = floor;
        this.m_StepList = [];

        for (var StartIdx: number = 0; StartIdx < lineColumns; ++StartIdx) {
            var newStep: Step = new Step(this, StartIdx);
            this.addChild(newStep);
            this.m_StepList[StartIdx] = newStep;
        }
        this.transform.position = new Laya.Vector3();
    }

    Init() {
        var startX: number = 0;
        for (var StartIdx: number = 0; StartIdx < this.m_StepList.length; ++StartIdx) {
            var newStep: Step = this.m_StepList[StartIdx];
            var stepVector = newStep.position;
            stepVector.x = startX;
            startX += GameModule.HSpace;
            newStep.position = stepVector;
        }
    }

    //设获取显示出来的第几个平台
    GetStep(idx: number): Step {
        if (idx < 0 || idx >= (this.JugIsOdd() ? (this.m_StepList.length - 1) : (this.m_StepList.length - 2)))
            return null;
        return this.m_StepList[idx + 1];
    }
    get StepRealLength() {
        return this.m_StepList.length;
    }
    GetStepByIdx(idx: number): Step {
        return this.m_StepList[idx];
    }

    //设置每层
    SetLine(floor: number): void {
        this.breaked = false;
        this.OddSwitch = 0;
        this.LayOutDirty = false;
        this.active = true;
        this.floorNum = floor;
        var newPS = this.transform.position;
        var positionFloor = floor - this.startFloor;
        newPS.y = GameModule.VSpace * floor;
        newPS.z = -GameModule.DSpace * floor;
        this.transform.position = newPS;

        this.m_StepList[0].active = false;
        
        this.m_StepList[this.m_StepList.length - 1].active = false;
        this.Length = this.m_StepList.length - 2;
        if (!this.JugIsOdd()) {
            this.m_StepList[this.m_StepList.length - 2].ResetStep();
            this.m_StepList[this.m_StepList.length - 2].active = false;
            this.Length = this.m_StepList.length - 3;
        }

        for (var startIdx: number = 0; startIdx < this.Length; ++startIdx) {
            var thiStep = this.GetStep(startIdx);
            thiStep.ResetStep();
        }
    }

    //判断是否收缩的那层
    JugIsOdd(): boolean {
        return (this.floorNum) % 2 == 0;
    }

    //将每个节点链接到下一层
    SetNextFloor(lastFloor: MountLine): void {
        var oddSwitch: number = 0;
        var position: Laya.Vector3 = lastFloor.Position;

        if (!this.JugIsOdd()) {
            oddSwitch = 1;
        } else {
            oddSwitch = 0;
        }
        position.x = -oddSwitch * GameModule.HSpace / 2;
        lastFloor.OddSwitch = oddSwitch
        lastFloor.Position = position;
        //判断是否有两头端点
        for (var startIdx: number = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var leftParent: Step = null;
            var rightParent: Step = null;
            var leftParentIdx: number = startIdx + oddSwitch;

            leftParent = lastFloor.GetStepByIdx(leftParentIdx - 1);
            rightParent = lastFloor.GetStepByIdx(leftParentIdx);
            var thisStep = this.m_StepList[startIdx];

            thisStep.LeftParent = leftParent;
            leftParent && (leftParent.RightChild = thisStep);
            thisStep.RightParent = rightParent;
            rightParent && (rightParent.LeftChild = thisStep);
            /*
            if (startIdx == 0 || startIdx > this.Length) {
                thisStep.active = false;
            }*/
        }
    }

    //敲碎一层
    Break(): void {
        this.breaked = true;
        var stepList: Array<Step> = this.m_StepList;
        for (var idx: number = 0; idx < this.Length; ++idx) {
            var thisStep: Step = this.GetStep(idx);
            thisStep.Break();
        }
    }

    public Continue() {

    }
    public Pause() {

    }
    private _Seted: boolean;

}

