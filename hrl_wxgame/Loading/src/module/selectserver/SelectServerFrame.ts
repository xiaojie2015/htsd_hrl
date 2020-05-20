/**
 * 选区界面
 */
class SelectMyServerFrame extends LoadingMyBaseUI {
	/** 开始游戏 */
	private startMyGameBtn: eui.Button;
	/** 火/新 */
	private hotMyImg: egret.Bitmap;
	/** 点击换服 */
	private clickMyChangeLabel: eui.Label;
	/** 点击换服 */
	private changeMyServerImg: egret.Bitmap;
	/** 当前区服 */
	private serverIdMyTxt: eui.Label;
	/** http请求 */
	private requestMy: egret.HttpRequest;
	/** 请求数据 */
	private responseMyData: any;
	/** 当前区服数据 */
	private serverMyData: ServerInfo;
	/** 更换区服弹窗 */
	private changeMyFrame: ChangeMyServerFrame;
	/** 错误次数 */
	private errorMyCount: number;
	/** 按钮特效 */
	private btnMyMc: LoadingMyMeanEffect;
	/** 进入游戏中 */
	private enterMyGameing: boolean;
	/** 版本号 */
	private versionMyTxt: eui.Label;
	/** 清理缓存 */
	private clearMyBtn: eui.Button;
	/** qq指引图片 */
	private qqguide: egret.Bitmap;
	/** 微信config */
	private wxMyConfig: { debug?: boolean, envVersion?: string };
	/*======================用户协议组件=============================*/
	/**勾选图片 */
	private selectMyBtn: eui.CheckBox;
	/** 打开用户协议 */
	private useragreementMyBtn: eui.Button;
	/**公告 */
	private noticeMyBtn: eui.Button;
	/**公告窗口 */
	private noticeMyFrame: LoadingMyNoticeFrame;
	/**用户窗口 */
	private userMyFrame: LoadingMyNoticeFrame;
	public constructor() {
		super("SelectServerFrame");
	}

