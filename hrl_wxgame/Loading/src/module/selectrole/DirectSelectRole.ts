/**跳过选角 */
class DirectSelectRole {
    private userName: string
    /** http请求 */
    private request: egret.HttpRequest;
    /** 重试次数 */
    private maxRetryCount: number = 5;
    /** 重试次数 */
    private retryCount: number = 0;
    /** 起名状态码 */
    private code: number;
    public constructor() {
        this.init();
    }
    private init() {
        this.request = new egret.HttpRequest();
        this.request.responseType = egret.HttpResponseType.TEXT;
        this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        this.request.addEventListener(egret.Event.COMPLETE, this.__onCompleteHandler, this);
        this.request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__onIOErrorHandler, this);
    }
    /**起名 */
    public createName() {
        this.userName = this.generateName();
        let url = assembleSelectRoleParams(this.userName, 1);
        this.request.open(url, egret.HttpMethod.GET);
        this.request.send();
    }
    /**重新起名 */
    private retry() {
        this.retryCount++;
        if (this.retryCount <= this.maxRetryCount) {
            this.createName();
            return;
        }
        this.updateMsg(this.code);
    }
    private generateName(): string {
        let username = "";
        let randomChar = String.fromCharCode(this.randomFrom(65, 90));//随机获取A-Z字母
        let time = new Date().getTime().toString();
        username = randomChar + time.substring(time.length - 11, time.length);
        return username;
    }
    //获取指定区间范围随机数，包括lowerValue和upperValue
    private randomFrom(lowerValue, upperValue) {
        return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
    }
    /** 更新提示信息 */
    private updateMsg($code: number = 1000): void {
        let msgTxt: string = LoadingManager.instance.getMsgPrompt($code);

        LoadingMyAlert.show(msgTxt, "提示", LoadingMyAlert.YES);
    }
    /** 起名结果返回 */
    private __onCompleteHandler(e: egret.Event): void {
        let result: any = JSON.parse(this.request.response);
        console.log("起名结果返回:" + JSON.stringify(result));
        if (result) {
            let code: number = result.c || 0;
            this.code = code;
            if (code != LoadingErrorType.TYPE_1) {
                this.retry();
            }
            else {
                LoadingManager.$inst.uid = parseInt(result.u);
                LoadingManager.$inst.loginKey = result.k;
                LoadingManager.$inst.ip = result.cip;
                LoadingManager.$inst.port = result.cpt;
                LoadingManager.$inst.isNew = true;
                // this.reportCreateRole(result);
                LoadingMyFrame.instance.setupMy();
                LoadingManager.$inst.enterGame();
            }
        }
    }
    /** IO_ERROR */
    private __onIOErrorHandler(e: egret.IOErrorEvent): void {
        this.code = LoadingErrorType.TYPE_5;
        this.retry();
    }
    // /**上报创角 */
    // private reportCreateRole(result) {
    //     let reportData: SDKReportTvo = {};
    //     reportData.uid = parseInt(result.u);
    //     reportData.serverID = result.serverID;
    //     reportData.serverName = result.serverName;
    //     reportData.time = result.reportTime;
    //     reportData.rolename = this.userName;
    //     hitalkOpenSdk.reportUserRegister(reportData);
    // }
    public dispose(): void {
        if (this.request) {
            this.request.removeEventListener(egret.Event.COMPLETE, this.__onCompleteHandler, this);
            this.request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__onIOErrorHandler, this);
        }
        this.request = null;
    }
}