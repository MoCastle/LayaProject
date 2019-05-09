import { path } from "./../Utility/Path"
import { ui } from "./layaMaxUI"
export default class StarItemUI extends ui.StarItemUI {
    createChildren(): void {
        this.createView(Laya.loader.getRes(path.GetDepathUIJS("StarItem")));
    }
    constructor() {
        super();
    }
}
Laya.ClassUtils.regClass("ui.StarItemUI",StarItemUI);