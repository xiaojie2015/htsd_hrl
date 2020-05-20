/**
 * 加载界面
 */
class LoadingMyFrame extends LoadingMyBaseUI 
{
	private static _instance:LoadingMyFrame;
	/** 进度条背景 */
	private prog_Myback:egret.Bitmap;
	/** 进度条背景2 */
	private prog_Myback2:egret.Bitmap;
	/** 总加载进度条 */
	private totalProg_Myimg:eui.Image;
	/** 当前加载进度条 */
	private currProg_Myimg:eui.Image;
	/** 总加载进度条小图跑动 */
	private totalProg_run_Myimg:eui.Image;
	/** 当前加载进度条小图跑动 */
	private currProg_run_Myimg:eui.Image;
	/** 总加载进度 */
	private totalProgMyTxt:eui.Label;
	/** 当前加载进度 */
	private currProgMyTxt:eui.Label;
	/** 提示消息 */
	public msgMyTxt:eui.Label;
	/** 需要加载内容 */
	private items:any[];

	private callMyFun:Function;
	private thisMyObj:any;
	private params:any[];

	private currMyIndex:number;
	private currMyData:any;
	private progMaxMyWidth:number;

	private intMyStep:number;
	private stepMyProg:number;
	/** 当前进度 */
	private _currMyProg:number;
	/** 目标进度 */
	private _totalMyProg:number;

	private loopMyFrame:number;
	/** 位移数 */
	private step:number;
	/** 免费赠送技能 */
	private cardMyImg:eui.Image;
	/** 获得技能 */
	private getMyImg:eui.Image;
	/**是否切换资源加载方式 */
	private isChangeMyRes:boolean=false;

	public constructor() 
	{
		super("LoadingFrame");

		if(LoadingMyFrame._instance) return;

		LoadingMyFrame._instance = this;
	}

	private createMyView():void
	{
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.width = LoadingConst.STAGE_WIDTH;
		this.height = LoadingConst.STAGE_HIEGHT;
		this.touchEnabled = this.touchChildren = false;

		this.prog_Myback = new egret.Bitmap();
		this.prog_Myback.x = 60;
		this.prog_Myback.y = 701;
		this.addChild(this.prog_Myback);

		this.prog_Myback2 = new egret.Bitmap();
		this.prog_Myback2.x = 60;
		this.prog_Myback2.y = 743;
		this.addChild(this.prog_Myback2);

		this.msgMyTxt = new eui.Label();
		this.msgMyTxt.size = 18;
		this.msgMyTxt.textColor = 0x2a2a2a;
		this.msgMyTxt.textAlign = "center";
		this.msgMyTxt.width = 300;
		this.msgMyTxt.height = 16;
		this.msgMyTxt.horizontalCenter = 0;
		this.msgMyTxt.y = 777;
		this.addChild(this.msgMyTxt);

		this.totalProg_Myimg = new eui.Image();
		this.totalProg_Myimg.width = 424;
		this.totalProg_Myimg.height = 8;
		this.totalProg_Myimg.x = 60;
		this.totalProg_Myimg.y = 704;
		this.addChild(this.totalProg_Myimg);

		this.currProg_Myimg = new eui.Image();
		this.currProg_Myimg.width = 424;
		this.currProg_Myimg.height = 8;
		this.currProg_Myimg.x = 60;
		this.currProg_Myimg.y = 746;
		this.addChild(this.currProg_Myimg);

		this.totalProg_run_Myimg = new eui.Image();
		this.totalProg_run_Myimg.width = 73;
		this.totalProg_run_Myimg.height = 53;
		this.totalProg_run_Myimg.x = 60;
		this.totalProg_run_Myimg.y = 663;
		this.addChild(this.totalProg_run_Myimg);

		this.currProg_run_Myimg = new eui.Image();
		this.currProg_run_Myimg.width = 73;
		this.currProg_run_Myimg.height = 53;
		this.currProg_run_Myimg.x = 60;
		this.currProg_run_Myimg.y = 707;
		this.addChild(this.currProg_run_Myimg);

		this.totalProgMyTxt = new eui.Label();
		this.totalProgMyTxt.size = 16;
		this.totalProgMyTxt.textColor = 0xd8d0d0;
		this.totalProgMyTxt.strokeColor = 0x010a14;
		this.totalProgMyTxt.textAlign = "center";
		this.totalProgMyTxt.stroke = 1;
		this.totalProgMyTxt.width = 100;
		this.totalProgMyTxt.height = 16;
		this.totalProgMyTxt.horizontalCenter = 0;
		this.totalProgMyTxt.y = 700;
		this.addChild(this.totalProgMyTxt);
	}

