/*
 * @Author: kyle 
 * @Date: 2019-04-04 18:50:19
 * @Last Modified by: kyle
 * @Last Modified time: 2020-04-23 20:51:04
 */

/*============================================SDK接口===============================================*/
interface HitalkOpenSdk {
    /**加载对应平台的sdk文件*/
    platformSdk: any;
    /**当前平台 */
    curPlatform: string;
    //******************************************指尖接口START*****************************************//
    /**登录 */
    login(param: any, callback: Function, thisObj: any);
    /**支付购买 */
    gamePay(pay_data: any, callback?: Function, thisobj?: any): boolean;
    /**VIP升级上报*/
    reportVipLevel(data: SDKReportTvo): boolean;
    /**登陆数据上报*/
    reportUserLogin(data: SDKReportTvo): boolean;
    //注册数据上报
    reportUserRegisterNew(data: SDKReportTvo): boolean;
    //创角数据上报 历史原因未改名
    reportUserRegister(data: SDKReportTvo): boolean;
    //升级数据上报
    reportUserLevelUp(data: SDKReportTvo): boolean;
    //-----------------------------------------------接口开关----------------------------------------------//
    /**显示微信公众号二维码 */
    isOpenShowFocus(): boolean;
    /**是否打开分享 */
    isOpenShare(): boolean;
    /**是否显示游戏支付 */
    isOpenGamePay(params: any, callback: Function, thisobj: any): boolean;
    /**是否显示游戏订阅 */
    isOpenSubscribe(): boolean;
    //-----------------------------------------------接口开关----------------------------------------------//
    /**是否关注微信公众号 */
    getIsFocus(): boolean;
    /**显示微信公众号二维码 */
    showFocus(): boolean;
    /**分享 */
    shareMessage(callback: Function, thisobj: any, shareData: SDKShareTvo): boolean;
    /** 是否打开实名认证 */
    isOpenAuthen(): boolean;
    /**是否打开收藏 */
    isOpenCollection(): boolean;
    /** 显示实名认证 */
    showAuthen(callback: Function): boolean;
    /** 实名认证状态 */
    AuthenState(): boolean;
    /**是否订阅 */
    isSubscribe(): boolean;
    /**订阅 */
    subscribe(callback: Function, thisobj: any): void
    /** 打开订阅号设置 */
    openSetting(successCall: Function, thisobj: any): void;
    /**获取微信互推数据 */
    getShareRecommend(): any[];
    /**跳转微信互推数据 */
    shareRecommend(data: any): void;
    /**设置剪贴板 */
    setClipboardData(params:string,callback: Function, thisobj?: any): void;

    //******************************************指尖接口END*****************************************//

    //******************************************通用接口START******************************************//
    /**设置分享 */
    initShareMessageCallBack(callback: Function, thisobj: any, shareData: SDKShareTvo): boolean;
    /**获取用户信息 */
    getUserInfo(): SDKUserInfoTvo;
    /**获取openkey */
    getUserOpenKey(): boolean;
    /**收藏 */
    collection(callback: Function, thisobj: any): boolean;
    /**获取平台类型，1：安卓，2:IOS */
    getPlatform(): number;
    /**获取用户OpenId,在玩吧平台下获取openid时,该接口会重组openid */
    getUserOpenId(): number;
    /**初始化url,针对各个平台在url后面添加对应的参数*/
    assembleURLParam(url: string): string;
    /**组装支付参数*/
    assemblePayParam(payData: any): any;
    /**获取渠道标识*/
    getSN(): string;
    /**获取子渠道标识 */
    getSonSN(): string;
    /**聊天室监控*/
    reportChat(chatdata: any): any;
    /**获取渠道文案 */
    getChannelTxt(): string;
    /**获取渠道文案字体颜色 */
    getChannelColor(): number;
    /**获取登录Banner图片url */
    getLoadingBannerUrl(type: number): string;
    /**获取登录背景图片url */
    getLoadingBackUrl(): string;
    /**获取PC登录背景图片url */
    getPCLoadingBackUrl(): string;
    /**获取PC全屏登录背景图片url */
    getPCBigLoadingBackUrl(): string;
    /**获取创角背景图片url */
    getCreateRoleBgUrl(sex: number): string;
    /**获取创角PC背景图片url */
    getCreateRolePCBgUrl(sex: number): string;
    /**获取平台用户名 */
    getUserName(): string;
    /**注册支付开关*/
    initPaySwitchCallback(callback: Function, thisobj: any): boolean;
    /**更改服务器名称 */
    changeServerName(serverList: any): string;
    /**获取ios屏蔽数据 */
    getOpenIosData(param, callback, thisobj): void;
    /**加载模板数据*/
    loadTemplate(obj): void;
    /**分包加载 */
    loadSubpackage(callback: Function): void;
    /**加载进度条 */
    setLoadingProgress(param: SDKProgressTvo): void;
    /**加载完成 */
    loadingComplete(): void;
    /**播放视频广告*/
    playVideoAd(callback: Function, thisobj: any): void;

