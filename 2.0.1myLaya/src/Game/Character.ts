export module Character
{
    export enum AnimEnum
    {
        Stand,
        Fly,
        Fall,
        Jump,
        Jumpdown
    }
    var AnimType:{[name:number]:string};
    AnimType = {};
    AnimType[AnimEnum.Stand] = "stand";
    AnimType[AnimEnum.Jump] = "jumpup";
    AnimType[AnimEnum.Jumpdown] = "jumpdown";
    AnimType[AnimEnum.Fly] = "fly";
    AnimType[AnimEnum.Fall] = "fall";
    export function PlayerAnimName( nameEnum:AnimEnum ):string
    {
        return AnimType[nameEnum];
    }
    
    export class CharacterAnimator
    {
        private m_Animator:Laya.Animator;
        constructor( PlayerCharacter:Laya.Sprite3D )
        {
            this.m_Animator = PlayerCharacter.getComponent(Laya.Animator);
        }
        public SwitchState( AnimEnum )
        {

        }
    }
}