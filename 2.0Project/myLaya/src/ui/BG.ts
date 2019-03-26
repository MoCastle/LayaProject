import {path} from "./../Utility/Path"
import {ui} from "./layaMaxUI"
import{BaseFunc} from "./../Base/BaseFunc"

export default class BGUI extends ui.BGUI {
    
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("BG")));
    }
    //private _SkyArr:Array<Laya.Sprite>;
    private _SkyQue:BaseFunc.NodeQueue<Laya.Sprite>;
    private _TempSkyQue:BaseFunc.NodeQueue<Laya.Sprite>;
    private _ScaleSky:number;
    private _ScaleEarth:number;
    private _EarthStartPS:number;

    constructor() {
        super();
        
        var widh = Laya.stage.width ;
        var rate = Math.ceil(Laya.stage.height/widh);

        this._SkyQue = new BaseFunc.NodeQueue<Laya.Sprite>();
        this._TempSkyQue = new BaseFunc.NodeQueue<Laya.Sprite>();
         //new Array<Laya.Image>(rate+1);
        for(let startIdx = 0;startIdx<rate+1; ++startIdx )
        {
            var image:Laya.Image = new Laya.Image();
            image.loadImage("comp/img_background_spr_sky.png");
            image.width = widh;
            image.height = widh+widh*0.01;
            this.addChild(image);
            this._SkyQue.Push(image);
        } 
        this.SetSky(0);
        var earth = new Laya.Image();
        earth.y = Laya.stage.height - Laya.stage.width;
        this._EarthStartPS = earth.y;
        earth.loadImage("comp/img_background_spr.png");
        this._Earth = earth;
        earth.width = widh;
        earth.height = widh;
        this.addChild(earth);
        
        this._ScaleSky = 0.001
        this._ScaleEarth = 0.01
        //this._EarthStartPS = this._Earth.y;
    }
    /*
    Init()
    {
        var height = Laya.stage.width;
        for(let startIdx:number = 0;startIdx<this._SkyQue.Count;++startIdx )
        {
            this._SkyArr[startIdx].y = startIdx * height;
        }
        this._Earth.y = Laya.stage.height - Laya.stage.width;
        this._EarthStartPS = this._Earth.y;
    }*/
    //高度转屏幕高度像素
    HeightTransPix( height:number)
    {
        return height*-0.1;
    }
    SetSky(pixHeight:number)
    {
        var temSkyQue:BaseFunc.NodeQueue<Laya.Sprite> = this._TempSkyQue;
        temSkyQue.Clear();
        var count:number = 0;
        var height = Laya.stage.width;
        while(this._SkyQue.Count>0)
        {
            var node:BaseFunc.Node<Laya.Sprite> = this._SkyQue.PopNode();
            var skyImg:Laya.Sprite = node.Value;
            skyImg.y = count * height + pixHeight - height - height*0.01;
            temSkyQue.PushNode(node);
            if(skyImg.y>Laya.stage.height)
            {
                skyImg.y = temSkyQue.HeadValue.y - height;
            }
            ++count;
        }
        this._TempSkyQue = this._SkyQue;
        this._SkyQue = temSkyQue;
    }
    SetEarth(height:number)
    {
        this._Earth.y = this._EarthStartPS + height;
    }
    UpdatePage( height:number )
    {        
        //height = this.HeightTransPix(height);
        //var skyHeightPix = height*this._ScaleSky;
        this.SetSky(height);
        this.SetEarth(height);
        //var earthHeightPix = height;

    }
}