    //******************************************通用接口END******************************************//

    //******************************************玩吧接口START****************************************//
    /**打开玩吧支付界面 */
    openWanbaPayUI(cost): boolean;
    /**初始化玩吧支付回调 */
    initWanbaPayCallBack(__paySuccess: Function, __payError: Function, __payClose: Function): boolean;
    /**打开URL */
    openURL(jumpURL: string): boolean;
    /**某功能是否能在某一平台运行 */
    canIShow(methodStr: string): boolean;
    /**是否玩吧独立版 */
    isWanbaDL(): boolean;
    /**是否玩吧结合版 */
    isWanbaJH(): boolean;
    /**是否PC平台 */
    isPC(): boolean;
    /**是否动漫 */
    isCartoon(): boolean;
    /**是否腾讯视频 */
    isTxVideo(): boolean;
    /**是否企鹅电竞 */
    isQQPK(): boolean;
    /**是否心悦APP */
    isXinYueVip(): boolean;
    /**是否微信公众号 */
    isWeiXinGZ(): boolean;
    /**是否微端 */
    isMicroClient(): boolean;
    /**是否QQ会员 */
    isQQVip(): boolean;
    /**是否QQ黄钻 */
    isQQYellow(): boolean;
    /**是否下载微端 */
    isAppInstalled(package: string, callback: Function, thisobj: any): boolean;
    /** 玩家角色进入游戏日志 */
    reportEnterGame(playerdata: any): void;
    /** 充值 日志上报 */
    reportPayOrderLog(payData: any, gamedata: SDKReportTvo): void;
    //******************************************玩吧接口END*****************************************//

    //******************************************微信接口START****************************************//
    /**获取启动参数 */
    getLaunchOptionSync(): any;
    /**清除缓存 */
    clearCache(): void;
    /**新授权登录上报 */
    firstLogin(params);
    /**检查更新 */
    checkUpdate();
    /**获取用户信息 */
    getUserInfoCompat(cwidth: number, callback: Function);
    /**隐藏wx进度条 */
    hideWxLoading();
    /**获取系统参数 */
    getSystemInfoSync(): any;
    /**注册onShow事件 */
    gameOnShow(callback: Function): any;
    /**注册onHide事件 */
    gameOnHide(callback: Function): any;
    /**打开客服 */
    goCustomerService();
    //******************************************微信接口END*****************************************//

    //******************************************爱微游接口START****************************************//
    chatMonitoring(param: any): boolean;
    initcollectionCallBack(callback: Function, thisobj: any): boolean;
    verifyNameCallBack(callback: Function, thisobj: any): boolean;
    refreshGame(): boolean;
    logoutGame(): boolean;
    showShare(): void;
    initconfig(sharecallback: Function, paycallback: Function, thisobj: any): void;
    initShareData(shareData: SDKShareTvo): void;
    isAwy(): boolean;
    /** 已经实名认证 */
    isAuthen(): boolean;
    //******************************************爱微游接口End****************************************//

    //******************************************QQ大厅接口START*****************************************//
    /**开通蓝钻 */
    buyBlueDiamond(): void;
    //******************************************QQ大厅接口END*****************************************//

    //******************************************疯狂游乐场START*****************************************//
    isBindTelNumber(bindCallback: Function, unbindCallback: Function, thisobj: any): void;
    openBindTelModal(successCallback: Function, thisobj: any): void;
    //******************************************疯狂游乐场END*****************************************//

    //******************************************闲来START*****************************************//
    /**获取平台币 */
    getPlatformMoneyNum(callback: Function, thisobj: any): void;
    /**拉起闲来商城 */
    showDiamondStore(): void;
    /**返回大厅 */
    closeWebView(): void;
    //******************************************闲来END*****************************************//

