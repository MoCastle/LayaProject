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
import {Scene} from "./../Scene/Scene"
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
export default class GameScene extends Scene.BaseScene
{
    ModelLoad:boolean;
    GameDir:GameDirector;
    protected GenDirector():GameDirector
    {
        return new GameDirector();
    }

    //内部功能
    constructor()
    {
        super();
        this.m_SceneObj = new Laya.Scene3D;
    }
    
}
