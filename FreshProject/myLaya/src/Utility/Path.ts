export module path
{
    export var IsEditor:boolean = false;

    export var SceneAssetPath:string = "LayaScene_";
    export var ResourcePath:string = IsEditor?"D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource/":"http://www.gsjgame.com/Resource/NetResource/";
    export var UIPath:string = ResourcePath + "UI/";
    export var ModelPath:string = ResourcePath+"3D/"
    
    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    export function GetAtlPath(fileName:string):string
    {
        return UIPath + fileName+".atlas";
    }
    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    export function GetDepathUIJS(fileName:string):string
    {
        return  UIPath+fileName+".json";
    }
    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    export function GetLH(fileName:string):string
    {
        return ModelPath +SceneAssetPath+fileName+"/Conventional/" +fileName + ".lh"
    }
}