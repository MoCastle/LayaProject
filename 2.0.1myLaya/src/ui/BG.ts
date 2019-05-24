import {path} from "./../Utility/Path"
import {ui} from "./layaMaxUI"
import{BaseFunc} from "./../Base/BaseFunc"
import PlayerGuestAgent from "../Agent/PlayerGuestAgent";

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

    private bg: Laya.Image;
    private bg1:Laya.Image;
    public static mgrBGUI:BGUI;
    private lastX:number = -1;
    private lastY:number = -1;

    constructor() {
        super();
        
        // var widh = Laya.stage.width ;
        // var rate = Math.ceil(Laya.stage.height/widh);

        // this._SkyQue = new BaseFunc.NodeQueue<Laya.Sprite>();
        // this._TempSkyQue = new BaseFunc.NodeQueue<Laya.Sprite>();
         //new Array<Laya.Image>(rate+1);
        // for(let startIdx = 0;startIdx<rate+1; ++startIdx )
        // {
        var image:Laya.Image = new Laya.Image();
        image.loadImage(PlayerGuestAgent.GuestAgent.SkinDir + "mainbg.jpg");
        image.width = Laya.stage.width + 250;
        image.height = Laya.stage.height;
        this.addChild(image);
        this.bg = image;
        this.bg.anchorX = 0.5;
        this.bg.x = Laya.stage.width / 2;

        image = new Laya.Image();
        image.loadImage(PlayerGuestAgent.GuestAgent.SkinDir + "mainbg.jpg");
        image.width = Laya.stage.width + 250;
        image.height = Laya.stage.height;
        this.addChild(image);
        this.bg1 = image;
        this.bg1.y = -Laya.stage.height;
        this.bg1.anchorX = 0.5;
        this.bg1.x = Laya.stage.width / 2;
            //this._SkyQue.Push(image);
        // } 
        // this.SetSky(0);
        // var earth = new Laya.Image();
        // earth.y = Laya.stage.height - Laya.stage.width;
        // this._EarthStartPS = earth.y;
        //earth.loadImage("comp/img_background_spr.png");
        // earth.loadImage(PlayerGuestAgent.GuestAgent.SkinDir + "mainbg.jpg");
        // this._Earth = earth;
        // earth.width = widh;
        // earth.height = widh;

        //this.addChild(earth);
        
        // this._ScaleSky = 0.001
        // this._ScaleEarth = 0.01
        //this._EarthStartPS = this._Earth.y;
        BGUI.mgrBGUI = this;
    }

    /**
     * 背景跟随相机移动
     * @param camerPosX 
     * @param camerPosY 
     */
    UpdateBgPos(camerPosX, camerPosY) {

       if(this.lastX == camerPosX && this.lastY == camerPosY) {
           return;
       }

        if(this.lastX == -1) {
            this.lastX = camerPosX;
            this.lastY = camerPosY;
            return;
        }

        var offestY = camerPosY - this.lastY;
        var offestX = camerPosX - this.lastX;
        offestY *= 50;
        offestX *= -30;
        if(offestY < 0.5 || Math.abs(offestX) < 0.1) {
            this.lastY = camerPosY;
            this.lastX = camerPosX;
            return;
        }
        
        this.bg.y += offestY;
        this.bg1.y += offestY;

        this.bg.x += offestX;
        this.bg1.x += offestX;
        if(this.bg.y >= Laya.stage.height) {
            this.bg.y = -(Laya.stage.height - this.bg1.y);
            var temp = this.bg;
            this.bg = this.bg1;
            this.bg1 = temp;
        }
        this.lastY = camerPosY;
        this.lastX = camerPosX;
    }
    
    upateBgTexture(): void {
        this.bg.loadImage(PlayerGuestAgent.GuestAgent.SkinDir + "mainbg.jpg")
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
        // var temSkyQue:BaseFunc.NodeQueue<Laya.Sprite> = this._TempSkyQue;
        // temSkyQue.Clear();
        // var count:number = 0;
        // var height = Laya.stage.width;
        // while(this._SkyQue.Count>0)
        // {
        //     var node:BaseFunc.Node<Laya.Sprite> = this._SkyQue.PopNode();
        //     var skyImg:Laya.Sprite = node.Value;
        //     skyImg.y = count * height + pixHeight - height - height*0.01;
        //     temSkyQue.PushNode(node);
        //     if(skyImg.y>Laya.stage.height)
        //     {
        //         skyImg.y = temSkyQue.HeadValue.y - height;
        //     }
        //     ++count;
        // }
        // this._TempSkyQue = this._SkyQue;
        // this._SkyQue = temSkyQue;
    }
    SetEarth(height:number)
    {
        //this._Earth.y = this._EarthStartPS + height;
    }
    ResetBgPoint()
    {
        this.bg1.x = this.bg.x = Laya.stage.width / 2;
        this.bg.y = 0;
        this.bg1.y = -Laya.stage.height;
    }
    UpdatePage(height:number )
    {        
        //height = this.HeightTransPix(height);
        //var skyHeightPix = height*this._ScaleSky;
        //this.SetSky(height);
        //this.SetEarth(height);
        //var earthHeightPix = height;
        //this.bg1.x = this.bg.x = Laya.stage.width / 2;
    }
}
