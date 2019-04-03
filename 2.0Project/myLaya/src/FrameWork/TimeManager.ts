import BaseManager from "./../FrameWork/BaseManager"
export default class TimeManager extends BaseManager {
    static Name(): string {
        return "TimeManager";
    }
    private m_StartTime:number;
    private m_GameTime:number;
    private m_FrameTime:number;
    private m_IsPaused:boolean;

    public get StartTimer():number
    {
        return this.m_StartTime;
    }
    public get GameTime():number
    {
        return this.m_GameTime;
    }
    
    constructor()  {
        super();
        this.m_StartTime = Laya.timer.currTimer;
        this.m_GameTime = 0;
        this.m_FrameTime = 1 /Number(Laya.stage.frameRate);
    }

    public Update()  {
        if(this.m_IsPaused)
        {
            return;
        }
        this.m_GameTime += this.m_FrameTime;
    }

    public Pause(){
        this.m_IsPaused = true;
    }

    public Continue()
    {
        this.m_IsPaused = false
    }
}