    protected initMyView(): void
    {
		this.createMyView();
		this.progMaxMyWidth = 424;

		this.msgMyTxt.text = LoadingConst.MSG_1;
		
		let thumb:egret.Texture = LoginMyBackView.instance.getTextureMyByName(LoadingConst.PROG_BACK);

		this.prog_Myback.texture = thumb;

		this.prog_Myback2.texture = thumb;

		thumb = LoginMyBackView.instance.getTextureMyByName(LoadingConst.PROG_THUMB);

		this.totalProg_Myimg.texture = thumb;

		this.currProg_Myimg.texture = thumb;

		thumb = LoginMyBackView.instance.getTextureMyByName(LoadingConst.PROG_THUMB_RUN);

		this.totalProg_run_Myimg.texture = thumb;

		this.currProg_run_Myimg.texture = thumb;
	}
	
	private resize(): void
	{
		var offsetY: number = -32
		var scale: number = 1;
		this.prog_Myback.y = (701 + offsetY) * scale;

		this.prog_Myback2.y = (743 + offsetY) * scale;

		this.msgMyTxt.y = (777 + offsetY) * scale;

		this.totalProg_Myimg.y = (702 + offsetY) * scale;

		this.currProg_Myimg.y = (744 + offsetY) * scale;

		this.totalProg_run_Myimg.y = (663 + offsetY) * scale;

		this.currProg_run_Myimg.y = (707 + offsetY) * scale;

		this.totalProgMyTxt.y = (700 + offsetY) * scale;

		if(this.stage){
			this.scaleY=this.stage.stageHeight/LoadingConst.STAGE_HIEGHT;
			this.scaleX=this.scaleY;
		}
	}

