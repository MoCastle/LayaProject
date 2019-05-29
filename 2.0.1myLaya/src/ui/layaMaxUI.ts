/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import View=Laya.View;
import Dialog=Laya.Dialog;
import Scene=Laya.Scene;
var REG: Function = Laya.ClassUtils.regClass;
export module ui {
    export class BGUI extends Laya.View {
		public _Earth:Laya.Image;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("BG");
        }
    }
    REG("ui.BGUI",BGUI);
    export class CharacterUI extends Laya.View {
		public bg:Laya.Image;
		public layoutbg:Laya.Box;
		public roleName:Laya.Label;
		public desc:Laya.Label;
		public goldimg:Laya.Sprite;
		public roleuseNoney:Laya.Label;
		public buyBtn:Laya.Button;
		public characterrole1bg:Laya.Sprite;
		public characterrole4bg:Laya.Sprite;
		public characterrole2bg:Laya.Sprite;
		public characterrole3bg:Laya.Sprite;
		public characterrole0bg:Laya.Sprite;
		public startGame:Laya.Button;
		public _Gold:Laya.Label;
		public backBtn:Laya.Button;
		public _List:Laya.List;
		public nanBtn:Laya.Button;
		public nvBtn:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Character");
        }
    }
    REG("ui.CharacterUI",CharacterUI);
    export class EndGameUI extends Laya.View {
		public bg:Laya.Sprite;
		public endgamebgicon:Laya.Image;
		public dibg:Laya.Image;
		public _StartBtn:Laya.Button;
		public _MenueBtn:Laya.Button;
		public _SetBtn:Laya.Button;
		public _PlayerListBtn:Laya.Button;
		public endgamehentiao:Laya.Sprite;
		public endgametitle:Laya.Sprite;
		public distance:Laya.Label;
		public gold:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("EndGame");
        }
    }
    REG("ui.EndGameUI",EndGameUI);
    export class EnterUI extends Laya.View {
		public bg:Laya.Sprite;
		public _Start:Laya.Button;
		public _Character:Laya.Button;
		public _Panel:Laya.Panel;
		public content:Laya.Sprite;
		public Btn1:Laya.Image;
		public Btn2:Laya.Image;
		public Btn4:Laya.Image;
		public Btn5:Laya.Image;
		public startnumtxt1:Laya.Label;
		public startnumtxt2:Laya.Label;
		public startnumtxt3:Laya.Label;
		public startnumtxt4:Laya.Label;
		public startnumtxt5:Laya.Label;
		public _SetPanel:Laya.Button;
		public _CharacterList:Laya.Button;
		public adv:Laya.Button;
		public _Rank:Laya.Button;
		public lastBtn:Laya.Button;
		public nextBtn:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Enter");
        }
    }
    REG("ui.EnterUI",EnterUI);
    export class GameUI extends Laya.View {
		public _GameInfo:Laya.Label;
		public _GamePanel:Laya.Box;
		public _LeftTouch:Laya.Button;
		public _TxtDistance:Laya.Label;
		public _TxtGold:Laya.Label;
		public _RightTouch:Laya.Button;
		public _SkillItem:Laya.Button;
		public _PlayerItem:Laya.Button;
		public _TxtDistance1:Laya.FontClip;
		public guankapanel:Laya.Panel;
		public g_p_pro:Laya.ProgressBar;
		public progressLabel:Laya.Label;
		public g_2:ui.StarItemUI;
		public g_1:ui.StarItemUI;
		public g_4:ui.StarItemUI;
		public g_3:ui.StarItemUI;
		public _CountDownUI:Laya.Box;
		public _ItemListBtn:Laya.Button;
		public _CountTime:Laya.FontClip;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("Game");
        }
    }
    REG("ui.GameUI",GameUI);
    export class GameRankUI extends Laya.View {
		public closeBtn:Laya.Button;
		public gameRankUi:laya.ui.WXOpenDataViewer;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("GameRank");
        }
    }
    REG("ui.GameRankUI",GameRankUI);
    export class ItemListUI extends Laya.View {
		public _BG:Laya.Image;
		public bg:Laya.Sprite;
		public _List:Laya.List;
		public backBtn:Laya.Button;
		public _Gold:Laya.Label;
		public roleName:Laya.Label;
		public desc:Laya.Label;
		public goldimg:Laya.Sprite;
		public roleuseNoney:Laya.Label;
		public buyBtn:Laya.Button;
		public ownertxt:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("ItemList");
        }
    }
    REG("ui.ItemListUI",ItemListUI);
    export class PlayerListUI extends Laya.View {
		public _PlayerList:Laya.List;
		public _ReturnMain:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("PlayerList");
        }
    }
    REG("ui.PlayerListUI",PlayerListUI);
    export class SelectLevelUI extends Laya.View {
		public bg:Laya.Image;
		public g_1:ui.StarItemUI;
		public g_4:ui.StarItemUI;
		public g_3:ui.StarItemUI;
		public g_2:ui.StarItemUI;
		public goldLabel:Laya.Label;
		public _Start:Laya.Button;
		public _selectLevelBtn:Laya.Button;
		public bg1:Laya.Image;
		public _backBtn:Laya.Button;
		public _MenueBtn:Laya.Button;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("SelectLevel");
        }
    }
    REG("ui.SelectLevelUI",SelectLevelUI);
    export class SetPanelUI extends Laya.View {
		public bg:Laya.Image;
		public _Text:Laya.TextArea;
		public _Return:Laya.Button;
		public voiceopen:Laya.Box;
		public voiceclose:Laya.Box;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("SetPanel");
        }
    }
    REG("ui.SetPanelUI",SetPanelUI);
    export class StarItemUI extends Laya.View {
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("StarItem");
        }
    }
    REG("ui.StarItemUI",StarItemUI);
    export class toolItemUI extends Laya.View {
		public toolicon:Laya.Sprite;
		public toolname:Laya.Label;
        constructor(){ super()}
        createChildren():void {
            super.createChildren();
            this.loadScene("toolItem");
        }
    }
    REG("ui.toolItemUI",toolItemUI);
}