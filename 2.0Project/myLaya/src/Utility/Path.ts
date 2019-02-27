export module path
{
    enum Model{ Editor,Normal }
    var RunModel:Model = Model.Editor;
    var ResourcePath:string = RunModel == Model.Editor?"":"http://www.gsjgame.com/";
    function GetAtlPath(fileName:string):string
    {
        return ResourcePath + fileName;
    }
}