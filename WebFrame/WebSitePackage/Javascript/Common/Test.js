//以下是本地测试用数据，正式启动请删除
var data = {
    BaseInfo: {
        SiteName:{value: "01工作室",editable:true},
        DNS: {value:"www.01Studio.com",editable:true},
        IP: { value: "192.168.1.1", editable: true },
        IPC: { value:"粤ICP备05000231号",editable:true},
        City: { value: "上海", editable: true },
        Zoom: { value: 11, editable: true },
        Telephone: { value:"021-3283883", editable: true },
        Fax: { value:"021-3283883", editable: true },
        SiteState: { value:"打开",options: ["关闭", "维护", "打开"], editable: true },
        Logo: { value: "../Picture/Icon/logo.png", editable: true },
    },
    UserCenter: {
        UserName: {value:"kezhi",editable:true},
        Sex: { value: "男", options: ["男", "女", "未知"], editable: true },
        Birthday: {value:"2012-12-21",editable:true},
        Role:{value: "管理员",editable:false},
        Department:{value: "技术部",editable:false},
        Job:{value: "研究员",editable:false},
        IndividualResume:{value: "中国科学院院士",editable:true},
        Email: { value: "chenzhegang@126.com", editable: true },
        telephone: { value: "18621899435", editable: true },
        Avatar: { value: "../Picture/User/Avatar/UserAvatar.png", editable: true }
    },
    LoginHistoryTable: [
        { ID: 1, Time: 2012 - 03 - 31, OnlineTime: "15min", Position: "上海市浦东新区", IP: "192.109.3.3", Device: "Apple" }
    ],
    AccountTable: [
        { ID: 1, UserName: "Kezhi", Role: ["新闻发布员", ["新闻发布员", "账号管理员", "公告发布员"]], Department: ["策划部", ["市场部", "研发部", "策划部"]], Job: ["经理", ["经理", "总管"], "职员"], Remark: "无" },
    ],
    RoleTable: [
        { ID: 1, Name: "超级管理员", Description: "和控件黄金客户控件黄金客户快黄金客户健康", },
        { ID: 1, Name: "信息发布员", Description: "和控件黄金客户控件黄金客户快黄金客户健康", },
        { ID: 1, Name: "账号管理员", Description: "和控件黄金客户控件黄金客户快黄金客户健康", },
        { ID: 1, Name: "信息管理员", Description: "和控件黄金客户控件黄金客户快黄金客户健康", },
        { ID: 1, Name: "留言管理员", Description: "和控件黄金客户控件黄金客户快黄金客户健康", },
    ],
    ArticalTable: [
        { ID: 1, Title: "关于我们", Editor: "Kezhi", },
        { ID: 2, Title: "企业文化", Editor: "Kezhi", },
        { ID: 3, Title: "发展规划", Editor: "Kezhi", },
    ],
    NewsTable: [
        { ID: 1, Title: "塞德里克减肥的事", Editor: "Kezhi", Category: ["企业新闻", ["企业新闻", "行业新闻"]], PublishedTime: "2012-03-07", ViewNum: 248833 },
        { ID: 2, Title: "塞德里克减肥的事", Editor: "Kezhi", Category: ["企业新闻", ["企业新闻", "行业新闻"]], PublishedTime: "2012-03-07", ViewNum: 248833 },
    ],
    MessageList: [
        { ID: 1, Content: "塞德里克减肥的事", User: "Kezhi", IP: "", MessagerInfo: { PhoneNumber: "1893838382", Email: "chenzhegang@126.com", }, Time: "2012-03-07" },
        { ID: 2, Content: "塞德里克减肥的事", User: "Kezhi", IP: "", MessagerInfo: { PhoneNumber: "1893838382", Email: "chenzhegang@126.com", }, Time: "2012-03-07" },
        { ID: 3, Content: "塞德里克减肥的事", User: "Kezhi", IP: "", MessagerInfo: { PhoneNumber: "1893838382", Email: "chenzhegang@126.com", }, Time: "2012-03-07" },
    ],
    MomrabiliaTable: [
        { ID: 1, Title: "塞德里克减肥的事", Content: "打三分第三方第三方撒地方斯蒂芬", Time: "2013-0aa3-23" },
        { ID: 2, Title: "塞德里克减肥的事", Content: "打三分第三方第三方撒地方斯蒂芬", Time: "2013-0aa3-23" },
        { ID: 3, Title: "塞德里克减肥的事", Content: "打三分第三方第三方撒地方斯蒂芬", Time: "2013-0aa3-23" },
        { ID: 4, Title: "塞德里克减肥的事", Content: "打三分第三方第三方撒地方斯蒂芬", Time: "2013-0aa3-23" },
    ],
    AnnouncementTable: [
        { ID: 1, Title: "塞德里克减肥的事", Content: "优米手机隶属深圳市优米科技有限公司,优米手机推出优米X1,优米x1s,优米X2率先提提出“为刷机而生”,致力于打造极致的玩家级手机。", Editor: "Kezhi", PublishedTime: "2012-03-07" },
        { ID: 2, Title: "塞德里克减肥的事", Content: "优米手机隶属深圳市优米科技有限公司,优米手机推出优米X1,优米x1s,优米X2率先提提出“为刷机而生”,致力于打造极致的玩家级手机。", Editor: "Kezhi", PublishedTime: "2012-03-07" },
    ],
    OrgStructure: {
        RootUl: [
            {
                id: 1,
                content: "董事会",
                ul: [
                    {
                        id: 2,
                        content: "公司管理层",
                        ul: [
                            {
                                id: 3,
                                content: "技术部"
                            },
                            {
                                id: 4,
                                content: "市场部"
                            },
                            {
                                id: 5,
                                content: "行政部"
                            },
                        ]
                    }
                ]
            }
        ]
    },
};