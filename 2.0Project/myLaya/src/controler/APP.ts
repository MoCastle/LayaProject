import { MessageMD } from "./../FrameWork/MessageCenter"
import UIManager from "./../FrameWork/UIManager"
import SceneMgr from "./../FrameWork/SceneManager"
import FW from "./../FrameWork/FrameWork"
import TimeManager from "./../FrameWork/TimeManager"
import FrameWork from "./../FrameWork/FrameWork";
import { GameModule } from "../Game/GameModule";

export default class APP {
    private static g_SceneMgr: SceneMgr;
    private static g_TimeMgr: TimeManager;
    private static g_UIManager: UIManager;
    private static g_Message: MessageMD.MessageCenter;
    private static g_FrameWork:FrameWork;
    static get FrameWork():FrameWork
    {
        return this.g_FrameWork;
    }
    static get MessageManager(): MessageMD.MessageCenter  {
        return APP.g_Message;
    }
    static get UIManager(): UIManager  {
        if (APP.g_UIManager == null)  {
            APP.g_UIManager = FW.FM.GetManager<UIManager>(UIManager);
        }
        return APP.g_UIManager;
    }
    static get SceneManager(): SceneMgr  {
        if (APP.g_SceneMgr == null)  {
            APP.g_SceneMgr = FW.FM.GetManager<SceneMgr>(SceneMgr);
        }
        return APP.g_SceneMgr;
    }
    static get TimeManager(): TimeManager
    {
        if (APP.g_TimeMgr == null)  {
            APP.g_TimeMgr = FW.FM.GetManager<TimeManager>(TimeManager);
        }
        return APP.g_TimeMgr;
    }
    public static Init()
    {
        APP.g_FrameWork = FrameWork.FM;
        var fm:FrameWork  = APP.g_FrameWork;
        APP.g_Message = fm.AddManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        APP.g_SceneMgr =  fm.AddManager<SceneMgr>(SceneMgr);
        APP.g_TimeMgr = fm.AddManager<TimeManager>(TimeManager);
        APP.g_UIManager = fm.AddManager<UIManager>(UIManager);
        
        APP.g_Message.Regist(GameModule.Event.OnTimePause,APP.g_TimeMgr.Pause,APP.g_TimeMgr)
        APP.g_Message.Regist(GameModule.Event.OnTimeContinue,APP.g_TimeMgr.Continue,APP.g_TimeMgr)
    }
}

