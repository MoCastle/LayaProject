/**作者:Mo
 * 输入管理相关
 */
import GameScenePlay from "./../Scene/ScenePlay/GameScenePlay"
export module Input {
    //基础输入控制器
    export abstract class BaseGameInput {
        //公有
        NextInput: BaseGameInput;
        abstract Input(isRight: boolean);

        constructor(input: BaseGameInput = null)  {
            if (input == null)  {
                input = this;
            }
            this.NextInput = input;
        }
        Update()  { }
        Clear() { }
    }

    export class DIYInput extends BaseGameInput {
        Input(isRight: boolean)  {
            if (this._Listener)
                this._Listener.call(this._Owner, isRight);
        }
        private _Owner: any;
        private _Listener: (isring: boolean) => void;
        constructor(owner: any = null, listener: (isring: boolean) => void = null)  {
            super();
            this._Owner = owner;
            this._Listener = listener;
        }
    }
    export class NormGameInput extends BaseGameInput {
        GameDir: GameScenePlay;
        _Dirty: boolean;
        _IsRight: boolean;
        constructor(dir: GameScenePlay, input: BaseGameInput = null)  {
            super(input);
            this.GameDir = dir;
            this._Dirty = false;
            this._IsRight = false;
        }
        Input(isRight: boolean)  {
            //this.GameDir.MoveStep(isRight);
            this._Dirty = true;
            this._IsRight = isRight;
        }
        Update()  {
            if (this._Dirty && this.GameDir.Player.BaseCtrler.IsFalling)  {
                this._Dirty = false;
                this.GameDir.MoveStep(this._IsRight);
            }
        }
        Clear()  {
            this._Dirty = false;
        }
    }
}
