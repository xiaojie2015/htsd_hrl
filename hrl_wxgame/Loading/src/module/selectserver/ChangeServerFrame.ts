/**
 * 更换区服
 */
class ChangeMyServerFrame extends LoadingMyBaseUI
{
	private backMyImg:eui.Image;
	/** 关闭按钮 */
	private closeMyBtn:eui.Button;
	/** 区服组列表 */
	private serverMyGroupList:eui.List;
	/** 滚动面板 */
	private listMyScroller:eui.Scroller;
	/** 区服滚动面板 */
	private groupMyScroller:eui.Scroller;
	/** 区服列表 */
	private serverMyList:eui.List;
	/** 历史服务器 */
	private historyMyServers:ServerInfo[];
	/** 所有区服列表 */
	private allServerMyList:ServerInfo[];
	/** 区服组数据 */
	private groupMyData:eui.ArrayCollection;
	/** 区服列表 */
	private listMyData:eui.ArrayCollection;
	/** http请求 */
	private requestMy:egret.HttpRequest;
	/** 描述 */
	private descMyTxt:eui.Label;

	private _callMyFun:Function;
	private _thisMyObj:any;

	public constructor($historyServer:ServerInfo[]) 
	{
		super("ChangeServerFrame");

		this.historyMyServers = $historyServer || [];
	}

	private createMyView():void
	{
		this.width = 499;
		this.height = 719;
		this.verticalCenter = 0;
		this.horizontalCenter = 0;

		this.backMyImg = new eui.Image();
		this.backMyImg.source = "change_server_back_png";
		this.backMyImg.touchEnabled = false;
		this.addChild(this.backMyImg);

		this.descMyTxt = new eui.Label();
		this.descMyTxt.size = 18;
		this.descMyTxt.textAlign = "center";
		this.descMyTxt.touchEnabled = false;
		this.descMyTxt.textColor = 0xebe6d5;
		this.descMyTxt.strokeColor = 0x011523;
		this.descMyTxt.stroke = 1;
		this.descMyTxt.width = 150;
		this.descMyTxt.height = 18;
		this.descMyTxt.x = 235;
		this.descMyTxt.y = 110;
		this.addChild(this.descMyTxt);

		this.groupMyScroller = new eui.Scroller();
		this.groupMyScroller.anchorOffsetX = 0;
		this.groupMyScroller.anchorOffsetY = 0;
		this.groupMyScroller.width = 142;
		this.groupMyScroller.height = 533;
		this.groupMyScroller.x = 35;
		this.groupMyScroller.y = 70;
		this.groupMyScroller.viewport = this.serverMyGroupList = this.getGroupMyViewPort(4);
		this.addChild(this.groupMyScroller);

		this.listMyScroller = new eui.Scroller();
		this.listMyScroller.anchorOffsetX = 0;
		this.listMyScroller.anchorOffsetY = 0;
		this.listMyScroller.width = 290;
		this.listMyScroller.height = 533;
		this.listMyScroller.x = 197;
		this.listMyScroller.y = 70;
		this.listMyScroller.viewport = this.serverMyList = this.getGroupMyViewPort(2);
		this.addChild(this.listMyScroller);

		this.closeMyBtn = new eui.Button();
		this.closeMyBtn.skinName = this.getCloseMyBtnSkin();
		this.closeMyBtn.x = 450;
		this.closeMyBtn.y = 45;
		this.addChild(this.closeMyBtn);

	}

	/** 获取关闭按钮皮肤实例 */
	private getCloseMyBtnSkin():eui.Skin
	{
		let skin:eui.Skin = new eui.Skin();
		skin.skinParts = [];

		let img_1:eui.Image = new eui.Image();
		img_1.touchEnabled = false;
		img_1.source = "selectserver_json.alert_close_png";

		skin["img_1"] = img_1;

		skin.elementsContent = [img_1];
		skin.states = [new eui.State ("up",[]), new eui.State ("down",[new eui.SetProperty("img_1","y",-2)]), new eui.State ("disabled",[])];
		return skin;
	}

