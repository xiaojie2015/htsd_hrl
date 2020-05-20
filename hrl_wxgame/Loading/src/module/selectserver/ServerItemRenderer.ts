/**
 * 区服item
 */
class ServerItemMyRenderer extends LoadingBaseItemRenderer
{
	/** 背景 */
	private backImg:eui.Image;
	/** 区服状态 */
	private stateImg:eui.Image;
	/** 区服名称 */
	private serverNameTxt:eui.Label;
	/** 区服信息 */
	private serverInfo:ServerInfo;

	public constructor() 
	{
		super();

		this.skinName = this.getSelfMySkins();
	}

	/** 获取自身皮肤实例 */
	private getSelfMySkins():eui.Skin
	{
		let skins:eui.Skin = new eui.Skin();
		
		skins.width = 262;
		skins.height = 47;

		skins.skinParts = ["backImg", "stateImg", "serverNameTxt"];

		let img_1:eui.Image = new eui.Image();
		img_1.touchEnabled = false;
		img_1.source = "selectserver_json.change_server_back4_png";
		img_1.x = img_1.y = 0;
		skins["backImg"] = img_1;

		let img_2:eui.Image = new eui.Image();
		img_2.touchEnabled = false;
		img_2.source = "selectserver_json.hot_server_png";
		img_2.x = 20;
		img_2.y = 12;
		skins["stateImg"] = img_2;

		let txt_1:eui.Label = new eui.Label();
		txt_1.size = 18;
		txt_1.textColor = 0X2a2a2a;
		txt_1.textAlign = "center";
		txt_1.touchEnabled = false;
		txt_1.width = 200;
		txt_1.height = 18;
		txt_1.x = 40;
		txt_1.y = 17;
		skins["serverNameTxt"] = txt_1;

		skins.elementsContent = [img_1, img_2, txt_1];

		return skins;
	}

	protected initMyEvent():void
	{
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStageMyHandler, this);
	}

	protected removeMyEvent():void
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removeFromStageMyHandler, this);
	}

	protected initMyData():void
	{
		this.dataChanged();
	}

	protected dataChanged():void
	{
		if(!this.initFinish || !this.data) return;

		this.serverInfo = this.data;

		this.serverNameTxt.text = this.serverInfo.an;

		if(this.serverInfo.s == 2)
		{
			this.stateImg.source = "selectserver_json.close_server_png";
		}
		else 
		{
			if(this.serverInfo.aid > LoadingManager.instance.SERVER_MAX_ID - 5)
			{
				this.stateImg.source = "selectserver_json.new_server_png";
			}
			else
			{
				this.stateImg.source = "selectserver_json.hot_server_png";
			}
		}
	}

	private __removeFromStageMyHandler(e:egret.Event):void
	{
		this.dispose();
	}

	public dispose():void
	{
		this.removeMyEvent();

		LoadingConst.disposeObject(this.backImg); 
		this.backImg = null;

		LoadingConst.disposeObject(this.stateImg); 
		this.stateImg = null;

		LoadingConst.disposeObject(this.serverNameTxt); 
		this.serverNameTxt = null;

		this.serverInfo = null;

		super.dispose();
	}
}