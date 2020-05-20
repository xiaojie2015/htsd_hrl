/**
 * 小loading
 */
class SmallLoading extends eui.Group {
    /** 标识位 */
    private flag: number;
    /** 错误次数 */
    private errorCount: number;

    public constructor() {
        super();

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            // egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // egret.ticker.resume();
        }

        this.runMyGame();
    }
    private runMyGame(): void {
        egret.ImageLoader.crossOrigin = "anonymous";
        LoadingConst.IS_MOBILE = isMobile();
        if (LoadingConst.IS_MOBILE) {
            egret.TextField.default_fontFamily = "SimHei";
            egret.TextField.default_bold = false;
            egret.TextField.offset_size = 2;
        } else {
            egret.TextField.default_fontFamily = "SimSun";
            egret.TextField.default_bold = true;
            egret.TextField.offset_size = 2;

            egret.DisplayObject.prototype["hitalk$setX"] = egret.DisplayObject.prototype.$setX;
            egret.DisplayObject.prototype["hitalk$setY"] = egret.DisplayObject.prototype.$setY;
            egret.DisplayObject.prototype.$setX = function (value) {
                return this["hitalk$setX"](~~value);

            };
            egret.DisplayObject.prototype.$setY = function (value) {
                return this["hitalk$setY"](~~value);

            };
        }

        LoadingConst.LOCAL_ROUTE = window.local_route || 0;

        this.flag = 0;

        $hitalkJs(this.getinfo, this);
        hitalkOpenSdk.checkUpdate();
        if (LoadingConst.IS_MOBILE) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_NARROW;
            this.stage.orientation = egret.OrientationMode.PORTRAIT;
            if (!this.is60FrameChannel()) {
                this.stage.frameRate = LoadingConst.MOBILE_FRAME_RATE;
            }
        } else {
            if (LoadingConst.IS_PC || egret.Capabilities.boundingClientHeight >= 868) {
                this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
            } else {
                this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            }
        }
        console.log(this.stage.frameRate);

        LoadingMyLayer.instance.initMy(this.stage);

        LoadingManager.$stage = this.stage;

        LoadingManager.$inst = LoadingManager.instance;

        if (!LoadingConst.IS_WXGAME) {
            LoadingConst.configData = {};
        } else {
            // var gm_version=window["__wxConfig"].envVersion;
            // if (gm_version + "" === "undefined" || gm_version + "" === "develop" || gm_version + "" === "trial"){
            //     hitalk_config.resource = hitalk_config.resourceTest;
            // }else{
            //     hitalk_config.resource = hitalk_config.resourceFormal;
            // }
            LoadingConst.configData = hitalk_config;
        }
        this.startLoader();
    }
    /**是否需要60帧 */
    public is60FrameChannel() {
        switch (hitalk.curPlatform) {
            case ChannelType.HWGAME:
                return true;
            default: return false;
        }
    }
    /** 开始加载 */
    private startLoader(): void {

        if (LoadingConst.configData.resource) {
            LoadingConst.res_url = LoadingConst.configData.resource;
        }

        LoadingMyLayer.instance.addChild(LoginMyBackView.instance);

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.errorCount = 0;

        //先把loading背景图片及logo加载进来
        LoginMyBackView.instance.start(this.onLoginBackComplete, this);

        hitalkOpenSdk.getUserInfoCompat(this.stage.width, this.__userInfoComplete.bind(this));

        // setTimeout(this.showLogoComplete.bind(this), 1000);
    }

    // /** 显示1秒logo */
    // private showLogoComplete():void
    // {
    //     this.flag |= 1;

    //     this.allComplete();
    // }

    /** 背景图加载回调 */
    private onLoginBackComplete(): void {
        this.flag |= 1;
        this.flag |= 2;

        this.allComplete();
    }

    /** 获取用户信息回调 */
    private __userInfoComplete($loginData: any): void {
        if (!$loginData) {
            this.errorCount++;

            if (this.errorCount > 5) {
                LoadingMyAlert.show("网络异常，请切换网络进行重试", "提示", LoadingMyAlert.YES);
                // window.platform.showAlert("网络异常，请切换网络进行重试", false);
            }
            else {
                LoadingMyAlert.show("连接失败，点击\"确定\"重新连接", "提示", LoadingMyAlert.YES, this.__reRequestHandler, this);
                // window.platform.showAlert("连接失败，点击\"确定\"重新连接", false, this.__reRequestHandler.bind(this));
            }

            return;
        }

        this.flag |= 4;

        LoadingManager.$inst.userData = this.initWxUserInfo($loginData);

        this.allComplete();
    }

    /** 重新请求登录接口 */
    private __reRequestHandler(res): void {
        if (res.confirm) {
            hitalkOpenSdk.getUserInfoCompat(this.stage.width, this.__userInfoComplete.bind(this));
        }
    }

    private getinfo(): void {
        this.flag |= 8;
        this.allComplete();
        // this.start();
    }
    /** 都准备完成 */
    private allComplete(): void {
        if (this.flag < 15) return;

        LoadingMyFrame.instance.setupMy();

        LoadingMyFrame.instance.totalMyProg = 10;

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        // RES.loadConfig("default.res"+ LoadingConst.VER +".json", LoadingConst.res_url);
        RES.loadConfig("loading.res" + LoadingConst.VER + ".json", LoadingConst.res_url);
    }

    private initWxUserInfo(loginData: any): UserData {
        /** 微信登录数据 */
        let userObj: UserData = {};

        if (loginData && loginData.extend) {
            let extend: any = loginData.extend;

            extend.platformID && (userObj.channel_id = extend.platformID);

            extend.openid && (userObj.openid = extend.openid);

            extend.session_key && (userObj.session_key = extend.session_key);

            extend.offerId && (userObj.offerId = extend.offerId);

            loginData.materialID && (userObj.materialID = loginData.materialID);

            loginData.shareUID && (userObj.shareUID = loginData.shareUID);

            if (LoadingConst.configData.threePlatformId && LoadingConst.configData.threePlatformId != "") {
                userObj.threePlatformId = LoadingConst.configData.threePlatformId;
            }
            else if (loginData.cmgePlayerId) {
                userObj.threePlatformId = loginData.cmgePlayerId;
            }
        }

        return userObj;
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        // RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupLoadComplete, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupLoadErrHandler, this);

        // LoadingFrame.instance.totalProg = 30;

        // RES.loadGroup(LoadingConst.LOADING_GROUP);
        LoadingMyFrame.instance.totalMyProg = 30;
        // if(LoadingConst.IS_WXGAME && !LoadingConst.configData.release) {
        //     LoadingFrame.instance.parent && LoadingFrame.instance.parent.removeChild(LoadingFrame.instance);
        //     let loginView:LoginView = new LoginView();
        //     loginView.show(this.__loginCallBack.bind(this));
        // } else {
        this.__loginMyCallBack();
        // }
    }

    /** 资源组加载完成 */
    // private __groupLoadComplete(e:RES.ResourceEvent):void
    // {
    //     RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupLoadComplete, this);
    // 	RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupLoadErrHandler, this);

    //     if(LoadingConst.IS_WXGAME && !LoadingConst.configData.release)
    //     {
    //         LoadingFrame.instance.parent && LoadingFrame.instance.parent.removeChild(LoadingFrame.instance);

    //         let loginView:LoginView = new LoginView();

    //         loginView.show(this.__loginCallBack.bind(this));
    //     }
    //     else
    //     {
    //         this.__loginCallBack();
    //     }
    // }

    /** 登录页返回 */
    private __loginMyCallBack(): void {
        !LoadingMyFrame.instance.parent && LoadingMyLayer.instance.addToMyLayer(LoadingMyFrame.instance);

        initURLParam();

        LoadingConst.DEBUG = getUrlParameter("debug") == "1";

        //开始登录
        new LoginMyRecent().start();

        this.dispose();
    }

    /** 资源组加载错误 */
    private __groupLoadErrHandler(e: RES.ResourceEvent): void {
        LoadingMyFrame.instance.msgMyTxt.text = LoadingConst.MSG_2;
    }
    public dispose() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}


