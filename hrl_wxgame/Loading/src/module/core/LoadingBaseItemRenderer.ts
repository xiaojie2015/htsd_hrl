/**
 * 呈现项基础类
 */
class LoadingBaseItemRenderer extends eui.ItemRenderer
{
	/** 皮肤加载完成 */
	protected skinMyComplete:boolean = false;
	/** 初始化完成 */
	private _initMyFinish:boolean = false;
	/** 是否已销毁 */
	protected destory:boolean = false;
	/** 当前状态 */
	private currMyStates:string = "";
	/** 前次选中状态 */
	private preMySelected:boolean = false;

	public constructor() 
	{
    	  super();

		  this.once(egret.Event.COMPLETE, this.__skinMyCompleteHandler, this)
	}

	protected __skinMyCompleteHandler(e:egret.Event):void
	{
		this.skinMyComplete = true;
		this.initMy();
	}

	protected initMy():void
	{
		if(!this.skinMyComplete) return;

		this._initMyFinish = true;

		//一般出现这个问题是在皮肤未加载完成的时候就被调用了dispose()方法
		//这时候需要在调用一次dispose()才真正完成
		if(this.destory)
		{
			this.dispose();
			return;
		}

		this.initMyView();
		this.initMyEvent();
		this.initMyData();
	}

	protected initMyView():void
	{
		
	}

	protected initMyEvent():void
	{
		
	}

	protected initMyData():void
	{

	}

	/**
	 * 初始化完成
	 */
	public get initFinish():boolean
	{
		return this._initMyFinish;
	}

	/** 状态改变 */
	public invalidateState():void
	{
		super.invalidateState();

		this.currMyStates = this.getCurrentState();

		if(this.currMyStates == "up" || this.currMyStates == "upAndSelected")
		{
			if(this.selected != this.preMySelected)
			{
				this.preMySelected = this.selected;

				this.selectedChange();
			}
		}
	}

	/** 选中状态发生改变 */
	protected selectedChange():void
	{
		//override
	}

	public dispose():void
	{
		this.destory = true;

		this.removeEventListener(egret.Event.COMPLETE, this.__skinMyCompleteHandler, this);

    	if(this.parent)
        {
            this.parent.removeChild(this);
        }
	}
}