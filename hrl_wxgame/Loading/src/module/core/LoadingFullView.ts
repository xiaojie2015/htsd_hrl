/**
 * loading黑边填充
 */
class LoadingMyFullView extends egret.Bitmap
{
	private static _instance:LoadingMyFullView;

	public constructor() 
	{
		if(LoadingMyFullView._instance) return;

		super();

		LoadingMyFullView._instance = this;

		this.initMyEvent();
		this.initMyData();
	}

	public static get instance():LoadingMyFullView
	{
		return this._instance || new LoadingMyFullView();
	}

	protected initMyEvent():void
	{
		LoadingManager.$stage.addEventListener(egret.Event.RESIZE, this.__resizeMyHandler, this);
	}

	protected removeEvent():void
	{
		LoadingManager.$stage.removeEventListener(egret.Event.RESIZE, this.__resizeMyHandler, this);
	}

	protected initMyData():void
	{
		let texture:egret.Texture =LoginMyBackView.instance.getTextureMyByName(LoadingConst.LOADING_BIG_BACK);

		this.texture = texture;
		
		this.fillMode = egret.BitmapFillMode.SCALE;

		this.updateMyView();
	}
	/**更新大背景 */
	public updateMyBigBg(imgKey:string):void
	{
		let texture:egret.Texture =LoginMyBackView.instance.getTextureMyByName(imgKey);
		this.texture = texture;
	}
	private updateMyView():void
	{
		if(!this.texture)return;
		// let scale = LoadingManager.$stage.stageHeight / LoadingConst.STAGE_HIEGHT;
		// this.scaleY = scale;
		// this.scaleX = scale;
		this.x = (LoadingManager.$stage.stageWidth-this.width)/2;
		this.y = (LoadingManager.$stage.stageHeight-this.height);
		// this.y = (LoadingManager.$stage.stageWidth-this.width)/2;
		// //居中显示
		// if (LoadingManager.$stage.stageWidth > this.texture.textureWidth) {
		// 	this.width = LoadingManager.$stage.stageWidth;
		// 	this.x = 0;
		// } else {
		// 	this.width = this.texture.textureWidth;
		// 	this.x = (LoadingManager.$stage.stageWidth - this.texture.textureWidth) / 2;
		// }


		// if (LoadingManager.$stage.stageHeight > this.texture.textureHeight) {
		// 	this.height = LoadingManager.$stage.stageHeight;
		// 	this.y = 0;
		// } else {
		// 	this.height = this.texture.textureHeight;
		// 	this.y = (LoadingManager.$stage.stageHeight - this.texture.textureHeight) / 2;
		// }

	}

	private __resizeMyHandler(e:egret.Event):void
	{
		this.updateMyView();
	}

	public show():void
	{
		LoadingMyLayer.instance.addChildAt(this, 0);
	}

	public dispose():void
	{
		this.removeEvent();

		this.texture = null;

		this.parent && this.parent.removeChild(this);

		LoadingMyFullView._instance = null;
	}
}