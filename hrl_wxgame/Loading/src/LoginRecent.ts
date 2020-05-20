/**
 * 登录,新号跳过选区
 */
class LoginMyRecent {
	/** http请求 */
	private requestMy: egret.HttpRequest;
	/** 是否已销毁*/
	protected destory: boolean = false;
	/** 请求数据 */
	private responseMyData: any;
	/** 当前区服数据 */
	private serverMyData: ServerInfo;

	public constructor() {

	}

	public start(): void {
		LoadingMyFrame.instance.totalMyProg = 50;
		this.injectMyOpenId();
		this.loginMyCallBack(getAllURLParam());
	}
	/**根据平台注入OpenId */
	private injectMyOpenId() {
		let openid = hitalkOpenSdk.getUserOpenId();
		if (openid) {
			let sn = hitalkOpenSdk.getSN();
			console.log(sn + "渠道--重组openid,重组前openid=" + hitalk.urlParam["openid"]);
			hitalk.urlParam["openid"] = openid
			console.log("玩吧平台--注入openid" + openid);
		}
	}
	private loginMyCallBack(data: any): void {
		if (!data || data == "undefined") return;
		try {
			let obj: any = typeof data === "string" ? JSON.parse(data) : data;

			let param: string;
			if (window["dchwFinger"] && window["dchwFinger"].ImelCode) {
				var code = window["dchwFinger"].ImelCode();
				obj.deviceid = code;
				// console.log("华为设备号" + code);
			}
			//调试设备号
			if (hitalk.urlParam.devicedebug) {
				obj.deviceid = "12054510278512851246121";
			}
			if (hitalk.urlParam && hitalk.urlParam.snKey) {
				obj.snKey = hitalk.urlParam.snKey;
			}
			for (let key in obj) {
				if (key === "sn") continue;
				if (param) {
					param += "&" + key + "=" + obj[key];
				}
				else {
					param = key + "=" + obj[key];
				}
			}
			LoadingMyFrame.instance.totalMyProg = 70;
			let url: string = getRecentUrl(param);
			url = assembleURLParam(url);
			LoadMyRequest.sendMy(url, this.__onGetMyCompleteHandler, this);
		}
		catch (e) {
			LoadingMyAlert.show("请尝试切换更好的网络环境!\nError Type:1012", undefined, LoadingMyAlert.YES);
		}
	}

	/** 请求历史登录区服数据成功 */
	private __onGetMyCompleteHandler(val: any): void {
		try {
			let obj: any = JSON.parse(val);

			let code: number = obj.c || 0;

			if (code == LoadingErrorType.TYPE_1 && obj.s) {
				this.responseMyData = obj;

				LoadingManager.$inst.loginData = obj;

				LoadingManager.$inst.userData.threePlatformId = this.responseMyData.openid;

				LoadingManager.$inst.name = hitalkOpenSdk.getUserName() || obj.name;

				LoadingManager.$inst.SERVER_MAX_ID = this.responseMyData.ct || 1;

				this.responseMyData.s = hitalkOpenSdk.changeServerName(this.responseMyData.s);
				this.serverMyData = this.responseMyData.s[0];
				LoadingConst.SERVER_NAME = this.serverMyData.an;
				if (!this.serverMyData) {
					LoadingMyAlert.show(LoadingManager.$inst.getMsgPrompt(LoadingErrorType.TYPE_1006), undefined, LoadingMyAlert.YES);
					return;
				}
				LoadingMyFullView.instance.show();

				if (this.responseMyData.s.length > 1 || !this.serverMyData.isnew) {
					LoadingConst.IS_GUNFU = true;
					this.loadMyServerFrame();
				}
				else {
					LoadingConst.IS_GUNFU = false;
					this.startMyGame();
				}
				//window.platform.showGameClub();
			}
			else {
				LoadingMyAlert.show(LoadingManager.$inst.getMsgPrompt(LoadingErrorType.TYPE_1006), undefined, LoadingMyAlert.YES);
			}
		}
		catch (e) {
			LoadingMyAlert.show("请尝试切换更好的网络环境!\nError Type:1012", undefined, LoadingMyAlert.YES);
		}
	}

	private loadMyServerFrame(): void {
		LoadingMyFrame.instance.totalMyProg = 100;

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupMyCompletHandler, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupMyErrorHandler, this);

		RES.loadGroup(LoadingConst.SELECTSERVER);
	}

	private __groupMyCompletHandler(e: RES.ResourceEvent): void {
		if (e.groupName != LoadingConst.SELECTSERVER) return;

		this.showMyServerFrame();
	}

	private __groupMyErrorHandler(e: RES.ResourceEvent): void {
		if (e.groupName == LoadingConst.SELECTSERVER) {
			console.info("mp3 load error");//部分浏览器声音文件会加载失败

			this.showMyServerFrame();
		}
	}

	private showMyServerFrame(): void {
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupMyCompletHandler, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupMyErrorHandler, this);

		let frame: SelectMyServerFrame = new SelectMyServerFrame();
		frame.show();

		LoadingMyFrame.instance.pause();

		this.dispose();
	}

	/** 请求区服数据失败 */
	private __onGetMyIOErrorHandler(e: egret.IOErrorEvent): void {
		LoadingMyAlert.show("请尝试切换更好的网络环境!\nError Type:1013", undefined, LoadingMyAlert.YES);
	}

	private startMyGame(): void {
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
		LoadingManager.$inst.serverData = this.serverMyData;

		let openId: string = LoadingManager.$inst.userData.threePlatformId;

		let sid: number = this.serverMyData.id;
		let url: string = getUIDUrl(sid, openId);
		let snkKey: number = hitalk.urlParam['snKey'];
		let zoneKey: string = hitalk.urlParam['zoneKey'];

		url = assembleURLParam(url);
		if (snkKey) {
			//绑定分享人uid
			url += "&snKey=" + snkKey;
		}

		if (zoneKey) {
			//绑定分享人uid
			url += "&zoneKey=" + zoneKey;
		}
		LoadMyRequest.sendMy(url, this.__getUidCompleteHandler, this);

	}

	/** 获取uid成功 */
	private __getUidCompleteHandler(val: any): void {
		let obj: any = JSON.parse(val);

		if (obj) {
			let code: number = obj.c || 0;

			if (code == LoadingErrorType.TYPE_1) {
				LoadingManager.$inst.uid = parseInt(obj.u);
				LoadingManager.$inst.newbie = obj.newbie;
				LoadingManager.$inst.loginKey = obj.k;
				LoadingManager.$inst.ip = obj.cip;
				LoadingManager.$inst.port = obj.cpt;

				LoadingManager.$inst.enterGame();
			}
			else if (code == LoadingErrorType.TYPE_7) {
				LoadingManager.$inst.enterSelectRole();
			}
			else {
				LoadingMyAlert.show(LoadingManager.instance.getMsgPrompt(code), undefined, LoadingMyAlert.YES);
				return;
			}
			this.dispose();
		}
	}

	/** 获取uid失败 */
	private __getUidMyErrorHandler(e: egret.IOErrorEvent): void {
		if (this.destory) return;
		LoadingMyAlert.show("请尝试切换更好的网络环境!\nError Type:1014", undefined, LoadingMyAlert.YES);
	}

	public dispose(): void {
		if (this.destory) return;

		this.destory = true;


		this.responseMyData = null;
		this.serverMyData = null;
	}
}