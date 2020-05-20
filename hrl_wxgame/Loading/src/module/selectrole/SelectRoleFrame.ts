/**
 * 选角界面
 */
class SelectMyRoleFrame extends LoadingMyBaseUI{
	/** 男角色 */
	private roleMyImg_1: eui.Image;
	/** 女角色 */
	private roleMyImg_2: eui.Image;
	/** 进入游戏 */
	private enterMyGameBtn: eui.Button;
	/** 昵称输入 */
	private nickMyNameTxt: eui.EditableText;
	/** 昵称背景 */
	private nameMyBackImg: eui.Image;
	/** 昵称文本 */
	private nameMyTxtImg: eui.Image;
	/** 男角 */
	private manMyBtn: eui.Image;
	/** 女角 */
	private womanMyBtn: eui.Image;
	/** 随机名字 */
	private randomMyBtn: eui.Button;
	/** 提示信息 */
	private msgMyTxt: eui.Label;
	/** 倒计时提示信息 */
	private timeEndMyTxt: eui.Label;
	/** 当前选中 */
	private selectMyIndex: number;
	/** 进入游戏中 */
	private enterMyGameing: boolean;
	/** http请求 */
	private requestMy: egret.HttpRequest;
	/** 倒计时 */
	private countMyDown: number;
	/** 倒计时时间（秒） */
	private MAX_TIME: number = 30;
	/** 按钮特效 */
	private btnMyMc: LoadingMyMeanEffect;
	/** 是否使用过平台名字 */
	private initMyName: boolean = false;
	/** 计时器 */
	private _time: egret.Timer;

	public constructor() {
		super("SelectRoleFrame");
	}

	private createMyView(): void {
		this.width = LoadingConst.STAGE_WIDTH;
		this.height = LoadingConst.STAGE_HIEGHT;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.roleMyImg_1 = new eui.Image();
		this.roleMyImg_1.touchEnabled = false;
		this.roleMyImg_1.x = this.roleMyImg_1.y = 0;
		this.roleMyImg_1.horizontalCenter=0;
		this.addChild(this.roleMyImg_1);

		this.roleMyImg_2 = new eui.Image();
		this.roleMyImg_2.touchEnabled = false;
		this.roleMyImg_2.x = this.roleMyImg_2.y = 0;
		this.roleMyImg_2.horizontalCenter=0;
		this.addChild(this.roleMyImg_2);

		this.enterMyGameBtn = new eui.Button();
		this.enterMyGameBtn.skinName = this.getStartMyGameBtnSkin();
		this.enterMyGameBtn.width = 219;
		this.enterMyGameBtn.height = 73;
		this.enterMyGameBtn.x = 96;
		this.enterMyGameBtn.y = 696;
		this.addChild(this.enterMyGameBtn);

		this.manMyBtn = new eui.Image();
		this.manMyBtn.source = "selectrole_json.select_role_sel2_png";
		this.manMyBtn.verticalCenter = 130;
		this.manMyBtn.horizontalCenter = -60;
		this.addChild(this.manMyBtn);

		this.womanMyBtn = new eui.Image();
		this.womanMyBtn.source = "selectrole_json.select_role_unsel1_png";
		this.womanMyBtn.verticalCenter = 130;
		this.womanMyBtn.horizontalCenter = 60;
		this.addChild(this.womanMyBtn);

		this.nameMyBackImg = new eui.Image();
		this.nameMyBackImg.touchEnabled = false;
		this.nameMyBackImg.source = "selectrole_json.select_role_namebg_png";
		this.nameMyBackImg.x = 54;
		this.nameMyBackImg.y = 636;
		this.addChild(this.nameMyBackImg);

		this.nameMyTxtImg = new eui.Image();
		this.nameMyTxtImg.touchEnabled = false;
		this.nameMyTxtImg.source = "selectrole_json.select_role_txt_png";
		this.nameMyTxtImg.x = 116;
		this.nameMyTxtImg.y = 652;
		this.addChild(this.nameMyTxtImg);

		this.nickMyNameTxt = new eui.EditableText();
		this.nickMyNameTxt.maxChars = 12;
		this.nickMyNameTxt.size = 20;
		// this.nickNameTxt.stroke = 1;
		// this.nickNameTxt.strokeColor = 0x010E19;
		this.nickMyNameTxt.text = "";
		this.nickMyNameTxt.textAlign = "center";
		this.nickMyNameTxt.textColor = 0x32384E;
		this.nickMyNameTxt.verticalAlign = "middle";
		this.nickMyNameTxt.width = 300;
		this.nickMyNameTxt.x = 98;
		this.nickMyNameTxt.y = 650;
		this.addChild(this.nickMyNameTxt);

		this.randomMyBtn = new eui.Button();
		this.randomMyBtn.x = 384;
		this.randomMyBtn.y = 636;
		this.randomMyBtn.skinName = this.getRandowmMyBtnSkin();
		this.addChild(this.randomMyBtn);

		this.msgMyTxt = new eui.Label();
		this.msgMyTxt.size = 16;
		// this.msgTxt.stroke = 1;
		// this.msgTxt.strokeColor = 0x031623;
		this.msgMyTxt.textAlign = "center";
		this.msgMyTxt.textColor = 0xD50000;
		this.msgMyTxt.touchEnabled = false;
		this.msgMyTxt.width = 250;
		this.msgMyTxt.height = 16;
		this.msgMyTxt.x = 123;
		this.msgMyTxt.y = 615;
		this.addChild(this.msgMyTxt);

		this.timeEndMyTxt = new eui.Label();
		this.timeEndMyTxt.size = 16;
		this.timeEndMyTxt.textAlign = "center";
		this.timeEndMyTxt.textColor = 0xD50000;
		this.timeEndMyTxt.touchEnabled = false;
		this.timeEndMyTxt.width = 250;
		this.timeEndMyTxt.height = 16;
		this.timeEndMyTxt.x = 123;
		this.timeEndMyTxt.y = 790;
		this.addChild(this.timeEndMyTxt);

		LoadingMyFullView.instance.updateMyBigBg(LoadingConst.LOADING_CR_BIG_BACK);
		LoginMyBackView.instance.updateMyBanner(BannerType.CHARGE);
		this.isHideMySexUI();
	}

