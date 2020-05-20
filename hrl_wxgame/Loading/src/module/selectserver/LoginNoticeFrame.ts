

/**
 * 登录公告/用户协议
 */
class LoadingMyNoticeFrame extends LoadingMyBaseUI {
	/**背景 */
	private bgMy: eui.Image;
	/**标题 */
	private titleMy: eui.Image;
	/** 关闭按钮 */
	private closeMyBtn: eui.Button;
	/**描述 */
	private describeMyTxt: eui.Label;
	/**文本滚动 */
	private txtMyScroller: eui.Scroller;
	private txtMyGroup: eui.Group;
	/** 当前区服数据 */
	private serverMyData: ServerInfo;
	public constructor() {
		super("LoadingNoticeFrame");
	}

	protected initMyView(): void {
		this.width = 490;
		this.height = 500;
		this.verticalCenter = -150;
		this.horizontalCenter = 0;

		this.bgMy = new eui.Image();
		this.bgMy.touchEnabled = false;
		this.bgMy.x = 17;
		this.bgMy.y = 54;
		this.bgMy.scale9Grid = new egret.Rectangle(55, 316, 331, 27);
		this.bgMy.height = 448;
		this.addChild(this.bgMy);

		this.titleMy = new eui.Image();
		this.titleMy.y = 58;
		this.titleMy.horizontalCenter = 0;
		this.titleMy.touchEnabled = false;
		this.addChild(this.titleMy);

		this.describeMyTxt = new eui.Label();
		this.describeMyTxt.textColor = 0x32384e;
		this.describeMyTxt.size = 16;
		this.describeMyTxt.width = 320;
		this.describeMyTxt.wordWrap = true;
		this.describeMyTxt.lineSpacing = 5;
		this.describeMyTxt.touchEnabled = false;
		this.describeMyTxt.text = "";

		this.addChild(this.describeMyTxt);

		this.txtMyGroup = new eui.Group();
		this.txtMyGroup.addChild(this.describeMyTxt);

		this.txtMyScroller = new eui.Scroller();
		this.txtMyScroller.anchorOffsetX = 0;
		this.txtMyScroller.anchorOffsetY = 0;
		this.txtMyScroller.width = 320;
		this.txtMyScroller.height = 360;
		this.txtMyScroller.x = 80;
		this.txtMyScroller.y = 120;
		this.txtMyScroller.viewport = this.txtMyGroup;
		this.addChild(this.txtMyScroller);

		this.closeMyBtn = new eui.Button();
		this.closeMyBtn.skinName = this.getMyCloseBtnSkin();
		this.closeMyBtn.x = 390;
		this.closeMyBtn.y = 65;
		this.addChild(this.closeMyBtn);

		let obj: any = LoadingManager.$inst.loginData;
		this.serverMyData = obj.s[0];
		if (this.serverMyData && FrameType.NOTICE === LoadingConst.NOTICE_TYPE) {
			this.loadMyNoticeInfoRequest();
		} else if (FrameType.AGREEMENT === LoadingConst.NOTICE_TYPE) {
			this.loadMyAgreementInfo();
		}
	}

	/**请求公告信息 */
	private loadMyAgreementInfo(): void {
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__loadMyUserAgreement, this);
		RES.loadGroup(LoadingConst.USERAGREE_GROUP);
	}

	/**加载用户协议 */
	private __loadMyUserAgreement(): void {
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__loadMyUserAgreement, this);
		this.describeMyTxt.text = RES.getRes("agreement_json")["useragree"];
		this.updaetMyView();
	}

	/**请求公告信息 */
	private loadMyNoticeInfoRequest(): void {
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__loadMyNotice, this);
		RES.loadGroup(LoadingConst.NOTICE_GROUP);
		let url: string = getNoticeInfoUrl(this.serverMyData.ip, 1, null);
		url = assembleURLParam(url);
		LoadMyRequest.sendMy(url, this.__onGetMyNoticeCompleteHander, this);
	}

	/**加载公告 */
	private __loadMyNotice(): void {
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__loadMyNotice, this);
		this.updaetMyView();
	}
	private updaetMyView() {
		this.bgMy.texture = RES.getRes("notice_json.notice_bg_png");
		this.titleMy.texture = RES.getRes("notice_json.notice_title_" + LoadingConst.NOTICE_TYPE + "_png");
	}
	private __onGetMyNoticeCompleteHander(val: any): void {
		try {
			let obj: any = JSON.parse(val);
			let isShow: boolean = obj["status"] > 0 ? true : false;//0不展示公告按钮  1  展示
			let desc = obj["desc"];
			if (isShow && desc) {
				this.describeMyTxt.textFlow = new egret.HtmlTextParser().parser(obj["desc"]);
				this.describeMyTxt.size = 16;
				this.describeMyTxt.textAlign = "left";
				this.txtMyScroller.x = 80;
			}
			else {
				this.describeMyTxt.horizontalCenter = 0;
				this.describeMyTxt.verticalCenter = 0;
				this.describeMyTxt.size = 22;
				this.describeMyTxt.textAlign = "center";
				this.txtMyScroller.x = 62;
				this.describeMyTxt.text = LoadingConst.NOTICE_ISNULL;
			}
		}
		catch (e) {
			this.describeMyTxt.text = LoadingConst.NOTICE_ISNULL;
			console.info("请求公告信息异常:", e);
		}

	}

	protected initMyData(): void {

	}
	protected initMyEvent(): void {
		this.closeMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__closeMyFrameHandler, this);
	}
	protected removeMyEvent(): void {
		this.closeMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__closeMyFrameHandler, this);
	}
	private __closeMyFrameHandler(e: egret.TouchEvent): void {
		this.hide();
	}
	/** 获取关闭按钮皮肤实例 */
	private getMyCloseBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = [];

		let img_1: eui.Image = new eui.Image();
		img_1.touchEnabled = false;
		img_1.source = "selectserver_json.alert_close_png";

		skin["img_1"] = img_1;

		skin.elementsContent = [img_1];
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("img_1", "y", -2)]), new eui.State("disabled", [])];
		return skin;
	}
	private hide(): void {
		if (this.parent)
			this.parent.removeChild(this);
	}
	public show(): void {
		!this.parent && LoadingMyLayer.instance.addToMyLayer(this, 1);
	}

	public dispose(): void {
		this.removeMyEvent();
		if (LoadingConst.NOTICE_TYPE === FrameType.AGREEMENT) {
			RES.destroyRes(LoadingConst.USERAGREE_GROUP);
		} else {
			RES.destroyRes(LoadingConst.NOTICE_GROUP);
		}
		LoadingConst.disposeObject(this.bgMy);
		this.bgMy = null;
		LoadingConst.disposeObject(this.closeMyBtn);
		this.closeMyBtn = null;
		LoadingConst.disposeObject(this.describeMyTxt);
		this.describeMyTxt = null;
		if (this.txtMyScroller) {
			this.txtMyScroller.stopAnimation();
			this.txtMyScroller.viewport = null;
			LoadingConst.disposeObject(this.txtMyScroller);
		}
		if (this.txtMyGroup) {
			LoadingConst.disposeObject(this.txtMyGroup);
			this.txtMyGroup = null;
		}
		this.serverMyData = null;
		super.dispose();
	}
}