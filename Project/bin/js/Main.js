/**
 * 作者:Mo
 * 启动场景
 */
var Game = /** @class */ (function () {
    function Game() {
        Laya.MiniAdpter.init();
        Laya3D.init(320, 568, true);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //开启统计信息
        Laya.Stat.show();
        this.SceneMgr = SceneManager.Mgr;
        SceneManager.Mgr.EnterScene(new LoadScene());
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Game.prototype.Update = function () {
        this.SceneMgr.Update();
    };
    return Game;
}());
var GM = new Game();
//# sourceMappingURL=Main.js.map