/**作者:Mo
 * 场景UI
 */
class GameUI extends BaseUI
{
    GamePanelUI:ui.GameSceneUI;
    
    constructor()
    {
        super();
        this.GamePanelUI = new ui.GameSceneUI();
        this.addChild(this.GamePanelUI);
    }

}