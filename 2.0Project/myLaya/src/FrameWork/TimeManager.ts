import BaseManager from "./../FrameWork/BaseManager"
import APP from "../controler/APP";
export default class TimeManager extends BaseManager {
    static Name(): string {
        return "TimeManager";
    }
    private m_StartTime: number;
    private m_GameTime: number;
    private m_PausingTime: number;
    private m_PauseTime: number

    public get StartTimer(): number {
        return this.m_StartTime;
    }
    public get GameTime(): number {
        return (Laya.timer.currTimer - this.m_StartTime -this.m_PauseTime - this.PausingTime) / 1000;
    }

    constructor() {
        super();
        this.m_StartTime = Laya.timer.currTimer;
        this.m_GameTime = 0;
        this.m_PauseTime = 0;
        this.m_PausingTime = 0;
    }

    public Update() {
    }

    public Pause() {
        if (this.m_PausingTime <= 0)
            this.m_PausingTime = Laya.timer.currTimer;
    }
    public get PausingTime():number
    {
        return this.m_PausingTime > 0 ? (Laya.timer.currTimer - this.m_PausingTime ) : 0;
    }
    public Continue() {
        this.m_PauseTime += this.PausingTime;
        this.m_PausingTime = 0;
    }
}
