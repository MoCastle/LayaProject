import {MessageMD} from "./../FrameWork/MessageCenter"
import UIManager from "./../FrameWork/UIManager"
import SceneMgr from "./../FrameWork/SceneManager" 
import FW from "./../FrameWork/FrameWork"

export default class APP
{
    private static _Message:MessageMD.MessageCenter;
    static get MessageManager():MessageMD.MessageCenter
    {
        if(APP._Message== null)
        {
            APP._Message = FW.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }
        return APP._Message;
    }

    private static _UIManager:UIManager;
    static get UIManager():UIManager
    {
        if(APP._UIManager== null)
        {
            APP._UIManager = FW.FM.GetManager<UIManager>(UIManager);
        }
        return APP._UIManager;
    }
    private static _SceneMgr:SceneMgr;
    static get SceneManager():SceneMgr
    {
        if(APP._SceneMgr== null)
        {
            APP._SceneMgr = FW.FM.GetManager<SceneMgr>(SceneMgr);
        }
        return APP._SceneMgr;
    }
    
}