	/** 获取区服列表List */
	private getGroupMyViewPort(gap:number):eui.List
	{
		var t = new eui.List();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.percentHeight = 100;
		t.useVirtualLayout = true;
		t.percentWidth = 100;
		t.layout = this._VerticalMyLayout1_i(gap);
		return t;
	}

	private _VerticalMyLayout1_i(gap:number):eui.VerticalLayout
	{
		var t = new eui.VerticalLayout();
		t.gap = gap;
		t.horizontalAlign = "left";
		t.verticalAlign = "top";
		return t;
	};

	protected initMyView():void
	{
		this.createMyView();

		this.descMyTxt.text = LoadingConst.MSG_3;

		this.groupMyData = new eui.ArrayCollection();
		this.listMyData = new eui.ArrayCollection();

		this.serverMyGroupList.dataProvider = this.groupMyData;
		this.serverMyGroupList.itemRenderer = ChangeServerItem;

		this.serverMyList.dataProvider = this.listMyData;
		this.serverMyList.itemRenderer = ServerItemMyRenderer;

		this.groupMyData.source.push(LoadingConst.HISTORY_SERVER);
		this.groupMyData.refresh();
	}

	protected initMyData():void
	{
        let url:string = getAllServerListUrl(LoadingManager.$inst.userData.threePlatformId);
		url=assembleURLParam(url);
		
		this.requestMy = new egret.HttpRequest();
		this.requestMy.responseType = egret.HttpResponseType.TEXT;
		this.requestMy.open(url, egret.HttpMethod.GET);
		this.requestMy.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this.requestMy.addEventListener(egret.Event.COMPLETE, this.__onGetCompleteMyHandler, this);
		this.requestMy.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__onGetIOErrorMyHandler, this);
		this.requestMy.send();
	}

	protected initMyEvent():void
	{
		this.closeMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__closeMyFrameHandler, this);
		this.serverMyGroupList.addEventListener(egret.Event.CHANGE, this.__serverGroupMyChangeHandler, this);
		this.serverMyList.addEventListener(egret.Event.CHANGE, this.__serverMyChangeHandler, this);
	}

	protected removeMyEvent():void
	{
		this.closeMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__closeMyFrameHandler, this);
		this.serverMyGroupList.removeEventListener(egret.Event.CHANGE, this.__serverGroupMyChangeHandler, this);
		this.serverMyList.removeEventListener(egret.Event.CHANGE, this.__serverMyChangeHandler, this);
	}

	/** 请求区服数据成功 */
	private __onGetCompleteMyHandler(e:egret.Event):void
	{
		let obj:any = JSON.parse(this.requestMy.response);

		if(obj)
		{
            obj=hitalkOpenSdk.changeServerName(obj);
			this.allServerMyList = obj;

			if(this.allServerMyList) 
			{
				this.allServerMyList.sort(this.serverSoft);
			}

			let groupLength:number = Math.ceil(this.allServerMyList.length / 100);

			for(let i = groupLength; i > 0; i --)
			{
				this.groupMyData.source.push(((i * 100) - 99) + "-" + (i * 100) + LoadingConst.SERVER);
			}

			this.groupMyData.refresh();

			this.serverMyGroupList.selectedIndex = 0;
		}
		else
		{
			this.__onGetIOErrorMyHandler(null);
		}
	}

	private serverSoft(a:ServerInfo,b:ServerInfo):number
	{
		let sorta:number = a.aid || 0;

		let sortb:number = b.aid || 0;

		if (sorta < sortb)
		{
			return -1;
		}

		return 1;
	}

	/** 请求区服数据失败 */
	private __onGetIOErrorMyHandler(e:egret.IOErrorEvent):void
	{
		LoadingMyAlert.show(LoadingConst.GET_ERROR, undefined, LoadingMyAlert.YES);
	}

	/** 区服组选中改变 */
	private __serverGroupMyChangeHandler(e:egret.Event):void
	{
		this.listMyScroller && this.listMyScroller.stopAnimation();

		let selectIndex:number = this.serverMyGroupList.selectedIndex;

		this.listMyData.source.splice(0, this.listMyData.length);

		let ids:number[] = [];

		if(selectIndex == 0)
		{
			for(let i = 0; i < this.historyMyServers.length; i ++)
			{
				if(ids.indexOf(this.historyMyServers[i].id) == -1)
				{
					ids.push(this.historyMyServers[i].id);
					this.listMyData.source.push(this.historyMyServers[i]);
				}
			}
		}
		else if(selectIndex > 0)
		{
			let groupLength: number = Math.ceil(this.allServerMyList.length / 100);

			selectIndex = groupLength - (selectIndex - 1);

			let startIndex:number = (selectIndex - 1) * 100;

			let endIndex:number = Math.min(selectIndex * 100, this.allServerMyList.length);

			var index: number = 0;

			for(let i = startIndex; i < endIndex; i ++)
			{
				if(ids.indexOf(this.allServerMyList[endIndex - index - 1].id) == -1)
				{
					ids.push(this.allServerMyList[endIndex - index - 1].id);

					this.listMyData.source.push(this.allServerMyList[endIndex - index - 1]);
				}
				
				index ++;
			}
		}

		this.listMyData.refresh();

		this.descMyTxt.visible = !(this.listMyData.length > 0);
	}

	/** 区服选中 */
	private __serverMyChangeHandler(e:egret.Event):void
	{
		let selectIndex:number = this.serverMyList.selectedIndex;

		if(selectIndex >= 0 && selectIndex < this.listMyData.length)
		{
			let serverData:any = this.listMyData.source[selectIndex];

			if(this._callMyFun)
			{
				this._callMyFun.call(this._thisMyObj, serverData);
			}

			this.__closeMyFrameHandler(null);
		}
	}

	public show($callFun:Function, $thisObj:any):void
	{
		this._callMyFun = $callFun;
		this._thisMyObj = $thisObj;

		this.visible = true;

		this.serverMyGroupList.selectedIndex = 0;

		this.__serverGroupMyChangeHandler(null);
		
		!this.parent && LoadingMyLayer.instance.addToMyLayer(this);
	}

	private hide():void
	{
		this.visible = false;
	}

	private __closeMyFrameHandler(e:egret.TouchEvent):void
	{
		this.hide();
	}
	
	public dispose():void
	{
		this.removeMyEvent();

		LoadingConst.disposeObject(this.closeMyBtn); 
		this.closeMyBtn = null;

		if(this.groupMyScroller)
		{
			this.groupMyScroller.stopAnimation();
			this.groupMyScroller.viewport = null;
			LoadingConst.disposeObject(this.groupMyScroller);
		}
		this.groupMyScroller = null;

		if(this.serverMyGroupList)
		{
			this.serverMyGroupList.dataProvider = null;
			LoadingConst.disposeObject(this.serverMyGroupList);
		}
		this.serverMyGroupList = null;

		if(this.listMyScroller)
		{
			this.listMyScroller.stopAnimation();
			this.listMyScroller.viewport = null;
			LoadingConst.disposeObject(this.listMyScroller);
		}
		this.listMyScroller = null;

		if(this.serverMyList)
		{
			this.serverMyList.dataProvider = null;
			LoadingConst.disposeObject(this.serverMyList);
		}
		this.serverMyList = null;

		if(this.requestMy)
		{
			this.requestMy.removeEventListener(egret.Event.COMPLETE, this.__onGetCompleteMyHandler, this);
			this.requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__onGetIOErrorMyHandler, this);
		}
		this.requestMy = null;

		this.historyMyServers = null;
		this.groupMyData = null;
		this.listMyData = null;

		this._callMyFun = null;
		this._thisMyObj = null;

		super.dispose();
	}
}