    //******************************************IOS接口调整*****************************************//
    useNativeLoader(): boolean;
    inExamine(): boolean;

}
/*============================================SDK接口===============================================*/


/*============================================数据接口===============================================*/
/**蓝钻用户信息 */
interface SDKBlueTvo {
    /**蓝钻等级 */
    bluegrade?: number;
    /**蓝钻类型(1/普通蓝钻、2/年费蓝钻、3/豪华蓝钻、4/超级蓝钻) */
    bluetype?: number;
    /**蓝钻过期时间 */
    validtime?: number;
}
/**上报数据格式 */
interface SDKReportTvo {
    /**区服标识 */
    serverID?: number;
    /**区服名字 */
    serverName?: string;
    /**玩家openid */
    openid?: number;
    /**玩家gkey */
    gkey?: number;
    /**玩家UID */
    uid?: number;
    /**玩家名字 */
    rolename?: string;
    /**玩家等级 */
    rolelevel?: number;
    /**玩家转生数 */
    roleturnup?: number;
    /**上报时间 */
    time?: number;
    /** 是否新用户 */
    newuser?: number;
    /** 用户代币数量(仙玉) */
    moneyNum?: number;
    /** 用户非主要代币数量(元宝) */
    goldNum?: number;
    /** 性别 */
    sex?: number;
    /** Vip等级 */
    vipLevel?: number;
    /** 总战力 */
    totalCap?: number;
    /** 家族名称 */
    familyName?: string;
    /** 家族ID */
    familyID?: number;
    /** 家族族长名称 */
    familyMasterName?: string;
    /** 家族族长ID */
    familyMasterID?: string;
    /** 创角时间*/
    createTime?: number;
    /** 完成新手 */
    isFinishedNewComer?: number;
    /** 新创建角色第一次登录进游戏为1，其他为0 */
    isNew?: number;
    /** 战力 */
    cap?: number;
}

/** 上报充值 数据格式 */
interface SDKPayDateTvo {
    /** qq平台的下单订单号 */
    qq_prepayId?: string;
    /** 支付金额（元），精确到小数点后两位 */
    total_fee?: string;
    /**	游戏方服务器创建的订单号（最大64位，必须唯一） */
    cp_orderno?: string;
    /** 游戏内购买的项目id，研发自定义，最好与充值文档的充值项id一致 */
    object_id?: string;
    /** 游戏内购买的项目名称，ios不同充值档请勿重名，安卓不强求 */
    object_name?: string;
    /** 游戏内购买的商品描述，此字段会显示给玩家看，请传正常的文字 */
    object_desc?: string;
    /** unix时间戳 */
    timestamp?: string;
}

/**接口返回码 */
interface SDKResultTvo {
    /**返回结果0：成功，1：失败，2：取消*/
    retCode: number;
}

/**分享数据 */
interface SDKShareTvo {
    /**分享人uid */
    shareUID?: number;
    /** 分享类型 */
    shareType?: number;
    /** 回调的参数 */
    parm?: any;
    shareTitle?: any;
    bigTitle?: any;
    shareUrl?: any;
}

/**SDK 用户信息 */
interface SDKUserInfoTvo {
    /**玩家openid */
    openid: string;
    /**玩家openkey */
    openkey: string;
    /**玩吧平台来源*/
    pf: string;
    /**2-IOS，1-安卓*/
    platform: string;
    /**玩吧 gameUID */
    gameUID: string;
    /**玩吧qua */
    qua: any;
    /**玩吧 AND-安卓，IPH-IOS */
    os: string;
    /**玩吧 via */
    via: string
}

/********微信登录返回数据START******** */
interface SDKWeixinBackTvo {
    retCode: number;
    err_msg: string;
    result: SDKWeiXinResultTvo;
}
interface SDKWeiXinResultTvo {
    user: SDKWeiXinUserTvo;
    shareInfo: SDKWeiXinShareInfoTvo;
}
interface SDKWeiXinUserTvo {
    openid: string;
    token: string;
    timestamp: string;
    sign: string;
}
interface SDKWeiXinShareInfoTvo {
    extraInfo: string;
    groupMsgInfos: string;
}
/********微信登录返回数据END******** */

/**SDK 进度条加载数据 */
interface SDKProgressTvo {
    /**进度条 */
    progress: number;
}
/*============================================数据接口===============================================*/