/**
 * loading管理类
 */
class LoadingManager {
	private static _instance: LoadingManager;

	/** 全局舞台对象 */
	public static $stage: egret.Stage;
	/** 全局自身对象 */
	public static $inst: LoadingManager;

	/** 登录时平台传过来的平台昵称 */
	public name: string;
	/** 用户登录数据 */
	public userData: UserData;
	/** 登录数据 LoginManager */
	public loginData: any;
	/** 登录签证 LoginManager */
	public loginKey: string;
	/** 姓 */
	private fistName: string[];
	/** 男角色名 */
	private manName: string[];
	/** 女角色名 */
	private womenName: string[];
	/** 用户id PlayerManager */
	public uid: number;
	/** 是否过了新手 PlayerManager */
	public newbie: boolean;
	/**☆ 跨服聊天地址 ChatManager*/
	public ip: string;
	/**☆ 跨服聊天端口 ChatManager*/
	public port: number;
	/** 选中区服数据 LoginManager */
	public serverData: ServerInfo;
	/** 新注册角色 LoginManager */
	public isNew: boolean;
	/** 所有模板数据 TemplateManager */
	private _allTemplateData: any;
	/** 已开最大区服id LoginManager */
	public SERVER_MAX_ID: number;
	public constructor() {
		if (LoadingManager._instance) {
			return;
		}

		LoadingManager._instance = this;
	}

	public static get instance(): LoadingManager {
		return this._instance || new LoadingManager();
	}

	/** 设置模板 */
	public set allTemplateData(value: any) {
		if (!this._allTemplateData) {
			this._allTemplateData = value;
		}
		else {
			if (value.attrtemp) {
				if (!this._allTemplateData.attrtemp) {
					this._allTemplateData.attrtemp = value.attrtemp;
				}
				else {
					this.oto(value.attrtemp, this._allTemplateData.attrtemp);
				}
			}
			else {
				this.oto(value, this._allTemplateData);
			}
		}
	}

	private oto(sobj: any, tobj: any): void {
		for (let key in sobj) {
			tobj[key] = sobj[key];
		}
	}

	/**
	 * 所有模板数据
	 */
	public get allTemplateData(): any {
		return this._allTemplateData;
	}

	/** 根据性别获取昵称 */
	public getNickNameBySex($sex: number): string {
		let name: string = "";

		if (!this.fistName) {
			let nameLib: any = RES.getRes("nick_name_lib_json");
			if (nameLib) {
				this.fistName = nameLib.fistName.split(",");
				this.manName = nameLib.manName.split(",");
				this.womenName = nameLib.womenName.split(",");
			}
		}

		if (this.fistName && this.fistName.length > 0) {
			let index: number = Math.floor(Math.random() * this.fistName.length);

			name += this.fistName[index];

			let nameArr: string[] = $sex == 1 ? this.manName : this.womenName;

			index = Math.floor(Math.random() * nameArr.length);

			name += nameArr[index];
		}

		return name;
	}

	/** 获得消息提示 */
	public getMsgPrompt($code: number): string {
		switch ($code) {
			case LoadingErrorType.TYPE_1:
				return "成功!";
			case LoadingErrorType.TYPE_2:
				return "创角太频繁!";
			case LoadingErrorType.TYPE_3:
				return "角色名已存在!";
			case LoadingErrorType.TYPE_5:
				return "连接服务器失败!";
			case LoadingErrorType.TYPE_6:
			case LoadingErrorType.TYPE_11:
				return "已被封号!";
			case LoadingErrorType.TYPE_7:
				return "玩家未创建角色!";
			case LoadingErrorType.TYPE_8:
				return "服务器维护中!";
			case LoadingErrorType.TYPE_9:
				return "服务器尚未开放!";
			case LoadingErrorType.TYPE_1000:
				return "";//"角色名为2~6个汉字或4~12个字符";
			case LoadingErrorType.TYPE_1001:
				return "角色名为空!";
			case LoadingErrorType.TYPE_4:
			case LoadingErrorType.TYPE_1002:
				return "角色名含有非法字符!";
			case LoadingErrorType.TYPE_1003:
				return "角色名过短!";
			case LoadingErrorType.TYPE_1004:
				return "角色名过长!";
			case LoadingErrorType.TYPE_1005:
				return "您需要同意用户协议才能开始游戏";
			case LoadingErrorType.TYPE_1006:
				return "找不到历史服务器!";
			default:
				return "参数或服务器内部错误!";
		}
	}