	protected removeMyEvent():void
	{
		LoadingManager.$stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterMyFrameHandler,this);

		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupLoadMyComplete, this);
		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupMyLoadErr, this);
	}

	protected initMyData():void
	{
		
	}

	public static get instance():LoadingMyFrame
	{
		return this._instance || new LoadingMyFrame();
	}

	/** 启动 */
	public setupMy():void
	{
		this.loopMyFrame = 0;
		this._currMyProg = 0;
		this._totalMyProg = 0;

		// this.showSkillCard(); //新手领取技能，奖励

		this.updateMyProgBar(this._currMyProg);

		LoadingManager.$stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterMyFrameHandler, this);

		//LoginBackView.instance.showBackByName(LoadingConst.LOADING_BG_CHARGE);
		
		this.addChildAt(LoginMyBackView.instance, 0);

		!this.parent && LoadingMyLayer.instance.addToMyLayer(this);

		this.resize();
	}

	/** 暂停 */
	public pause():void
	{
		LoadingManager.$stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterMyFrameHandler, this);

		this.parent && this.parent.removeChild(this);
	}

	/** 是否显示免费领取技能卡 */
	private showSkillMyCard():void
	{
		if(!LoadingManager.$inst.isNew) return;

		this.step = 1;

		// this.cardImg = new eui.Image();
		// this.cardImg.texture = RES.getRes("selectrole_json.loading_skill_gift_png");
		// this.cardImg.x = 280;
		// this.cardImg.y = 480;
		// this.cardImg.touchEnabled = false;
		// this.cardImg.visible = false;
		// this.addChild(this.cardImg);

		// this.getImg = new eui.Image();
		// this.getImg.texture = RES.getRes("selectrole_json.loading_get_skill_png");
		// this.getImg.x = 215;
		// this.getImg.y = 580;
		// this.getImg.touchEnabled = false;
		// this.getImg.visible = false;
		// this.addChild(this.getImg);
	}

	/** 
	 * 开始加载
	 */
	public load($items:any[], $callFun?:Function, $thisObj?:any, $param?:any[]):void
	{
		if(!$items || $items.length == 0) return;

		this.items = $items;
		this.callMyFun = $callFun;
		this.thisMyObj = $thisObj;
		this.params = $param;

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.__groupLoadMyComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.__groupMyLoadErr, this);
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.__configMyComplete, this);

		this.currMyIndex = -1;
		this.currMyData = null;

		this.intMyStep = this._totalMyProg;
		this.stepMyProg = parseFloat((((100 - this._totalMyProg) / this.items.length).toFixed(1)));

		this.loadMyNext();
	}

	/** 加载一下个 */
	private loadMyNext():void
	{
		this.currMyIndex ++;

		if(this.currMyIndex >= this.items.length)
		{
			egret.Tween.get(this).wait(300).call(this.__loadMyOver, this);
			return;
		}

		this._currMyProg = this._totalMyProg;
		this.totalMyProg = this.intMyStep + ((this.currMyIndex + 1) * this.stepMyProg);

		this.currMyData = this.items[this.currMyIndex];

		if(this.currMyData.type == LoadingType.TYPE_1)	//加载组
		{
			console.log("1.加载组:"+this.currMyData.url);
			RES.loadGroup(this.currMyData.groupName);
		}
		else if(this.currMyData.type == LoadingType.TYPE_2)	//加载皮肤
		{
			console.log("2.加载皮肤:"+this.currMyData.url);
			// EXML.load(this.currData.url, this.__skinLoadComplete, this);
		}
		else if(this.currMyData.type == LoadingType.TYPE_3)	//加载模板
		{
			console.log("3.加载模板:"+this.currMyData.url);
			let loader:any = egret.getDefinitionByName("LoaderManager");
			
			loader && loader.instance.load(this.currMyData.url, this.__urlResourceMyLoadComplete, this);

			!loader && console.log("找不到 LoaderManager");
		}
		else if(this.currMyData.type == LoadingType.TYPE_4)	//加载技能效果
		{
			console.log("4.加载技能效果:"+this.currMyData.url);
			let eff:any = egret.getDefinitionByName("EffectSheetCache");

			eff && eff.instance.getEffectSheet(this.currMyData.url, this.__skillLoadComplete, this);

			!eff && console.log("找不到 EffectSheetCache");
		}
		else if(this.currMyData.type == LoadingType.TYPE_5)	//加载代码
		{
			console.log("5.加载代码:"+this.currMyData.url);
			this.startLoadMyCode();
		}
		else if(this.currMyData.type == LoadingType.RES_CONFIG)	//加载代码
		{
			console.log("8.资源配置:"+this.currMyData.url);
			RES.loadConfig(this.currMyData.url,this.currMyData.root);
		}	
		else if(this.currMyData.type == LoadingType.TYPE_6)	//加载主题皮肤
		{
			console.log("6.加载主题皮肤:"+this.currMyData.url);
			let theme = new eui.Theme(this.currMyData.url, LoadingManager.$stage);

            theme.addEventListener(eui.UIEvent.COMPLETE, this.__onThemeMyLoadComplete, this);
		}
	}

	/** 技能效果加载完成 */
	private __skillLoadComplete(val:any): void
    {
        if(this.currMyData.url != val.key) return;

		this.loadMyNext();
    }

	/** 主题皮肤加载完成 */
	private __onThemeMyLoadComplete(e:eui.UIEvent):void
	{
		let target = e.currentTarget;

        target && target.removeEventListener(eui.UIEvent.COMPLETE, this.__onThemeMyLoadComplete, this);

		this.loadMyNext();
	}

	/** 加载组成功 */
	private __groupLoadMyComplete(e:RES.ResourceEvent):void
	{
		if(e.groupName == this.currMyData.groupName)
		{
			this.loadMyNext();
		}
	}
	private __configMyComplete(e:RES.ResourceEvent): void
	{
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.__configMyComplete, this);
		this.loadMyNext();
	}

	/** 加载皮肤成功 */
	private __skinLoadMyComplete(clazz:any, url:string):void
	{
		if(this.destory) return;

		if(this.currMyData.url == url)
		{
			this.loadMyNext();
		}
	}

	/** 加载资源成功 */
	private __urlResourceMyLoadComplete(lvo:any):void
	{
		if(this.destory) return;
		
		if(lvo && lvo.data)
		{
			if(this.currMyData && this.currMyData.type == LoadingType.TYPE_3)
			{
				LoadingManager.$inst.allTemplateData = lvo.data;
			}
		}

		this.loadMyNext();
	}

	/** 加载资源错误 */
	private __urlResourceMyLoadError():void
	{
		if(this.destory) return;
		this.isChangeMyRes=true;
		this.currMyIndex --;
		this.loadMyNext();
	}

	/** 加载组错误 */
	private __groupMyLoadErr(e:RES.ResourceEvent):void
	{
		if(e.groupName == this.currMyData.groupName)
		{
			LoadingMyAlert.show("加载受阻，请尝试切换更好的网络环境!\nError Type:" + this.currMyData.groupName);
		}
	}

	/** 加载代码 */
	private startLoadMyCode():void
	{
		hitalkOpenSdk.loadSubpackage(this.__codeCompleteMyHandler.bind(this));
	}

	/** 加载代码成功 */
	private __codeCompleteMyHandler(res:boolean):void
	{
		if(!res)
		{
			LoadingMyAlert.show("加载受阻，请尝试切换更好的网络环境!\nError Type:1005");
			return;
		}

		let loginMgr:any = egret.getDefinitionByName("LoginManager");

		loginMgr && loginMgr.instance.initMgr(LoadingManager.$stage, LoadingManager.$inst);

		this.loadMyNext();
	}

	/** 加载完成 */
	private __loadMyOver():void
	{
		let _callFun:Function = this.callMyFun;
		let _thisObj:any = this.thisMyObj;
		let _param:any[] = this.params;

		if(_callFun)
		{
			_callFun.apply(_thisObj, _param);
		}
	}

	/** 更新进度条 */
	private __enterMyFrameHandler():void
	{
		if(!this.initFinish || this.destory) return;

		this.loopMyFrame ++;

		this.updateMyTotalProg();

		this.updateMyFalseProg();

		this.updateMyCardImg();
	}

	/** 更新总进度 */
	private updateMyTotalProg():void
	{
		if(this.loopMyFrame % 2 == 0 && this._currMyProg < this._totalMyProg)
		{
			this._currMyProg ++;

			this.updateMyProgBar(this._currMyProg);
		}
	}

	/** 更新进度条 */
	private updateMyProgBar(prog:number):void
	{
		this.totalProgMyTxt && (this.totalProgMyTxt.text = prog + "%");

		prog = Math.floor(this.progMaxMyWidth * prog * 0.01);

		let rect = this.totalProg_Myimg.$scrollRect || new egret.Rectangle(0, 0, 0, 0);
		
		rect.setTo(0, 0, prog, this.totalProg_Myimg.height);

		this.totalProg_Myimg.scrollRect = rect;

		this.totalProg_run_Myimg.x = rect.width - 12;
	}

	/** 更新假进度条 */
	private updateMyFalseProg():void
	{
		//更新第二个假进度条
		if(this.loopMyFrame >= 110)
		{
			this.loopMyFrame = 0;
		}

		let prog:number = Math.min(this.progMaxMyWidth, this.progMaxMyWidth * this.loopMyFrame * 0.01);

		let rect = this.currProg_Myimg.$scrollRect || new egret.Rectangle(0, 0, 0, 0);
		
		rect.setTo(0, 0, Math.floor(prog), this.currProg_Myimg.height);

		this.currProg_Myimg.scrollRect = rect;

		this.currProg_run_Myimg.x = rect.width - 12;
	}

	/** 更新卡片上下移动 */
	private updateMyCardImg():void
	{
		// if(this.cardImg)
		// {
		// 	if(this._currProg >= 1 && !this.getImg.visible)
		// 	{
		// 		this.cardImg.visible = true;

		// 		this.cardImg.y += this.step;

		// 		if(this.cardImg.y < 480) this.step = 1;
		// 		if(this.cardImg.y > 490) this.step = -1;
		// 	}

		// 	if(this._currProg >= 70 && this.cardImg.visible)
		// 	{
		// 		this.cardImg.visible = false;

		// 		this.getImg.visible = true;
				
		// 		egret.Tween.get(this.getImg).wait(100).to({y:500, alpha:0}, 300);
		// 	}
		// }
	}

	/** 当前进度 */
	public get currMyProg():number
	{
		return this._currMyProg;
	}

	/** 目标进度 */
	public set totalMyProg(value:number)
	{
		if(value < 0)
		{
			value = 0;
		}

		if(value > 100)
		{
			value = 100;
		}

		this._totalMyProg = Math.floor(value);
	}

	public dispose():void
	{
		this.removeMyEvent();

		RES.destroyRes(LoadingConst.LOADING_GROUP);

		egret.Tween.removeTweens(this);
		this.getMyImg && egret.Tween.removeTweens(this.getMyImg);

		this.items = null;
		this.callMyFun = null;
		this.thisMyObj = null;
		this.params = null;
		LoadingConst.disposeObject(this.cardMyImg);
		this.cardMyImg = null;
		LoadingConst.disposeObject(this.getMyImg);
		this.getMyImg = null;

		super.dispose();
	}
}