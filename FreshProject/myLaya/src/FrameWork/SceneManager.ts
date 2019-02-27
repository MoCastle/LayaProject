import BaseScene from "./../Scene/BaseScene"
import BaseDirector from "./../Scene/BaseDirector"
import BaseManager from "./../FrameWork/BaseManager"
 /**作者Mo
 * 场景功能
 */
//场景管理
export default class SceneManager extends BaseManager
{
    static Name():string
    {
        return  "SceneManager";
    }
    protected static _Mgr:SceneManager;
    SceneCtrler:Laya.Node;
    
    private _CurScene:BaseScene;
    get CurScene():BaseScene
    {
        return this._CurScene;
    }
    set CurScene(value:BaseScene)
    {
        this._CurScene =value;
    }
    get CurDir():BaseDirector
    {
        return this._CurScene.CurDir;
    }

    constructor()
    {
        super();
        this.CurScene = null;
        //添加场景管理
        this.SceneCtrler = Laya.stage.addChild(new Laya.Sprite());
    }

    EnterScene(targetScene:BaseScene):void
    {
        if(this.CurScene == null)
            this.CurScene = targetScene;
        else
            this.CurScene.Leave(targetScene);
    }

    Update():void
    {
        if(this.CurScene!=null)
            this.CurScene.Update();
    }
}