	/**
	 * 进入选角界面
	 */
	public enterSelectRole(): void {
		LoadingManager.$inst.newbie = false;
		if (LoadingConst.DIRECT_SELECT_ROLE) {
			let selectRole: DirectSelectRole = new DirectSelectRole();
			selectRole.createName();
			return;
		}
		// let items: any[] = [];

		// items.push({ type: LoadingType.TYPE_1, groupName: LoadingConst.SELECTROLE });
		// LoadingFrame.instance.load(items, this.__loadSelectRoleHandler, this);
	}

	/** 默认选角 */
	private __loadSelectRoleHandler(): void {
		let selectRole: SelectMyRoleFrame = new SelectMyRoleFrame();

		selectRole.show();

		LoadingMyFrame.instance.pause();
	}

	/**
	 * 进入游戏
	 */
	public enterGame(): void {
		let items: any[] = [];

		items.push({ type: LoadingType.TYPE_5, url: "" });

		items.push({ type: LoadingType.RES_CONFIG, url: "default.res" + LoadingConst.VER + ".json", root: LoadingConst.res_url });
		items.push({ type: LoadingType.TYPE_6, url: LoadingConst.res_url + "default.thm" + LoadingConst.VER + ".json" });

		items.push({ type: LoadingType.TYPE_1, groupName: "preload" });

		if (!this.newbie) {
			// items.push({type:LoadingType.TYPE_4, url:LoadingConst.PRELOAD_SKILL_EFFECT});
			items.push({ type: LoadingType.TYPE_1, groupName: LoadingConst.NEWBIE });
			items.push({ type: LoadingType.TYPE_1, groupName: LoadingConst.NICK_NAME });
		}
		let header: string = LoadingConst.ISHTTPS ? "https://" : "http://";

		// let tpurl:string = header + this.serverData.tpurl + "/temp/tempInfos" + LoadingConst.VER_TEMP +".json";
		// items.push({type:LoadingType.TYPE_3, url:tpurl, ver:LoadingConst.VER, index:1});


		let tpurl: string = header + this.serverData.tpurl + "/temp/tempInfos1" + LoadingConst.VER_TEMP + ".json";
		items.push({ type: LoadingType.TYPE_3, url: tpurl, ver: LoadingConst.VER, index: 1 });

		tpurl = header + this.serverData.tpurl + "/temp/tempInfos2" + LoadingConst.VER_TEMP + ".json";
		items.push({ type: LoadingType.TYPE_3, url: tpurl, ver: LoadingConst.VER, index: 2 });

		tpurl = header + this.serverData.tpurl + "/temp/tempInfos3" + LoadingConst.VER_TEMP + ".json";
		items.push({ type: LoadingType.TYPE_3, url: tpurl, ver: LoadingConst.VER, index: 3 });

		tpurl = header + this.serverData.tpurl + "/temp/tempInfos4" + LoadingConst.VER_TEMP + ".json";
		items.push({ type: LoadingType.TYPE_3, url: tpurl, ver: LoadingConst.VER, index: 4 });

		LoadingMyFrame.instance.load(items, this.__loadCompleteHandler, this);
	}

	/** 资源加载成功 */
	private __loadCompleteHandler(): void {

		let loginMgr: any = egret.getDefinitionByName("LoginManager");

		loginMgr && loginMgr.instance.enterGame(this.allTemplateData);

		LoadingMyFrame.instance.dispose();
		LoginMyBackView.instance.dispose();
		LoadingMyAlert.instance.dispose();
		LoadingMyLayer.instance.dispose();
		LoadingMyFullView.instance.dispose();

		this.dispose();
	}

	public dispose(): void {
		this.name = null;
		this.loginData = null;
		this.loginKey = null;
		this.fistName && (this.fistName.length = 0);
		this.fistName = null;
		this.manName && (this.manName.length = 0);
		this.manName = null;
		this.womenName && (this.womenName.length = 0);
		this.womenName = null;
		this.uid = null;
		this.newbie = null;
		this.ip = null;
		this.port = null;
		this.serverData = null;
		this.isNew = null;
		this._allTemplateData = null;
		this.SERVER_MAX_ID = null;

		LoadingManager._instance = null;

		LoadingManager.$stage = null;
		LoadingManager.$inst = null;
	}
}