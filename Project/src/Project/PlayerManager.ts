class PlayerManager
{
    private static _Mgr:PlayerManager;
    static get Mgr():PlayerManager
    {
        if(PlayerManager._Mgr ==null)
        {
            PlayerManager._Mgr = new PlayerManager();
        }
        return PlayerManager._Mgr;
    }

    _PlayerData:PlayerData;
    
    get PlayerData():PlayerData
    {
        return this._PlayerData;
    }

    set PlayerData(value:PlayerData)
    {
        this._PlayerData = value;
    }
    
    private constructor()
    {
        this._PlayerData = new PlayerData();
    }
}

class PlayerData
{
    Idx:number;
    Coin:number;
}