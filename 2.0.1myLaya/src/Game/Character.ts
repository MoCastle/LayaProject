export module Character
{
    export enum AnimEnum
    {
        Stand,
        Fly,
        Fall,
        Jump,
        Jumpdown,
        Die
    }
    var AnimType:{[name:number]:string};
    AnimType = {};
    AnimType[AnimEnum.Stand] = "idle";
    AnimType[AnimEnum.Jump] = "jumpUp";
    AnimType[AnimEnum.Jumpdown] = "jumpDown";
    AnimType[AnimEnum.Fly] = "fly";
    AnimType[AnimEnum.Fall] = "fall";
    AnimType[AnimEnum.Die] = "die";
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