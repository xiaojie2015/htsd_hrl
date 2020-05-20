/**
 * loading常量
 */
class LoadingConst {
    public constructor() {

    }
    public static STAGE_WIDTH: number = 540;
    public static STAGE_HIEGHT:number = 960
    /** 调试模式 */
    public static DEBUG: boolean = false;
    /**☆ 版本号*/
    public static VER: string = "";
    /**☆ 模版版本号*/
    public static VER_TEMP: string = "";
    /**☆ 小游戏正式服版本号*/
    public static SERVER_VER_XYX: number = 99999999;
    /**☆ 小游戏本地版本号*/
    public static LOCAL_VER_XYX: number = 6;
    /** 正式服版本号 */
    public static SERVER_ROUTE: number = 0;
    /** 本地版本号 */
    public static LOCAL_ROUTE: number = 0;
    /** http 协议头*/
    public static HTTP_HEAD: string = "http://";
    /** 是否https*/
    private static _ISHTTPS: boolean = false;
    /**是否小游戏提审服 */
    public static IS_WX_AUDIT: boolean = false;
    public static get ISHTTPS(): boolean {
        return LoadingConst._ISHTTPS;
    }
    public static set ISHTTPS(val: boolean) {
        LoadingConst._ISHTTPS = val;
        if (val) {
            LoadingConst.HTTP_HEAD = "https://";
        } else {
            LoadingConst.HTTP_HEAD = "http://";
        }
    }
    /**是否跳过创角界面 */
    public static DIRECT_SELECT_ROLE:boolean = true;
    public static IS_PC: boolean = false;
    public static IS_MOBILE: boolean = false;
    /** 是否是微信小游戏 */
    public static IS_WXGAME: boolean = false;
    /** 是否是QQ小游戏 */
    public static IS_QQGAME: boolean = false;
    /** 是否是玩吧 */
    public static IS_WANBA: boolean = false;
    /** 是否是滚服玩家，true：滚服，false:非滚服 */
    public static IS_GUNFU: boolean;
    /**☆ 手机帧频*/
    public static MOBILE_FRAME_RATE: number = 30;
    /** config数据 */
    public static configData: HConfig;
    /** 屏蔽IOS充值相关界面数据 */
    public static iosHidePayUIData: HidePayUIConfig;
    /** 资源路径 */
    public static res_url: string = "resource/";
    /** 选服 */
    public static SELECTSERVER: string = "SelectServerFrame";
    /** 选角 */
    public static SELECTROLE: string = "SelectRoleFrame";
    /** 进度条背景地址 */
    public static PROG_BACK_URL: string = "eui_asset/Loading/loading_prog_back.png";
    /** 进度条进度地址 */
    public static PROG_THUMB_URL: string = "eui_asset/Loading/loading_prog.png";
    /** 进度条进度小图跑动地址 */
    public static PROG_THUMB_RUN_URL: string = "eui_asset/Loading/loading_prog_run.png";
    /** 玩吧loading背景图地址 */
    public static LOADING_BACK_URL: string = "eui_asset/Loading/loading_back.jpg";
    /** 默认loading背景图地址 */
    public static LOADING_BACK_OTHER_URL: string = "eui_asset/Loading/loading_back_other.jpg";
    /** loading背景图地址 */
    public static LOADING_BACK_PC_URL: string = "eui_asset/Loading/loading_back_pc.png";
    /** loading背景图地址 */
    public static LOADING_BACK_PC_OTHER_URL: string = "eui_asset/Loading/loading_back_pc_other.png";
    /** loadingPC扩展背景图地址 */
    public static LOADING_BIG_BACK_PC_URL: string = "eui_asset/Loading/loading_big_back_pc.jpg";
    /** 爱微游loading背景图地址 */
    public static LOADING_AWY_URL: string = "eui_asset/Loading/loading_awy.jpg";
    /** QQ大厅loading背景图地址 */
    public static LOADING_QQHALL_URL: string = "eui_asset/Loading/loading_qqhall.jpg";
    /** qq小游戏指引图地址 */
    public static LOADING_QQGAME_GUIDE_URL: string = "eui_asset/Loading/loading_qqgame_guide.png";
    /** 进度条背景 */
    public static PROG_BACK: string = "loading_prog_back";
    /** 进度条进度 */
    public static PROG_THUMB: string = "loading_prog";
    /** 进度条进度小图跑动 */
    public static PROG_THUMB_RUN: string = "loading_prog_run";
    /** loading背景图 */
    public static LOADING_BG: string = "loading_bg";
    /** loading背景banner图 */
    public static LOADING_BANNER: string = "loading_banner";
    /** loadingPC扩展背景图 */
    public static LOADING_BIG_BACK: string = "loading_big_back_pc";
    /** loadingPC创角扩展背景图 */
    public static LOADING_CR_BIG_BACK: string = "loading_cr_big_back_pc";
    /** qq小游戏指引图 */
    public static LOADING_QQGAME_GUIDE: string = "loading_qqgame_guide";
    /** loadingFrame组名 */
    public static LOADING_GROUP: string = "LoadingFrame";
    /** 用户协议组名 */
    public static USERAGREE_GROUP: string = "UserAgreement";
    /** 公告组 */
    public static NOTICE_GROUP: string = "NoticeGroup";
    /** 界面类型 */
    public static NOTICE_TYPE: number;
    /** 首次加载时间较长请耐心等待... */
    public static MSG_1: string = "首次加载时间较长请耐心等待...";
    /** 加载资源组错误!!!请检查网络 */
    public static MSG_2: string = "加载资源组错误!!!请检查网络";
    /** 暂无区服列表 */
    public static MSG_3: string = "暂无区服列表";
    /** 选择区服 */
    public static MSG_4: string = "选择区服";
    /** 点击选服 */
    public static MSG_5: string = "点击选服";
    /**☆ 预加载技能特效*/
    public static PRELOAD_SKILL_EFFECT: string = "skill_fsj999_1";
    /** 进入江湖 */
    public static NEWBIE: string = "NewbieFrame";
    /** 取名包 */
    public static NICK_NAME: string = "NickNameGroup";
    /**☆ 版本号描述*/
    public static VERSION: string = "版本号：1.";
    /**☆ 选服提示*/
    public static SELECT_SERVER_TIP: string = "正在请求区服...";
    /**☆ 区服名称*/
    public static SERVER_NAME: string = "";
    /**☆ 历史服务器*/
    public static HISTORY_SERVER: string = "历史服务器";
    /**☆ 服务器*/
    public static SERVER: string = "服";
    /**☆ 获取失败*/
    public static GET_ERROR: string = "获取区服列表失败!";
    /**无公告或实际过了的提示 */
    public static NOTICE_ISNULL:string = "暂未有更新的公告";

