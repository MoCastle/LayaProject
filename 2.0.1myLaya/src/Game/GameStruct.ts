export module GameStruct
{
    export class SetInfo {
        AudioOn: boolean;
        OPIsRight: boolean;
        TextInfo: string;
        constructor() {
            this.AudioOn = true;
            this.OPIsRight = true;
            this.TextInfo = "Hello \n Hello";
        }
    }
    export class MLocation
    {
        get X():number
        {
            return this._Arr[0];
        }
        set X(x:number)
        {
            this._Arr[0] =x;
        }
        get Y():number
        {
            return this._Arr[1];
        }
        set Y(y:number)
        {
            this._Arr[1] = y;
        }
        private _Arr:Array<number>;
        constructor( x:number,y:number )
        {
            this._Arr = [x,y];
        }
    }
    export var ItemDictType:{[ItemType:number]:any};
    ItemDictType = { };
}