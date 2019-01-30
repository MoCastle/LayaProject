class GameControler
{
    private static _Mgr:GameControler
    static get Mgr():GameControler
    {
        if(GameControler._Mgr == null)
        {
            GameControler._Mgr = new GameControler();
        }
        return GameControler._Mgr;
    }
    
    SetPlayerID(id:number)
    {
        console.debug("Selected"+id);
    }

    //显示设置面板
    ShowSetPanel()
    {
        var Panel = APP.UIManager.Show<SetPanelUI>(SetPanelUI);// new SetPanel();
    }

    //显示角色面板
    ShowCharacterPanel()
    {
         var character = APP.UIManager.Show<CharacterUI>(CharacterUI);
    }

    private _SetInfo;
    get SetInfo():SetInfo
    {
        if(this._SetInfo == null)
        {
            this._SetInfo = new SetInfo();
        }
        return this._SetInfo;
    }
    
    set SetInfo(value:SetInfo)
    {
        this._SetInfo = value;
    }

    //保存设置数据
    SaveSetInfo(info:SetInfo)
    {
        this.SetInfo = info;
    }

    //读取设置信息
    GetSetInfo():SetInfo
    {
        return this.SetInfo;
    }

    EnterGameUI():void
    {
        APP.GameManager.EnterScene();
    }
    EnterGame():void
    {
        APP.GameManager.EnterScene();
    }

    private constructor()
    {
    }
}

class SetInfo
{
    AudioOn:boolean;
    OPIsRight:boolean;
    TextInfo:string;
    constructor()
    {
        this.AudioOn = true;
        this.OPIsRight = true;
        this.TextInfo = "Hello \n Hello";
    }
}