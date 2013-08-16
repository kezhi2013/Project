/*
******************************************
字符串函数扩充                                
******************************************
*/

/*
===========================================
//去除左边的空格
===========================================
*/
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
}

/*
===========================================
//去除右边的空格
===========================================
*/
String.prototype.Rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

/*
===========================================
//去除前后空格
===========================================
*/
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

/*
===========================================
//得到左边的字符串
===========================================
*/
String.prototype.Left = function (len) {
    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }
    return this.substr(0, len);
}

/*
===========================================
//得到右边的字符串
===========================================
*/
String.prototype.Right = function (len) {
    if (isNaN(len) || len == null) {
        len = this.length;
    }
    else {
        if (parseInt(len) < 0 || parseInt(len) > this.length) {
            len = this.length;
        }
    }
    return this.substring(this.length - len, this.length);
}

/*
===========================================
//得到中间的字符串,注意从0开始
===========================================
*/
String.prototype.Mid = function (start, len) {
    return this.substr(start, len);
}

/*
===========================================
//在字符串里查找另一字符串:位置从0开始
===========================================
*/
String.prototype.InStr = function (str) {

    if (str == null) {
        str = "";
    }

    return this.indexOf(str);
}

/*
===========================================
//在字符串里反向查找另一字符串:位置0开始
===========================================
*/
String.prototype.InStrRev = function (str) {

    if (str == null) {
        str = "";
    }

    return this.lastIndexOf(str);
}

/*
===========================================
//计算字符串打印长度
===========================================
*/
String.prototype.LengthW = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length;
}

/*
===========================================
//是否是正确的IP地址
===========================================
*/
String.prototype.isIP = function () {
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (reSpaceCheck.test(this)) {
        this.match(reSpaceCheck);
        if (RegExp.$1 <= 255 && RegExp.$1 >= 0
        && RegExp.$2 <= 255 && RegExp.$2 >= 0
        && RegExp.$3 <= 255 && RegExp.$3 >= 0
        && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/*
===========================================
//是否是正确的长日期
===========================================
*/
String.prototype.isLongDate = function () {
    var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);

}

/*
===========================================
//是否是正确的短日期
===========================================
*/
String.prototype.isShortDate = function () {
    var r = this.replace(/(^\s*)|(\s*$)/g, "").match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
        return false;
    }
    var d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}

/*
===========================================
//是否是正确的日期
===========================================
*/
String.prototype.isDate = function () {
    return this.isLongDate() || this.isShortDate();
}

/*
===========================================
//是否是手机
===========================================
*/
String.prototype.isMobile = function () {
    return /^0{0,1}13[0-9]{9}$/.test(this);
}

/*
===========================================
//是否是邮件
===========================================
*/
String.prototype.isEmail = function () {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(this);
}

/*
===========================================
//是否是邮编(中国)
===========================================
*/
String.prototype.isZipCode = function () {
    return /^[\\d]{6}$/.test(this);
}

/*
===========================================
//是否是有汉字
===========================================
*/
String.prototype.existChinese = function () {
    //[\u4E00-\u9FA5]為漢字﹐[\uFE30-\uFFA0]為全角符號
    return /^[\x00-\xff]*$/.test(this);
}

/*
===========================================
//是否是合法的文件名/目录名
===========================================
*/
String.prototype.isFileName = function () {
    return !/[\\\/\*\?\|:"<>]/g.test(this);
}

/*
===========================================
//是否是有效链接
===========================================
*/
String.prototype.isUrl = function () {
    return /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/i.test(this);
}

/*
===========================================
//是否是有效的身份证(中国)
===========================================
*/
String.prototype.isIDCard = function () {
    var iSum = 0;
    var info = "";
    var sId = this;
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙 江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖 北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
        return false;
    }
    sId = sId.replace(/x$/i, "a");
    //非法地区
    if (aCity[parseInt(sId.substr(0, 2))] == null) {
        return false;
    }
    var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"))
    //非法生日
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) {
        return false;
    }
    for (var i = 17; i >= 0; i--) {
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    }

    if (iSum % 11 != 1) {
        return false;
    }
    return true;
}

