import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"

class LevelManager extends GameManager.BaseManager
{
    constructor() {
        super("LevelInfo");
    }
    protected GenInfo(data): GameManager.BaseInfo
    {
        return new LevelInfo(data);
    }
}

class LevelInfo extends GameManager.BaseInfo
{
    constructor( data:any )
    {
        super(data);
        
    }
}