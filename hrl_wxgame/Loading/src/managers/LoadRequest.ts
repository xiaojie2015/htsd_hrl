/**
 * 一次http请求
 * @author: ting 
 * @date: 2018-06-16 20:01:25 
 * @last modified by: ting 
 */
class LoadMyRequest {

	/** 最大错误次数*/
	public errorMyMax: number = 6;	

	private _requestMy: egret.HttpRequest;
	private _completeMy: Function;
	private _thisMyObj: any;
	private _errorMyCount: number = 0;
	private _urlMy: string;
	private _timerMy: number;
	
	public constructor() {
	}
	/**
	 * 发送http请求
	 * @param url 请求地址
	 * @param call 请求成功后回调
	 * @param thisObj 请求成功后回调对象
	 */
	protected sendMy<T>(url:string,call:Function,thisObj:T): void
	{
		if (this._requestMy)
			return;
		this._completeMy = call;
		this._thisMyObj = thisObj;
		this._urlMy = url;
		this._requestMy = new egret.HttpRequest();
		this._requestMy.responseType = egret.HttpResponseType.TEXT;	
		// this._request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this._requestMy.addEventListener(egret.Event.COMPLETE, this.__completeMyHandler, this);
		this._requestMy.addEventListener(egret.IOErrorEvent.IO_ERROR, this.__iOErrorMyHandler, this);
		this.sendMyHandler();
	}

	/**
	 * 发送http请求
	 * @param url 请求地址
	 * @param call 请求成功后回调
	 * @param thisObj 请求成功后回调对象
	 */
	public static sendMy<T>(url: string, call: Function, thisObj?: T): void
	{
		(new LoadMyRequest()).sendMy(url, call, thisObj);
		// GObj.create(HttpRequest).send(url, call, thisObj);
	}
	private sendMyHandler(): void
	{
		if (!this._requestMy)
			return;
		 this._errorMyCount ++;
		if(this._errorMyCount >= this.errorMyMax) {
			this.completeMyCall(null);
			return;
		}
		this._timerMy = setTimeout(function () {
			if (this._request) {
				this._request.abort();
				this.sendHandler();
			}			
		}, 5000);
		this._requestMy.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		this._requestMy.open(this._urlMy, egret.HttpMethod.GET);
		this._requestMy.send();
	}
	 /** 请求历史登录区服数据成功 */
	private __completeMyHandler(e:egret.Event):void
	{	
		this.completeMyCall(this._requestMy.response);
	}
	/** 请求区服数据失败 */
	private __iOErrorMyHandler(e:egret.IOErrorEvent):void
	{
		this._errorMyCount ++;
		clearTimeout(this._timerMy);
		if (this._errorMyCount < this.errorMyMax) {
			setTimeout(() => {
				this.sendMyHandler()
			}, 100);
		} else {
			this.completeMyCall(null);
		}
	}
	private completeMyCall(val:any): void
	{
		clearTimeout(this._timerMy);
		this._requestMy.removeEventListener(egret.Event.COMPLETE, this.__completeMyHandler, this);
		this._requestMy.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.__iOErrorMyHandler, this);
		this._requestMy = null;
		if (this._completeMy) {
			this._completeMy.call(this._thisMyObj,val)
		}
		this._completeMy = null;
		this._thisMyObj = null;
	}
}