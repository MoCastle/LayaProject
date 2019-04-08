export class WechatOpen {

    private static wechatOpen: WechatOpen = null;
    public dataContext = null;
    private isDrawRank: boolean // 是否开始绘画排行榜内容

    private constructor() {
        this.isDrawRank = false;
        if(typeof wx != "undefined") {
            this.dataContext = window["wx"].getOpenDataContext();
        }
    }

    /**
     * 获取当前对象实列
     */
    public static getInstances(): WechatOpen {
        if(!WechatOpen.wechatOpen) {
            WechatOpen.wechatOpen = new WechatOpen();
        }
        return WechatOpen.wechatOpen
    }

    public updateScore(score:any): void {
        this.postMessageToOpen({
            command: "update",
            score: score
        });
    }

    public drawpass(score:any): void {
        this.postMessageToOpen({
            command: "drawpass",
            score: score
        });
    }

    public clearcanvase(): void {
        this.postMessageToOpen({
            command: "clearcanvase"
        });
    }

    public closeRank(): void {
        this.postMessageToOpen({
            command: "close"
        });
    }

    public showRange(): void {
        this.postMessageToOpen({
            command: "range",
            gameStageHeight: Laya.stage.height
        });
    }
    
    public clearScore(): void {
        this.postMessageToOpen({
            command: "clearScore"
        });
    }

    public openRank(): void {
        this.postMessageToOpen({
            command: "open",
            gameStageHeight: Laya.stage.height
        });
    }

    private postMessageToOpen(data): void {
        if(this.dataContext) {
            this.dataContext.postMessage(data);
        }
    }

}