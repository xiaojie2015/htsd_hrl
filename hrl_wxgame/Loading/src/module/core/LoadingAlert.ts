/**
 * @author 
 * 提示框,单例，一次只弹一个
 */
class LoadingMyAlert extends LoadingMyBaseUI {
    private static _instance: LoadingMyAlert = null;

    public static YES: number = 0x1;
    public static NO: number = 0x2;

    /** 背景图 */
    protected backMyImg: eui.Image;
    /**☆ 标题文本*/
    protected titleMyLab: eui.Label;
    /**☆ 内容*/
    protected contextMyLab: eui.Label;
    /**☆ 取消按钮*/
    protected noMyBtn: eui.Button;
    /**☆ 确定按钮*/
    protected yesMyBtn: eui.Button;

    /**☆ 确定回调*/
    private _confirmMyCall: Function;
    /** 取消回调 */
    private _cancelMyCall: Function;
    private _thisMyObj: any;
    private _callMyArg: any[];
    /**☆ 按钮列表*/
    private _btnArr: Array<eui.Button>;

    public constructor() {
        super("LoadingAlert");

        if (LoadingMyAlert._instance) return;

        LoadingMyAlert._instance = this;
    }

    private createMyView(): void {
        this.touchEnabled = false;
        this.width = 435;
        this.height = 250;
        this.horizontalCenter = 0;
        this.verticalCenter = 0;

        this.backMyImg = new eui.Image();
        this.backMyImg.touchEnabled = false;
        this.backMyImg.percentWidth = 100;
        this.backMyImg.percentHeight = 100;
        // this.backImg.scale9Grid = new egret.Rectangle(24,21,133,7);
        this.backMyImg.source = "loading_json.alert_borderbg_png";
        this.addChild(this.backMyImg);

        this.titleMyLab = new eui.Label();
        this.titleMyLab.textAlign = "center";
        this.titleMyLab.size = 20;
        // this.titleLab.stroke = 1;
        // this.titleLab.strokeColor = 0x031623;
        this.titleMyLab.text = "";
        this.titleMyLab.textColor = 0x32384e;
        this.titleMyLab.touchEnabled = false;
        this.titleMyLab.width = 212;
        this.titleMyLab.height = 20;
        this.titleMyLab.x = 116;
        this.titleMyLab.y = 35;
        this.addChild(this.titleMyLab);

        this.contextMyLab = new eui.Label();
        this.contextMyLab.textAlign = "center";
        this.contextMyLab.verticalAlign = "middle";
        this.contextMyLab.lineSpacing = 5;
        this.contextMyLab.size = 18;
        // this.contextLab.stroke = 1;
        // this.contextLab.strokeColor = 0x332E2E;
        this.contextMyLab.text = "";
        this.contextMyLab.textColor = 0x32384e;
        this.contextMyLab.touchEnabled = false;
        this.contextMyLab.width = 380;
        this.contextMyLab.height = 100;
        this.contextMyLab.x = 28;
        this.contextMyLab.y = 62;
        this.addChild(this.contextMyLab);

        this.yesMyBtn = new eui.Button();
        this.yesMyBtn.skinName = this.getMyYesAndNoBtnSkin();
        this.yesMyBtn.icon = "loading_json.alert_confirm_png";
        this.yesMyBtn.x = 257;
        this.yesMyBtn.y = 170;
        this.addChild(this.yesMyBtn);

        this.noMyBtn = new eui.Button();
        this.noMyBtn.skinName = this.getMyYesAndNoBtnSkin();
        this.noMyBtn.icon = "loading_json.alert_cancel_png";
        this.noMyBtn.x = 90;
        this.noMyBtn.y = 170;
        this.addChild(this.noMyBtn);
    }

    /** 获取确定/取消按钮皮肤实例 */
    private getMyYesAndNoBtnSkin(): eui.Skin {
        let skin: eui.Skin = new eui.Skin();
        skin.skinParts = ["iconDisplay", "labelDisplay"];

        let img_1: eui.Image = new eui.Image();
        img_1.touchEnabled = false;

        skin["iconDisplay"] = img_1;

        let txt_1: eui.Label = new eui.Label();
        txt_1.textAlign = "center";
        txt_1.size = 18;
        // txt_1.stroke = 1;
        // txt_1.strokeColor = 0x332E2E;
        txt_1.textColor = 0x32384e;
        txt_1.touchEnabled = false;
        txt_1.percentWidth = 100;
        txt_1.height = 18;
        txt_1.x = 0;
        txt_1.y = 12;

        skin["labelDisplay"] = txt_1;

        skin.elementsContent = [img_1, txt_1];
        skin.states = [new eui.State("up", []), new eui.State("down", [new eui.SetProperty("iconDisplay", "x", 1), new eui.SetProperty("iconDisplay", "y", 1),
        new eui.SetProperty("iconDisplay", "scaleX", 0.96), new eui.SetProperty("iconDisplay", "scaleY", 0.96)]), new eui.State("disabled", [])];
        return skin;
    }

