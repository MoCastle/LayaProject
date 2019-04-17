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
    protected GenInfo(data: any) {
        return new CharacterInfo(data);
    }

    public GetSkillItem(id): number {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (info)
            return info.Item;
        return null;
    }

    public GetPrice(id): number {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (info)
            return info.Price;
        return null;
    }

    public GetCharacterInfo(id) {
        return this.GetInfo<CharacterInfo>(id);
    }

    public GetItemID(id) {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (!info)
            return;
        return info.Item;
    }
    public GetName(id) {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (!info)
            return "";
        return info.mName;
    }

    public GetDesc(id) {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (!info)
            return "";
        return info.Desc;
    }

    public GetCharacterModel(id: number): Laya.Sprite3D {
        var info: CharacterInfo = this.GetInfo<CharacterInfo>(id);
        if (!info)
            return;
        var characterData: CharacterInfo = this.GetCharacterInfo(id);
        var sampleModel: Laya.Sprite3D = Laya.loader.getRes(path.GetLH(characterData.Name));
        var model = sampleModel.clone();
        return model;
    }
}

class CharacterInfo extends GameManager.BaseInfo {
    private m_Price: number;
    private m_ModelName: string;
    private m_ExtendID: string;
    private m_Item: number;
    private m_Name: string;
    private m_Desc: string;

    public get mName(): string {
        return this.m_Name;
    }

    public get Desc(): string {
        return this.m_Desc;
    }

    public get Item(): number {
        return this.m_Item;
    }
    public get Price(): number {
        return this.m_Price;
    }
    constructor(characterData: any) {
        super(characterData);
        this.m_ID = characterData.ID ? characterData.ID : "";
        this.m_ModelName = characterData.ModelID ? characterData.ModelID : "";
        this.m_Item = characterData.ItemID ? Number(characterData.ItemID - 1) : -1;
        this.m_Price = characterData.Price ? Number(characterData.Price) : 0;
        this.m_Name = characterData.Passscore ? characterData.Passscore : "";
        this.m_Desc = characterData.Desc ? characterData.Desc : "";
    }

    public get Name(): string {
        return this.m_ModelName;
    }
}