	private createMyView(): void {
		this.width = LoadingConst.STAGE_WIDTH;
		this.height = LoadingConst.STAGE_HIEGHT;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.startMyGameBtn = new eui.Button();
		this.startMyGameBtn.skinName = this.getStartMyGameBtnSkin();
		this.startMyGameBtn.width = 219;
		this.startMyGameBtn.height = 73;
		this.startMyGameBtn.horizontalCenter = -10;
		this.startMyGameBtn.y = 740;
		this.addChild(this.startMyGameBtn);

		this.changeMyServerImg = new egret.Bitmap();
		this.changeMyServerImg.touchEnabled = true;
		this.changeMyServerImg.texture = RES.getRes("selectserver_json.selectserver_back2_png");
		this.changeMyServerImg.x = 69;
		this.changeMyServerImg.y = 636;
		this.addChild(this.changeMyServerImg);


		this.clickMyChangeLabel = new eui.Label();
		this.clickMyChangeLabel.touchEnabled = false;
		this.clickMyChangeLabel.size = 18;
		this.clickMyChangeLabel.textColor = 0xf1fcfd;
		this.clickMyChangeLabel.x = 350;
		this.clickMyChangeLabel.y = 655;
		this.clickMyChangeLabel.text = LoadingConst.MSG_5;
		this.addChild(this.clickMyChangeLabel);

		this.hotMyImg = new egret.Bitmap();
		this.hotMyImg.touchEnabled = false;
		this.hotMyImg.x = 130;
		this.hotMyImg.y = 656;
		this.addChild(this.hotMyImg);

		this.serverIdMyTxt = new eui.Label();
		this.serverIdMyTxt.size = 18;
		this.serverIdMyTxt.touchEnabled = false;
		this.serverIdMyTxt.textColor = 0xf1fcfd;
		// this.serverIdTxt.strokeColor = 0x010b14;
		// this.serverIdTxt.stroke = 1;
		this.serverIdMyTxt.width = 220;
		this.serverIdMyTxt.height = 18;
		this.serverIdMyTxt.x = 210;
		this.serverIdMyTxt.y = 657;
		this.addChild(this.serverIdMyTxt);

		this.versionMyTxt = new eui.Label();
		this.versionMyTxt.size = 16;
		this.versionMyTxt.touchEnabled = false;
		this.versionMyTxt.strokeColor = 0x010b14;
		this.versionMyTxt.stroke = 1;
		this.versionMyTxt.width = 480;
		this.versionMyTxt.height = 50;
		this.versionMyTxt.x = 4;
		this.versionMyTxt.y = 4;

		if (LoadingConst.IS_WXGAME) {
			this.clearMyBtn = new eui.Button();
			this.clearMyBtn.skinName = this.getclearMyBtnSkin();
			this.clearMyBtn.width = 50;
			this.clearMyBtn.height = 50;
			this.clearMyBtn.x = 90;
			this.clearMyBtn.y = 690;
			this.addChild(this.clearMyBtn);
		}
		if (LoadingConst.IS_QQGAME) {
			this.qqguide = new eui.Image();
			this.qqguide.texture = LoginMyBackView.instance.getTextureMyByName(LoadingConst.LOADING_QQGAME_GUIDE);
			this.qqguide.x = 180;
			this.qqguide.y = 40;
			this.addChild(this.qqguide);
		}

		this.noticeMyBtn = new eui.Button();
		this.noticeMyBtn.skinName = this.getNoticeMyBtnSkin();
		this.noticeMyBtn.width = 48;
		this.noticeMyBtn.height = 68;
		this.noticeMyBtn.x = 50;
		this.noticeMyBtn.y = 100;
		this.addChild(this.noticeMyBtn);
		this.initUserMyAgreement();
	}
	private resize(): void {
		var offsetY: number = 9;
		var scale: number = 1;
		this.startMyGameBtn.y = (710 + offsetY) * scale;

		this.changeMyServerImg.y = (645 + offsetY) * scale;

		this.clickMyChangeLabel.y = (655 + offsetY) * scale;

		this.hotMyImg.y = (652 + offsetY) * scale;

		this.serverIdMyTxt.y = (655 + offsetY) * scale;

		this.versionMyTxt.y = 4;
		if (this.stage) {
			this.scaleY = this.stage.stageHeight / LoadingConst.STAGE_HIEGHT;
			this.scaleX = this.scaleY;
		}
	}
	/**
		 * 获取公告按钮皮肤
		 */
	private getNoticeMyBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];
		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectserver_json.notice_btn_png");

		skin["img_1"] = img_1;

		skin.elementsContent = [img_1];
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("img_1", "x", 2), new eui.SetProperty("img_1", "y", 2),
		new eui.SetProperty("img_1", "scaleX", 0.92), new eui.SetProperty("img_1", "scaleY", 0.92)]),
		new eui.State("disabled", [])];
		return skin;
	}

	/** 获取开始按钮皮肤实例 */
	private getStartMyGameBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];

		let group: eui.Group = new eui.Group();
		group.touchChildren = false;
		group.touchEnabled = false;

		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectserver_json.selectserver_start_png");

		skin["mcDisplay"] = group;
		skin["back"] = img_1;
		skin["mcDisplay"].x = -30;
		skin["mcDisplay"].y = -2;

		skin.elementsContent = [img_1, group];
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("mcDisplay", "x", -18), new eui.SetProperty("mcDisplay", "y", 2),
		new eui.SetProperty("mcDisplay", "scaleX", 0.92), new eui.SetProperty("mcDisplay", "scaleY", 0.92), new eui.SetProperty("back", "x", 12), new eui.SetProperty("back", "y", 4),
		new eui.SetProperty("back", "scaleX", 0.92), new eui.SetProperty("back", "scaleY", 0.92)]), new eui.State("disabled", [])];
		return skin;
	}

	/** 获取清理缓存按钮皮肤实例 */
	private getclearMyBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];

		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectserver_json.clear_cache_png");

		skin["img_1"] = img_1;

		skin.elementsContent = [img_1];
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("img_1", "x", 2), new eui.SetProperty("img_1", "y", 2),
		new eui.SetProperty("img_1", "scaleX", 0.92), new eui.SetProperty("img_1", "scaleY", 0.92)]),
		new eui.State("disabled", [])];
		return skin;
	}

	protected initMyView(): void {
		this.createMyView();

		this.enterMyGameing = false;

		this.versionMyTxt.text = LoadingConst.VERSION + LoadingConst.VER + "." + LoadingConst.LOCAL_ROUTE;

		this.wxMyConfig = window["__wxConfig"] || {};

		if (this.wxMyConfig && this.wxMyConfig.debug) {
			this.versionMyTxt.text += " debug:true; envVer:" + (this.wxMyConfig.envVersion || "null");

			console.log(this.wxMyConfig);
		}

		LoadingConst.DEBUG = LoadingConst.DEBUG || this.wxMyConfig.debug || false;

		this.serverIdMyTxt.text = LoadingConst.SELECT_SERVER_TIP;

		// this.btnMc = new LoadingMeanEffect();

		// let textureArr: egret.Texture[] = [];
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_01_png"));
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_02_png"));
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_03_png"));
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_04_png"));
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_05_png"));
		// textureArr.push(RES.getRes("selectserver_json.selectserver_start_06_png"));

		// this.btnMc.textureData(textureArr);

		// this.btnMc.play();

		// if (this.startGameBtn["mcDisplay"]) {
		//this.startGameBtn["mcDisplay"].addChild(this.btnMc);
		// }

		this.addChildAt(LoginMyBackView.instance, 0);
	}

	protected initMyEvent(): void {
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.__addMyToStage, this);
		this.startMyGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__startMyGameHandler, this);
		this.changeMyServerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__changeMyServerHandkler, this);
		this.clearMyBtn && this.clearMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__clearMyCacheHandler, this);
		this.noticeMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__noticeMyBtnClickHandler, this);
	}

	protected removeMyEvent(): void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.__addMyToStage, this);
		this.startMyGameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__startMyGameHandler, this);
		this.changeMyServerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__changeMyServerHandkler, this);
		this.clearMyBtn && this.clearMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__clearMyCacheHandler, this);
		this.noticeMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__noticeMyBtnClickHandler, this);
	}
	protected initMyData(): void {
		this.responseMyData = LoadingManager.$inst.loginData;

		this.responseMyData && (this.serverMyData = this.responseMyData.s[0]);

		this.updateMyServer();
		console.log(window);
	}

	private updateMyServer(): void {
		if (!this.serverMyData) return;
		this.serverIdMyTxt.text = this.serverMyData.an;

		if (this.serverMyData.s == 2) {
			this.hotMyImg.texture = RES.getRes("selectserver_json.close_server_png");
		}
		else if (this.serverMyData.aid > LoadingManager.$inst.SERVER_MAX_ID - 5) {
			this.hotMyImg.texture = RES.getRes("selectserver_json.new_server_png");
		}
		else {
			this.hotMyImg.texture = RES.getRes("selectserver_json.hot_server_png");
		}
		this.updateMyBanner();
	}
	private __addMyToStage() {
		this.stage.addChild(this.versionMyTxt);
	}
	public show(): void {
		LoadingMyLayer.instance.addToMyLayer(this);

		this.resize();
	}

	private __noticeMyBtnClickHandler(e: egret.TouchEvent): void {
		LoadingConst.NOTICE_TYPE = FrameType.NOTICE
		if (!this.noticeMyFrame)
			this.noticeMyFrame = new LoadingMyNoticeFrame();
		this.noticeMyFrame.show();
	}

	/** 开始游戏 */
	private __startMyGameHandler(e: egret.TouchEvent): void {
		if (this.isOpenMyUserAgreement() && !this.selectMyBtn.selected) {
			LoadingMyAlert.show("请先勾选用户协议!");
			return;
		}
		if (!this.serverMyData) {
			LoadingMyAlert.show("请选择区服!");
			return;
		}

		if (this.serverMyData.s == 2 && !LoadingConst.DEBUG) {
			LoadingMyAlert.show(LoadingManager.$inst.getMsgPrompt(LoadingErrorType.TYPE_8));
			return;
		}

		if (!LoadingManager.$inst.userData.threePlatformId) {
			LoadingMyAlert.show("openId为空!");
			return;
		}

		if (this.enterMyGameing) return;

		try {
			let sound: egret.Sound = <egret.Sound>RES.getRes("click_mp3");

			if (sound) {
				sound.play(0, 1);
			}
		}
		catch (e) {
			console.error(e);
		}

		if (!this.checkMyNewServer()) {
			LoadingMyAlert.show("服务器人数已满");
			return;
		}
		this.enterMyGameing = true;
		LoadingManager.$inst.serverData = this.serverMyData;
		LoadingConst.SERVER_NAME = this.serverMyData.an;
		let openId: string = LoadingManager.$inst.userData.threePlatformId;

		let sid: number = this.serverMyData.id;

		let snkKey: number = hitalk.urlParam['snKey'];
		let zoneKey: string = hitalk.urlParam['zoneKey'];

		let url: string = getUIDUrl(sid, openId);
		url = assembleURLParam(url);

		if (snkKey) {
			//绑定分享人uid
			url += "&snKey=" + snkKey;
		}

		if (zoneKey) {
			//绑定分享人uid
			url += "&zoneKey=" + zoneKey;
		}

		//请求用户uid
		this.requestMy = new egret.HttpRequest();
		this.requestMy.responseType = egret.HttpResponseType.TEXT;
		this.requestMy.open(url, egret.HttpMethod.GET);
		this.requestMy.addEventListener(egret.Event.COMPLETE, this.__getUidMyCompleteHandler, this);
		this.requestMy.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__getUidMyErrorHandler, this);
		this.requestMy.send();
	}

	private checkMyNewServer(): boolean {
		//华圣要求 用户只能登历史服务器，以及新服
		if (hitalk.urlParam.snKey == "h0005") {
			let serverInfos: ServerInfo[] = LoadingManager.$inst.loginData.s;
			let len: number = serverInfos.length;
			for (let i: number = 0; i < len; i++) {
				if (serverInfos[i].id == this.serverMyData.id) {
					return true;
				}
			}
			return false;
		}
		return true;
	}

	/** 获取uid成功 */
	private __getUidMyCompleteHandler(e: egret.Event): void {
		this.requestMy.removeEventListener(egret.Event.COMPLETE, this.__getUidMyCompleteHandler, this);
		this.requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__getUidMyErrorHandler, this);

		let obj: any = JSON.parse(this.requestMy.response);

		if (obj) {
			let code: number = obj.c || 0;

			if (code == LoadingErrorType.TYPE_1) {
				LoadingManager.$inst.uid = parseInt(obj.u);
				LoadingManager.$inst.newbie = obj.newbie;
				LoadingManager.$inst.loginKey = obj.k;
				LoadingManager.$inst.ip = obj.cip;
				LoadingManager.$inst.port = obj.cpt;

				LoadingMyFrame.instance.setupMy();
				LoadingManager.$inst.enterGame();

				let roleId: string = LoadingManager.$inst.uid.toString();
				let serverId: number = LoadingManager.$inst.serverData.aid;

			}
			else if (code == LoadingErrorType.TYPE_7) {
				LoadingMyFrame.instance.setupMy();
				LoadingManager.$inst.enterSelectRole();
			}
			else {
				LoadingMyAlert.show(LoadingManager.$inst.getMsgPrompt(code), undefined, LoadingMyAlert.YES);

				this.enterMyGameing = false;
				return;
			}

			this.dispose();
		}
	}

	/** 获取uid失败 */
	private __getUidMyErrorHandler(e: egret.IOErrorEvent): void {
		if (this.destory) return;

		this.requestMy.removeEventListener(egret.Event.COMPLETE, this.__getUidMyCompleteHandler, this);
		this.requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__getUidMyErrorHandler, this);

		LoadingMyAlert.show("请尝试切换更好的网络环境!\nError Type:1014", undefined, LoadingMyAlert.YES);

		this.enterMyGameing = false;
	}

	/** 更换区服 */
	private __changeMyServerHandkler(e: egret.TouchEvent): void {
		if (!this.responseMyData || this.enterMyGameing) return;

		if (!this.changeMyFrame) {
			this.changeMyFrame = new ChangeMyServerFrame(this.responseMyData.s);
		}

		this.changeMyFrame.show(this.__serverMyChangeHandler, this);
	}

	/** 清理本地缓存 */
	private __clearMyCacheHandler(e: egret.TouchEvent): void {
		LoadingMyAlert.show("是否要清理本地缓存？", undefined, undefined, this.__confirmMyClearHandler, this);
	}

	/** 确定清理 */
	private __confirmMyClearHandler(): void {
		if (typeof hitalkOpenSdk.clearCache === 'function') {
			hitalkOpenSdk.clearCache();
		}
	}

	/** 区服更改 */
	private __serverMyChangeHandler($serverData: any): void {
		if ($serverData) {
			this.serverMyData = $serverData;

			this.updateMyServer();
		}
	}
	private updateMyBanner() {
		let charge = this.serverMyData.charge;
		if (isNaN(charge) || charge <= 0) {
			LoginMyBackView.instance.updateMyBanner(BannerType.CHARGE);
		} else {
			LoginMyBackView.instance.updateMyBanner(BannerType.VIP);
		}
	}
	private initUserMyAgreement() {
		if (!this.isOpenMyUserAgreement()) return;
		this.__loadMyUserAgreement();
	}

	private disposeMyUserAgreement() {
		if (!this.isOpenMyUserAgreement()) return;
		this.selectMyBtn.removeEventListener(egret.Event.CHANGE, this.__changeMySelectBtnHander, this);
		this.useragreementMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickMyUserBtnHander, this);
		LoadingConst.disposeObject(this.selectMyBtn);
		this.selectMyBtn = null;
		LoadingConst.disposeObject(this.useragreementMyBtn);
		this.useragreementMyBtn = null;

	}
	/** 获取用户协议按钮皮肤实例 */
	private getMyUseragreementBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];

		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectserver_json.core_line_1_png");
		img_1.x = 138;
		img_1.y = 20;
		img_1.width = 74;

		let txt_1: eui.Label = new eui.Label();
		txt_1.text = "我已阅读并同意\t用户协议"
		txt_1.textColor = 0x00f0ff
		txt_1.size = 20;
		txt_1.stroke = 1;
		txt_1.strokeColor = 0x000000;

		skin["line"] = img_1;
		skin["txt"] = txt_1;

		skin.elementsContent = [img_1, txt_1];
		return skin;
	}

	/** 获取用户协议勾选按钮皮肤实例 */
	private getMySelectBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];

		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectserver_json.check_btn_2_png");
		skin["img"] = img_1;

		skin.elementsContent = [img_1];
		return skin;
	}
	/**加载用户协议图 */
	private __loadMyUserAgreement(): void {
		this.useragreementMyBtn = new eui.Button();
		this.useragreementMyBtn.skinName = this.getMyUseragreementBtnSkin();
		this.useragreementMyBtn.x = 165;
		this.useragreementMyBtn.y = 797;
		this.addChild(this.useragreementMyBtn);
		this.useragreementMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__clickMyUserBtnHander, this);

		this.selectMyBtn = new eui.CheckBox();
		this.selectMyBtn.skinName = this.getMySelectBtnSkin();
		this.selectMyBtn.x = 140;
		this.selectMyBtn.y = 790;
		this.selectMyBtn.selected = true;
		this.addChild(this.selectMyBtn);
		this.selectMyBtn.addEventListener(egret.Event.CHANGE, this.__changeMySelectBtnHander, this);

	}
	private __changeMySelectBtnHander(evt: egret.Event) {
		let selectBtn: eui.CheckBox = evt.target;
		let img = selectBtn.getChildAt(0);
		if (selectBtn.selected) {
			img["texture"] = RES.getRes("selectserver_json.check_btn_2_png");
			img.x = 0;
			img.y = 0;
		} else {
			img["texture"] = RES.getRes("selectserver_json.check_btn_1_png");
			img.x = 0;
			img.y = 2;
		}
	}
	private __clickMyUserBtnHander(evt: egret.Event) {
		LoadingConst.NOTICE_TYPE = FrameType.AGREEMENT
		if (!this.userMyFrame)
			this.userMyFrame = new LoadingMyNoticeFrame();

		this.userMyFrame.show();
	}
	private isOpenMyUserAgreement() {
		return this.isWXminiChannel();
	}
	/** 是否wx小游戏渠道 */
	public isWXminiChannel() {
		if (!window["hitalkOpenSDK"]) return;
		return window["hitalkOpenSDK"].snKey === "h0011";
	}
	public dispose(): void {
		if (this.destory) return;

		this.removeMyEvent();

		LoadingConst.disposeObject(this.btnMyMc);
		this.btnMyMc = null;

		LoadingConst.disposeObject(this.startMyGameBtn);
		this.startMyGameBtn = null;

		LoadingConst.disposeObject(this.hotMyImg);
		this.hotMyImg = null;

		LoadingConst.disposeObject(this.clickMyChangeLabel);
		this.clickMyChangeLabel = null;

		LoadingConst.disposeObject(this.versionMyTxt);
		this.versionMyTxt = null;

		LoadingConst.disposeObject(this.changeMyServerImg);
		this.changeMyServerImg = null;

		LoadingConst.disposeObject(this.clearMyBtn);
		this.clearMyBtn = null;
		LoadingConst.disposeObject(this.qqguide);
		this.qqguide = null;

		if (this.serverIdMyTxt) {
			this.serverIdMyTxt.visible = false;
			LoadingConst.disposeObject(this.serverIdMyTxt);
			this.serverIdMyTxt = null;
		}

		LoadingConst.disposeObject(this.changeMyFrame);
		this.changeMyFrame = null;

		LoadingConst.disposeObject(this.noticeMyFrame);
		this.noticeMyFrame = null;

		LoadingConst.disposeObject(this.userMyFrame);
		this.userMyFrame = null;

		if (this.requestMy) {
			this.requestMy.removeEventListener(egret.Event.COMPLETE, this.__getUidMyCompleteHandler, this);
			this.requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__getUidMyErrorHandler, this);
		}
		this.requestMy = null;

		this.responseMyData = null;
		this.serverMyData = null;
		this.wxMyConfig = null;
		LoadingConst.disposeObject(this.noticeMyBtn);
		this.noticeMyBtn = null;
		this.disposeMyUserAgreement();
		super.dispose();
	}
}