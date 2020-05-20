/**
 *
 * @author 
 * 等比动画，由一张等比的序列图组成
 */
class LoadingMyMeanEffect extends eui.Component
{
    /**☆ 效果背景图*/
    private _bmpMy: egret.Bitmap;

    private _ttrMyArr: Array<egret.Texture> = [];
    /**☆ 开始时间*/
    private _startMyTime: number = 0;
    /**☆ 用来计算的临时时间*/
    private _tempMyTime: number = 0;
    /**☆ 播放间隔时间*/
    private _intervalMy: number;
    /**☆ 帧数*/
    private _frameMySize: number = 0;
    
    /**☆ 横向排列*/
    private _horizontalMyAlign: string = egret.HorizontalAlign.LEFT;
    /**☆ 竖向排列*/
    private _verticalMyAlign: string = egret.VerticalAlign.TOP;
    /**☆ 上次更新时间 */
    private _preMyTime:number = 0;
    /**☆ 循环次数 */
    private _loopMy:number = 0;
    /** 当前帧 */
    private _currMyFrame:number;
    
    /** 播放中 */
    public playingMy:boolean;
    
    public constructor()
    {
        super();

        this.init();
    }

    private init(): void
    {
        this.playingMy = false;

        this._bmpMy = new egret.Bitmap();

        this._bmpMy.touchEnabled = false;
        
        this.addChild(this._bmpMy);
    }

    public textureMyData(datas:egret.Texture[], interval:number = 100, loop:number = 0)
    {
        if(!datas || datas.length == 0) return;

        this._ttrMyArr = datas;

        this._intervalMy = interval;

        this._loopMy = loop;

        this._frameMySize = this._ttrMyArr.length;

        if(this._ttrMyArr.length > 0)
        {
            this.width = this._ttrMyArr[0].textureWidth;
            this.height = this._ttrMyArr[0].textureHeight;
        }
    }

    public playMy($loop:number = 0):void
    {
        this._startMyTime = egret.getTimer();

        this._preMyTime = 0;

        this._loopMy = $loop;

        this.playingMy = true;

        LoadingManager.$stage.addEventListener(egret.Event.ENTER_FRAME, this.__enterMyFrameHandler, this);
    }

    public stopMy(): void
    {
        this.playingMy = false;

        LoadingManager.$stage.removeEventListener(egret.Event.ENTER_FRAME, this.__enterMyFrameHandler, this);
    }

    protected __enterMyFrameHandler(e:egret.Event): void
    {
        if (this._frameMySize <= 0) return;

        this._tempMyTime = egret.getTimer();

        let time: number = this._tempMyTime - this._startMyTime;

        if (time < 0 || (this._tempMyTime - this._preMyTime) < this._intervalMy) return;

        this._preMyTime = this._tempMyTime;

        this._currMyFrame = Math.floor(time / this._intervalMy);

        if(this._loopMy > 0 && (this._currMyFrame / this._frameMySize) >= this._loopMy)
        {
            this.stopMy();

            this.dispatchEventWith(egret.Event.COMPLETE);

            return;
        }

        this._bmpMy.texture = this._ttrMyArr[this._currMyFrame % this._frameMySize];
    }

    public dispose(): void
    {
        this.stopMy();

        this.alpha = 1;

        if(this.parent)
        {
            this.parent.removeChild(this);
        }

        if(this._bmpMy) 
        {
            this._bmpMy.texture = null;
            
            if (this._bmpMy.parent)
            {
                this._bmpMy.parent.removeChild(this._bmpMy);
            }
            this._bmpMy = null;
        }

        this._ttrMyArr && (this._ttrMyArr.length = 0);
        this._ttrMyArr = null;
    }


    /** 把序列图切成纹理数组 */
    public getTextureArr($source:egret.Texture ,$frame:number):egret.Texture[]
    {
        if(!$source || $frame <= 0) return null;

        let sw:number = $source.textureWidth / $frame;
        let sh:number = $source.textureHeight;
       
        let frames:egret.Texture[] = [];

        let rect:egret.Rectangle = new egret.Rectangle();

        for (let i: number = 0;i < $frame;i++) 
        {
            rect.x = sw * i;
            rect.y = 0;
            rect.width = sw;
            rect.height = sh;
            frames.push(this.drawToTexture($source, rect));
        }
        
        return frames;
    }

    public drawToTexture(bmp:egret.Bitmap|egret.Texture,rect:egret.Rectangle):egret.Texture
    {
        let texture: egret.Texture;

        if(bmp instanceof egret.Bitmap) 
        {
            texture = bmp.texture;
        } 
        else if (bmp instanceof egret.Texture)
        {
            texture = bmp;
        } 
        else 
        {
            return null;
        }

        let ttr: egret.Texture = new egret.Texture();

        ttr.bitmapData = texture.bitmapData;//这种方式比画图快很多

        ttr.$initData(texture.$bitmapX + rect.x,texture.$bitmapY + rect.y,rect.width,rect.height,0,0,rect.width,rect.height,texture.$sourceWidth,texture.$sourceHeight);

        return ttr;
    }
}
