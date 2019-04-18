export module FSM 
{
    export interface IFSM
    {
        Update();
    }
    export abstract class FSM <T extends State> 
    {
        private m_CurState:T;
        private m_StateDict:{[name:string]:T};

        constructor( startState:T = null )
        {
            this.m_CurState = startState;
        }

        get CurState():T
        {
            return this.m_CurState;
        }

        /**
         * 改变状态
         * @param state 设置状态
         */
        public ChangeState(state:T)
        {
            state.SetOwner(this);
            var curState:T = this.m_CurState;
            if(curState)
            {
                curState.End();
            }
            curState = state;
            curState.Start();
            this.m_CurState = curState;
        }
        
        public Update()
        {
            var curState = this.m_CurState;
            if(curState)
            {
                curState.Update();
            }
        }
    }

    export abstract class State
    {
        protected m_owner:IFSM;
        
        constructor(owner:IFSM = null)
        {
            this.m_owner = owner;
        }

        public SetOwner(owner:IFSM)
        {
            this.m_owner = owner;
        }

        public abstract Update();
        public abstract End();
        public abstract Start();
    }
}