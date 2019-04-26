import { path } from "../../Utility/Path";
export default class LoadUIScene extends Laya.Scene3D{

    public camera:Laya.Camera;
    public initScalNum = 0.3;

    constructor() { 
        super();
        this.ambientColor = new Laya.Vector3(1, 1, 1);
        
        this.camera = this.addChild(new Laya.Camera()) as Laya.Camera;
        this.camera.transform.localPosition = (new Laya.Vector3(0, 0, 1));
        this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        
        //var model: Laya.Sprite3D = Laya.loader.getRes("ui/Resource/LayaScene_MainScene/Conventional/zhuyemian_qiu1_idle.lh");
        var model1: Laya.Sprite3D = Laya.loader.getRes(path.GetLH("item_shield_01"));
         
        var audt:Laya.Sprite3D = model1.clone();
        audt.transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
        //audt.transform.position = new Laya.Vector3(130, 14, 0);
        // audt.transform.rotate(new Laya.Vector3(-10, 0, 0), true, false);
        this.addChild(audt);
     }

    onEnable(): void {

    }

    onDisable(): void {
    }
}