    /**☆ 回收对象*/
    public static disposeObject(obj: any): void {
        if (!obj) return;

        if (obj["parent"]) {
            obj.parent.removeChild(obj);
        }

        if (obj["dispose"]) {
            obj["dispose"]();
        }
    }

    /** 
	 * 获得字符串长度，双字节字符算2个长度
	 */
    public static getStringLength($str: string): number {
        if (!$str || $str.length == 0) return 0;

        let len: number = 0;

        let reg: RegExp = /[\x00-\xff]/;

        let char: string;

        for (let i = 0; i < $str.length; i++) {
            char = $str.charAt(i);

            if (reg.test(char)) {
                len += 1;
            }
            else {
                len += 2;
            }
        }

        return len;
    }
}

/** 登录服务器地址 */
let loginServer: string;

/** 根据登录参数获取登陆服务器地址 */
function getServerAdd(): string {
    if (!loginServer) {
        let params: string = getLoginServer();

        loginServer = params + "/client/";
    }

    return loginServer;
}
/**初始化URL */
function assembleURLParam(url: string): string {
    console.log("=====重组前的URL(接口调用)=====,url=" + url);
    url = hitalkOpenSdk.assembleURLParam(url);
    console.log("=====重组后的URL(接口调用)=====,url=" + url);
    return url;
}
/** 请求最近登录区服地址 */
function getRecentUrl(args: string): string {
    return getServerAdd() + "recent?" + args + "&cps=0" + (LoadingConst.DEBUG ? "&debug=1" : "") + (LoadingConst.ISHTTPS ? "&isHttps=1" : "");
}
/** 请求玩家的uid地址 params:id,openid*/
function getUIDUrl(sid: number, openid: string): string {
    return getServerAdd() + "uid?id=" + sid + "&openid=" + openid + "&cps=0" + (LoadingConst.DEBUG ? "&debug=1" : "") + "&r=" + Math.random();
}
/** 创建角色地址*/
function getCreatRoleUrl(sid: number, openid: string, channel_id: string, sex: number, name: string): string {
    return getServerAdd() + "name?id=" + sid + "&openid=" + openid + "&channelid=" + channel_id + "&cps=0" + "&sex=" + sex + "&name=" + name + (LoadingConst.DEBUG ? "&debug=1" : "") + "&r=" + Math.random();
}
/** 所有服务器列表地址 params:null */
function getAllServerListUrl(openid: string): string {
    return getServerAdd() + "all?openid=" + openid + "&cps=0" + (LoadingConst.DEBUG ? "&debug=1" : "") + (LoadingConst.ISHTTPS ? "&isHttps=1" : "") + "&r=" + Math.random();
}
/** 所有服务器列表地址 params:null */
window["getOpenIdUrl"] = function getOpenIdUrl(url: string): string {
    return getServerAdd() + "loginCheck?" + "cps=0" + url + (LoadingConst.DEBUG ? "&debug=1" : "") + (LoadingConst.ISHTTPS ? "&isHttps=1" : "") + "&r=" + Math.random();
}
/**获取公告信息 */
function getNoticeInfoUrl(ip:string,s:any,type:any = null):string{
   return getServerAdd() + "notice?debug=1&ip=" + ip + "&s=" + s + "&r=" + Math.random();
}
/** 请求版本地址 */
function getVersionUrl(): string {
    return getLoginServer() + "/ver/get";
}

