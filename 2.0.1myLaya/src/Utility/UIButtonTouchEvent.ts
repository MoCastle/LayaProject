export default class UIButtonTouchEvent extends Laya.Script {
    
    static addButtonTouchEvent(e: Laya.Button): void {
        e.on(Laya.Event.MOUSE_DOWN, this, this.buttonTouchDown);
        e.on(Laya.Event.MOUSE_UP, this, this.buttonTouchUp);
        e.on(Laya.Event.MOUSE_OUT, this, this.buttonTouchUp);
        e.on(Laya.Event.MOUSE_OVER, this, this.buttonTouchUp);
    }

    static buttonTouchDown(e: Laya.Event): void{
        e.currentTarget.scaleX = e.currentTarget.scaleY = 1.1;
    }

    static buttonTouchUp(e: Laya.Event): void{
        e.currentTarget.scaleX = e.currentTarget.scaleY = 1;
    }
    
}