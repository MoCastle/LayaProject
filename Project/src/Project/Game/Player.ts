var num:number = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
class Player extends Laya.Sprite3D
{
    set CurStep(step:Step)
    {
        this._CurStep = step;
    }
    get CurStep():Step
    {
        return this._CurStep;
    }
    BaseCtrler:PlayerNormCtrler;
    BuffArr:Array<BasePlayerBuff>;
    //zerg
    IdNumber:number;
    GetBuff(idx:number):BasePlayerBuff
    {
        return (this.BuffArr[idx] !=null&&this.BuffArr[idx]!=undefined)?this.BuffArr[idx]:null;
    }
    //摆放角色
    SetStep(putStep:Step):void
    {
        this.CurStep = putStep;
        var newPS = putStep.Position.clone();
        newPS.y += GameManager.StepLength;
        this.Position = newPS;
        this._LogicPosition = putStep.Position;
        this.TouchGround();
    }
    set Position( newPS:Laya.Vector3 )
    {
        var newPS:Laya.Vector3 = newPS.clone();
        this.transform.position = newPS;
    }
    get Position():Laya.Vector3
    {
        return this.transform.position.clone();
    }
    get LogicPosition():Laya.Vector3
    {
        return this._LogicPosition;
    }

    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    LayStep(step:Step):void
    {
        this.CurStep = step;
        this._LogicPosition = step.Position;
    }

    //触发台阶
    TouchGround():void
    {
        //踩空是无药可救的
        if(this.CurStep.IsEmpty)
        {
            APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
            return;
        }
        this.CurStep.StepItem.TouchItem(this);
    }
    
    /**
     * 移动
     * @param {Laya.Vector3} vector 移动向量值
     */
    Translate( vector:Laya.Vector3 ):void
    {
        this.transform.translate(vector);
        Laya.Vector3.add(this._LogicPosition,vector,this._LogicPosition);
    }

    /**
     * 添加玩家控制器
     * @param newCtrler 新玩家控制器
     */
    AddCtrler(newCtrler:BasePlayerCtrler ):void
    {
        var ctrler:BasePlayerCtrler = this._Ctrler;
        this._Ctrler = newCtrler;
        newCtrler.NextCtrl =ctrler;
        newCtrler.SetPlayer(this);
    }

    /**
     * 移交控制器
     */
    PopCtrler():void
    {
        this._Ctrler = this._Ctrler.NextCtrl;
    }
    /**
     * 添加BUFF
     * @param buff 
     * @param index 
     */
    AddBuff(buff:BasePlayerBuff):boolean
    {
        var index:number = buff.Idx;
        if(this.BuffArr[index]!=null||this.BuffArr[index]!=undefined)
        {
            return false;
        }
        this.BuffArr[index] = buff;
        buff.Idx = index;
        buff.Start(this);
        return true;
    }
    /**
     * 添加BUFF模型
     * @param mod 
     */
    AddBuffMode( mod:Laya.Sprite3D )
    {
        if(mod!=null)
        {
            this._BuffNode.addChild(mod);
        }
    }
    /**
     * 结束BUFF
     */
    CompleteBuff(index:number)
    {
        var buff:BasePlayerBuff = this.BuffArr[index];
        this.BuffArr[index]=null;
        if(buff==null||buff==undefined )
        {
            return;
        }
    }
    //私有属性
    _LogicPosition:Laya.Vector3;
    _BuffNode:Laya.Sprite3D;
    _PlayerModel:Laya.Sprite3D;
    _CurStep:Step;
    constructor()
    {
        super();
        this._PlayerModel = Laya.MeshSprite3D.load("http://www.gsjgame.com/Resource/LayaScene_child_01/child_01.lh");
        var secondPlayer:Laya.Sprite3D = Laya.Sprite3D.instantiate(this._PlayerModel, this, false, new Laya.Vector3(0, 0, 0));
        GameManager.Mgr.CurScene.PutObj(this);
        //添加自定义模型
        secondPlayer.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        var material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        this.on(Laya.Event.REMOVED,this,()=>{ this.destroy() })
        this.Reset();
    }
    Reset()
    {
        this.CurStep = null;
        if(this._BuffNode)
            this._BuffNode.destroy();
        this._BuffNode = new Laya.Sprite3D();
        this.addChild(this._BuffNode);
        this.BuffArr = new Array();
        this.BaseCtrler = new PlayerNormCtrler(this);
        this._Ctrler = this.BaseCtrler;
        this._LogicPosition = new Laya.Vector3(0,0);
        this.frameLoop(1,this,this._Update);
    }
    private _Ctrler:BasePlayerCtrler;

