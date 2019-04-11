import BaseScene from "./../Scene/BaseScene"
import BaseDirector from "./../Scene/BaseDirector"
import BaseManager from "./../FrameWork/BaseManager"
import {FSM} from "./../Base/FSM"
import {Scene} from "./../Scene/Scene"

export default class SceneManager extends BaseManager {
    private m_SceneFSM: Scene.SceneFSM;
    private m_SceneNode: Laya.Node;
    
    get CurScene():Scene.BaseScene {
        if(this.m_SceneFSM.CurState)
            return this.m_SceneFSM.CurState;
        return null;
    }
    get CurDir():Scene.BaseDirector
    {
        return this.CurScene.Director;
    }
    static Name(): string {
        return "SceneManager";
    }

    constructor() {
        super();
        this._BGLayer = new Laya.Sprite();
        Laya.stage.addChild(this._BGLayer);

        this.m_SceneFSM = new Scene.SceneFSM();
        this.m_SceneNode = Laya.stage.addChild(new Laya.Sprite());
    }

    public ChangeScene(newScene: Scene.BaseScene)  {
        this.m_SceneFSM.ChangeState(newScene);
        if(newScene.SceneObj)
        {
            this.m_SceneNode.addChild(newScene.SceneObj);
        }
    }
    
    public Update(): void {
        if (this.CurScene)
            this.CurScene.Update();
    }

    //旧逻辑
    private _BG: Laya.Sprite;
    private _BGLayer: Laya.Sprite;
    
    set BG(bg: Laya.Sprite) {
        if (!bg) {
            return;
        }
        if (this._BG) {
            this._BG.removeSelf;
            this._BG.destroy();
            this._BG = bg;
        }
        this._BG = bg;
        this._BG.width = Laya.stage.width;
        this._BG.height = Laya.stage.height;
        this._BGLayer.addChild(this._BG);
    }
    get BG():Laya.Sprite
    {
        return  this._BG;
    }
}

/**作者Mo
* 场景功能
*/
/*
//场景管理
export default class SceneManager extends BaseManager {
    private _BG: Laya.Sprite;
    private _BGLayer: Laya.Sprite;
    constructor() {
        super();
        this.CurScene = null;
        this._BGLayer = new Laya.Sprite();
        Laya.stage.addChild(this._BGLayer);
        //添加场景管理
        this.SceneNode = Laya.stage.addChild(new Laya.Sprite());
    }
    set BG(bg: Laya.Sprite) {
        if (!bg) {
            return;
        }
        if (this._BG) {
            this._BG.removeSelf;
            this._BG.destroy();
            this._BG = bg;
        }
        this._BG = bg;
        this._BG.width = Laya.stage.width;
        this._BG.height = Laya.stage.height;
        this._BGLayer.addChild(this._BG);
    }
    get BG():Laya.Sprite
    {
        return  this._BG;
    }
    SceneNode: Laya.Node;

    static Name(): string {
        return "SceneManager";
    }

    private _CurScene: BaseScene;
    get CurScene(): BaseScene {
        return this._CurScene;
    }
    set CurScene(value: BaseScene) {
        if (this._CurScene && this._CurScene.Scene) {
            this._CurScene.Scene.removeSelf();
        }
        this._CurScene = value;
        if (this._CurScene && this._CurScene.Scene) {
            this.SceneNode.addChild(this._CurScene.Scene);
        }
    }
    get CurDir(): BaseDirector {
        return this._CurScene.CurDir;
    }

    EnterScene(targetScene: BaseScene): void {
        if (this.CurScene == null)
            this.CurScene = targetScene;
        else
            this.CurScene.Leave(targetScene);
    }

    Update(): void {
        if (this.CurScene != null)
            this.CurScene.Update();
    }
}

*/