import Step from "./Step"
import { Item } from "./GameItem"
import APP from "./../controler/APP"
import Controler from "./../controler/GameControler"
import { GameModule } from "./GameModule";
type StepItem = Item.StepItem;
var VSpace: number;
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
    FloorNum: number;
    StepItem: StepItem;
    OddSwitch: number;

    get rightSwitch(): number {
        return this.m_RightSwitch;
    }
    private set Position(newPS: Laya.Vector3) {
        this.transform.position = newPS;
    }
    private get Position() {
        return this.transform.position.clone();
    }
    get Length(): number {
        return this.m_StepList.length;
    }

    constructor(lineIdx: number, Columb: number, floor: number = 0) {
        VSpace = GameModule.VSpace;
        DSpace = GameModule.DSpace;

        var columns: number = Columb;
        super();
        this.m_RightSwitch = 0;
        this.LineIdx = lineIdx;
        this.FloorNum = floor;
        this.m_StepList = [];
        var startX: number = 0;
        for (var StartIdx: number = 0; StartIdx < columns; ++StartIdx) {
            var newStep: Step = new Step(this, StartIdx);
            this.addChild(newStep);
            this.m_StepList[StartIdx] = newStep;
            var stepVector = newStep.Position;
            stepVector.x = startX;
            startX += GameModule.HSpace;
            newStep.transform.position = stepVector;
        }
        this.transform.position = new Laya.Vector3();
    }

    //设获取显示出来的第几个平台
    GetStep(idx: number): Step {
        if (idx < 0 || idx >= this.m_StepList.length)
            return null;
        return this.m_StepList[idx];
    }

    //设置每层
    SetLine(floor: number, rightSwitch: number): void {
        this.m_RightSwitch = rightSwitch;
        this.OddSwitch = 0;
        this.LayOutDirty = false;
        this.active = true;
        this.FloorNum = floor;
        var newPS = this.transform.position;
        newPS.y = VSpace * floor;
        newPS.z = -DSpace * floor;
        this.transform.position = newPS;
        for (var startIdx: number = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var thiStep = this.GetStep(startIdx);
            thiStep.ResetStep();
        }
    }

    //判断是否收缩的那层
    JugIsOdd(): boolean {
        return this.FloorNum % 2 != 0;
    }

    
    //将每个节点链接到下一层
    SetNextFloor(lastFloor: MountLine): void {
        var distance: number =  Math.ceil(lastFloor.rightSwitch/2) - Math.ceil(this.rightSwitch/2);
        var oddSwitch: number = 0;
        var position: Laya.Vector3 = lastFloor.Position;
        
        if (this.JugIsOdd()) {
            oddSwitch = -1;
        } else {
            oddSwitch = 0;
        }
        position.x = Math.ceil(lastFloor.rightSwitch/2) * GameModule.HSpace + oddSwitch * GameModule.HSpace / 2 ;
        lastFloor.OddSwitch = oddSwitch
        lastFloor.Position = position;
        console.log(position.x);
        var stepStartIdx: string = "";
        //判断是否有两头端点
        for (var startIdx: number = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var leftParent: Step = null;
            var rightParent: Step = null;
            var leftParentIdx: number = startIdx - distance - (1 + oddSwitch);
            stepStartIdx += " " + leftParentIdx;

            leftParent = lastFloor.GetStep(leftParentIdx);
            rightParent = lastFloor.GetStep(leftParentIdx + 1);
            var thiStep = this.GetStep(startIdx);
            thiStep.LeftParent = leftParent;
            leftParent && (leftParent.RightChild = thiStep);
            thiStep.RightParent = rightParent;
            rightParent && (rightParent.LeftChild = thiStep);
        }
        console.log("stepPositon " + stepStartIdx);
        console.log("info oddSwitch " + oddSwitch);
        
    }

    //敲碎一层
    Break(): void {
        this.active = false;
    }

    public Continue() {

    }
    public Pause() {

    }
    private _Seted: boolean;

}

