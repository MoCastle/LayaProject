/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
export module ui {
    export class LoadUIUI extends Laya.View {
		public bg:Laya.Sprite;
		public _Progress:Laya.ProgressBar;
		public _Guider:Laya.Image;
		public _Enter:Laya.Button;
		public ErrorInfo:Laya.TextArea;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("LoadUI");
        }
    }
}