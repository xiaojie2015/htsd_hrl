/**
 *
 * @author 
 * 
 */
class LoadingMyBaseUI extends eui.Component {
	private _id: string;

	/**
	 * 皮肤加载完成
	 */
	protected skinComplete: boolean = false;

	/**
	 * 初始化完成
	 */
	private _initFinish: boolean = false;

	/**
	 * 是否已销毁
	 */
	protected _destory: boolean = false;
	public constructor(id: string) {
		super();

		this._id = id;

		this.__skinMyCompleteHandler(null);
	}

	protected __skinMyCompleteHandler(e: egret.Event): void {
		this.skinComplete = true;

		this.init();
	}

	protected init(): void {
		if (!this.skinComplete) return;

		this._initFinish = true;
		//一般出现这个问题是在皮肤未加载完成的时候就被调用了dispose()方法
		//这时候需要在调用一次dispose()才真正完成
		if (this._destory) {
			this.dispose();
			return;
		}

		this.initMyView();
		this.initMyEvent();
		this.initMyData();
	}

	protected initMyView(): void {

	}

	protected initMyEvent(): void {

	}

	protected initMyData(): void {

	}
	
	public get id(): string {
		return this._id;
	}

	/**
	 * 初始化完成
	 */
	public get initFinish(): boolean {
		return this._initFinish;
	}

	/**☆ 界面是否已销毁*/
	public get destory(): boolean {
		return this._destory;
	}

	public dispose(): void {
		this._destory = true;
		this.removeEventListener(egret.Event.COMPLETE, this.__skinMyCompleteHandler, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}
}
