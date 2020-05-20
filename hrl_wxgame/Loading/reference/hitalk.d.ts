
declare interface Window 
{
    /** 平台接口 */
    platform: Platform;
    /** 根据服务器版本和本地版本返回登录服和资源服务器地址 */
    getLoginData:(serverrout:number, localrout:number) => HConfig;
    /** 是否是凡人飞仙传-微信小游戏 */
    is_frfxz_wxgame:boolean;
    /** 客户端本地版本号 */
    local_route:number;
}

/** 加载主代码(非微信小游戏环境) */
declare function loadMainCode(callback:Function):void;
/**海拓时代专用SDK */
declare var hitalkOpenSdk:HitalkOpenSdk;