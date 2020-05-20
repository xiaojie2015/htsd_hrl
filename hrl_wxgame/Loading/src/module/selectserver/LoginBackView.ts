/**
 * 登录背景图
 */
class LoginMyBackView extends LoadingMyBaseUI {
	private static _instance: LoginMyBackView;

	/** 背景图 */
	private backMyImg: eui.Image;
	/** 背景banner */
	private backBannerMyImg:eui.Image;
	/** 加载成功回调 */
	private completeMyFun: Function;
	private thisobjMy: any;
	/** 图片加载器 */
	private _imageMyLoader: egret.ImageLoader;
	/** 当前加载下标 */
	private _index: number;
	/** 加载地址数据 */
	private _urlMyList: any[];
	/** 加载完的图片数据 */
	private _textureMyDic: any;

	/** 对应渠道文本 */
	private channelMyTxt: eui.Label;

	public constructor() {
		super("LoginBackView");

		if (LoginMyBackView._instance) return;

		LoginMyBackView._instance = this;
	}

	public static get instance(): LoginMyBackView {
		return this._instance || new LoginMyBackView();
	}

	protected initMyView(): void {
		this.width = LoadingConst.STAGE_WIDTH;
		this.height = LoadingConst.STAGE_HIEGHT;
		this.touchEnabled = this.touchChildren = false;
		this.verticalCenter = this.horizontalCenter = 0;
	}
	private initChannelMyTxt() {
		if (this.channelMyTxt) return;
		this.channelMyTxt = new eui.Label();
		this.channelMyTxt.x = 0;
		this.channelMyTxt.y = 800;
		this.channelMyTxt.horizontalCenter = 0;
		this.channelMyTxt.textAlign = "center";
		this.channelMyTxt.textColor = hitalkOpenSdk.getChannelColor();
		this.channelMyTxt.size = 14;
		this.channelMyTxt.lineSpacing = 4;
		this.addChild(this.channelMyTxt);
		this.updateChannelMyTxt();
	}
	private updateChannelMyTxt(msg?: string) {
		this.channelMyTxt.text = msg || hitalkOpenSdk.getChannelTxt();
	}
	public showBackByMyName($name: string): void {
		if (!this.backMyImg) {
			this.backMyImg = new eui.Image();
			this.backMyImg.touchEnabled = false;
			// this.backImg.width = 660;
			// this.backImg.height = 880;
			this.backMyImg.horizontalCenter = 0;
			this.addChild(this.backMyImg);
			this.initChannelMyTxt();	
		}
		let texture: egret.Texture = this.getTextureMyByName($name);
		this.backMyImg.bottom = 0;
		this.backMyImg.texture = texture;
	}
	public showBackBannerByMyName($name: string): void {
		if (!this.backBannerMyImg) {
			this.backBannerMyImg = new eui.Image();
			this.backBannerMyImg.touchEnabled = false;
			// this.backImg.width = 660;
			// this.backImg.height = 880;
			this.backBannerMyImg.horizontalCenter = 3;
			this.addChild(this.backBannerMyImg);
		}
		let texture: egret.Texture = this.getTextureMyByName($name);
		this.backBannerMyImg.top = 440;
		this.backBannerMyImg.texture = texture;
	}
	private _scale: number = 1;
	public get scale(): number {
		return this._scale || 1;
	}

