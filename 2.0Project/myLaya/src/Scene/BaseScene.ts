import FW from "./../FrameWork/FrameWork"
import UIManager from "./../FrameWork/UIManager"
import SceneManager from "./../FrameWork/SceneManager"
import BaseDirector from "./BaseDirector"
import LifeObj from "./../Base/LifeObj"
import { Enum } from "./../Base/LifeObj"
import { MessageMD } from "./../FrameWork/MessageCenter"
import APP from "./../controler/APP"
//场景基类
export default abstract class BaseScene extends LifeObj {
    //外部接口
    CurDir: BaseDirector;
    IsLoadComplete: boolean;
    Scene: Laya.Scene3D;

    //结束场景
    Leave(nextStage: BaseScene): void  {
        this._NextScene = nextStage;
        this._Leave();
    }

    //开始场景
    Start(): void  {
        this._Start();
    }
    //放对象
    PutObj(node: Laya.Sprite3D): void  {
        if (node == null)  {
            console.log("BaseScene PutObj Error:empty Sprite3D");
        }
        this.Scene.addChild(node);
    }

    //内部功能
    protected _NextScene: BaseScene;//下一个场景
    protected _LoadCallBack: () => void;
    protected _UIManager: UIManager;
    protected _MessageMgr: MessageMD.MessageCenter;

    constructor()  {
        super();
        this.CurDir = null;
        this.Scene = null;
        this._UIManager = FW.FM.GetManager<UIManager>(UIManager);
        this._MessageMgr = FW.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        this._LoadCallBack = null;
        this._NextScene = null;
    }

    protected _Leaving()  {
        this._UIManager.Clear();

        if (this.CurDir.ObjState == Enum.LifeObjState.Ended)  {
            super._Leaveing();
        }
    }

    protected _LeaveComplete()  {
        super._LeaveComplete();
        if (this.Scene)  {
            this.Scene.removeSelf();
            while (this.Scene.numChildren)  {
                var actor = this.Scene.getChildAt(0);
                actor.removeSelf();
            }
        }
        this._UIManager.Clear();
        //APP.SceneManager.CurScene = this._NextScene;
        //zerg 场景不知道会不会内存泄漏
    }

    protected _Update()  {
        if (this.CurDir != null)
            this.CurDir.Update();
    }

    protected abstract _GenDir(): void;

    protected _LoadComplete()  {
        this.IsLoadComplete = true;
        if (this._LoadCallBack != null)  {
            this._LoadCallBack();
            this._LoadCallBack = null;
        }
    }

    protected _Start()  {
        super._Start();
        if (this.Scene)  {
            //APP.SceneManager.CurScene = this;
        }
    }
    protected _Starting()  {
        super._Starting();
    }
    protected _StartComplete()  {
        this._UIManager.Clear();

        this._GenDir();
        super._StartComplete();
    }
}

