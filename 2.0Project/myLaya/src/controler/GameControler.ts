import {Item} from "./../Game/GameItem"
import {GameStruct} from "./../Game/GameStruct"
import PlayerGuestDelegate from "./../Agent/PlayerGuestAgent"
import SetPanelUI from "./../ui/SetPanelUI"
import RankPanelUI from "./../ui/RankPanelUI"
import CharacterUI from "./../ui/CharacterUI"
import GameScene from "./../Scene/GameScene"
import GameDirector from "./../Scene/GameDirector"
import APP from "./APP"
import PlayerGuestAgent from "./../Agent/PlayerGuestAgent";

type ItemType = Item.ItemType;
export default class Controler
{
    static get GameControler():GameControler
    {
        return  GameControler.Mgr;
    }
}

class GameControler {
    private static _Mgr: GameControler;
    private constructor() {
    }

    static get Mgr(): GameControler {
        if (GameControler._Mgr == null) {
            GameControler._Mgr = new GameControler();
        }
        return GameControler._Mgr;
    }
    _LineStepNum:number;
    _MaxLineNum:number;
    _StepLength:number;
    _StepDistance:number;
    _PlayerMoveTime:number;
    //常量定义
    //每行最大格子数
    get LineStepNum(): number
    {
        if(!this._LineStepNum)
        {
            this._LineStepNum = 5+2;
        }
        return this._LineStepNum;
    } 
    //最大行数
    get MaxLineNum(): number
    {
        if(!this._MaxLineNum)
        {
            this._MaxLineNum = 10;
        }
        return this._MaxLineNum;
    } 
    //格子边长
    get StepLength(): number {
        if(!this._StepLength)
        {
            this._StepLength = 0.98;
        }
        return this._StepLength;
    }
    
    //格子边长
    get StepYLength(): number {
        if(!this._StepLength)
        {
            this._StepLength = 0.88;
        }
        return this._StepLength;
    }

    //格子斜对角长度
    get StepDistance(): number {
        if(!this._StepDistance)
        {
            this._StepDistance = Math.sqrt((this.StepLength * this.StepLength) * 2);
        }
        return this._StepDistance;
    }
    //玩家移动时间
    get PlayerMoveTime(): number {
        if(!this._PlayerMoveTime)
        {
            this._PlayerMoveTime = 0.10 * 10000;
        }
        return this._PlayerMoveTime;
    }

    SetPlayerID(id: number) {
        var guestAgent:PlayerGuestAgent = PlayerGuestDelegate.GuestAgent;
        var characterList:Array<number> = guestAgent.CharacterList;
        if(!characterList[id])
        {
            if(!guestAgent.BuyCharacter(id))
            {
                return;
            }
        }
        guestAgent.SetCharacter(id);
    }

    //显示设置面板
    ShowSetPanel() {
        var Panel = APP.UIManager.Show<SetPanelUI>(SetPanelUI);// new SetPanel();
    }
    
    //显示排行榜面板
    ShowRankPanel() {
        // if(!Laya.Browser.onWeiXin || typeof wx == "undefined") {
        //     return;
        // }
        var Panel = APP.UIManager.Show<RankPanelUI>(RankPanelUI);// new SetPanel();
    }
    
    //显示角色面板
    public ShowCharacterPanel() {
        var character = APP.UIManager.Show<CharacterUI>(CharacterUI);
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
        this.EnterScene();
    }
    EnterGame(): void {
        this.EnterScene();
    }
    get GameDir(): GameDirector {
        return APP.SceneManager.CurScene.Director as GameDirector;
    }
    //进入游戏场景走这个接口
    EnterScene(): void {
        var newGameScene = new GameScene();
        APP.SceneManager.ChangeScene(newGameScene);
    }

    //生成BUFF表现效果
    GenBuffEffect(type: ItemType): Laya.Sprite3D {
        return new Laya.Sprite3D();
    }

    BuyItem(id:number):void
    {
        PlayerGuestAgent.GuestAgent.BuyItem(id);
    }
}
