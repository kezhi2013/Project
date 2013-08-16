$(document).ready(function () {
    var WebServiceUrl = "";
    $("#Submit").click(function () {
        var Username = $("#Username").val();//取框中的用户名 
        var Password = $("#Password").val();//取框中的密码
        var ValidateCode = $("#ValidateCode").val();
        data = "UserName=" + Username + "&#Password=" + Password + "&#ValidateCode=" + ValidateCode;
        $.ajax({
            type: "post",
            dataType: "json",//返回json格式的数据
            url: WebServiceUrl,
            data: data,
            async: false,
            success: function (msg) {
                if (msg.ValidateState == "Passed") {
                    window.location.href="AdminHome.html"; 
                }
                else if (msg.ValidateState == "Failed") {
                }
            }
        });
        window.location.href = "AdminHome.html?SubPage=UserCenter.html";
    });
})