/*
===========================================
//是否是有效的电话号码(中国)
===========================================
*/
String.prototype.isPhoneCall = function () {
    return /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)/.test(this);
}


/*
===========================================
//是否是数字
===========================================
*/
String.prototype.isNumeric = function (flag) {
    //验证是否是数字
    if (isNaN(this)) {

        return false;
    }

    switch (flag) {

        case null:        //数字
        case "":
            return true;
        case "+":        //正数
            return /(^\+?|^\d?)\d*\.?\d+$/.test(this);
        case "-":        //负数
            return /^-\d*\.?\d+$/.test(this);
        case "i":        //整数
            return /(^-?|^\+?|\d)\d+$/.test(this);
        case "+i":        //正整数
            return /(^\d+$)|(^\+?\d+$)/.test(this);
        case "-i":        //负整数
            return /^[-]\d+$/.test(this);
        case "f":        //浮点数
            return /(^-?|^\+?|^\d?)\d*\.\d+$/.test(this);
        case "+f":        //正浮点数
            return /(^\+?|^\d?)\d*\.\d+$/.test(this);
        case "-f":        //负浮点数
            return /^[-]\d*\.\d$/.test(this);
        default:        //缺省
            return true;
    }
}

/*
===========================================
//是否是颜色(#FFFFFF形式)
===========================================
*/
String.prototype.IsColor = function () {
    var temp = this;
    if (temp == "") return true;
    if (temp.length != 7) return false;
    return (temp.search(/\#[a-fA-F0-9]{6}/) != -1);
}

/*
===========================================
//转换成全角
===========================================
*/
String.prototype.toCase = function () {
    var tmp = "";
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 0 && this.charCodeAt(i) < 255) {
            tmp += String.fromCharCode(this.charCodeAt(i) + 65248);
        }
        else {
            tmp += String.fromCharCode(this.charCodeAt(i));
        }
    }
    return tmp
}

/*
===========================================
//对字符串进行Html编码
===========================================
*/
String.prototype.toHtmlEncode = function () {
    var str = this;

    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/\'/g, "&apos;");
    str = str.replace(/\"/g, "&quot;");
    str = str.replace(/\n/g, "<br>");
    str = str.replace(/\ /g, "&nbsp;");
    str = str.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");

    return str;
}

/*
===========================================
//转换成日期
===========================================
*/
String.prototype.toDate = function () {
    try {
        return new Date(this.replace(/-/g, "\/"));
    }
    catch (e) {
        return null;
    }
}


// 更详细的探测当前客户端使用的操作系统 
function detectOS() { 
    var sUserAgent = navigator.userAgent; 
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows"); 
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac) {
        return "Mac";
    }  
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac; 
    if (isUnix) {
        return "Unix";
    }
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1); 
    if (isLinux) {
        return "Linux";
    }
    if (isWin) { 
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1; 
        if (isWin2K) {
            return "Win2000";
        }
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1; 
        if (isWinXP) {
            return "WinXP";
        }
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1; 
        if (isWin2003) {
            return "Win2003";
        }
        var isWin2003 = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1; 
        if (isWin2003) {
            return "WinVista";
        }
        var isWin2003 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1; 
        if (isWin2003) {
            return "Win7";
        }
    }
    return "other";
}

var Device = {
    isPC: function () {

    },
    isPad: function () {

    },
    isPhone: function () {

    }
}

function dyniframesize(down) {
    var pTar = null;
    if (document.getElementById) {
        pTar = document.getElementById(down);
    }
    else {
        eval('pTar = ' + down + ';');
    }
    if (pTar && !window.opera) {
        //begin resizing iframe 
        pTar.style.display = "block"
        if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
            //ns6 syntax 
            pTar.height = pTar.contentDocument.body.offsetHeight + 20;
            pTar.width = pTar.contentDocument.body.scrollWidth + 20;
        }
        else if (pTar.Document && pTar.Document.body.scrollHeight) {
            //ie5+ syntax 
            pTar.height = pTar.Document.body.scrollHeight;
            pTar.width = pTar.Document.body.scrollWidth;
        }
    }
}

//获取url参数值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

