/**
 * 小loading层级管理
 */
class LoadingMyLayer extends eui.UILayer
{
	/**
	 * 有黑色蒙板的显示对象
	 */
	private _blackMyGoundList:Array<egret.DisplayObject>;
	/**
	 * 有透明蒙板的显示对象
	 */
	private _alphaMyGoundList:Array<egret.DisplayObject>;
	/**
	 * 黑色蒙板
	 */	
	private _blackMyGound:egret.Sprite;
	/**
	 * 透明蒙板
	 */
	private _alphaMyGound:egret.Sprite;
	/**
	 * 当前舞台
	 */
	private _currMyStage:egret.Stage;

	private static _instance:LoadingMyLayer;

	public constructor() 
	{
		if(LoadingMyLayer._instance) return;

		super();

		LoadingMyLayer._instance = this;
	}

	public static get instance():LoadingMyLayer
	{
		return this._instance || new LoadingMyLayer();
	}

	public initMy($stage:egret.Stage):void
	{
		if(!$stage) return;

		this._currMyStage = $stage;

		this.touchEnabled = false;

		this._blackMyGoundList = []
		this._alphaMyGoundList = [];

		this._currMyStage.addEventListener(egret.Event.RESIZE, this.__resizeMyHandler, this);

		this._currMyStage.addChild(this);
	}

	/**
	 * 添加到层
	 * @param $target 目标显示对象
	 * @param $blockGound 背景蒙板，0:没有，1:黑色蒙板，2:透明蒙板
	 */
	public addToMyLayer($target:egret.DisplayObject, $blockGound:number = 0):void
	{
		if($blockGound == 1)
		{
			if(this._blackMyGoundList.indexOf($target) != -1)
			{
				this._blackMyGoundList.splice(this._blackMyGoundList.indexOf($target), 1);
			}
			this._blackMyGoundList.push($target);
		}
		else if($blockGound == 2)
		{
			if(this._alphaMyGoundList.indexOf($target) != -1)
			{
				this._alphaMyGoundList.splice(this._alphaMyGoundList.indexOf($target), 1);
			}
			this._alphaMyGoundList.push($target);
		}

		$target.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.__childMyRemoveedFromStageHandler, this);

		this.addChild($target);

		this.arrangeMyBlockGound();
	}

	private __childMyRemoveedFromStageHandler(e:egret.Event):void
	{
		let child:egret.DisplayObject = e.currentTarget;

		child.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.__childMyRemoveedFromStageHandler, this);
		
		if(this._blackMyGoundList.indexOf(child) != -1)
		{
			this._blackMyGoundList.splice(this._blackMyGoundList.indexOf(child), 1);
		}
		if(this._alphaMyGoundList.indexOf(child) != -1)
		{
			this._alphaMyGoundList.splice(this._alphaMyGoundList.indexOf(child), 1);
		}
		
		this.arrangeMyBlockGound();
	}

	private arrangeMyBlockGound():void
	{
		if(this._blackMyGound && this._blackMyGound.parent)
		{
			this._blackMyGound.parent.removeChild(this._blackMyGound);
		}

		if(this._alphaMyGound && this._alphaMyGound.parent)
		{
			this.alphaMyGound.parent.removeChild(this._alphaMyGound);
		}

		var child:egret.DisplayObject;
		var childIndex:number;

		if(this._blackMyGoundList.length > 0)
		{
			child = this._blackMyGoundList[this._blackMyGoundList.length - 1];
			childIndex = this.getChildIndex(child);
			this.addChildAt(this.blackMyGound, childIndex);
		}
		
		if(this._alphaMyGoundList.length > 0)
		{
			child = this._alphaMyGoundList[this._alphaMyGoundList.length - 1];
			childIndex = this.getChildIndex(child);
			this.addChildAt(this.alphaMyGound,childIndex);
		}
	}

	/**☆ 缓存透明背景宽高*/
	private _bgw: number;
	private _bgh: number;

	private get blackMyGound():egret.Sprite
	{		
		if(!this._blackMyGound)
		{
			this._blackMyGound = new egret.Sprite();
			this._blackMyGound.touchEnabled = true;
		}
		if (this._bgw != this._currMyStage.stageWidth || this._bgh != this._currMyStage.stageHeight) {
			this._bgw = this._currMyStage.stageWidth;
			this._bgh = this._currMyStage.stageHeight;
			this._blackMyGound.graphics.clear();
			this._blackMyGound.graphics.beginFill(0x000000, 0.6);
			this._blackMyGound.graphics.drawRect(0, 0, this._bgw,this._bgh);
			this._blackMyGound.graphics.endFill();
		}
		
		return this._blackMyGound;
	}

	/**☆ 缓存透明背景宽高*/
	private _agw: number;
	private _agh: number;

	private get alphaMyGound():egret.Sprite
	{
		if(!this._alphaMyGound)
		{
			this._alphaMyGound = new egret.Sprite();
			this._alphaMyGound.touchEnabled = true;
		}

		if(this._agw != this._currMyStage.stageWidth || this._agh != this._currMyStage.stageHeight)
		{
			this._agw = this._currMyStage.stageWidth;
			this._agw = this._currMyStage.stageHeight;
			this._alphaMyGound.graphics.clear();
			this._alphaMyGound.graphics.beginFill(0x000000, 0);
			this._alphaMyGound.graphics.drawRect(0, 0, this._agw,this._agh);
			this._alphaMyGound.graphics.endFill();
		}
		return this._alphaMyGound;
	}

	private __resizeMyHandler(e:egret.Event):void
	{
		if(this._blackMyGound && this._blackMyGound.parent)
		{
			this.blackMyGound;
		}

		if(this._alphaMyGound && this._alphaMyGound.parent)
		{
			this.alphaMyGound;
		}
	}

	public dispose():void
	{
		let len:number = this.numChildren;

		for(let i = 0; i < len; i ++)
		{
			this.removeChild(this.getChildAt(0));
		}

		if(this._alphaMyGound)
		{
			this._alphaMyGound.graphics.clear();
		}
		this._alphaMyGound = null;

		if(this._blackMyGound)
		{
			this._blackMyGound.graphics.clear();
		}
		this._blackMyGound = null;

		this._alphaMyGoundList = null;
		this._blackMyGoundList = null;

		LoadingMyLayer._instance = null;
		this._currMyStage = null;
		
		this.parent && this.parent.removeChild(this);
	}
}