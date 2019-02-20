/**
 * 作者:Mo
 * 启动场景
 */
class Game
{
    SceneMgr:SceneManager;
    constructor()
    {
       
        Laya.MiniAdpter.init();
        Laya3D.init(320, 568, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //开启统计信息
        Laya.Stat.show();
        
        this.SceneMgr = SceneManager.Mgr;
        SceneManager.Mgr.EnterScene(new LoadScene());
        Laya.timer.frameLoop(1,this,this.Update);
    }

    Update( )
    {
        this.SceneMgr.Update();
    }
}
var GM = new Game();
