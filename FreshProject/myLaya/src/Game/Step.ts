import {Item} from "./GameItem"
import MountLine from "./MountLine"
import {GameStruct} from "./GameStruct"
import {path} from "./../Utility/Path"
import APP from "./../controler/APP"
type StepItem = Item.StepItem;
type MLocation = GameStruct.MLocation;
//步
export default class Step extends Laya.Sprite3D
{
    //模型个数
    public static stepModelNum:number = 3;

    LeftParent:Step;
    RightParent:Step;
    LeftChild:Step;
    RightChild:Step;
    StepItem:StepItem;
    RoadNum:number;
    Mark:any;
    Floor:MountLine;
    Idx:number;
    
    //公有接口
    set Position( newPS:Laya.Vector3 )
    {
        this.transform.position = newPS.clone();
    }
    get Position()
    {
        return this.transform.position.clone();
    }
    get Location():MLocation
    {
        return new GameStruct.MLocation(this.Idx-1,this.Floor.FloorNum);
    }
    get IsDeadRoad():boolean
    {
        return this._IsDeadRoad||!this.active|| this.StepItem.IsDifficulty;
    }
    set IsDeadRoad(value:boolean)
    {
        this._IsDeadRoad = value;
    }
    get IsForbiden():boolean
    {
        return this.StepItem.IsForbiden;
    }
    get IsEmpty():boolean
    {
        return !(this.active&&this.Floor.active);
    }
    PutItem( itemEnume:Item.ItemType )
    {
        if(itemEnume == Item.ItemType.Empty)
        {
            this.active =false;
            return;
        }else
        {
            this.active = true;
        }
        this.StepItem.PutItem(itemEnume);
    }

    ResetStep(newPs:Laya.Vector3)
    {
        this.Position = newPs;
        this.active = true;
        var modelPs = this.transform.position;
        this.StepItem.PutItem(Item.ItemType.None);

        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;
        this._IsDeadRoad = false;
        this.RoadNum = 0;
    }
    _StepModel:Laya.Sprite3D;
    constructor(floor:MountLine,idx:number)
    {
        //super(new Laya.BoxMesh(1,1,1) );
        super();
        APP.GameManager.CurScene.PutObj(this);
        var Idx = Math.floor(1+ Math.random()*Step.stepModelNum);
        var name = "LayaScene_L0"+Idx + "_spr_plat_0"+Idx;
        
        var model = Laya.loader.getRes(path.GetLH(name));
        var cloneModel = model.clone();
        this.addChild(cloneModel);
        
        this.transform.position = new Laya.Vector3();
        this.StepItem = Item.StepItemFactory(Item.ItemType.None,this);;
        this.StepItem.ResetItem();
        this.Floor = floor;
        this.Idx = idx;

        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;

        this._IsDeadRoad = false;
        this.RoadNum = 0;
    }
    private _IsDeadRoad:boolean;

}