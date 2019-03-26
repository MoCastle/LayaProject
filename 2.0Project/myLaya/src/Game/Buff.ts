import {Item} from "./GameItem"
import {PlayerControler} from "./../Game/PlayerCtrler"
import { Input } from "./Input";
import { GameStruct } from "./GameStruct";
import Player from "./Player"
import APP from "./../controler/APP"
import Step from "./../Game/Step"
import Controler from "./../controler/GameControler"

export module PlayerBuff
{
    export class BasePlayerBuff
    {
        Type:Item.ItemType;
        Idx:number;
        Player:Player;
        Update()
        {
        }
        GenBuffMod()
        {
            this._BuffMod = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.3,8,8));
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
        constructor(type:Item.ItemType,idx:number = 0)
        {
            this.Type = type;
            this.Idx = idx;
            this.GenBuffMod();
        }
        private _StartFunc:()=>void;
    }
    class FlyBuff extends BasePlayerBuff
    {
        Speed:number;
        Floor:number;
        
        static get Idx():number
        {
            return 0;
        }
        Start(player:Player)
        {
            super.Start(player)
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y +=this.Floor;
            this._FinalZ = player.Position.z - Controler.GameControler.StepDistance/2*this.Floor;
            
            var flyCtrl = new PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player)
            player.AddCtrler(flyCtrl);
            Controler.GameControler.GameDir.AddInputCtrler(new Input.DIYInput());
            Controler.GameControler.GameDir.SetSafePS(this._FinalLocation);
        }
    
        private _FinalLocation:GameStruct.MLocation;
        private _FinalZ:number;   
        constructor(speed:number=0.1,floor:number=10)
        {
            super(Item.ItemType.Rope,ProtectBuff.Idx);
            this.Speed = speed;
            this.Floor = floor;
            this._FinalLocation = null;
            this._FinalZ = 0; 
            
        }
        Update()
        {
            if(this.Player == null)
            {
                return;
            }
            if(this._FinalZ - this.Player.Position.z>-0.2)
            {
                var step:Step = Controler.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
    
                Controler.GameControler.GameDir.PopInputCtrler();
                super.Complete();
            }
        }
    }
    class ProtectBuff extends BasePlayerBuff
    {
        Time:number;
        static get Idx():number
        {
            return 0;
        }
        constructor(time:number = 0)
        {
            super(Item.ItemType.Protect,ProtectBuff.Idx);
            this.Time = APP.SceneManager.CurDir.GameTime+time;
        }
        Update()
        {
            if(this.Time<APP.SceneManager.CurDir.GameTime)
            {
                this.Complete();
            }
        }
    }

    class VineBuff extends BasePlayerBuff
    {
        CountTime:number;
        InputDir:boolean;
        Start(player:Player)
        {
            super.Start(player)
            Controler.GameControler.GameDir.AddInputCtrler(new Input.DIYInput(this,this._Input));
        }
        Complete()
        {
            Controler.GameControler.GameDir.PopInputCtrler();
            super.Complete();
        }
        constructor(countTime:number = 3,inputDir:boolean = true)
        {
            super(Item.ItemType.Vine,0);
            this.CountTime = countTime;
            this.InputDir = inputDir;
            this._ShowGameInfo();
        }
        private _Time;
        private _Input(isRight:boolean)
        {
            if(this.InputDir == isRight)
            {
                this.InputDir =!this.InputDir;
                --this.CountTime;
            }
            if(this.CountTime<0)
            {
                this.Complete();
            }
            this._ShowGameInfo();
        }
        private _ShowGameInfo()
        {
            var info:string;
            if(this.CountTime<0)
                info = "";
            else
                info = this.InputDir == true?"Right":"Left";
            Controler.GameControler.GameDir.ShowInputInfo(info);
        }
    }
}


