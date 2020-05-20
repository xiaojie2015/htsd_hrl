/**
 * 原来的hitalk.js
 * @author: ting 
 * @date: 2018-08-16 22:36:23 
 * @last modified by: ting 
 */
function $hitalkJs(callback: Function, thisobj: any): void {
	if (window && window["hitalk_is_game"]) {
		LoadingConst.IS_WXGAME = false;

		if (window.location.protocol.toLowerCase().indexOf("https") >= 0)
			LoadingConst.ISHTTPS = true;


		if (!hitalk) {
			alert("url error");
			return;
		}

		if (getUrlParameter("https") == "1")
			LoadingConst.ISHTTPS = true;
		if (getUrlParameter("pc") == "1")
			LoadingConst.IS_PC = true;

		if (!hitalk.loginServer) {
			if (window["hitalk_config"]) {
				var loginServer: string = hitalk_config.loginServer;
				if (loginServer.indexOf("http") != 0) {
					loginServer = LoadingConst.HTTP_HEAD + loginServer;
				}
				hitalk.loginServer = loginServer;
			}
		}

		hitalkOpenSdk.login(0, function (loginObj: SDKUserInfoTvo) {
			if (loginObj) {
				if (!hitalk.urlParam) {
					hitalk.urlParam = {};
				}
				if (loginObj.openid) {
					hitalk.urlParam.openid = loginObj.openid;
				}
			}
			$setHtgVersion();

			if (callback) {
				callback.call(thisobj);
			}
		}, null);


		return;
	}
	LoadingConst.IS_WXGAME = true;
	LoadingConst.IS_WX_AUDIT = true;
	hitalk = { urlParam: {}, openid: null, loginServer: "", tversion: "", version: "", xversion: 0, errorReport: "", curPlatform: "" };
	window["hitalk"] = hitalk;
	hitalk.urlParam = {};
	hitalk.curPlatform = hitalkOpenSdk.curPlatform;
	hitalkOpenSdk.getLaunchOptionSync();
	if (window["hitalk_config"]) {
		if (hitalk_config.ishttps) {
			LoadingConst.ISHTTPS = true;
		} else {
			LoadingConst.ISHTTPS = false;
		}
		var loginServer: string = hitalk_config.loginServer;
		if (loginServer.indexOf("http") != 0) {
			loginServer = LoadingConst.HTTP_HEAD + loginServer;
		}
		hitalk.loginServer = loginServer;
		hitalk.errorReport = hitalk_config.errorReport
	}
	/** @todo ver/get有可能会超时，需要修改成index.html的模式*/
	let url: string = getLoginServer() + "/ver/get?r=" + Math.random();
	LoadMyRequest.sendMy(url, (val: string) => {
		hitalk.xversion = JSON.parse(val).xver;
		var isTestServer = false;
		isTestServer = $isResetLoginServer();
		if (isTestServer) {
			let reseturl: string = getLoginServer() + "/ver/get?r=" + Math.random();
			LoadMyRequest.sendMy(reseturl, (resetVal: string) => {
				$getVerComplete(resetVal, callback, thisobj);
			});
		} else {
			$getVerComplete(val, callback, thisobj);
		}
	});
}
function $setHtgVersion() {
	if (getUrlParameter("ver") != "1") {
		LoadingConst.VER = getVersion();
	}
	LoadingConst.VER_TEMP = getTempVersion();
	if (LoadingConst.VER_TEMP && LoadingConst.VER_TEMP != "") {
		LoadingConst.VER_TEMP = "_" + LoadingConst.VER_TEMP;
	}
}
//是否需要重置服务器地址为测试服
function $isResetLoginServer() {
	var isTestServer = false;
	LoadingConst.SERVER_VER_XYX = getXyxVersion();
	console.log("是否需要重置服务器地址为测试服:SERVER_VER_XYX=" + LoadingConst.SERVER_VER_XYX + ",LOCAL_VER_XYX=" + LoadingConst.LOCAL_VER_XYX);
	if (LoadingConst.LOCAL_VER_XYX > LoadingConst.SERVER_VER_XYX) {
		hitalk.loginServer = hitalk_config.loginTestServer;
		hitalk_config.resource = hitalk_config.resourceTest;
		LoadingConst.configData = hitalk_config;
		LoadingConst.res_url = LoadingConst.configData.resource;
		isTestServer = true;
		console.log("hitalk.loginServer:" + hitalk.loginServer + ",LoadingConst.res_url=" + LoadingConst.res_url);
		if (window['xyxConfig']) {
			window['xyxConfig'].setEnv = 1;
			window['xyxConfig'].is_normal = false;
		}
	} else {
		if (window['xyxConfig']) {
			window['xyxConfig'].setEnv = 0;
			window['xyxConfig'].is_normal = true;
		}
		console.log("进入正式服!");
	}
	if (hitalk.loginServer.indexOf("http") != 0) {
		hitalk.loginServer = LoadingConst.HTTP_HEAD + hitalk.loginServer;
	}
	return isTestServer
}
//加载版本号成功
function $getVerComplete(val: string, callback: Function, thisobj: any) {
	try {
		var obj = JSON.parse(val);
		hitalk.version = obj.ver;
		hitalk.tversion = obj.tver;
		hitalk.xversion = obj.xver;
		$setHtgVersion();
		if (hitalk_config.openid && hitalk_config.openid != "") {
			hitalk.urlParam.code = hitalk_config.openid;
			hitalk.urlParam.openid = hitalk_config.openid;
			if (callback) {
				callback.call(thisobj);
			}
			return;
		}
		hitalkOpenSdk.login(0, function (loginObj: SDKUserInfoTvo) {
			if (loginObj) {
				if (!hitalk.urlParam) {
					hitalk.urlParam = {};
				}
				if (loginObj.openid) {
					hitalk.urlParam.openid = loginObj.openid;
				}
			}
			if (callback) {
				callback.call(thisobj);
			}
			hitalkOpenSdk.reportUserRegisterNew({});
		}, null);
	} catch (e) {
		alert("getVersion error!");
	}
}
var hitalk: { urlParam: any, openid: string, loginServer: string, tversion: string, version: string, xversion: number, errorReport: string, curPlatform: string, charge?: number };
//获取模版版本号
function getTempVersion() {
	if (!hitalk)
		return "";
	return hitalk.tversion || "";
}
//获取版本号
function getVersion() {
	if (!hitalk)
		return "";
	return hitalk.version || "";
}
//获取小游戏版本号
function getXyxVersion() {
	if (!hitalk)
		return 99999999;
	return hitalk.xversion || 99999999;
}
//获取url中后面的所有参数并转成对象
function getAllURLParam() {
	if (hitalk.urlParam) {
		return hitalk.urlParam;
	}
	return {};
}
//根据名字获取url参数值
function getUrlParameter(name) {
	if (!hitalk) return "";

	return hitalk.urlParam[name];
}
//获取登录服地址
function getLoginServer() {
	if (!hitalk) return "";
	return hitalk.loginServer || "";
}
window["getUrlParameter"] = getUrlParameter;


