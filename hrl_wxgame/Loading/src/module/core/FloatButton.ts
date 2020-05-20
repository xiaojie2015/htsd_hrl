class FloatMyButton extends eui.Image{
    private static _instance: FloatMyButton = null;
    private _defAlpha=0.75;
    private _startTime:number;
    private _touchStatus:boolean=false;
    private _moveStatus:boolean=false;
    private _dx:number=0;
    private _dy:number=0;
    private constructor() 
	{
		super();
        this.source="resource/icons/channelChaos/returnBtn.png";
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.initMy,this);
	}
    public static get instance(): FloatMyButton
	{
        return this._instance || new FloatMyButton();
	}
    protected initMy(){
        this.initMyView();
        this.initMyEvent();
    }
	protected initMyView():void
	{
        this.x=this.stage.stageWidth-68;
        this.y=80;
        this.alpha=this._defAlpha;
	}
	protected initMyEvent():void
	{
        this.touchEnabled=true;
        this._touchStatus = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.mouseMyDown,this);
	}
    private mouseMyDown(evt:egret.TouchEvent){
        this._startTime=new Date().getTime();
        this._moveStatus=false;
        this._dx = evt.stageX - this.x;
        this._dy = evt.stageY - this.y;
        this.alpha=1;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMyMove, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END,this.mouseMyUp,this);
    }
    private mouseMyMove(evt:egret.TouchEvent){
        if(this._touchStatus){
            this.x=evt.stageX-this._dx;
            this.y=evt.stageY-this._dy;
            this._moveStatus=true;
        }
    }
    private mouseMyUp(evt:egret.TouchEvent){
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMyMove, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_END,this.mouseMyUp,this);
        var endTime=new Date().getTime();
        var clickTime=endTime-this._startTime;
        if(clickTime<100&&!this._moveStatus){
            this.onClickMyClose();
        }else{
            this.moveToSide();
        }
        this._moveStatus=false;
    }
    private onClickMyClose(){
        hitalkOpenSdk.closeWebView();
    }
    /**移动到边上 */
    private moveToSide(){
        let self=this;
        this._touchStatus=false;
        let goalX:number=this.getMyGoalX();
        let time:number=200*Math.abs(this.x-goalX)/300;
        egret.Tween.get(this).to({x:goalX},time).call(function(){
            self._touchStatus=true;
        }).to({alpha:this._defAlpha},200);
    }
    private getMyGoalX(){
        /**最小边界 */
        let min=0;
        /**最大边界 */
        let max=this.stage.stageWidth-this.width;
        let goalMinX=min-this._dx;
        let goalMaxX=max-this._dx;
        let goalX=Math.abs(this.x-goalMaxX)>Math.abs(this.x-goalMinX)?goalMinX:goalMaxX;
        if(goalX<min){
            goalX=min;
        }else{
            goalX=max;
        }
        return goalX;
    }
}