    _Update():void
    {
        this._Ctrler.Update();
        for( var buffIdx:number = 0;buffIdx<2;++buffIdx )
        {
            if(this.BuffArr[buffIdx]!=null||this.BuffArr[buffIdx]!=undefined)
                this.BuffArr[buffIdx].Update();
        }
    }
}

class BasePlayerBuff
{
    Type:ItemType;
    Idx:number;
    Player:Player;
    Update()
    {
    }
    GenBuffMod()
    {
        this._BuffMod = new Laya.MeshSprite3D(new Laya.SphereMesh(0.3,8,8));
    }
    Start(player:Player)
    {
        this.Player = player;
        //创建模型显示对象
        this.Player.AddBuffMode(this._BuffMod);
        if(this._StartFunc!=null)
        {
            this._StartFunc();
        }
    }

    Complete()
    {
        this.Player.CompleteBuff(this.Idx);
        this._BuffMod.destroy();
    }
    //
    protected _BuffMod:Laya.Sprite3D;
    constructor(type:ItemType,idx:number = 0)
    {
        this.Type = type;
        this.Idx = idx;
        this.GenBuffMod();
    }
    private _StartFunc:()=>void;
}

abstract class BasePlayerCtrler
{
    //公共接口
    NextCtrl:BasePlayerCtrler;
    player:Player;
    
    Update():void
    {
        this._Update();
    }
    SetPlayer(player:Player):void
    {
        this.player = player;
    }

    constructor( player:Player, ctrler:BasePlayerCtrler = null )
    {
        if(ctrler == null)
        {
            ctrler = this;
        }
        this.NextCtrl = ctrler;
        this.player = player;
    }
    protected abstract _Update():void;
}

//用于角色正常状态下的移动
class PlayerNormCtrler extends BasePlayerCtrler
{
    Time:number;
    StartMove()
    {
        this.Time = APP.SceneManager.CurScene.CurDir.GameTime + PlayerMoveTime;
    }
    constructor(player:Player = null)
    {
        super(player)
        this.Time = -1;
    }
    protected _Update():void
    {
        if(this.Time>0)
        {
            if(this.Time<=APP.SceneManager.CurScene.CurDir.GameTime)
            {
                this.Time = -1;
                this.player.SetStep(this.player.CurStep);
                return;
            }
            else
            {
                var lastTime = this.Time-Laya.timer.currTimer;
                var rate = (1-lastTime/ PlayerMoveTime);
                var StepPs:Laya.Vector3 = this.player.CurStep.Position;
                StepPs.y +=GameManager.StepLength;
                var curps:Laya.Vector3 = this.player.Position;
                curps.y +=GameManager.StepLength;
                var newPs = new Laya.Vector3();
                newPs.x = (StepPs.x - curps.x)*rate+ curps.x;
                newPs.y = (StepPs.y - curps.y)*rate+curps.y;
                newPs.z = (StepPs.z - curps.z)*rate+curps.z;

                this.player.Position = newPs;
            }
        }else
        {
            this.player.TouchGround();
        }
    }
}

//玩家飞行
class PlayerFly extends BasePlayerCtrler
{
    Speed:number;
    /**
     * 设置玩家
     * @param player 操控角色
     */
    SetPlayer(player:Player)
    {
        super.SetPlayer(player);
    }

    //
    private _FinalLocation:MLocation;
    private _FinalZ:number;    
    constructor(speed:number)
    {
        super(null);
        this.Speed = speed;
    }

    protected _Update():void
    {
        if(this.player == null)
        {
            return;
        }
        var vector = new Laya.Vector3(0,GameManager.StepLength,-GameManager.StepDistance/2);
        Laya.Vector3.scale(vector,this.Speed,vector);
        this.player.Translate(vector);
    }
}

//游戏中相机
class GameCamera extends Laya.Camera
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