	/** 获取进放游戏按钮皮肤实例 */
	private getStartMyGameBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = ["mcDisplay"];

		let group: eui.Group = new eui.Group();
		group.touchChildren = false;
		group.touchEnabled = false;

		let img_1: egret.Bitmap = new egret.Bitmap();
		img_1.touchEnabled = false;
		img_1.texture = RES.getRes("selectrole_json.select_role_enter_png");

		skin["mcDisplay"] = group;
		skin["back"] = img_1;
		skin["mcDisplay"].x = -30;
		skin["mcDisplay"].y = -2;

		skin.elementsContent = [img_1, group];
		
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("mcDisplay", "x", -18),new eui.SetProperty("mcDisplay", "y", 2),
		new eui.SetProperty("mcDisplay", "scaleX", 0.92),new eui.SetProperty("mcDisplay", "scaleY", 0.92),new eui.SetProperty("back", "x", 12),new eui.SetProperty("back", "y", 4),
		new eui.SetProperty("back", "scaleX", 0.92),new eui.SetProperty("back", "scaleY", 0.92)]), new eui.State("disabled", [])];

		return skin;
	}

	/** 获取随机取名按钮皮肤实例 */
	private getRandowmMyBtnSkin(): eui.Skin {
		let skin: eui.Skin = new eui.Skin();
		skin.skinParts = [];

		let img_1: eui.Image = new eui.Image();
		img_1.touchEnabled = false;
		img_1.source = "selectrole_json.select_role_random_png";
		skin["backimg"] = img_1;

		skin.elementsContent = [img_1];
		skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("backimg", "x", 3),new eui.SetProperty("backimg", "y", 3),
		new eui.SetProperty("backimg", "scaleX", 0.92),new eui.SetProperty("backimg", "scaleY", 0.92)]), new eui.State("disabled", [])];
		return skin;
	}

	protected initMyView(): void {
		this.createMyView();

		this.enterMyGameing = false;

		this.countMyDown = 0;

		this.btnMyMc = new LoadingMyMeanEffect();

		let textureArr: egret.Texture[] = [];
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_png"));
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_02_png"));
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_03_png"));
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_04_png"));
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_05_png"));
		textureArr.push(RES.getRes("selectrole_json.selectrole_start_06_png"));

		this.btnMyMc.textureMyData(textureArr);

		this.btnMyMc.playMy();

		if (this.enterMyGameBtn["mcDisplay"]) {
			this.enterMyGameBtn["mcDisplay"].addChild(this.btnMyMc);
		}

		this.requestMy = new egret.HttpRequest();
		this.requestMy.responseType = egret.HttpResponseType.TEXT;
		this.requestMy.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		this._time = new egret.Timer(1000);

	}

	protected initMyEvent(): void {
		this.manMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__roleMyChangeHandler, this);
		this.womanMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__roleMyChangeHandler, this);
		this.randomMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__randomMyNameNickHandler, this);
		this.nickMyNameTxt.addEventListener(egret.FocusEvent.FOCUS_IN, this.__focusInMyTxtHandler, this);
		this.nickMyNameTxt.addEventListener(egret.FocusEvent.FOCUS_OUT, this.__focusOutMyTxtHandler, this);
		this.enterMyGameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__enterGameMyHandler, this);

		this.requestMy.addEventListener(egret.Event.COMPLETE, this.__onCompleteMyHandler, this);
		this.requestMy.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__onIOErrorMyHandler, this);

		this._time.addEventListener(egret.TimerEvent.TIMER, this.__countDownMyHandler, this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.resize,this);
	}

	protected removeMyEvent(): void {
		this.manMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__roleMyChangeHandler, this);
		this.womanMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__roleMyChangeHandler, this);
		this.randomMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__randomMyNameNickHandler, this);
		this.nickMyNameTxt.removeEventListener(egret.FocusEvent.FOCUS_IN, this.__focusInMyTxtHandler, this);
		this.nickMyNameTxt.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.__focusOutMyTxtHandler, this);
		this.enterMyGameBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__enterGameMyHandler, this);
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.resize,this);

		this._time && this._time.stop();
		this._time.removeEventListener(egret.TimerEvent.TIMER, this.__countDownMyHandler, this);
	}

	protected initMyData(): void {
		this.manMyBtn.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);

		this._time.start();
	}
	private resize(): void
	{
		if(this.stage){
			this.scaleY=this.stage.stageHeight/LoadingConst.STAGE_HIEGHT;
			this.scaleX=this.scaleY;
		}
	}
	private static isReportFirstLogin:boolean=false;
	/**首次登录上报-要求玩家在创角界面有所点击后会进行上报，但是由于一进入创角界面会派发一个点击事件。所以这里要做限制。 */
	private static isFirstClick:boolean=false;
	/**首次登录上报 */
	private reportMyFirstLogin(){
		if(!LoadingConst.IS_GUNFU && !SelectMyRoleFrame.isReportFirstLogin){
			SelectMyRoleFrame.isReportFirstLogin=true;
			var params={
				openid:hitalk.urlParam.openid
			}
			hitalkOpenSdk.firstLogin(params);
		}
	}
	/** 更改角色 */
	private __roleMyChangeHandler(e: egret.TouchEvent): void {

		this.selectMyIndex = e.currentTarget == this.manMyBtn ? 0 : 1;

		egret.Tween.removeTweens(this.roleMyImg_1);
		egret.Tween.removeTweens(this.roleMyImg_2);

		if (this.selectMyIndex == 0) {
			if(LoadingConst.IS_MOBILE){
				this.roleMyImg_1.source = hitalkOpenSdk.getCreateRoleBgUrl(1);
			}else{
				this.roleMyImg_1.source = hitalkOpenSdk.getCreateRolePCBgUrl(1);
			}		
			egret.Tween.get(this.roleMyImg_1).to({ alpha: 1 }, 200);
			egret.Tween.get(this.roleMyImg_2).to({ alpha: 0 }, 200);

			this.manMyBtn.texture = RES.getRes("selectrole_json.select_role_sel2_png");
			this.womanMyBtn.texture = RES.getRes("selectrole_json.select_role_unsel1_png");
		}
		else {
			if(LoadingConst.IS_MOBILE){
				this.roleMyImg_2.source = hitalkOpenSdk.getCreateRoleBgUrl(2);
			}else{
				this.roleMyImg_2.source = hitalkOpenSdk.getCreateRolePCBgUrl(2);
			}		

			egret.Tween.get(this.roleMyImg_1).to({ alpha: 0 }, 200);
			egret.Tween.get(this.roleMyImg_2).to({ alpha: 1 }, 200);

			this.manMyBtn.texture = RES.getRes("selectrole_json.select_role_unsel2_png");
			this.womanMyBtn.texture = RES.getRes("selectrole_json.select_role_sel1_png");
		}

		this.__randomMyNameNickHandler(null);

		this.updateMyMsg(LoadingErrorType.TYPE_1000);
	}

	/** 随机起名 */
	private __randomMyNameNickHandler(e: egret.TouchEvent): void {
		if (this.enterMyGameing) return;
		if (SelectMyRoleFrame.isFirstClick) {
            this.reportMyFirstLogin();
        }
        SelectMyRoleFrame.isFirstClick = true;
		if (!this.initMyName) {
			this.initMyName = true;

			if (LoadingManager.instance.name) {
				this.nickMyNameTxt.text = LoadingManager.instance.name;

				return;
			}
		}

		this.nickMyNameTxt.text = LoadingManager.instance.getNickNameBySex(this.selectMyIndex + 1);

		this.updateMyMsg(LoadingErrorType.TYPE_1000);
	}

	/** 文本获得焦点 */
	private __focusInMyTxtHandler(e: egret.FocusEvent): void {
		this.reportMyFirstLogin();
		this.countMyDown = this.MAX_TIME;

		this.updateMyMsg(LoadingErrorType.TYPE_1000);
	}

	/** 文本失去焦点 */
	private __focusOutMyTxtHandler(e: egret.FocusEvent): void {
		this.resetMyCountDown();
	}

	/** 进入游戏 */
	private __enterGameMyHandler(e: egret.TouchEvent): void {
		if (this.enterMyGameing) return;
		this.reportMyFirstLogin();
		let nickName: string = this.nickMyNameTxt.text.trim();

		if (nickName.length == 0) {
			this.updateMyMsg(LoadingErrorType.TYPE_1001);
			this.resetMyCountDown();
			return;
		}

		let reg: RegExp = /[^\u4e00-\u9fa50-9a-zA-Z_]/g;

		if (reg.test(nickName)) {
			this.updateMyMsg(LoadingErrorType.TYPE_1002);
			this.resetMyCountDown();
			return;
		}

		let len: number = LoadingConst.getStringLength(nickName);

		if (len < 4) {
			this.updateMyMsg(LoadingErrorType.TYPE_1003);
			this.resetMyCountDown();
			return;
		}

		if (len > 12) {
			this.updateMyMsg(LoadingErrorType.TYPE_1004);
			this.resetMyCountDown();
			return;
		}

		this.setMyEntering(true);

    	let sex: number = this.selectMyIndex + 1;
		let url=assembleSelectRoleParams(nickName,sex);
		this.requestMy.open(url, egret.HttpMethod.GET);
		this.requestMy.send();
	}

	/** 起名结果返回 */
	private __onCompleteMyHandler(e: egret.Event): void {
		let result: any = JSON.parse(this.requestMy.response);
		console.log("起名结果返回:"+JSON.stringify(result));
		if (result) {
			let code: number = result.c || 0;
			if (code != LoadingErrorType.TYPE_1) {
				this.updateMyMsg(code);
				this.resetMyCountDown();
				this.setMyEntering(false);
			}
			else {
				LoadingManager.$inst.uid = parseInt(result.u);
				LoadingManager.$inst.loginKey = result.k;
				LoadingManager.$inst.ip = result.cip;
				LoadingManager.$inst.port = result.cpt;

				LoadingManager.$inst.isNew = true;
				LoadingMyFrame.instance.setupMy();

				LoadingManager.$inst.enterGame();

				let name: string = this.nickMyNameTxt ? this.nickMyNameTxt.text : "";
				let roleId: string = LoadingManager.$inst.uid.toString();
				let serverId: number = LoadingManager.$inst.serverData.aid;


				this.dispose();
			}
		}
	}

	/** 倒计时 */
	private __countDownMyHandler(): void {
		if (this.enterMyGameing || this.countMyDown >= this.MAX_TIME) return;

		this.countMyDown++;
		this.timeEndMyTxt.text=(this.MAX_TIME-this.countMyDown)+"秒后自动踏入仙途 ";
		if (this.countMyDown >= this.MAX_TIME) {
			this.__enterGameMyHandler(null);
		}
	}

	/** 重置倒计时 */
	private resetMyCountDown(): void {
		this.countMyDown = 0;
	}

	/** IO_ERROR */
	private __onIOErrorMyHandler(e: egret.IOErrorEvent): void {
		this.updateMyMsg(LoadingErrorType.TYPE_5);
		this.resetMyCountDown();
		this.setMyEntering(false);
	}

	/** 更新提示信息 */
	private updateMyMsg($code: number = 1000): void {
		this.msgMyTxt.text = LoadingManager.instance.getMsgPrompt($code);
	}

	private setMyEntering(enter: boolean): void {
		this.enterMyGameing = enter;
		this.manMyBtn.touchEnabled = this.womanMyBtn.touchEnabled = !enter;
	}
	/**是否隐藏性别按钮 */
	private isHideMySexUI(){
		if(!LoadingConst.IS_WX_AUDIT)return;
		this.womanMyBtn.visible=false;
		this.manMyBtn.visible=false;
	}
	public show(): void {
		LoadingMyLayer.instance.addToMyLayer(this);
	}

	public dispose(): void {
		if (this.destory) return;
		LoadingMyFullView.instance.updateMyBigBg(LoadingConst.LOADING_BIG_BACK);
		this.removeMyEvent();

		egret.Tween.removeTweens(this.roleMyImg_1);
		egret.Tween.removeTweens(this.roleMyImg_2);

		if (LoadingConst.IS_WXGAME) {
			RES.destroyRes("select_role_wxgame1_jpg");
			RES.destroyRes("select_role_wxgame2_jpg");
		} else {
			RES.destroyRes("select_role_1_jpg");
			RES.destroyRes("select_role_2_jpg");
		}		

		this.roleMyImg_1 && this.roleMyImg_1.texture && this.roleMyImg_1.texture.dispose();

		LoadingConst.disposeObject(this.roleMyImg_1);
		this.roleMyImg_1 = null;

		this.roleMyImg_2 && this.roleMyImg_2.texture && this.roleMyImg_2.texture.dispose();
		LoadingConst.disposeObject(this.roleMyImg_2);
		this.roleMyImg_2 = null;

		LoadingConst.disposeObject(this.btnMyMc);
		this.btnMyMc = null;

		LoadingConst.disposeObject(this.enterMyGameBtn);
		this.enterMyGameBtn = null;

		LoadingConst.disposeObject(this.nameMyBackImg);
		this.nameMyBackImg = null;
		LoadingConst.disposeObject(this.nameMyTxtImg);
		this.nameMyTxtImg = null;

		LoadingConst.disposeObject(this.nickMyNameTxt);
		this.nickMyNameTxt = null;

		LoadingConst.disposeObject(this.manMyBtn);
		this.manMyBtn = null;

		LoadingConst.disposeObject(this.womanMyBtn);
		this.womanMyBtn = null;

		LoadingConst.disposeObject(this.randomMyBtn);
		this.randomMyBtn = null;

		LoadingConst.disposeObject(this.msgMyTxt);
		this.msgMyTxt = null;

		LoadingConst.disposeObject(this.timeEndMyTxt);
		this.timeEndMyTxt = null;

		if (this.requestMy) {
			this.requestMy.removeEventListener(egret.Event.COMPLETE, this.__onCompleteMyHandler, this);
			this.requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__onIOErrorMyHandler, this);
		}
		this.requestMy = null;

		this._time = null;

		super.dispose();
	}
}