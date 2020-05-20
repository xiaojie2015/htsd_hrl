/**
 * 更换区服item
 */
class ChangeServerItem extends LoadingBaseItemRenderer
{
	/** 区服名 */
	private nameTxt:eui.Label;
	/** 背景 */
	private backImg:eui.Image;

	public constructor() 
	{
		super();

		this.skinName = this.getSelfMySkins();
	}

	/** 获取自身皮肤实例 */
	private getSelfMySkins():eui.Skin
	{
		let skins:eui.Skin = new eui.Skin();
		
		skins.width = 142;
		skins.height = 46;

		skins.skinParts = ["backImg", "nameTxt"];

		let img_1:eui.Image = new eui.Image();
		img_1.touchEnabled = false;
		img_1.source = "selectserver_json.change_server_back3_png";
		img_1.x = img_1.y = 0;
		skins["backImg"] = img_1;

		let txt_1:eui.Label = new eui.Label();
		txt_1.size = 18;
		txt_1.textColor = 0X2a2a2a;
		txt_1.textAlign = "center";
		txt_1.touchEnabled = false;
		txt_1.width = 121;
		txt_1.height = 18;
		txt_1.x = 12;
		txt_1.y = 14;
		skins["nameTxt"] = txt_1;

		skins.elementsContent = [img_1, txt_1];

		skins.states = [new eui.State ("up",[]), new eui.State ("down",[]), 
		new eui.State ("upAndSelected",[new eui.SetProperty("backImg","source","selectserver_json.change_server_back2_png")]),
		 new eui.State ("downAndSelected",[new eui.SetProperty("backImg","source","selectserver_json.change_server_back2_png")])];

		return skins;
	}

	protected initMyEvent():void
	{
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removedFromStageMyHandler, this);
	}

	protected removeEvent():void
	{
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__removedFromStageMyHandler, this);
	}

	protected initMyData():void
	{
		this.dataChanged();
	}

	protected dataChanged():void
	{
		if(!this.initFinish || !this.data) return;

		this.nameTxt.text = this.data;
	}

	private __removedFromStageMyHandler(e:egret.Event):void
	{
		this.dispose();
	}

	public dispose():void
	{
		this.removeEvent();

		this.nameTxt && this.nameTxt.parent && this.nameTxt.parent.removeChild(this.nameTxt);
		this.nameTxt = null;

		this.backImg && this.backImg.parent && this.backImg.parent.removeChild(this.backImg);
		this.backImg = null;

		super.dispose();
	}
}