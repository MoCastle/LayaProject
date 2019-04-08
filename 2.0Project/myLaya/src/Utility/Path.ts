export module path {
    export var IsEditor: boolean = false;
    export var version: string = "?v=2";
    export var SceneAssetPath: string = "LayaScene_";
    export var ResourcePath: string = IsEditor ? "../NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
    export var UIPath: string = ResourcePath + "UI/";
    export var ModelPath: string = ResourcePath + "3D/"
    export var ConfigPath: string = ResourcePath + "Config/"

    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    export function GetAtlPath(fileName: string): string {
        return UIPath + fileName + ".atlas" + version;
    }

    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    export function GetDepathUIJS(fileName: string): string {
        return UIPath + fileName + ".json" + version;
    }

    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    export function GetLH(fileName: string): string {
        return ModelPath + SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh" + version;
    }

    /**
     * 获取加载Json路径
     * @param fileName 文件名
     */
    export function GetJsonPath(fileName: string): string {
        return ConfigPath + fileName + ".json" + version;
    }
}