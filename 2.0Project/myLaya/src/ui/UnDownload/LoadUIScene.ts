import { path } from "../../Utility/Path";
export default class LoadUIScene extends Laya.Scene3D{

    public camera:Laya.Camera;
    public initScalNum = 0.03;

    constructor() { 
        super();
        this.ambientColor = new Laya.Vector3(1, 1, 1);
        
        // this.camera = this.addChild(new Laya.Camera(0, 0.1, 0.6)) as Laya.Camera;
        // this.camera.transform.translate(new Laya.Vector3(0, 0, 0.6));
        // this.camera.transform.rotate(new Laya.Vector3( 0, 0, 0), true, false);
        
        //var model: Laya.Sprite3D = Laya.loader.getRes("ui/Resource/zhuyemian_qiu1_idle/zhuyemian_qiu1_idle.lh");
        // var model1: Laya.Sprite3D = Laya.loader.getRes(path.GetLH("L01_spr_barrier_04"));
        
        // var audt:Laya.Sprite3D = model.clone();
        // audt.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // audt.transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
        //this.addChild(model.clone());
     }

    onEnable(): void {

    }

    onDisable(): void {
    }
}