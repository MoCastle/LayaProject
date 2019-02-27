export module path
{
    var IsEditor:boolean = true;
    export var SceneAssetPath:string = "LayaScene_";
    export var UIPath:string = IsEditor? "D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource/":ResourcePath;
    export var ResourcePath:string = IsEditor?"C:/Users/Administrator/Desktop/Resource/L01_laya/NetResources/":"http://www.gsjgame.com/Resource/";
    
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
        return ResourcePath +SceneAssetPath+fileName+"/Conventional/" +fileName + ".lh"
    }
}