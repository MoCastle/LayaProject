export module ModelFunc
{
    export function FindChildByName( width:number )
    {
        
    }

    export function vibrate(vibrateNumber) {
        if(Laya.Browser.window.conchConfig) {
            var os = Laya.Browser.window.conchConfig.getOS();
            var bridge;
            var obj = {};
            if (os == "Conch-ios") {
                bridge = Laya.PlatformClass.createClass("JSBridge");//创建脚步代理
            }
            else if (os == "Conch-android") {
              //需要完整的类路径，注意与iOS的不同
              bridge = Laya.PlatformClass.createClass("demo.JSBridge");//创建脚步代理
            }   
            if (os == "Conch-ios") {
            //   //iOS注意函数签名，注意与Android的不同
            //   alert(bridge.call("testString:","hello"));
            //   alert(bridge.call("testNumber:",256.0)); 
            //   alert(bridge.call("testBool:",false));
            //   obj.value = "Hello OC!";
            //   bridge.callWithBack(function(value) {
            //     var obj = JSON.parse(value)
            //     alert(obj.value);
            //     },"testAsyncCallback:", JSON.stringify(obj));
            }
            else if (os == "Conch-android") {
               bridge.call("vibrate",vibrateNumber);
            //   alert(bridge.call("testNumber",256.0));
            //   alert(bridge.call("testBool",false));
            //   obj.value = "Hello Java!";
            //   bridge.callWithBack(function(value) {
            //     var obj = JSON.parse(value)
            //     alert(obj.value);
            //   },"testAsyncCallback",JSON.stringify(obj));
                return;
            }
        }

        if (!navigator.vibrate) {
            return;
        }
        //震5秒
        //navigator.vibrate(5000);
        //震5秒，停0.3秒，在震4秒
        navigator.vibrate(vibrateNumber);
    }
}
 