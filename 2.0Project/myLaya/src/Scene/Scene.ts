import { FSM } from "./../Base/FSM"
import { MessageMD } from "./../FrameWork/MessageCenter"
import UIManager from "./../FrameWork/UIManager"
import SceneManager from "./../FrameWork/SceneManager"
import APP from "./../controler/APP"
import FrameWork from "../FrameWork/FrameWork";
export module Scene {
    export class SceneFSM extends FSM.FSM<BaseScene>
    {
        constructor() {
            super();
        }
    }

    //场景代理
    export abstract class BaseScene extends FSM.State {
        private _StartGameTime: number;
        private _TimeUpCount: number;
        private _TimeUpClock: number;

        protected m_SceneObj: Laya.Scene3D;
        protected m_Director: BaseDirector;
        protected m_Message: MessageMD.MessageCenter;

        public get SceneObj(): Laya.Scene3D {
            return this.m_SceneObj;
        }
        public get Director(): BaseDirector {
            return this.m_Director;
        }

        protected abstract GenDirector(): BaseDirector;
        constructor() {
            super();
            this.m_Message = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }

        public PutObj(sprite3D: Laya.Sprite3D): void {
            if (this.m_SceneObj) {
                this.m_SceneObj.addChild(sprite3D);
            } else {
                console.log("BaseScene PutObj Error:empty Sprite3D");
            }
        }

        public Start(): void {
            this.m_Director = this.GenDirector();
            this.m_Director.Start();
        }

        public End(): void {
            if (this.SceneObj) {
                this.SceneObj.removeSelf();
                while (this.SceneObj.numChildren) {
                    var actor = this.SceneObj.getChildAt(0);
                    actor.removeSelf();
                }
            }
            this.Director.End();
            APP.UIManager.Clear();
        }

        public Update() {
            if (this.m_Director)
                this.m_Director.Update();
        }

    }

    export abstract class BaseDirector extends FSM.FSM<BaseScenePlaye>
    {
        private _StartGameTime: number;
        private _TimeUpCount: number;
        private _TimeUpClock: number;
        protected m_Message: MessageMD.MessageCenter;

        //私有属性和功能
        get GameTime(): number {
            if (this._TimeUpClock > 0) {
                return this._TimeUpClock - this._StartGameTime - this._TimeUpCount;
            } else {
                return Laya.timer.currTimer - this._StartGameTime - this._TimeUpCount;
            }
        }
        set GameTime(value: number) {
            this._StartGameTime = value;
        }
        get CurGameTime(): number {
            return this._StartGameTime + this._TimeUpCount;
        }
        constructor() {
            super();
            this._TimeUpCount = 0;
            this._StartGameTime = 0;
            this._TimeUpClock = -1;
            this.m_Message = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }

        public ReStart(): void {
            this.StartTime();
        }

        public StartTime(): void {
            this._TimeUpCount = 0;
            this._StartGameTime = 0;
            this._TimeUpClock = -1;
            this._StartGameTime = Laya.timer.currTimer;
        }

        public abstract Start(): void ;

        public abstract End(): void;

        public TimeUp(): void {
            if (this._TimeUpClock <= 0) {
                //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
                this._TimeUpClock = Laya.timer.currTimer;
            }
        }

        public Update() {
            if (this._TimeUpClock <= 0) {
                super.Update();
            }
        }

        public ContinueTime(): void {
            //APP.MessageCenter.Trigger(GameEvent.GameContinue);
            this._TimeUpCount += Laya.timer.currTimer - this._TimeUpClock;
            this._TimeUpClock = -1;
        }
        /**
         * 切换剧本
         * @param newScenePlay 新剧本
         */
        public ChangeGamePlay( newScenePlay:BaseScenePlaye ): void  {
            this.ChangeState(newScenePlay);
        }
    }

    export abstract class BaseScenePlaye extends FSM.State {
        protected m_Message: MessageMD.MessageCenter;
        constructor()  {
            super();
            this.m_Message = FrameWork.FM.GetManager<MessageMD.MessageCenter>(MessageMD.MessageCenter);
        }
    }

    export class LoadSceneLogic extends BaseScenePlaye {
        private m_Load2DList: any[];
        private m_Load3DList: any[];
        private m_NextScene: Scene.BaseScenePlaye;
        public get OwnerDirector(): BaseDirector {
            return this.m_owner as BaseDirector;
        }
        /**
         * 
         * @param load2DList 2D加载列表
         * @param load3DList 3D加载列表
         * @param nextScene 下一格场景
         */
        constructor(load2DList: any[], load3DList: any[], nextScene: Scene.BaseScenePlaye) {
            super();
            this.m_Load2DList = load2DList;
            this.m_Load3DList = load3DList;
            this.m_NextScene = nextScene;
        }

        public Update() {

        }

        public End() {

        }

        public Start() {
            Laya.loader.once(Laya.Event.COMPLETE, this, this.LoadComplete);
            if (this.m_Load2DList)
                Laya.loader.load(this.m_Load2DList, null, null);
            if (this.m_Load3DList)
                Laya.loader.load(this.m_Load3DList, null, null);
        }

        private LoadComplete() {
            this.OwnerDirector.ChangeState(this.m_NextScene);
        }

    }
}