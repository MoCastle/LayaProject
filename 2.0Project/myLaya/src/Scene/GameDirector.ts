import {Scene} from "./Scene"
import { path } from "./../Utility/Path"
import { PlayerBuff } from "./../Game/Buff"
import {GameStruct} from "./../Game/GameStruct"
import GameScenePlay from "./ScenePlay/GameScenePlay"
import Controler from "./../controler/GameControler"

export default class GameDirector extends Scene.BaseDirector {
    public get GamePlay():GameScenePlay
    {
        return this.CurState as GameScenePlay;
    }
    constructor()  {
        super();
    }
    Start()
    {
        var loadList2D = [path.GetDepathUIJS("PlayerList"),path.GetDepathUIJS("Game"),path.GetDepathUIJS("EndGame")];
        this.ChangeState(new Scene.LoadSceneLogic(loadList2D,null,new GameScenePlay()));
    }
    public End()
    {
        
    }
    
}