let hitalkObj: HitalkObject;

/** 初始化url参数 */
function initURLParam(): void {
    hitalkObj = {};

    if (!LoadingConst.IS_WXGAME) {
        if (window.location.protocol.toLowerCase().indexOf("https:") >= 0)
            LoadingConst.ISHTTPS = true;

        var url = window.location.search; //获取url中"?"符后的字串

        var obj: any = {};

        if (url.indexOf("?") != -1) {
            var strs = url.substr(1).split("&");

            for (var i = 0; i < strs.length; i++) {
                var param = strs[i].split("=");

                obj[param[0]] = param[1];
            }
        }

        if (obj.server) {
            hitalkObj.loginServer = obj.server;
        }
        else if (LoadingConst.configData.loginServer) {
            hitalkObj.loginServer = LoadingConst.configData.loginServer;
        }

        hitalkObj.urlParam = obj;
    }
    else {
        hitalkObj.urlParam = {};

        if (LoadingConst.configData) {
            hitalkObj.loginServer = LoadingConst.configData.loginServer;

            LoadingConst.ISHTTPS = !!LoadingConst.configData.ishttps;

            hitalkObj.urlParam.openid = LoadingManager.$inst.userData.threePlatformId;
        }
    }
}
/**初始化创角参数 */
function assembleSelectRoleParams(nickName:string,sex:number):string{
    let id: number = LoadingManager.$inst.serverData.id;
    let openId: string = LoadingManager.$inst.userData.threePlatformId;
    let channel_id: string = LoadingManager.$inst.userData.channel_id;
    let name: string = encodeURI(nickName);

    let shareUID=hitalk.urlParam["shareUID"];
    let inviteId: string = hitalk.urlParam["inviteId"];
    
    let url: string = getCreatRoleUrl(id, openId, channel_id, sex, name);
    
    url=assembleURLParam(url);
    // let shareUID: number = LoadingManager.$inst.userData.shareUID || 0;
    
    if (shareUID) {
        //绑定分享人uid
        url += "&shareUID=" + shareUID;
    }

    if (inviteId) {
        url += "&inviteId=" + inviteId;
    }

    if (LoadingConst.IS_GUNFU) {
        //滚服玩家
        url += "&gf=1";
    }
    return url;
}
/**是否android TV渠道 */
function isMobile(): boolean {
    let useragent = window.navigator.userAgent;
    let index = useragent.toLowerCase().indexOf("android tv");

    let isAndroidTv = index >= 0;
    let isMobile = egret.Capabilities.isMobile;
    return isMobile && !isAndroidTv;
}
/** 屏蔽IOS充值相关界面数据 */
interface HidePayUIConfig {
    is_open: boolean;
    level: string;
    mission: string;
    open_date: string[];
    time_zones: string[];
    is_reach: boolean;
}

/** 配置对象 */
interface HConfig {
    /** 登录服地址 */
    loginServer?: string;
    /** 外部资源地址 */
    resource?: string;
    /** 是否是https请求 */
    ishttps?: boolean;
    /** 第三方平台openId */
    threePlatformId?: string;
    /** 是否是正式服 */
    release?: boolean;
}

/** 原hitalk.js对象 */
interface HitalkObject {
    /** url参数 */
    urlParam?: any;
    /** 登录服 */
    loginServer?: string;
}

/** 登录数据 */
interface UserData {
    channel_id?: string;
    /** 玩家账号唯一标识 */
    openid?: string;
    /** 第三方平台openId */
    threePlatformId?: string;
    /** 微信小游戏session_key */
    session_key?: string;
    offerId?: string;
    /** 分享方案id */
    materialID?: string;
    /** 分享人uid */
    shareUID?: number;
    /** 屏蔽“更多好玩”按钮的渠道"test1,test2" */
    hide_btn_channel_ids?: string;
}