export module path {
    export var IsEditor: boolean = true;
    export var version: string = "?v=5";
    export var SceneAssetPath: string = "LayaScene_";
    export var ResourcePath: string = IsEditor ? "NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
    export var UIPath: string = ResourcePath + "UI/";
    export var ModelPath: string = ResourcePath + "3D/"
    export var ConfigPath: string = ResourcePath + "Config/"

    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    export function GetAtlPath(fileName: string): string {
        return UIPath + fileName + ".atlas" + (IsEditor?"":version);
    }

    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    export function GetDepathUIJS(fileName: string): string {
        return UIPath + fileName + ".json" + (IsEditor?"":version);
    }


    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    export function GetLH(fileName: string): string {
        return ModelPath + SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh" + (IsEditor?"":version);
    }

    /**
     * 获取加载Json路径
     * @param fileName 文件名
     */
    export function GetJsonPath(fileName: string): string {
        return ConfigPath + fileName + ".json" + (IsEditor?"":version);
    }
}