import Player from "./Player"
import { path } from "./../Utility/Path"
import { BaseFunc } from "../Base/BaseFunc";
import BGUI from "../ui/BG";
//游戏中相机
export default class GameCamera extends Laya.Camera {
    Ctrler: BaseGameCameraCtrler;
    BasePS: Laya.Vector3;
    DynamicPS: Laya.Vector3;
    Player: Player;
    private m_CountPS: BaseFunc.SmoothDamp;

    set Position(ps: Laya.Vector3)  {
        this.transform.position = ps.clone();
    }
    get Position(): Laya.Vector3  {
        return this.transform.position.clone();
    }

    constructor()  {
        super();
        this.orthographic = true;
        this.Ctrler = new GameCameraCtrler(this);
        this.Player = null;
        //this.timerLoop(1,this.Ctrler,this.Ctrler.Update);
        this.frameLoop(1, this, this._Update);
        this.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        this.m_CountPS = new BaseFunc.SmoothDamp(1,1000)
        this.on(Laya.Event.REMOVED, this, () => { this.destroy() })
    }
    
    Init()
    {
        this.DynamicPS = this.transform.position.clone();
        this.BasePS = new Laya.Vector3();
    }

    SetPlaer(player: Player)  {
        this.Player = player;
    }

    Reset(DynamicPS: Laya.Vector3, basePS: Laya.Vector3, player: Player)  {
        this.Player = player;
        this.BasePS = basePS;
        this.DynamicPS = DynamicPS;
    }

    //计算并设置位置
    CountSetPS()  {
        var newPS = this.transform.position.clone();
        Laya.Vector3.add(this.BasePS, this.DynamicPS, newPS);
        var scale = this.m_CountPS.SmoothDamp(0, Laya.Vector3.distance(this.transform.position, newPS))
        //this.transform.position = newPS;
        Laya.Vector3.lerp(this.transform.position, newPS, scale, newPS)
        this.transform.position = newPS; //this.m_CountPS.Count(this.transform.position,newPS) //newPS;
    }

    private _Update()  {
        this.Ctrler.Update();
        //this.fieldOfView
    }
}

abstract class BaseGameCameraCtrler {
    Camera: GameCamera;
    Ctrler: BaseGameCameraCtrler;
    abstract Update(): void;
    constructor(camera: GameCamera, ctrler: BaseGameCameraCtrler = null)  {
        if (ctrler == null)  {
            ctrler = this;
        }
        this.Camera = camera;
        this.Ctrler = ctrler;
    }
}

class GameCameraCtrler extends BaseGameCameraCtrler {
    constructor(camera: GameCamera, ctrler: BaseGameCameraCtrler = null)  {
        super(camera, ctrler);
    }

    OnDestory() {
        var a = 1;
    }

    Update()  {
        if (this.Camera == null || this.Camera.Player == null)  {
            return;
        }
        /*
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
        */
        var CameraPS = this.Camera.DynamicPS;
        var PlayerPS = this.Camera.Player.m_LogicPosition;
        CameraPS.x = 0;
        var disNum = PlayerPS.y - CameraPS.y;
        var disZNum = PlayerPS.z - CameraPS.z;
        var disHum = PlayerPS.x - CameraPS.x;
        if (Math.abs(disNum) > 0.01)  {
            CameraPS.y += disNum;
        }
        if (Math.abs(disZNum) > 0.01)  {
            CameraPS.z += disZNum;
        }
        if (Math.abs(disHum) > 0.01)  {
            CameraPS.x += disHum;
        }
        this.Camera.DynamicPS = CameraPS;
        this.Camera.CountSetPS();
        if(BGUI.mgrBGUI) {
            BGUI.mgrBGUI.UpdateBgPos(this.Camera.transform.position.x, this.Camera.transform.position.y);
        }
    }
}


