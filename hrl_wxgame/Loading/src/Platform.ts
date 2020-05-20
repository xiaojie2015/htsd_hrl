class DebugPlatform implements Platform 
{
    async getUserInfo() {return { nickName: "username" }}
    async login() {}
    async creatUserInfoButton(cwidth:number) {}
    async getUserInfoCompat(cwidth: number, callback:Function){callback({});}
    async pay(postData) {}
    async httpRequest(callback,url,data,thisObj?) {}
    async shareAppMessage(shareObj) {}
    async onShareAppMessage(callback){}
    showShareMenu(){}
    async moreGameHandler(callback) {}
    setClipboardData(str, successCall, failCall){failCall();}
    firstLogin():void{}
    loadSubpackage(obj:any){loadMainCode(obj);}
    getSystemInfoSync(){/** return {system:"ios"} */}
    transPlayerInfo(obj:any){}
    checkUpdate(){}
    getLaunchOptionSync(){};
    compareTargetVersion(target){return -1}
    previewImage(obj){}
    loadTemplate(obj){}
    clearCache(){}
    reportLoginInfo(){}
    showAlert(content, showCancel, callback?){};
    showWxLoading(title:string, mask:boolean){};
    hideWxLoading(){};
    showGameClub(){};
    getOpenIosData(param,callback,thisobj){};
    gameOnHide(callback:Function){};
    gameOnShow(callback:Function){};
}

/** 
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
interface Platform {
    getUserInfo(): Promise<any>;
    login(param:any,callback:Function,thisObj:any): Promise<any>
    firstLogin(params:any):void;
    creatUserInfoButton(cwidth:number):Promise<any>;
    getUserInfoCompat(cwidth: number, callback:Function):void;
    pay(postData):void;
    httpRequest(callback,url,data,thisObj?):void;
    shareAppMessage(shareObjy):void
    onShareAppMessage(callback):void
    showShareMenu():any;
    getLaunchOptionSync();
    moreGameHandler(callback):void;
    setClipboardData(str, successCall, failCall):void;
    loadSubpackage(obj:any);
    getSystemInfoSync():any;
    transPlayerInfo(obj:any);
    checkUpdate():any;
    compareTargetVersion(target):number;
    loadTemplate(obj):void;
    clearCache():void;
    reportLoginInfo():void;
    showAlert(content, showCancel, callback?):void;
    showWxLoading(title:string, mask:boolean):void;
    hideWxLoading():void;
    showGameClub():void;
    getOpenIosData(param,callback,thisobj):void;
    gameOnHide(callback:Function):void;
    gameOnShow(callback:Function):void;
}