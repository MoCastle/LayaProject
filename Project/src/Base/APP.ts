class APP
{
    //消息中心
    static get MessageCenter():MessageCenter
    {
        return MessageCenter.Mgr;
    }
    static get GameManager():GameManager
    {
        return GameManager.Mgr;
    }
    static get UIManager():UIManager
    {
        return UIManager.Mgr;
    }
    static get SceneManager():SceneManager
    {
        return SceneManager.Mgr;
    }
}

class StageAPP
{
    static get GameManager():GameManager
    {
        return GameManager.Mgr;
    }
    static get GuiderManager():GuiderManager
    {
        return GuiderManager.Mgr;
    }
}