	/** 开始加载背景图 */
	public start($completeFun: Function, $thisobj: any): void {
		this.completeMyFun = $completeFun;

		this.thisobjMy = $thisobj;

		this._textureMyDic = {};
		this._urlMyList = [];

		if (LoadingConst.IS_MOBILE) {
			this._urlMyList.push({ type: LoadingConst.LOADING_BG, url: LoadingConst.res_url + hitalkOpenSdk.getLoadingBackUrl()});
		} else {
			this._urlMyList.push({ type: LoadingConst.LOADING_BG, url: LoadingConst.res_url + hitalkOpenSdk.getPCBigLoadingBackUrl()});
			// let pcbigurl = hitalkOpenSdk.getPCBigLoadingBackUrl();
			// if (pcbigurl) {
			// 	this._urlList.push({ type: LoadingConst.LOADING_BIG_BACK, url: LoadingConst.res_url + pcbigurl });
			// 	this._urlList.push({ type: LoadingConst.LOADING_CR_BIG_BACK, url: LoadingConst.res_url + "eui_asset/Loading/loading_cr_bigbg_pc.jpg" });
			// }
		}
		this._urlMyList.push({ type: LoadingConst.PROG_BACK, url: LoadingConst.res_url + LoadingConst.PROG_BACK_URL });
		this._urlMyList.push({ type: LoadingConst.PROG_THUMB, url: LoadingConst.res_url + LoadingConst.PROG_THUMB_URL });
		this._urlMyList.push({ type: LoadingConst.PROG_THUMB_RUN, url: LoadingConst.res_url + LoadingConst.PROG_THUMB_RUN_URL });
		if (LoadingConst.IS_QQGAME) {
			this._urlMyList.push({ type: LoadingConst.LOADING_QQGAME_GUIDE, url: LoadingConst.res_url + LoadingConst.LOADING_QQGAME_GUIDE_URL });
		}

		this._imageMyLoader = new egret.ImageLoader();
		this._imageMyLoader.addEventListener(egret.Event.COMPLETE, this.__onLoadMyFinishHandler, this);
		this._imageMyLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__onLoadMyFinishHandler, this);

		this._index = 0;

		this.loadMyNext();
	}


	private loadMyNext(): void {
		if (this._index >= this._urlMyList.length) {
			//加载完成
			if (this.completeMyFun) {
				this.completeMyFun.call(this.thisobjMy);
			}
			return;
		}

		if (this._index == 1) {
			hitalkOpenSdk.hideWxLoading();
			this.showBackByMyName(LoadingConst.LOADING_BG);
		}

		let data: any = this._urlMyList[this._index];

		if (this._imageMyLoader) {
			this._imageMyLoader.load(data.url + "?v=" + LoadingConst.LOCAL_ROUTE);
		}
	}

	/** 图片加载回调 */
	private __onLoadMyFinishHandler(e: egret.Event): void {
		if (this.destory) return;

		if (e.$type == egret.Event.COMPLETE) {
			let texture: egret.Texture = new egret.Texture();
			texture._setBitmapData(this._imageMyLoader.data);

			let data: any = this._urlMyList[this._index];

			this._textureMyDic[data.type] = texture;
		}

		this._index++;

		this.loadMyNext();
	}
	public loadMySingleImage(type: string, url: string,completeFun:Function,thisobj:any): void {
		if(!!this.getTextureMyByName(type)){
			if (completeFun) {
				completeFun.call(thisobj);
			}
			return;
		}
		this.completeMyFun=completeFun;
		this.thisobjMy=thisobj;
		this._urlMyList.push({ type: type, url: LoadingConst.res_url +url});
		let data: any = this._urlMyList[this._index];
		if (this._imageMyLoader) {
			this._imageMyLoader.load(data.url + "?v=" + LoadingConst.LOCAL_ROUTE);
		}
	}
	public getTextureMyByName($name: string): egret.Texture {
		if (this._textureMyDic) {
			return this._textureMyDic[$name];
		}

		return null;
	}
	public updateMyBanner(bannerType:number){
		// LoginBackView.instance.loadSingleImage(LoadingConst.LOADING_BANNER,hitalkOpenSdk.getLoadingBannerUrl(bannerType),this.__loadCompleteHandler,this);
	}
	private __loadCompleteMyHandler(){
		LoginMyBackView.instance.showBackBannerByMyName(LoadingConst.LOADING_BANNER);
	}
	public dispose(): void {
		LoginMyBackView._instance = null;
		if (this._imageMyLoader) {
			this._imageMyLoader.removeEventListener(egret.Event.COMPLETE, this.__onLoadMyFinishHandler, this);
			this._imageMyLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__onLoadMyFinishHandler, this);
		}
		this._imageMyLoader = null;

		LoadingConst.disposeObject(this.backMyImg);
		this.backMyImg = null;
		LoadingConst.disposeObject(this.channelMyTxt);
		this.channelMyTxt = null;

		if (this._textureMyDic) {
			let texture: egret.Texture;
			for (let name in this._textureMyDic) {
				texture = this._textureMyDic[name];
				texture && texture.dispose();

				delete this._textureMyDic[name];
			}
			texture = null;
		}
		this._textureMyDic = null;
		this._urlMyList && (this._urlMyList.length = 0);
		this._urlMyList = null;
		this.completeMyFun = null;
		this.thisobjMy = null;
		super.dispose();
	}
}