    public static get instance(): LoadingMyAlert {
        return this._instance || new LoadingMyAlert();
    }

    protected initMyView(): void {
        this.createMyView();

        this._btnArr = [];
        this.titleMyLab.text = "提示";
        this.noMyBtn.label = "取消";
        this.yesMyBtn.label = "确定";
    }

    protected initMyEvent(): void {
        this.noMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__cancelMyClickHandler, this);
        this.yesMyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__confirmMyClickHandler, this);
    }

    protected removeMyEvent(): void {
        this.noMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__cancelMyClickHandler, this);
        this.yesMyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__confirmMyClickHandler, this);
    }
    /**
     * ☆ 提示框显示
     * ☆ 支持部分图文混排
     * ☆ 图文混排规则，不能以图标开始或结束，图标跟图标之间必须有文本，图标格式{gold}
     * @param text 显示内容
     * @param title 标题
     * @param flag 显示的按钮 Alert.YES|Alert.NO
     * @param confirmCall 确定回调
     * @param thisObj 
     * @param callArg 回调参数
     * @param cancelCall 取消回调
     */
    public static show(text: string, title?: string, flag?: number, confirmCall: Function = null, thisObj: any = null, callArg?: any[], cancelCall: Function = null): void {
        if (!title) {
            title = "提示";
        }

        if (!flag) {
            flag = LoadingMyAlert.YES | LoadingMyAlert.NO;
        }

        this.instance.showMy(text, title, flag, confirmCall, thisObj, callArg, cancelCall);
    }

    private showMy(text: string, title: string, flag: number, confirmCall: Function, thisObj: any, callArg?: any[], cancelCall?: Function): void {
        this._confirmMyCall = confirmCall;
        this._cancelMyCall = cancelCall;

        this._thisMyObj = thisObj;
        this._callMyArg = callArg;
        this.titleMyLab.text = title;
        this.setMyContext(text);

        if (this.noMyBtn.parent)
            this.noMyBtn.parent.removeChild(this.noMyBtn);
        if (this.yesMyBtn.parent)
            this.yesMyBtn.parent.removeChild(this.yesMyBtn);

        this._btnArr.length = 0;

        if (flag & LoadingMyAlert.NO) {
            this._btnArr.push(this.noMyBtn);
        }

        if (flag & LoadingMyAlert.YES) {
            this._btnArr.push(this.yesMyBtn);
        }

        let len: number = this._btnArr.length;
        let sx: number = (this.width - 6 - len * 88) / (len + 1);

        for (var i = 0; i < len; i++) {
            let btn: eui.Button = this._btnArr[i];
            btn.x = sx + (88 + sx) * i;
            this.addChild(btn);
        }

        LoadingMyLayer.instance.addToMyLayer(this, 1);
    }

    private setMyContext(val: string): void {
        val = (val == undefined || val == null) ? "" : val.toString();

        if (val.indexOf("</") >= 0) {
            this.contextMyLab.textFlow = new egret.HtmlTextParser().parser(val);
        }
        else {
            this.contextMyLab.text = val;
        }

        if (!this.contextMyLab.parent)
            this.addChild(this.contextMyLab);
    }

    private __cancelMyClickHandler(e: egret.TouchEvent): void {
        let callFun: Function = this._cancelMyCall;
        let thisobj: any = this._thisMyObj;
        let args: any[] = this._callMyArg;

        this.hide();

        if (callFun) {
            if (args) {
                callFun.apply(thisobj, args);
            }
            else {
                callFun.call(thisobj);
            }
        }
    }

    private __confirmMyClickHandler(e: egret.TouchEvent): void {
        let callFun: Function = this._confirmMyCall;
        let thisobj: any = this._thisMyObj;
        let args: any[] = this._callMyArg;

        this.hide();

        if (callFun) {
            if (args) {
                callFun.apply(thisobj, args);
            }
            else {
                callFun.call(thisobj);
            }
        }
    }

    private hide(): void {
        this._confirmMyCall = null;
        this._cancelMyCall = null;
        this._thisMyObj = null;
        this._callMyArg = null;

        if (this.parent) {
            this.parent.removeChild(this);
        }

        this._btnArr.length = 0;
    }

    public dispose(): void {
        this.removeMyEvent();

        this.hide();

        LoadingConst.disposeObject(this.titleMyLab);
        this.titleMyLab = null;

        LoadingConst.disposeObject(this.yesMyBtn);
        this.yesMyBtn = null;

        LoadingConst.disposeObject(this.noMyBtn);
        this.noMyBtn = null;

        LoadingConst.disposeObject(this.contextMyLab);
        this.contextMyLab = null;

        LoadingConst.disposeObject(this.backMyImg);
        this.backMyImg = null;

        super.dispose();
    }
}
