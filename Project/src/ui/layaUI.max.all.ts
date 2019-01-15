
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class EnterSceneUI extends View {
		public _Panel:Laya.Panel;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("EnterScene");

        }

    }
}

module ui {
    export class GameSceneUI extends View {
		public LeftTouch:Laya.Button;
		public RightTouch:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("GameScene");

        }

    }
}

module ui {
    export class LoadingUI extends View {
		public _Progress:Laya.ProgressBar;
		public _Guider:Laya.Image;
		public _Enter:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("Loading");

        }

    }
}
