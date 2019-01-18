
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class CharactersUI extends View {
		public _GoldDis:Laya.Label;
		public _SkillDis:Laya.Label;
		public _List:Laya.List;

        constructor(){ super()}
        createChildren():void {
        			View.regComponent("RoleElement",RoleElement);

            super.createChildren();
            this.loadUI("Characters");

        }

    }
}

module ui {
    export class EnterSceneUI extends View {
		public _Start:Laya.Button;
		public _Character:Laya.Button;
		public _Panel:Laya.Panel;
		public _SetPanel:Laya.Button;

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
		public _CountTime:Laya.Label;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("GameScene");

        }

    }
}

module ui {
    export class ItemListUI extends View {

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("ItemList");

        }

    }
}

module ui {
    export class LoadingUI extends View {
		public dsfasg:Laya.Image;
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

module ui {
    export class SetPanelUI extends View {
		public _AudioSwitch:Laya.RadioGroup;
		public _OPSwitch:Laya.RadioGroup;
		public _Text:Laya.TextArea;
		public _Return:Laya.Button;

        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.loadUI("SetPanel");

        }

    }
}
