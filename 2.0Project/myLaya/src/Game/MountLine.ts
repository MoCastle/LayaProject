import Step from "./Step"
import {Item} from "./GameItem"
import APP from "./../controler/APP"
import Controler from "./../controler/GameControler"
type StepItem = Item.StepItem;

 /**作者:Mo
 *场景内对象 
 */
//管理一整行
export default class MountLine extends Laya.Sprite3D
{
    LayOutDirty:boolean;
    LineIdx:number;
    FloorNum:number;
    StepList:Step[];
    LogicLength:number;
    StepItem:StepItem;
    set Position( newPS:Laya.Vector3 )
    {
        this.transform.position = newPS;
    }
    get Position()
    {
        return this.transform.position;
    }

    //设获取显示出来的第几个平台
    GetStep(idx:number):Step
    {
        return this.StepList[idx + 1];
    }
    //设置每层
    SetLine( floor:number ):void
    {
        
        this.LayOutDirty = false;
        this.active = true;
        this.FloorNum = floor;
        var newPS = this.transform.position;
        var stepLength = Controler.GameControler.StepLength;
        var stepDistance= Controler.GameControler.StepDistance;
        newPS.y = stepLength*floor;
        newPS.z = -stepDistance/2 *floor;
        this.transform.position = newPS;
        var stepArr:Step[] = this.StepList;
        
        var startX = 0 - stepArr.length/2 * stepDistance;
        if(this.JugeIsLessLine())
        {
            startX += stepDistance/2;
        }

         for( var column =0 ;column<stepArr.length;++column )
        {
            var newStep:Step = stepArr[column];
            var stepVector = newStep.Position;
            stepVector.x = startX;
            if(this._Seted&&(column == 0||column>this.LogicLength))
                newStep.ResetStep(stepVector,true)
            else
                newStep.ResetStep(stepVector)
            startX += stepDistance;
        }
        
        if(this._Seted)
            return;
        stepArr[0].active = false;
        stepArr[stepArr.length -1].active = false;
        this._Seted = true;
        if( ! this.JugeIsLessLine())
        {
            this.LogicLength = stepArr.length-2;
        }else
        {
            stepArr[stepArr.length -2].active = false;
            this.LogicLength = stepArr.length -3;
        }
        
    }
    
    //判断是否收缩的那层
    JugeIsLessLine():boolean
    {
        return this.FloorNum%2 != 0;
    }
    //将每个节点链接到下一层
    SetNextFloor( lastFloor:MountLine):void
    {
        //判断是否有两头端点
        var havePoint = lastFloor.LogicLength >this.LogicLength
        for( var startIdx:number = 0;startIdx< this.LogicLength;++startIdx)
        {
            var leftParent:Step =null;
            var rightParent:Step =null;
            if(havePoint)
            {
                leftParent = lastFloor.GetStep(startIdx);
                rightParent = lastFloor.GetStep(startIdx+1);
            }else
            {
                leftParent = lastFloor.GetStep(startIdx-1);
                rightParent = lastFloor.GetStep(startIdx);
            }
            var thiStep = this.GetStep(startIdx);
            thiStep.LeftParent = leftParent;
            leftParent.RightChild = thiStep;

            thiStep.RightParent = rightParent;
            rightParent.LeftChild = thiStep;
        }
    }
    //敲碎一层
    Break():void
    {
        this.active = false;
    }

    public Continue()
    {

    }
    public Pause()
    {
        
    }
    private _Seted:boolean;
    constructor(lineIdx:number,floor:number = 0)
    {
        var columns:number = Controler.GameControler.LineStepNum;
        super();
        this.LineIdx = lineIdx;
        this.FloorNum = floor;
        this.StepList = [];
        this.LogicLength = 0;
        this.LayOutDirty = false;
        this._Seted = false;
        for( var StartIdx:number = (columns -1);StartIdx>=0;--StartIdx )
        {
            var newStep:Step = new Step(this,StartIdx);
            this.addChild(newStep);
            this.StepList[StartIdx] = newStep;
        }
    }
}

