import { path } from "../Utility/Path";
import { GameManager } from "./GameManager"
export default class CharacterManager extends GameManager.BaseManager {
    private static g_Mgr: CharacterManager;
    public static get Mgr(): CharacterManager {
        if (!CharacterManager.g_Mgr) {
            CharacterManager.g_Mgr = new CharacterManager();
        }
        return CharacterManager.g_Mgr;
    }
    constructor() {
        super("CharacterInfo");
    }
    protected GenInfo(data:any)
    {
        return new CharacterInfo(data);
    }

    public GetSkillItem(id): number {
        var info:CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if(info)
            return info.Item;
        return null;
    }

    public GetPrice(id): number {
        var info:CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if(info)
            return info.Price;
        return null;
    }

    public GetCharacterInfo(id) {
        return this.GetInfo<CharacterInfo>(id);
    }

    public GetCharacterModel(id: number, level: number): Laya.Sprite3D {
        var info:CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if(!info)
            return ;
        var characterData: CharacterInfo = this.GetCharacterInfo(id);
        var sampleModel: Laya.Sprite3D = Laya.loader.getRes(path.GetLH(characterData.GetName(level)));
        var model = sampleModel.clone();
        return model;
    }
}
class CharacterInfo extends GameManager.BaseInfo {
    private m_Price: number;
    private m_ModelID: string;
    private m_StateLsit: Array<string>;
    private m_ExtendID: string;
    private m_Item: number;

    public get Item(): number {
        return this.m_Item;
    }
    public get Price(): number {
        return this.m_Price;
    }
    public get ID(): number  {
        return this.m_ID;
    }
    constructor(characterData: any) {
        super(characterData);
        this.m_ModelID = characterData.ModelID ? characterData.ModelID : "";
        this.m_StateLsit = characterData.StateList ? characterData.StateList : "";
        this.m_Item = characterData.Item ? characterData.Item : -1;
        this.m_ExtendID = characterData.ExtendID ? characterData.ExtendID : "";
    }

    public GetName(level: number): string {
        var state: string;
        if (this.m_StateLsit.length > 0)
            state = this.m_StateLsit[level] ? this.m_StateLsit[level] : this.m_StateLsit[this.m_StateLsit.length - 1];
        else
            state = "";
        return this.m_ModelID + state + this.m_ExtendID;
    }
}