//判断是不是它的子元素
$.fn.IsChildOf = function (obj) {
    var ChildObj = this;
    if (ChildObj[0] == obj) {
        return true;
    }
    do{
        if(ChildObj.parent()[0]==obj){
            return true;
        }     
        else{
            ChildObj=ChildObj.parent();
        }
    }
    while (ChildObj[0] == $("body")[0])
    return false;
}

//input auto width
function checkLength(which) {
    iCount = which.value.replace(/[^\u0000-\u00ff]/g, "aa");
    which.size = iCount.length + 2;
}

//获取对象的名字
function getName(Obj) {
    s = Obj.constructor.toString();
    if (s.indexOf('function') == -1) {
        return null;
    }
    else {
        s = s.replace('function', '');
        var idx = s.indexOf('(');
        s = s.substring(0, idx);
        s = s.replace(" ", "");
    }
    return s;
}

//获取元素类名数组
function getClass(ele) {
    return ele.className.replace(/\s+/, ' ').split(' ');
};

//添加样式表
function addSheet() {
    var doc,cssCode; 
    if(arguments.length == 1){ 
        doc = document; 
        cssCode = arguments[0] 
    }
    else if (arguments.length == 2) {
        doc = arguments[0]; 
        cssCode = arguments[1]; 
    }
    else {
        alert("addSheet函数最多接受两个参数!"); 
    } 
    if(!+"\v1"){//增加自动转换透明度功能，用户只需输入W3C的透明样式，它会自动转换成IE的透明滤镜 
        var t = cssCode.match(/opacity:(\d?\.\d+);/); 
        if(t!= null){ 
            cssCode = cssCode.replace(t[0], "filter:alpha(opacity="+ parseFloat(t[1]) * 100+")") 
        } 
    } 
    cssCode = cssCode + "\n";//增加末尾的换行符，方便在firebug下的查看。 
    var headElement = doc.getElementsByTagName("head")[0]; 
    var styleElements = headElement.getElementsByTagName("style"); 
    if(styleElements.length == 0){//如果不存在style元素则创建 
        if(doc.createStyleSheet){    //ie 
            doc.createStyleSheet(); 
        }
        else {
            var tempStyleElement = doc.createElement('style');//w3c 
            tempStyleElement.setAttribute("type", "text/css"); 
            headElement.appendChild(tempStyleElement); 
        } 
    } 
    var  styleElement = styleElements[0]; 
    var media = styleElement.getAttribute("media"); 
    if(media != null && !/screen/.test(media.toLowerCase()) ){ 
        styleElement.setAttribute("media","screen"); 
    } 
    if(styleElement.styleSheet){    //ie 
        styleElement.styleSheet.cssText += cssCode; 
    }
    else if (doc.getBoxObjectFor) {
        styleElement.innerHTML += cssCode;//火狐支持直接innerHTML添加样式表字串 
    }
    else {
        styleElement.appendChild(doc.createTextNode(cssCode))
    }
}

//动态加载js，css文件
function loadCss(file) {
    var head = document.getElementsByTagName('head')[0];
    var css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    css.setAttribute('href', file);
    head.appendChild(css);
    // alert state change
    css.onreadystatechange = function () {
        if (css.readyState == 'complete') {
            console.log("CSS onreadystatechange fired");
        }
    }
    css.onload = function () {
        console.log("JS onload fired");
    }
    return false;
}

function loadJs(file) {
    var head = document.getElementsByTagName('head')[0];
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', file);
    head.appendChild(js);
    js.onreadystatechange = function () {
        if (js.readyState == 'complete') {
            console.log("JS onreadystate fired");
        }
    }
    js.onload = function () {
        console.log("JS onload fired");
    }
    return false;
}

//页面颜色生成器
function ColorGenerater(ColorArray) {
    var styleSheet = "";
    for (i = 0; i < ColorArray.length; i++) {
        var colorObj = ColorArray[i];
        styleSheet += ".bg-color-" + colorObj.key + "{background-color:" + colorObj.value + " !important;}";
        styleSheet += ".fg-color-" + colorObj.key + "{color:" + colorObj.value + " !important;}";
    }
    addSheet(styleSheet);
}