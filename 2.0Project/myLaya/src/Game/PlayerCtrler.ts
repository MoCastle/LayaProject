import Player from "./Player"
import APP from "./../controler/APP"
import { GameStruct } from "./GameStruct";
import Controler from "./../controler/GameControler"
export module PlayerControler {
    export abstract class BasePlayerCtrler {
        //公共接口
        NextCtrl: BasePlayerCtrler;
        player: Player;

        Update(): void {
            this._Update();
        }
        SetPlayer(player: Player): void {
            this.player = player;
        }

        constructor(player: Player, ctrler: BasePlayerCtrler = null) {
            if (ctrler == null) {
                ctrler = this;
            }
            this.NextCtrl = ctrler;
            this.player = player;
        }
        protected abstract _Update(): void;
        public abstract OnStart(): void;
        public abstract OnComplete(): void;
    }

    //用于角色正常状态下的移动
    export class PlayerNormCtrler extends BasePlayerCtrler {
        private m_StartPS: Laya.Vector3;
        private m_TargetPS: Laya.Vector3;
        private get MiddlePS(): Laya.Vector3 {
            var midlePS: Laya.Vector3 = new Laya.Vector3();
            Laya.Vector3.lerp(this.m_StartPS, this.m_TargetPS, 0.5, midlePS);
            midlePS.y += Controler.GameControler.StepLength;
            return midlePS;
        }
        IsFalling: boolean;
        Time: number;
        get LastTime(): number {
            var lastTime: number = Controler.GameControler.PlayerMoveTime - (this.Time - APP.TimeManager.GameTime);
            return lastTime;
        }
        /**已消耗时间百分比 */
        get TimePercent(): number {
            return this.LastTime / Controler.GameControler.PlayerMoveTime;
        }

        constructor(player: Player = null) {
            super(player)
            this.Time = -1;
            this.IsFalling = true;
        }

        OnStart(): void  {
            this.Time = APP.TimeManager.GameTime + Controler.GameControler.PlayerMoveTime;
            this.IsFalling = true;
        }

        OnComplete(): void  {

        }

        StartMove() {
            this.Time = APP.TimeManager.GameTime + Controler.GameControler.PlayerMoveTime;
            this.IsFalling = false;
            this.m_StartPS = this.player.Position;
            this.m_TargetPS = this.player.CurStep.Position;
            this.m_TargetPS.y += Controler.GameControler.StepLength;
            var rotation: Laya.Quaternion = new Laya.Quaternion();
            var lookToPS = this.m_TargetPS.clone();
            lookToPS.y = this.m_StartPS.y;
            lookToPS.z = -lookToPS.z
            var upDir: Laya.Vector3 = new Laya.Vector3();
            upDir.y = 1;
            var startPS: Laya.Vector3 = this.m_StartPS.clone();
            startPS.z = -startPS.z;
            Laya.Quaternion.lookAt(startPS, lookToPS, upDir, rotation);
            this.player.FaceModelTo(rotation)
            
        }

        protected _Update(): void {
            if (this.Time > 0) {
                if (this.Time <= APP.TimeManager.GameTime) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    this.IsFalling = true;
                    return;
                }
                else {
                    var lastTime: number = this.LastTime;
                    var rate: number = this.TimePercent;
                    var moveTimeRate: number = 0;
                    var fallTimePoint: number = 0.4;
                    var startPS: Laya.Vector3;
                    var targetPS: Laya.Vector3;
                    if (rate > fallTimePoint) {
                        if (!this.IsFalling) {
                            this.IsFalling = true;
                            this.player.JumpDown();
                            this.player.TouchGround();
                        }
                        moveTimeRate = (rate - fallTimePoint) / (1 - fallTimePoint);
                        targetPS = this.m_TargetPS;
                        startPS = this.MiddlePS;
                    } else {
                        moveTimeRate = rate / fallTimePoint;
                        targetPS = this.MiddlePS;
                        startPS = this.m_StartPS;
                    }
                    if (this.player.PlayerDeath)
                        return;
                    var newPs = new Laya.Vector3();
                    Laya.Vector3.lerp(startPS, targetPS, moveTimeRate, newPs);
                    this.player.Position = newPs;
                }
            } else {
                this.player.TouchGround();
            }
        }
    }

    //玩家飞行
    export class PlayerFly extends BasePlayerCtrler {
        Speed: number;
        /**
         * 设置玩家
         * @param player 操控角色
         */
        SetPlayer(player: Player) {
            super.SetPlayer(player);
            player.Translate(new Laya.Vector3(0, Controler.GameControler.StepLength, 0));
            player.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
            player.ModelRotateEular(new Laya.Vector3(0, 180, 0));
        }

        //
        private _FinalLocation: GameStruct.MLocation;
        private _FinalZ: number;
        constructor(speed: number) {
            super(null);
            this.Speed = speed;
        }

        protected _Update(): void {
            if (this.player == null) {
                return;
            }
            //var vector = new Laya.Vector3(0,Controler.GameControler.StepLength,-1*Controler.GameControler.StepDistance/2);
            // Laya.Vector3.scale(vector,this.Speed,vector);
            var vector: Laya.Vector3 = new Laya.Vector3(0, 0.146, -0.10394)
            this.player.Translate(vector);
        }

        public OnComplete(): void  { }
        public OnStart(): void  { 
            Controler.GameControler.GameDir.GamePlay.gameMap.SetNextFlpprDirSwitch(this.player.CurStep.Floor.rightSwitch);
        }
    }
}
