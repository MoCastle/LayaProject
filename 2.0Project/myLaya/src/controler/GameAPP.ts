import CharacterManager from "./../GameManager/CharacterMamager"
import ItemManager from "./../GameManager/ItemManager"
export default class GameAPP
{
    public static get CharacterMgr():CharacterManager
    {
        return CharacterManager.Mgr;
    }
    public static get ItemMgr():ItemManager
    {
        return ItemManager.Mgr;
    }
}