import Player from "./Player"

//游戏中相机
export default class GameCamera extends Laya.Camera
{
    Ctrler:BaseGameCameraCtrler;
    BasePS:Laya.Vector3;
    DynamicPS:Laya.Vector3;
    Player:Player;

    SetPlaer(player:Player)
    {
        this.Player = player;
    }
    
    Reset(DynamicPS:Laya.Vector3,basePS:Laya.Vector3,player:Player )
    {
        this.Player = player;
        this.BasePS = basePS;
        this.DynamicPS = DynamicPS;
    }

    //计算并设置位置
    CountSetPS()
    {
        var newPS = this.transform.position;
        Laya.Vector3.add(this.BasePS,this.DynamicPS,newPS);
        this.transform.position = newPS;
    }
    set Position(ps:Laya.Vector3)
    {
        this.transform.position = ps.clone();
    }
    get Position():Laya.Vector3
    {
        return this.transform.position.clone();
    }

    constructor()
    {   
        super();
        this.Ctrler = new GameCameraCtrler(this);
        this.DynamicPS = this.transform.position.clone();
        this.BasePS = new Laya.Vector3();
        this.Player = null;
        //this.timerLoop(1,this.Ctrler,this.Ctrler.Update);
        this.frameLoop(1,this,this._Update);
    }
    private _Update()
    {
        this.Ctrler.Update();
    }
}

abstract class BaseGameCameraCtrler
{
    Camera:GameCamera;
    Ctrler:BaseGameCameraCtrler;
    abstract Update():void;
    constructor( camera:GameCamera,ctrler:BaseGameCameraCtrler = null )
    {
        if(ctrler == null)
        {
           ctrler = this; 
        }
        this.Camera = camera;
        this.Ctrler = ctrler;
    }
}

class GameCameraCtrler extends BaseGameCameraCtrler
{
    Update()
    {
        if(this.Camera==null|| this.Camera.Player == null)
        {
            return;
        }
        
        var CameraPS = this.Camera.DynamicPS;
        var PlayerPS = this.Camera.Player._LogicPosition;
        CameraPS.x = 0;
        var disNum = PlayerPS.y - CameraPS.y;
        var disZNum = PlayerPS.z - CameraPS.z;
        if(Math.abs(disNum)>0.01)
        {
            CameraPS.y += disNum*0.1;
        }
        if( Math.abs(disZNum)>0.01)
        {
            CameraPS.z += disZNum*0.1;
        }

        this.Camera.DynamicPS =CameraPS;
        this.Camera.CountSetPS();
    }

    constructor(camera:GameCamera,ctrler:BaseGameCameraCtrler = null)
    {
        super(camera,ctrler);
    }
}


