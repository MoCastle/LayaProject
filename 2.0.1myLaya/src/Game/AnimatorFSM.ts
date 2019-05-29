export module AnimatorFSM
{

    class BaseAnimState
    {
        private m_Animator
        constructor(animator:Animator)
        {
            this.m_Animator = animator;
        }
    }

    export class Animator
    {
        private m_Animator:Laya.Animator;
        private m_DefaultState:Laya.Animator;
        private m_CurState:BaseAnimState;
        private m_StateDict:{[name:string]:BaseAnimState};
        constructor( animator:Laya.Animator )
        {
            this.m_StateDict = {};
            this.m_Animator = animator;
 //           this.m_DefaultState = new BaseAnimState(this,this.m_Animator.getDefaultState);
        }

    } 
}