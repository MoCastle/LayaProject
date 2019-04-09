import Player from "./Player"
import APP from "./../controler/APP"
import { GameStruct } from "./GameStruct";
import Controler from "./../controler/GameControler"
export module PlayerControler
{
    export abstract class BasePlayerCtrler
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
    export class PlayerNormCtrler extends BasePlayerCtrler
    {
        Time:number;
        IsFalling:boolean;
        StartMove()
        {
            this.Time = APP.SceneManager.CurScene.Director.GameTime + Controler.GameControler.PlayerMoveTime;
            this.IsFalling = false;
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
                if(this.Time<=APP.SceneManager.CurScene.Director.GameTime)
                {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    return;
                }
                else
                {
                    var lastTime = this.Time-Laya.timer.currTimer;

                    if( this.IsFalling = false && lastTime*2 > this.Time-Laya.timer.currTimer)
                    {
                        this.IsFalling = true;
                        this.player.JumpDown();
                    }

                    var rate = (1-lastTime/ Controler.GameControler.PlayerMoveTime);

                    var StepPs:Laya.Vector3 = this.player.CurStep.Position;
                    StepPs.y +=Controler.GameControler.StepLength;

                    var curps:Laya.Vector3 = this.player.Position;
                    curps.y += Controler.GameControler.StepLength;

                    var newPs = new Laya.Vector3();
                    newPs.x = (StepPs.x - curps.x)*rate + curps.x;
                    newPs.y = (StepPs.y - curps.y)*rate + curps.y;
                    newPs.z = (StepPs.z - curps.z)*rate + curps.z;
    
                    this.player.Position = newPs;
                }
            }else
            {
                this.player.TouchGround();
            }
        }
    }
    
    //玩家飞行
    export class PlayerFly extends BasePlayerCtrler
    {
        Speed:number;
        /**
         * 设置玩家
         * @param player 操控角色
         */
        SetPlayer(player:Player)
        {
            super.SetPlayer(player);
            player.Translate(new Laya.Vector3(0,Controler.GameControler.StepLength,0));
        }
    
        //
        private _FinalLocation:GameStruct.MLocation;
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
            //var vector = new Laya.Vector3(0,Controler.GameControler.StepLength,-1*Controler.GameControler.StepDistance/2);
           // Laya.Vector3.scale(vector,this.Speed,vector);
           var vector:Laya.Vector3 = new Laya.Vector3(0,0.146,-0.10394)
            this.player.Translate(vector);
        }
    }
}
