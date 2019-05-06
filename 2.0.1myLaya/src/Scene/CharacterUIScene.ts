import { path } from "../Utility/Path";
import CharacterManager from "../GameManager/CharacterMamager";

export default class CharacterUIScene extends Laya.Scene3D{

    public arrayDis:Laya.Sprite3D[] = [];
    public cntNum = 5;
    public startao = 90;
    public perao = 360 / this.cntNum;
    public r = 0.04;
    public startY = -0.02;
    public cntSelectIndex = 0;

    public camera:Laya.Camera;
    public cntstartao = 90;
    public moveStarao = 2;
    public nextAo = -1;
    public initScalNum = 0.018;

    public moveCallBack;
    public cntSelectSex;

    constructor(cntSelectIndex, moveCallBack) { 
        super();
        this.cntSelectIndex = cntSelectIndex;
        this.moveCallBack = moveCallBack;
        this.ambientColor = new Laya.Vector3(1, 1, 1);
        
        this.camera = this.addChild(new Laya.Camera(0, 0.1, 0.3)) as Laya.Camera;
        this.camera.transform.translate(new Laya.Vector3(0, 0, 0.2));
        this.camera.transform.rotate(new Laya.Vector3( 0, 0, 0), true, false);
        
        for(var i = 0 ;i < 10;i ++) {
            var characterModel =  CharacterManager.Mgr.GetCharacterModel(i);
            var audt:Laya.Sprite3D = characterModel;
            audt.transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
            this.addChild(audt);
            this.arrayDis.push(audt);
        }
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.nextAo = (this.startao + (this.cntNum - this.cntSelectIndex) *     this.perao + 360) % 360;
        this.updateSelect();
     }

     updateSelectSex(cntSelectSex: number): void {
        if(cntSelectSex == 0) {
            for(var i = 0;i < 10;i ++) {
                if(i < 5) {
                    this.arrayDis[i].active = true;
                }
                else
                {
                    this.arrayDis[i].active = false;
                } 
            }
        }
        else
        {
            for(var i = 0;i < 10;i ++) {
                if(i >= 5) {
                    this.arrayDis[i].active = true;
                }
                else
                {
                    this.arrayDis[i].active = false;
                } 
            }
        }
        this.cntSelectSex = cntSelectSex;
     }

    calCntStartao(): void {
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.nextAo = (this.startao + (this.cntNum - this.cntSelectIndex) * this.perao + 360) % 360;

        if((this.nextAo - this.cntstartao + 360) % 360 >= 180) {
            this.moveStarao = -2
        }
        else
        {
            this.moveStarao = 2;
        }
        Laya.timer.loop(0.05, this, this.timeAoChange);
    }

    timeAoChange(): void {
        if(this.cntstartao == this.nextAo) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
            this.moveCallBack && this.moveCallBack(1);
            Laya.timer.clear(this, this.timeAoChange);
            return;
        }
        var lascntAo = this.cntstartao;
        this.cntstartao += this.moveStarao;
        if(this.cntstartao < 0 || this.cntstartao == 360) {
            this.cntstartao = (this.cntstartao + 360) % 360;
            lascntAo = this.cntstartao - this.moveStarao;
        }
        else
        {
            this.cntstartao = (this.cntstartao + 360) % 360;
        }
        
        if((lascntAo >= this.nextAo && this.cntstartao <= this.nextAo) || (lascntAo <= this.nextAo && this.cntstartao >= this.nextAo)) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
        }
        if(this.nextAo == -1) {
            this.moveCallBack && this.moveCallBack(1);
            Laya.timer.clear(this, this.timeAoChange);
        }
        this.updateSelect();
    }

    updateSelect(): void {
        for(var i = 0;i < 5;i ++) {
            var ao = (this.cntstartao + i * this.perao) % 360
            var x = this.r * Math.cos(ao * 3.14 / 180);
            var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            this.arrayDis[5+i].transform.position = this.arrayDis[i].transform.position = new Laya.Vector3(x, y, 0);

            var scale = 0.2 * y;
            if(scale >= 0) {
                this.arrayDis[5+i].transform.localScale = this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum + scale, this.initScalNum + scale, this.initScalNum + scale);
            }
            else{
                this.arrayDis[5+i].transform.localScale = this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
            } 
        }
        this.moveCallBack && this.moveCallBack();
    }
    
    clearRoateTimer(): void {
        Laya.timer.clear(this, this.timeAoChange);
    }

    lastRole(): void {
        this.cntSelectIndex --;
        this.calCntStartao();
    }   

    nextRole(): void {
        this.cntSelectIndex ++;
        this.calCntStartao();
    }

    updateSelectIndex(selectIndex:number): void {
        if(selectIndex == this.cntSelectIndex) {
            return;
        }
        this.cntSelectIndex = selectIndex;
        this.calCntStartao();
    } 

    onEnable(): void {

    }

    onDisable(): void {
    }
}