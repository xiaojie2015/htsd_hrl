/**
 * 区服信息
 */
interface ServerInfo
{
    /** 服务器唯一id */
	id:number;
	/** 区服名称 */
	an:string;
	/** 区服编号 */
	aid:number;
	/**☆ 模版域名*/
	tpurl:string;
	/** 区服ip地址 */
	ip: string;
	/**☆ 转发nginx地址*/
	gateurl: string;
	/** 区服端口 */
    p: number;
	/** 区服端口1 */
	p1:number;
	/** 区服端口2 */
	p2:number;
	/** 区服状态: 0:待开服; 1:已开服; 2:维护中; 3:已被合区; */
	s:number;
	/**☆ 是否新号*/
	isnew:number;
	/**充值金额*/
	charge:number;
}