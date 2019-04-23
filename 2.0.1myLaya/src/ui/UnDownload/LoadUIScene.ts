import { path } from "../../Utility/Path";
export default class LoadUIScene extends Laya.Scene3D{

    public camera:Laya.Camera;
    public initScalNum = -0.003;

    constructor() { 
        super();
        //this.ambientColor = new Laya.Vector3(1, 1, 1);
        
        this.camera = this.addChild(new Laya.Camera()) as Laya.Camera;
        this.camera.transform.localPosition = (new Laya.Vector3(0, 0, 1));
        this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        
        //var model: Laya.Sprite3D = Laya.loader.getRes("ui/Resource/LayaScene_MainScene/Conventional/zhuyemian_qiu1_idle.lh");
        var model1: Laya.Scene3D = Laya.loader.getRes("ui/Resource/LayaScene_SampleScene/Conventional/SampleScene.lh");
        
        // var audt:Laya.Sprite3D = model.clone();
        // audt.transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
        // audt.transform.position = new Laya.Vector3(130, 14, 0);
        // audt.transform.rotate(new Laya.Vector3(-10, 0, 0), true, false);
        this.addChild(model1);
     }

    onEnable(): void {

    }

    onDisable(): void {
    }
}