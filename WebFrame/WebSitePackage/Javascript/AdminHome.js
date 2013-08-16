$(document).ready(function () {
    var DataServerUrl = "";
    //模块数据加载
    $("#BaseInfo")[0].LoadingData = function () {
        var panel = $(this);
        var dataFormObj = panel.find(".dataForm");
        //面板插件
        dataFormObj.dataForm({
            FieldName: "BaseInfo",
            KeyGroup: [
                { keyname: "SiteName", type: "inputText"},
                { keyname: "DNS", type: "inputText"},
                { keyname: "IP", type: "inputText"},
                { keyname: "IPC", type: "inputText"},
                { keyname: "City", type: "inputText"},
                { keyname: "Zoom", type: "inputText"},
                { keyname: "Telephone", type: "inputText"},
                { keyname: "Fax", type: "inputText"},
                { keyname: "SiteState",type: "selector"},
                { keyname: "Logo", type: "img"},
            ]
        });
        //dataFormObj.LoadingData();
        dataFormObj.test(data);
        //imgUploader
        var ImgUploaderObj = $("#LogoImgUploader");
        ImgUploaderObj.ImgUploader({
            width: 600,
            height: 400,
            ServiceUrl: DataServerUrl + "?Method=UploadImg",
            imgType: ["bmp", "gif", "png", "jpg"]
        });
    };
    $("#UserCenter")[0].LoadingData = function () {
        var panel = $(this);
        var dataFormObj = panel.find(".dataForm");
        //dataForm
        dataFormObj.dataForm({
            FieldName: "UserCenter",
            KeyGroup: [
                { keyname: "UserName", type: "inputText"},
                { keyname: "Email", type: "inputText" },
                { keyname: "telephone", type: "inputText" },
                { keyname: "Sex", type: "selector" },
                { keyname: "Birthday", type: "inputText" },
                { keyname: "IndividualResume", type: "textarea" },
                { keyname: "Role", type: "text" },
                { keyname: "Department", type: "text" },
                { keyname: "Job", type: "text" },
                { keyname: "Avatar", type: "img"},             
            ]
        });
        //dataFormObj.LoadingData();
        dataFormObj.test(data);
        //imgUploader
        var ImgUploaderObj = $("#AvatarImgUploader");
        ImgUploaderObj.ImgUploader({
            width: 600,
            height: 400,
            ServiceUrl: DataServerUrl + "?Method=UploadImg",
            imgType: ["bmp", "gif", "png", "jpg"]
        });
        //modify password 
        $("#oldPassword").formValidate();
        $("#newPassword").formValidate();
        $("#submit_password").formValidate({
            keyGroup: ["oldPassword", "newPassword"]
        });
        //table plugin
        var LoginHistoryDataTable = $("table#LoginHistory");
        LoginHistoryDataTable.DataTable({
            FieldName: "LoginHistoryTable",
            KeyGroup: [
                { keyname: "ID", type: "label",title:"编号" },
                { keyname: "Time", type: "label", title: "登录时间" },
                { keyname: "OnlineTime", type: "label", title: "在线时长" },
                { keyname: "Position", type: "label", title: "地点" },
                { keyname: "IP", type: "label", title: "IP" },
                { keyname: "Device", type: "label", title: "设备" },
            ]
        });
        //LoginHistoryDataTable.LoadingData();
        LoginHistoryDataTable.test(data);
    };
    $("#AccountManage")[0].LoadingData = function () {
        //表格插件
        var AccountTable = $("table#AccountTable");
        AccountTable.DataTable({
            FieldName: "AccountTable",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "UserName", type: "label", title: "用户名" },
                { keyname: "Role", type: "Selector", title: "角色" },
                { keyname: "Department", type: "Selector", title: "部门" },
                { keyname: "Job", type: "Selector", title: "职务" },
                { keyname: "Remark", type: "label", title: "备注" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["Delete"] },
            ],
            PaginationUl: $(this).find("ul.Pagination"),
        });
        //AccountTable.LoadingData(0);
        AccountTable.GetPageNum();
        AccountTable.test(data);
    };
    $("#RoleManage")[0].LoadingData = function () {
        //表格插件
        var RoleTable = $("table#RoleTable");
        RoleTable.DataTable({
            FieldName: "RoleTable",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "Name", type: "label", title: "角色名" },
                { keyname: "Description", type: "label", title: "描述" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["Edit","Delete"] },
            ],
            PaginationUl: $(this).find("ul.Pagination"),
            EditPage: "RoleEdit.html",
            EnableAdd: true,
        });
        //AccountTable.LoadingData(0);
        RoleTable.GetPageNum();
        RoleTable.test(data);
    };
    $("#OrganizationalStructure")[0].LoadingData = function () {
        var org = $(".orgStru");
        org.OrganizationalStructure({
            dataSource: "json",//ul或者json
            Editable: true,
            data:data.OrgStructure,
        });
    };
    $("#MomrabiliaManage")[0].LoadingData = function () {
        //表格插件
        var MomrabiliaManage = $(this);
        var MomrabiliaTable = $("table#MomrabiliaTable");
        MomrabiliaTable.DataTable({
            FieldName: "MomrabiliaTable",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "Title", type: "label", title: "标题" },
                { keyname: "Content", type: "label", title: "内容" },
                { keyname: "Time", type: "label", title: "时间" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["Edit", "Delete"] },
            ],
            PaginationUl: MomrabiliaManage.find("ul.Pagination"),
            EditPage: "MomrabiliaEdit.html",
            EnableAdd: true,
        });
        //NewsTable.LoadingData(0);
        MomrabiliaTable.GetPageNum();
        MomrabiliaTable.test(data);
    };
    $("#NewsManage")[0].LoadingData = function () {
        //表格插件
        var NewsManage = $(this);
        var NewsTable = $("table#NewsTable");
        NewsTable.DataTable({
            FieldName: "NewsTable",
            KeyGroup: [
                { keyname: "ID", type: "label",title:"编号" },
                { keyname: "Title", type: "label", title: "标题" },
                { keyname: "Editor", type: "label", title: "编辑" },
                { keyname: "Category", type: "Selector", title: "分类" },
                { keyname: "PublishedTime", type: "label", title: "发布时间" },
                { keyname: "ViewNum", type: "label", title: "阅读人数" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["View","Edit","Delete"] },
            ],
            PaginationUl: NewsManage.find("ul.Pagination"),
            EditPage: "NewsEdit.html",
            PreviewPage:"ArticalPreview.html",
            EnableAdd:true,
        });
        //NewsTable.LoadingData(0);
        NewsTable.GetPageNum();
        NewsTable.test(data);
    };
    $("#ArticalManage")[0].LoadingData = function () {
        //表格插件
        var ArticalManage = $(this);
        var ArticalTable = $("table#ArticalTable");
        ArticalTable.DataTable({
            FieldName: "ArticalTable",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "Title", type: "label", title: "标题" },
                { keyname: "Editor", type: "label", title: "编辑" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["View", "Edit", "Delete"] },
            ],
            PaginationUl: ArticalManage.find("ul.Pagination"),
            EditPage: "ArticalEdit.html",
            EnableAdd: true,
        });
        //NewsTable.LoadingData(0);
        ArticalTable.GetPageNum();
        ArticalTable.test(data);
    };
    $("#AnnouncementManage")[0].LoadingData = function () {
        //表格插件
        var AnnouncementManage = $(this);
        var AnnouncementTable = $("table#AnnouncementTable");
        AnnouncementTable.DataTable({
            FieldName: "AnnouncementTable",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "Title", type: "label", title: "标题" },
                { keyname: "Content", type: "label", title: "内容" },
                { keyname: "Editor", type: "label", title: "发布人" },
                { keyname: "PublishedTime", type: "label", title: "发布时间" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["Delete"] },
            ],
            PaginationUl: AnnouncementManage.find("ul.Pagination"),
            EditPage: "AnnouncementEdit.html",
            EnableAdd: true,
        });
        //AnnouncementTable.LoadingData(0);
        AnnouncementTable.GetPageNum();
        AnnouncementTable.test(data);
    };
    $("#MessageManage")[0].LoadingData = function () {
        var MessageManage = $(this);
        var MessageList = MessageManage.find("#MessageList");
        MessageList.Message({
            FieldName: "MessageList",
            KeyGroup: [
                { keyname: "ID", type: "label", title: "编号" },
                { keyname: "Title", type: "label", title: "标题" },
                { keyname: "Editor", type: "label", title: "编辑" },
                { keyname: "Category", type: "Selector", title: "分类" },
                { keyname: "PublishedTime", type: "label", title: "发布时间" },
                { keyname: "ViewNum", type: "label", title: "阅读人数" },
                { keyname: "Operate", type: "Operate", title: "操作", operatetype: ["View", "Edit", "Delete"] },
            ],
            PaginationUl: MessageManage.find("ul.Pagination"),
        });
        //MessageListObj.LoadingData(0);
        MessageList.GetPageNum();
        MessageList.test(data);
    };

    //初始化Accordion
    $("[AccordionTarget]").each(function () {
        $(this).Accordion();
    })
    //实例化面板
    $(".Panel").Panel({
        defaultPage: $("#UserCenter")
    });
    //实例化选项卡
    $(".Tabs").Tab();
    //页面顶部设置按钮
    $("button#UserSetting").click(function () {
        $(this).DynamicModule({
            title: "用户信息设置",
            type: "id",
            content: "UserSettingPanel",
            direction: "right",
        });
    });
});