export default class CharactorAnimator {
    protected m_Aniamtor: Laya.Animator;
    private m_StateMap: { [name: string]: Laya.AnimatorState };
    private m_CurStateName: string;
    public get speed(): number  {
        return this.m_Aniamtor.speed;
    }
    public set speed(value: number)  {
        this.m_Aniamtor.speed = value;
    }
    public get curStateName(): string  {
        return this.m_CurStateName;
    }
    public getDefaultState():Laya.AnimatorState
    {
        return this.m_Aniamtor.getDefaultState();
    }
    constructor(animator: Laya.Animator)  {
        this.m_Aniamtor = animator;
        this.m_StateMap = {};
        if (!animator)
            return;
        if (!animator.getControllerLayer())
            var a = 1;
        var layer: Laya.MapLayer = animator.getControllerLayer()._statesMap;
        for (var key in layer) {
            this.m_StateMap[key] = layer[key];
        }
        this.m_CurStateName = this.m_Aniamtor.getDefaultState().name;
    }

    public GetState(name: string): Laya.AnimatorState  {
        if (name == "fall")
            var a = 1;
        var animatorState = this.m_StateMap[name];
        if (!animatorState)  {
            var idleState = this.m_Aniamtor.getDefaultState();
            animatorState = new Laya.AnimatorState();
            animatorState.name = name;
            animatorState.clip = idleState.clip;
            this.m_Aniamtor.addState(animatorState);
            this.m_StateMap[name] = animatorState;
        }

        return animatorState;
    }

    public play(name: string)  {
        if (this.m_StateMap[name])  {
            this.m_Aniamtor.play(name);
            this.m_CurStateName = name;
        } else  {
            console.log("anim Is Not Exist" + name);
        }
    }

    public linkSprite3DToAvatarNode(nodeName: string, sprite3D: Laya.Sprite3D): void  {
        this.m_Aniamtor.linkSprite3DToAvatarNode(nodeName, sprite3D);
    }
}