/*
作者:Mo
跳山羊场景核心功能
*/
import SceneManager from "./../FrameWork/SceneManager"
import BaseScene from "./BaseScene"
import BaseDirector from "./BaseDirector"
import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import EnterGameUI from "./../ui/EnterGameUI"
import EndGameUI from "./../ui/EndGameUI"
import {path} from "./../Utility/Path"
import {MessageMD} from "./../FrameWork/MessageCenter"
import GameCamera from "./../Game/GameCamera"
import Player from "./../Game/Player"
import {Input} from "./../Game/Input"
import {GameStruct} from "./../Game/GameStruct"
import GameUI from "./../ui/GameUI"
import MountLine from "./../Game/MountLine"
import {Item} from "./../Game/GameItem"
import Step from "./../Game/Step"
import GameDirector from "./GameDirector"
import APP from "./../controler/APP"
import Controler from "../controler/GameControler";
type ItemLayout = Item.ItemLayout;
type LineItemInfo = Item.LineItemInfo;
var ItemType = Item.ItemType;
//游戏场景
export default class GameScene extends BaseScene
{
    ModelLoad:boolean;
    GameDir:GameDirector;
    //对外接口
    StartLoad()
    {
        Laya.loader.load([path.GetDepathUIJS("PlayerList"),path.GetDepathUIJS("Game"),path.GetDepathUIJS("EndGame")],Laya.Handler.create(this,this._LoadComplete));
        super.StartLoad();
    }

    //内部功能
    constructor()
    {
        super();
    }
    
    protected _Start():void
    {
        super._Start();
    }

    protected _Update():void
    {
        super._Update();
    }

    protected _GenDir():void
    {
        this.GameDir = new GameDirector();
        this.CurDir = this.GameDir;

    }
    //离开时进行配置
    protected _Leave():void
    {
        this._MessageMgr.DesRgistIDK(MessageMD.GameEvent.PlayerDeath);
        super._Leave();
    }
    protected _LoadComplete()
    {
        this.Scene = new Laya.Scene3D();
        this.Scene.ambientColor = new Laya.Vector3(1,1,1)
        super._LoadComplete();
    }
}
