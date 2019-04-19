export module GameModule
{
    export class Event
    {
        public static OnCharacterItemChange:string = "OnCharacterItemChange";
        public static OnTimePause:string = "OnTimePause";
        public static OnTimeContinue:string = "OnTimeContinue";
    }
    export var HSpace:number = 3;
    export var VSpace:number = 2.5;
    export var DSpace:number = 0.75;
}