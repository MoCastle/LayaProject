export module UIFunc {
    //计算缩放值
    export function CountScaleFix(width: number): number {
        if (!width) {
            return;
        }
        var stageWidth = Laya.stage.width;
        var scale: number = stageWidth / width;
        return scale;
    }
    export function FixUI(view: Laya.Sprite, width: number) {
        var scale = UIFunc.CountScaleFix(width ? width : view.width);
        view.scaleX = scale;
        view.scaleY = scale;
        view.height = Laya.stage.height / scale;
    }
}