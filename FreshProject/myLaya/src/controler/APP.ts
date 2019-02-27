import {MessageMD} from "./../FrameWork/MessageCenter"
import {Item} from "./../Game/GameItem"
import {GameStruct} from "./../Game/GameStruct"
import UIManager from "./../FrameWork/UIManager"
import SceneMgr from "./../FrameWork/SceneManager" 
import FW from "./../FrameWork/FrameWork"
import SetPanelUI from "./../ui/SetPanelUI"
import CharacterUI from "./../ui/CharacterUI"
import GameScene from "./../Scene/GameScene"
import GameDirector from "./../Scene/GameDirector"

export default class APP
{
    private static _Message:MessageMD.MessageCenter;
    static get MessageManager():MessageMD.MessageCenter
    {
        if(APP._Message== null)
        {
            APP._Message = FW.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }
        return APP._Message;
    }

    private static _UIManager:UIManager;
    static get UIManager():UIManager
    {
        if(APP._UIManager== null)
        {
            APP._UIManager = FW.FM.GetManager<UIManager>(UIManager);
        }
        return APP._UIManager;
    }
    private static _SceneMgr:SceneMgr;
    static get SceneManager():SceneMgr
    {
        if(APP._SceneMgr== null)
        {
            APP._SceneMgr = FW.FM.GetManager<SceneMgr>(SceneMgr);
        }
        return APP._SceneMgr;
    }
    static get GameManager(): GameManager {
        return GameManager.Mgr;
    }
    static get GameControler():GameControler
    {
        return  GameControler.Mgr;
    }
}

type ItemType = Item.ItemType;

class GameControler {
    private static _Mgr: GameControler;
    UIManager: UIManager;
    private constructor() {
        this.UIManager = FW.FM.GetManager<UIManager>(UIManager);
    }

    static get Mgr(): GameControler {
        if (GameControler._Mgr == null) {
            GameControler._Mgr = new GameControler();
        }
        return GameControler._Mgr;
    }

    SetPlayerID(id: number) {
        console.debug("Selected" + id);
    }

    //显示设置面板
    ShowSetPanel() {
        var Panel = this.UIManager.Show<SetPanelUI>(SetPanelUI);// new SetPanel();
    }

    //显示角色面板
    public ShowCharacterPanel() {
        var character = this.UIManager.Show<CharacterUI>(CharacterUI);
    }

    private _SetInfo;
    get SetInfo(): GameStruct.SetInfo {
        if (this._SetInfo == null) {
            this._SetInfo = new GameStruct.SetInfo();
        }
        return this._SetInfo;
    }

    set SetInfo(value: GameStruct.SetInfo) {
        this._SetInfo = value;
    }

    //保存设置数据
    SaveSetInfo(info: GameStruct.SetInfo) {
        this.SetInfo = info;
    }

    //读取设置信息
    GetSetInfo(): GameStruct.SetInfo {
        return this.SetInfo;
    }

    EnterGameUI(): void {
        GameManager.Mgr.EnterScene();
    }
    EnterGame(): void {
        GameManager.Mgr.EnterScene();
    }

}

//游戏玩法管理
export class GameManager {
    //常量定义
    //每行最大格子数
    get LineStepNum(): number
    {
        return 5 + 2;
    } 
    //最大行数
    get MaxLineNum(): number
    {
        return 13;
    } 
    //格子边长
    get StepLength(): number {
        return 0.98;
    }
    //格子斜对角长度
    get StepDistance(): number {
        return Math.sqrt((this.StepLength * this.StepLength) * 2);
    }
    //玩家移动时间
    get PlayerMoveTime(): number {
        return 0.02 * 10000;;
    }

    //对外接口
    private static _Mgr: GameManager;
    static get Mgr(): GameManager {
        if (GameManager._Mgr == null) {
            GameManager._Mgr = new GameManager();
        }
        return GameManager._Mgr;
    }
    //内部功能
    constructor() {
        this.SceneMgr = APP.SceneManager;
    }
    SceneMgr: SceneMgr;

    CurScene: GameScene;
    get GameDir(): GameDirector {
        return this.CurScene.GameDir;
    }
    //进入游戏场景走这个接口
    EnterScene(): void {
        var newGameScene = new GameScene();
        this.SceneMgr.EnterScene(newGameScene);
        this.CurScene = newGameScene;
    }

    //生成BUFF表现效果
    GenBuffEffect(type: ItemType): Laya.Sprite3D {
        return new Laya.Sprite3D();
    }
}