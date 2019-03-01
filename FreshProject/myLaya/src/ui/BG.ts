import {path} from "./../Utility/Path"
import {ui} from "./layaMaxUI"

export default class BGUI extends ui.BGUI {
    
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("BG")));
    }
    _SkyArr:Array<Laya.Sprite>;
    constructor() {
        super();
        var skyMod = this._SkyModel;
        var earth = this._Earth;
        var widh = Laya.stage.width ;
        var rate = Math.ceil(Laya.stage.height/widh);
        skyMod.width = widh;//Laya.stage.width;
        skyMod.height = widh;
        earth.width = widh;
        earth.height = widh;
        this._SkyArr = new Array<Laya.Image>(rate);
        for(let startIdx = 0;startIdx<this._SkyArr.length;++startIdx )
        {
            this._SkyArr[startIdx] = new Laya.Image();
            //this._SkyArr[startIdx]._cloneTo(skyMod)
            this._SkyArr[startIdx].loadImage("comp/img_background_spr_sky.png");
            this._SkyArr[startIdx].width = widh;
            this._SkyArr[startIdx].height = widh;
            this._Panel.addChild(this._SkyArr[startIdx]);
        } 
        skyMod.visible = false;
        this.Init();
    }
    SkyDropSpeed:number;
    PlanDropSpeed:number;
    Init()
    {
        var height = Laya.stage.width;
        for(let startIdx = 0;startIdx<this._SkyArr.length;++startIdx )
        {
            this._SkyArr[startIdx].y = startIdx * height;
        }
    }
    UpdatePage( height:number )
    {        

    }
}
