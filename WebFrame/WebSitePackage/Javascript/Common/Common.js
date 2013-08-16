//页面初始化的通用执行函数
$(document).ready(function () {

    ColorGenerater(MetroColor);
    ColorGenerater(BaseColor);

    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        xll: false
    };

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    if (system.win || system.mac || system.xll) {
        loadCss("../../Style/Common/Responsive/DefaultDevice.css");
    }
    else {
        loadCss("../../Style/Common/Responsive/SmallDevice.css");
    }
    

    $(".navHandle").VerticalNavHandle();

    $(".FileSelector").each(function () {
        $(this).fileSelector();
    });

    $("[HiddenAreaTarget]").each(function () {
        $(this).hiddenArea();
    });
});