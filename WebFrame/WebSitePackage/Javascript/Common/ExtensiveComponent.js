//**********************图片上传预览插件************************
//说明：图片上传预览插件
//上传的时候可以生成固定宽高范围内的等比例缩放图

//参数设置：
//width                     存放图片固定大小容器的宽
//height                    存放图片固定大小容器的高
//imgType                   数组后缀名
(function ($) {
    $.fn.ImgUploader = function (options) {
        var defaults = {
            width: "auto",
            height: 0,
            ServiceUrl: "",
            imgType: ["gif", "jpeg", "jpg", "bmp", "png"],
            SettedImg: null,
            callback: function () {
                return false;
            }
        };
        var options = $.extend(defaults, options);
        var ImgUploaderDiv = this;
        var FileInput = ImgUploaderDiv.find("input[type=file]");
        var ImgPreviewDiv = ImgUploaderDiv.find(".ImgPreview");
        var cuttedImgContainer = ImgUploaderDiv.find(".cuttedImgContainer");
        var cuttedImg = cuttedImgContainer.find("img");
        var ProgressBar = ImgUploaderDiv.find(".ProgressBar");
        var UploadImgButton = ImgUploaderDiv.find("input.UploadImg");
        var SetImgButton = ImgUploaderDiv.find("input.SetImg").attr("disabled", "disabled");
        var currentImgUrl;
        // Create variables (in this scope) to hold the API and image size
        var jcrop_api, boundx, boundy;
        ImgPreviewDiv.width(options.width);
        ImgPreviewDiv.height(options.height);
        var img = $("<img/>").appendTo(ImgPreviewDiv).css({ "vertical-align": "middle" });
        var JcropObj = $.Jcrop(img,
            {
                allowResize: true,
                allowMove: true,
                bgFade: true,
                aspectRatio: 1,
                sideHandles: true,
                cornerHandles: true,
                boxWidth: 600,
                onChange: displayCuttedImg,
                onSelect: function (selectedRange) {
                    cuttedImg.attr("src", currentImgUrl);
                },
            }
        );
        function displayCuttedImg(c) {
            if (parseInt(c.w) > 0) {
                // Use the API to get the real image size
                var bounds = JcropObj.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];
                var scaleX = cuttedImgContainer.width() / c.w;
                var scaleY = cuttedImgContainer.height() / c.h;
                cuttedImg.css({
                    width: Math.round(scaleX * boundx) + 'px',
                    height: Math.round(scaleY * boundy) + 'px',
                    marginLeft: '-' + Math.round(scaleX * c.x) + 'px',
                    marginTop: '-' + Math.round(scaleY * c.y) + 'px'
                });
            }
        }
        JcropObj.disable();
        FileInput.change(function () {
            var value = this.value;
            if (value) {
                if (!RegExp("\.(" + options.imgType.join("|") + ")$", "i").test(value.toLowerCase())) {
                    $.Alert({
                        content: "图片类型必须是" + options.imgType.join("，") + "中的一种",
                        callback: function () {
                            FileInput[0].value = "";
                            return false;
                        }
                    });
                }
                ProgressBar.find("span").css("width", 0);
                var fileList = this.files;
                currentImgUrl = window.URL.createObjectURL(this.files[0]);
                JcropObj.setImage(currentImgUrl);
                JcropObj.disable();
            }
        });
        SetImgButton.click(function () {
            console.log(JcropObj.tellSelect());
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: options.DataServerUrl + "?Method=SetImg",//要访问的后台地址
                data: {//要发送的数据
                    Field: options.FieldName,
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    options.SettedImg.attr("src", msg.ImgUrlInServer);
                }
            });
        });
        UploadImgButton.click(function () {
            var fd = new FormData();
            fd.append("fileToUpload", FileInput.val()[0]);
            var Cutter = JcropObj.tellSelect();
            fd.append("x", Cutter.x);
            fd.append("y", Cutter.y);
            fd.append("w", Cutter.w);
            fd.append("h", Cutter.h);
            var xhr = new XMLHttpRequest();
            //上传进度
            xhr.upload.addEventListener("progress", function (e) {
                if (e.lengthComputable) {
                    var loaded = (e.loaded / e.total) * 100 + "%";
                    ProgressBar.find("span").css("width", loaded);
                }
            });
            //上传完成
            xhr.upload.addEventListener("load", function (e) {
                SetImgButton.removeAttr("disabled");
                var ImgUrlInServer = e.target.responseText;
            });
            xhr.open("post", options.ServiceUrl, true);
            xhr.send(fd);
        });
    }
})(jQuery);

//二级垂直导航栏
$(document).ready(function () {
    var Nav = $("ul.Nav.vertical-list.level2");
    Nav.find(".title").each(function () {
        var Title = $(this);
        var ItemBoby = Title.closest(".ItemBody");
        var ItemMainDiv = ItemBoby.find(".ItemMainDiv");
        var ItemChildUlBox = ItemBoby.find(".ItemChildUlBox");
        if (ItemChildUlBox[0] == null) {//没有子ul的是末级
            Title.click(function () {
                Nav.find("li.actived").removeClass("actived");
                Title.closest("li").addClass("actived");
            });
        }
        else {
            var li = Title.closest("li").addClass("opened");
            ItemChildUlBox.OpenState = true;
            Title.click(function () {//有子ul的是文件夹
                li.toggleClass("opened");
                if (ItemChildUlBox.OpenState) {
                    ItemChildUlBox.slideUp(500, function () {
                        ItemChildUlBox.OpenState = false;
                    });
                }
                else {
                    ItemChildUlBox.slideDown(500, function () {
                        ItemChildUlBox.OpenState = true;
                    });
                }
            });
        }
    });
});

//动态模块
$.fn.DynamicModule = function (options) {
    var defaults = {
        title: "title",                                //弹出层的标题  
        type: "iframe",                                //弹出层类型(text、容器ID、URL、Iframe)  
        content: "content",                            //弹出层的内容(text文本、容器ID名称、URL地址、Iframe的地址)  
        direction: "top",
        width: 500,                                    //弹出层的宽度  
        height: 400,                                   //弹出层的高度   
        closeCallback: function () { }
    };
    var options = $.extend(defaults, options);
    var DynamicModule = $("<div class='DynamicModule'></div>").appendTo('body');
    DynamicModule.addClass(options.direction);
    var Header = $("<div class='ModuleHeader'><h1>" + options.title + "</h1></div>").appendTo(DynamicModule);
    var CloseHandle = $("<button class='iconButton x24 icon-x CloseHandle'></button>").appendTo(Header).click(function () {
        options.closeCallback();
    });
    var Body = $("<div class='ModuleBody'></div>").appendTo(DynamicModule);
    switch (options.direction) {
        case "left":
            DynamicModule.css({ "width": options.width + "px", "left": -options.width + "px" });
            DynamicModule.animate({ 'left': 0 }, 500);
            CloseHandle.click(function () {
                DynamicModule.animate({ "left": -options.width + "px" }, 500, function () {
                    DynamicModule.remove();
                })
            });
            break;
        case "right":
            DynamicModule.css({ "width": options.width + "px", "right": -options.width + "px" });
            DynamicModule.animate({ 'right': 0 }, 500);
            CloseHandle.click(function () {
                DynamicModule.animate({ "right": -options.width + "px" }, 500, function () {
                    DynamicModule.remove();
                })
            });
            break;
        case "top":
            $(DynamicModule).css({ "top": -$(DynamicModule).height() });
            $(DynamicModule).animate({ 'top': 0 }, 500);
            break;
    }
    switch (options.type) {
        case "obj":
            $(Body).append(options.content);        //当类型是对象的时候  
        case "url":                                 //当类型是地址的时候                   
            Body.ajaxStart(function () {
                $(this).html("loading...");
            });
            $.get(options.content, function (html) {
                Body.html(html);
            });
        case "iframe":                              //当类型是Iframe的时候
            var loading = $("<span class='ObjectIcon x96 loading icon-loading-2'></span>").appendTo(Body);
            var iframe = $("<iframe scrolling='no' frameborder='0'></iframe>").appendTo(Body);
            iframe.attr("src", options.content);
            iframe.load(function () {
                loading.remove();
                var win = this;
                if (document.getElementById) {
                    if (win && !window.opera) {
                        if (win.contentDocument && win.contentDocument.body.offsetHeight)
                            win.height = win.contentDocument.body.offsetHeight;
                        else if (win.Document && win.Document.body.scrollHeight)
                            win.height = win.Document.body.scrollHeight;
                    }
                }
            });
            break;
        case "text":                                //当类型是文本的时候  
            Body.html(options.content);
            break;
        case "id":                                  //当类型是容器ID的时候  
            $("#" + options.content).clone(true).addClass("Actived").appendTo(Body);
            break;
    }
};

//页面导航
(function ($) {
    $.fn.Panel = function (options) {
        var defaults = {
            defaultPage: null,
        };
        var options = $.extend(defaults, options);
        var PanelObj = this;
        options.defaultPage.fadeIn(300).addClass("activedPage");
        var PanelBox = PanelObj.find("PanelBox");
        var sitePathBarUI = $(".sitePath-bar").find("ul");
        $("[ToPanelPage]").each(function () {
            var target = $("#" + $(this).attr("ToPanelPage"));
            if (target[0] != null) {
                target.data("HasLoaded", false);
                if (target[0] == options.defaultPage[0]) {
                    try {
                        target[0].LoadingData();
                        target.data("HasLoaded", true);
                    }
                    catch (e) {
                    }
                }
                $(this).click(function () {
                    var activedPage = $(".activedPage");
                    if (target[0] != null) {
                        sitePathBarUI.html("").html("<li><a>后台管理</a></li>");
                        $("<li><a ToPanelPage='" + $(this).attr("ToPanelPage") + "'>" + this.innerText + "</a></li>").appendTo(sitePathBarUI);
                        activedPage.fadeOut(150, function () {
                            activedPage.css("display", "none").removeClass("activedPage");
                            target.fadeIn(150).addClass("activedPage");
                            if (!target.data("HasLoaded")) {
                                if (target[0].LoadingData) {
                                    target[0].LoadingData();
                                }
                                target.data("HasLoaded", true);
                            }
                        });
                    }
                });
            }
        });
    }
})(jQuery);

//富文本编辑器
(function ($) {
    $.fn.ArticalEditor = function (options) {
        var defaults = {
            InitDoc: "",
            dimensions: "default",//编辑器的规模，比如simple和default
        };
        var options = $.extend(defaults, options);
        var ArticalEditorObj = this;
        var toolbar = $("<div class='toolbar'></div>").prependTo(ArticalEditorObj);
        var toolbarline1 = $("<div></div>").appendTo(toolbar);
        if (options.dimensions != "simple") {
            var toolbarline2 = $("<div></div>").appendTo(toolbar);
        }
        var iframeObj = ArticalEditorObj.find("iframe").wrap("<div class='ArticalBody'></div>");
        var ArticalBody = iframeObj.parent();
        var textarea = $("<textarea></textarea>").appendTo(ArticalBody);
        var iframe = iframeObj[0];
        var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.designMode = "on";
        iframeDocument.open();
        iframeDocument.write(options.InitDoc);
        iframeDocument.close();
        var EditingMode = true;
        var buttons = {//工具栏的按钮集合
            "Base": {
                'save': ['保存', 'icon-save'],
                'redo': ['重做', 'icon-redo'],
                'undo': ['还原', 'icon-undo'],
            },
            "fontstyle-Base": {
                'bold': ['加粗', 'icon-bold'],
                'italic': ['斜体', 'icon-italic'],
                'underline': ['下划线', 'icon-underline'],
                'strikethrough': ['删除线', 'icon-strikethrough'],
            },
            "paragraphStyle": {
                'justifyleft': ['居左', 'icon-justifyleft'],
                'justifycenter': ['居中', 'icon-justifycenter'],
                'justifyright': ['居右', 'icon-justifyright'],
            },
            "ListStyle": {
                'indent': ['缩进', 'icon-indent'],
                'outdent': ['悬挂', 'icon-outdent'],
                'insertorderedlist': ['有序列表', 'icon-liststyletype-decimal'],
                'insertunorderedlist': ['无序列表', 'icon-liststyletype-disc'],
            }
        };
        if (options.dimensions == "default") {
            buttons["insert"] = {
                'insertimage': ['插图', 'icon-picture'],
                'table': ['插入表格', 'icon-table'],
                'emoticons': ['插入表情', 'icon-smiley'],
                'createlink': ['超链接', 'icon-link'],
            }
            buttons["fontstyle-Others"] = $.extend(buttons["fontstyle"],
                {//工具栏的按钮集合
                    'forecolor': ['前景色'],
                    'backcolor': ['背景色'],
                    'fontname': ['字体', 'icon-font'],
                    'fontsize': ['字码'],
                });
            buttons["others"] = {
                'html': ['查看', "icon-file-xml"]
            };
        }
        var fontFamilies = ['宋体', '经典中圆简', '微软雅黑', '黑体', '楷体', '隶书', '幼圆',
            'Arial', 'Arial Narrow', 'Arial Black', 'Comic Sans MS',
            'Courier New', 'Georgia', 'New Roman Times', 'Verdana'];
        var fontSizes = [
            [1, 'xx-small'],
            [2, 'x-small'],
            [3, 'small'],
            [4, 'medium'],
            [5, 'large'],
            [6, 'x-large'],
            [7, 'xx-large']];
        var buttonClone = $("<button class='iconButton x21'></button>");
        for (var i in buttons) {/*添加命令按钮的名字，样式*/
            var groupDiv = $("<div class='toolbuttonGroup'></div>");
            if (i == "fontstyle-Others" & options.dimensions != "simple") {
                groupDiv.appendTo(toolbarline2);
            }
            else {
                groupDiv.appendTo(toolbarline1);
            }
            for (var j in buttons[i]) {
                if (j == 'backcolor') {
                    var backcolor = $("<label id='backcolor' class='backcolor' unselectable='on'>A</label>").attr("title", j).appendTo(groupDiv);
                    backcolor.ColorPicker({
                        success: function (SelectedColor) {
                            _format("backcolor", SelectedColor);
                        }
                    });
                    continue;
                }
                if (j == 'forecolor') {
                    var forecolor = $("<label id='forecolor' class='forecolor' unselectable='on'>T</label>").attr("title", j).appendTo(groupDiv);
                    forecolor.ColorPicker({
                        success: function (SelectedColor) {
                            _format("forecolor", SelectedColor);
                        }
                    });
                    continue;
                }
                if (j == 'fontname') {
                    var fontname = $("<div id='fontname' class='DropSelector'><span>字体</span></div>").attr("title", j).appendTo(groupDiv);
                    var ul = $("<ul></ul>").appendTo(fontname);
                    $.each(fontFamilies, function (key, val) {
                        var li = $("<li></li>").text(val).css("font-family", val).appendTo(ul);
                        li.click(function () {
                            fontname.find("label").css("font-family", val);
                            _format("fontname", val);
                        })
                    })
                    $(fontname).DropSelector();
                    continue;
                }
                if (j == 'fontsize') {
                    var fontsize = $("<div id='fontsize' class='DropSelector'><span>W</span></div>").attr("title", j).appendTo(groupDiv);
                    var ul = $("<ul></ul>").appendTo(fontsize);
                    $.each(fontSizes, function (key, val) {
                        var li = $("<li></li>").text(val[1]).css("font-size", val[1]).appendTo(ul);
                        li.click(function () {
                            _format("fontsize", val[0]);
                        })
                    })
                    $(fontsize).DropSelector();
                    continue;
                }
                var button = buttonClone.clone();
                button.attr("title", j);/*把execCommand的命令参数放到title*/
                button.addClass(buttons[i][j][1]);
                button.attr("unselectable", "on");/*防止焦点转移到点击的元素上，从而保证文本的选中状态*/
                button.appendTo(groupDiv);
            }
        }
        toolbar.click(function () {
            var e = arguments[0] || window.event,
            target = e.srcElement ? e.srcElement : e.target,
            command = target.getAttribute("title");
            switch (command) {
                case 'createlink':
                    break;
                case 'insertimage':
                    var value = prompt('请输入网址:', 'http://');
                    _format(command, value);
                    break;
                case 'fontname'://这六个特殊处理，不直接执行fontEdit命令！
                case 'fontsize':
                    break;
                case 'forecolor':
                    break;
                case 'backcolor':
                    break;
                case 'html':
                    if (EditingMode) {
                        ToHTML();
                    }
                    else {
                        ToRich();
                    }
                    break;
                case 'table':
                    break;
                case 'emoticons':
                    break;
                default://其他执行fontEdit(cmd, null)命令
                    _format(command, '');
                    break;
            }
        });
        /*******************核心代码之一******************************************/
        var ToHTML = function () {
            iframeObj.css("display", "none");
            textarea.css("display", "block");
            textarea.val(iframeDocument.body.innerHTML);
            textarea[0].focus();
            EditingMode = false;
        }
        var ToRich = function () {
            iframe.style.display = "block";
            textarea[0].style.display = "none";
            iframeDocument.body.innerHTML = textarea.val();
            iframe.contentWindow.focus();
            EditingMode = true;
        }
        /********************处理富文本编辑器的格式化命令**************************/
        var _format = function (x, y) {
            try {
                iframeDocument.execCommand(x, false, y);
                iframe.contentWindow.focus();
            }
            catch (e) {
            }
        }
        //API之取得文档内容
        ArticalEditorObj.GetDoc = function () {
            textarea.val(iframeDocument.body.innerHTML);
            return textarea.val();
        }
    }
})(jQuery);

//组织结构
(function ($) {
    $.fn.OrganizationalStructure = function (options) {
        var defaults = {
            dataSource: "ul",//ul或者json
            Editable: false,
            data: null,
            DataServerUrl: "",
        };
        var options = $.extend(defaults, options);
        var OrganizationalStructureObj = this;
        var RootUl = $("<ul></ul>").appendTo(OrganizationalStructureObj);
        RootUl.addClass("RootUl");
        //数据来源为界面ul
        var DrawUlWithUl = function (ul) {
            ul.addClass("ItemChildUl");
            var lis = ul.children("li");
            lis.each(function (key, value) {
                var li = $(value);
                var liContent = $(li[0].firstChild);
                liContent.wrap("<div class='ItemMainDiv'><div class='ItemBox'></div></div>");
                $(li.find(".ItemBox")[0]).click(function () {
                    li.children(".ItemChildUlBox").slideToggle();
                });
                li.children(".ItemMainDiv").prepend("<div class='ItemLineBox'><div class='ItemLine'></div></div>");
                var liChildUl = li.children("ul");
                if (liChildUl[0] != null) {
                    liChildUl.wrap("<div class='ItemChildUlBox'></div>");
                    liChildUl.parent().prepend($("<div class='ChildUlLineBox'><div class='ChildUlLine'></div></div>"));
                    DrawUlWithUl(liChildUl);
                }
            });
        };
        //数据来源为json对象
        var DragObj;
        //绘制li
        var DrawLi = function (dataLi, ul) {
            var li = $("<li><div class='ItemMainDiv'><div class='ItemBox'></div></div></li>").attr("ItemID", dataLi.id).appendTo(ul);
            var ItemBox = li.find(".ItemBox");
            $("<div class='ItemContent'></div>").text(dataLi.content).appendTo(ItemBox);
            ItemBox.bind("click", function () {
                $(this).closest("li").children(".ItemChildUlBox").slideToggle();
            });
            ItemBox.attr("draggable", true);
            if (options.Editable) {
                var ItemToolbar = $("<div class='ItemToolbar'></div>").appendTo(ItemBox);
                //删除按钮
                $("<button class='iconButton x24 icon-dustbin'></button>").appendTo(ItemToolbar).bind("click", function () {
                    $.Confirm({
                        content: "您确认要删除吗，该操作不可恢复！",
                        callback: function () {
                            var ItemID = li.attr("ItemID");
                            li.remove();
                            DataUpdata({
                                Method: "Delete",
                                ItemID: ItemID,
                            });
                        }
                    })
                });
                //添加按钮
                $("<button class='iconButton x24 icon-plus'></button>").appendTo(ItemToolbar).bind("click", function (event) {
                    li.children(".ItemChildUlBox").slideDown();
                    var Newli = DrawLi({ id: 0, content: "" }, li.children(".ItemChildUlBox").children("ul"));
                    var ParentID = li.attr("ItemID");
                    DataUpdata({
                        Method: "Add",
                        ParentID: ParentID,
                        callback: function (msg) {
                            liNewli.attr("ItemID", msg.ID)
                        }
                    });
                    event.stopPropagation();
                });
                //编辑按钮
                $("<button class='iconButton x24 icon-edit'></button>").appendTo(ItemToolbar).bind("click", function () {
                    ItemBox.attr("contenteditable", true).focus();
                    ItemBox.blur(function () {
                        var ItemID = li.attr("ItemID");
                        var Content = $(this).find(".ItemContent").html();
                        DataUpdata({
                            Method: "Set",
                            ItemID: ItemID,
                            Content: Content
                        })
                        ItemBox.removeAttr("contenteditable");
                    })

                });
                ItemBox.bind("dragstart", function (e) {
                    DragObj = $(e.target);
                    DragObj.addClass("dragged");
                });
                ItemBox.bind("dragend", function (e) {
                    DragObj.removeClass("dragged");
                    e.preventDefault();
                });
                ItemBox.bind("dragenter", function (e) {
                    var target = $(e.target).closest(".ItemBox");
                    target.addClass("dragoverTarget");
                    e.preventDefault();
                });
                ItemBox.bind("dragleave", function (e) {
                    var target = $(e.target).closest(".ItemBox");
                    target.removeClass("dragoverTarget");
                    e.preventDefault();
                });
                ItemBox.bind("dragover", function (e) {
                    e.preventDefault();
                });
                ItemBox.bind("drop", function (e) {
                    var target = $(e.target).closest(".ItemBox");
                    if (target[0] == DragObj[0]) {
                        target.removeClass("dragoverTarget");
                        return;
                    }
                    var NewParentID = target.closest("li").attr("ItemID");
                    DragObj.removeClass("dragged");
                    var DragObjli = DragObj.closest("li");
                    var ItemID = DragObjli.attr("ItemID");
                    var liClone = DragObjli.clone(true);
                    var ParentItemChildUlBox = DragObjli.closest(".ItemChildUlBox");
                    var targetChildUl = target.closest("li").children(".ItemChildUlBox").children("ul");
                    target.closest("li").children(".ItemChildUlBox").slideDown(0);
                    DragObjli.remove();
                    if (ParentItemChildUlBox.children("ul").find("li").length == 0) {
                        ParentItemChildUlBox.slideUp(500);
                    }
                    liClone.appendTo(targetChildUl);
                    target.removeClass("dragoverTarget");
                    DataUpdata({
                        Method: "Move",
                        ItemID: ItemID,
                        NewParentID: NewParentID
                    });
                    e.preventDefault();
                });
            }
            if (dataLi.ul == null) {
                dataLi.ul = [];
            }
            var ItemChildUlBox = $("<div class='ItemChildUlBox'></div>").appendTo(li);
            if (dataLi.ul.length == 0) {
                ItemChildUlBox.slideUp(0);
            }
            var childUl = $("<ul></ul>").appendTo(ItemChildUlBox);
            DrawUlWithJson(dataLi.ul, childUl);
            return li;
        };
        var DrawUlWithJson = function (dataUl, ul) {
            ul.addClass("ItemChildUl cf");
            for (var i in dataUl) {
                var dataLi = dataUl[i];
                DrawLi(dataLi, ul);
            }
        };
        if (options.dataSource == "ul") {
            DrawUlWithUl(RootUl);
        }
        else if (options.dataSource == "json") {
            DrawUlWithJson(options.data.RootUl, RootUl);
        }
        //数据更新接口
        var DataUpdata = function (param) {
            var url = options.DataServerUrl + "?FieldArea=OrganizationalStructure" + "&Method=" + param.Method;
            var data = {};
            switch (param.Method) {
                case "Add":
                    data.parentID = param.ParentID;
                    break;
                case "Delete":
                    data.ItemID = param.ItemID;
                case "Set":
                    data.Content = param.Content;
                case "Move":
                    data.ItemID = param.ItemID;
                    data.NewParentID = param.NewParentID;
            }
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: url,
                data: data,//要发送的数据
                beforeSend: function () {
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    param.callback(msg);
                }
            });
        }
    }
})(jQuery);

//数据表格
(function ($) {
    $.fn.DataTable = function (options) {
        var defaults = {
            DataServerUrl: "",
            FieldName: "",//这里FieldName指的同时是传过来的data的对象名
            PageSize: 10,
            KeyGroup: [],
            PaginationUl: null,
            EditPage: null,
            PreviewPage: null,
        }
        var options = $.extend(defaults, options);
        var table = this;
        var CurrentPage = 1;
        var thead = $("<thead></thead>").appendTo(table);
        for (var k in options.KeyGroup) {
            $("<th>" + options.KeyGroup[k].title + "</th>").appendTo(thead);
        }
        var tbody = $("<tbody></tbody>").appendTo(table);
        if (options.PaginationUl != null) {
            options.PaginationUl.Pagination({
                callback: function (index) {
                    table.LoadingData(index);
                }
            });
        }
        var FillTable = function (data) {
            tbody.html("");//清空tbody
            var TableData = data[options.FieldName];
            for (var index in TableData) {
                var TableDataRow = TableData[index];
                var row = $("<tr></tr>").appendTo(tbody).data("ID", TableDataRow["ID"]);
                row[0].RefreshData = function () {
                    var tds = $(this).find("td");
                    var ID = $(this).data("ID");
                    $.ajax({
                        type: "get",//使用get方法访问后台
                        dataType: "json",//返回json格式的数据
                        url: options.DataServerUrl + "?Method=RefreshTableData",//要访问的后台地址
                        data: {//要发送的数据
                            Field: options.FieldName,
                            ID: ID
                        },
                        success: function (msg) {//msg为返回的数据，在这里做数据绑定
                            for (var i in options.KeyGroup) {
                                var td = tds[i];
                                switch (options.KeyGroup[i].type) {
                                    case "label":
                                        td.html(TableDataRow[options.KeyGroup[i].keyname]);
                                        break;
                                    case "Selector":
                                        td.find(".DropSelector>lable").text(TableDataRow[options.KeyGroup[i].keyname][0]);
                                        break;
                                }
                            }
                        }
                    });
                };
                for (var i in options.KeyGroup) {
                    var td = $("<td></td>").appendTo(row);
                    switch (options.KeyGroup[i].type) {
                        case "label":
                            $("<span></span>").text(TableDataRow[options.KeyGroup[i].keyname]).appendTo(td);
                            break;
                        case "Selector":
                            var DropSelectorObject = $("<div class='DropSelector'><label>" + TableDataRow[options.KeyGroup[i].keyname][0] + "</label><ul></ul></div>").appendTo(td);
                            var SelectorOptions = TableDataRow[options.KeyGroup[i].keyname][1];
                            for (var s in SelectorOptions) {
                                $("<li>" + SelectorOptions[s] + "</li>").appendTo(DropSelectorObject.find("ul"));
                            }
                            (function () {
                                var p = i;
                                DropSelectorObject.DropSelector(function (key, value) {
                                    $.ajax({
                                        type: "get",//使用get方法访问后台
                                        dataType: "json",//返回json格式的数据
                                        url: options.DataServerUrl + "?Method=SetTableData",//要访问的后台地址
                                        data: { Field: options.FieldName, KeyName: options.KeyGroup[p].keyname, Value: value },//要发送的数据
                                        success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                        }
                                    });
                                })
                            })()
                            break;
                        case "Operate":
                            for (var ot in options.KeyGroup[i].operatetype) {
                                var EnOperateType = options.KeyGroup[i].operatetype[ot];
                                switch (EnOperateType) {
                                    case "Delete":
                                        var DeleteButton = $("<button class='iconButton x32 fg-color-red icon-dustbin delete'></button>").appendTo(td);
                                        DeleteButton.click(function () {
                                            var tr = $(this).closest("tr");
                                            var ID = tr.data("ID");
                                            tr.animate({
                                                backgroundColor: "#aa0000",
                                            }, 1000, function () {
                                                tr.fadeOut(1000, function () {
                                                    tr.animate({ height: 0 }, 8000, function () {
                                                        tr.remove();
                                                    })
                                                });
                                            });
                                            $.ajax({
                                                type: "get",//使用get方法访问后台
                                                dataType: "json",//返回json格式的数据
                                                url: options.DataServerUrl + "?Method=DeleteTableData",//要访问的后台地址
                                                data: {//要发送的数据
                                                    Field: options.FieldName,
                                                    ID: ID
                                                },
                                                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                                    tr.animate({
                                                        backgroundColor: "#aa0000",
                                                    }, 1000).fadeOut(500).remove();
                                                }
                                            });
                                        })
                                        break;
                                    case "View":
                                        var ViewButton = $("<button class='iconButton x32 fg-color-black icon-eye delete'></button>").appendTo(td);
                                        ViewButton.click(function () {
                                            var tr = $(this).closest("tr");
                                            var ID = tr.data("ID");
                                            $(this).DynamicModule({
                                                title: "预览",
                                                type: "iframe",
                                                direction: "right",
                                                width: 900,
                                                content: options.PreviewPage + "?ID=" + ID,
                                            })
                                        })
                                        break;
                                    case "Edit":
                                        var EditButton = $("<button class='iconButton x32 fg-color-green icon-edit delete'></button>").appendTo(td);
                                        EditButton.click(function () {
                                            var tr = $(this).closest("tr");
                                            var ID = tr.data("ID");
                                            $(this).DynamicModule({
                                                title: "编辑",
                                                type: "iframe",
                                                direction: "right",
                                                width: 900,
                                                content: options.EditPage + "?Method=Edit&ID=" + ID,
                                                closeCallback: function () {
                                                    tr[0].RefreshData();
                                                }
                                            });
                                        })
                                        break;
                                }
                            }
                    }
                }
            }
            if (options.EnableAdd) {
                var row = $("<tr class='Add'><td colspan=" + options.KeyGroup.length + "><button class='TextButton Large Add'>添加新项</button></td></tr>").appendTo(tbody);
                row.find("button.Add").click(function () {
                    $(this).DynamicModule({
                        title: "编辑项目",
                        type: "iframe",
                        direction: "right",
                        width: 900,
                        content: options.EditPage + "?Method=Add",
                        closeCallback: function () {
                        }
                    });
                });
            }
        }
        table.test = function (data) {
            FillTable(data);
        }
        table.GetPageNum = function () {
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: options.DataServerUrl + "?Method=GetTablePageNum",//要访问的后台地址
                data: {//要发送的数据
                    Field: options.FieldName,
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    options.PaginationUl.SetPageNum(msg.PageNum);
                }
            });
        }
        table.LoadingData = function (PageIndex) {
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: options.DataServerUrl + "?Method=GetTableData",//要访问的后台地址
                data: {//要发送的数据
                    Field: options.FieldName,
                    KeyGroup: options.KeyGroup,
                    PageIndex: PageIndex,
                    PageSize: options.PageSize
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    FillTable(msg[options.FieldName]);
                }
            });
        };
    }
})(jQuery);

//消息列表
(function ($) {
    $.fn.Message = function (options) {
        var defaults = {
            DataServerUrl: "",
            FieldName: "",//这里FieldName指的同时是传过来的data的对象名
            PageSize: 10,
            KeyGroup: [],
            PaginationUl: null,
        }
        var options = $.extend(defaults, options);
        var MessageListObj = this;
        var CurrentPage = 1;
        if (options.PaginationUl != null) {
            options.PaginationUl.Pagination({
                callback: function (index) {
                    MessageListObj.LoadingData(index);
                }
            });
        }
        var FillList = function (data) {
            MessageListObj.html("");//清空tbody
            var ListData = data[options.FieldName];
            $.each(ListData, function (i, ListDataItem) {
                var li = $("<li></li>").appendTo(MessageListObj);
                var ID = ListDataItem.ID;
                var MessageInfoBox = $("<div class='MessageInfoBox'></div>").appendTo(li);
                var liHeader = $("<div class='liHeader'><span class='ID'>" + ID + ".</span></div>").appendTo(MessageInfoBox);
                liHeader.append($("<span class='User'>" + ListDataItem.User + "</span>"));
                liHeader.append($("<span class='Time'>" + ListDataItem.Time + "</span>"));
                var MessagerInfoUl = $("<ul class='vertical-list data-list artical-list'></ul>").appendTo(MessageInfoBox);
                $.each(ListDataItem.MessagerInfo, function (key, value) {
                    var Infoli = $("<li></li>").appendTo(MessagerInfoUl);
                    var InfoKeyLabel = $("<label></label>").text(key + ":").appendTo(Infoli);
                    var InfoValueLabel = $("<label></label>").text(value).appendTo(Infoli);
                });
                var liBody = $("<div class='LiBody'></div>").appendTo(li);
                var MessageContentBox = $("<div class='MessageContentBox'></div>").appendTo(liBody);
                MessageContentBox.html(ListDataItem.Content);
                var liFooter = $("<div class='liFooter'></div>").appendTo(liBody);
                var DeleteButton = $("<button class='iconButton x32 icon-dustbin delete'></button>").appendTo(liFooter);
                var ReplyButton = $("<button class='iconButton x32 icon-reply reply'></button>").appendTo(liFooter);
                DeleteButton.click(function (li, ID) {
                    return function () {
                        $.Confirm({
                            title: "确认对话框",
                            content: "确认删除吗，该操作不可恢复！",
                            callback: function () {
                                li.animate({
                                    backgroundColor: "#aa0000",
                                }, 1000, function () {
                                    li.fadeOut(1000, function () {
                                        li.animate({ height: 0 }, 8000, function () {
                                            li.remove();
                                        })
                                    });
                                });
                                $.ajax({
                                    type: "get",//使用get方法访问后台
                                    dataType: "json",//返回json格式的数据
                                    url: options.DataServerUrl + "?Method=DeleteTableData",//要访问的后台地址
                                    data: {//要发送的数据
                                        Field: options.FieldName,
                                        ID: ID
                                    },
                                    success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                        tr.animate({
                                            backgroundColor: "#aa0000",
                                        }, 1000).fadeOut(500).remove();
                                    }
                                });
                            },
                        });
                    }(li, ID)
                });
            });
        }
        MessageListObj.test = function (data) {
            FillList(data);
        }
        MessageListObj.GetPageNum = function () {
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: options.DataServerUrl + "?Method=GetMessagePageNum",//要访问的后台地址
                data: {//要发送的数据
                    Field: options.FieldName,
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    options.PaginationUl.SetPageNum(msg.PageNum);
                }
            });
        }
        MessageListObj.LoadingData = function (PageIndex) {
        }
    }
})(jQuery);

//数据表单
(function ($) {
    $.fn.dataForm = function (options) {
        var defaults = {
            DataServerUrl: "",
            FieldName: "",//这里FieldName指的同时是传过来的data的对象名
            KeyGroup: [],
        }
        var options = $.extend(defaults, options);
        var dataFormObj = this;
        //fill data and init component and init formValidate
        function fillForm(data) {
            var formData = data[options.FieldName];
            for (var i in options.KeyGroup) {
                var KeyGroupItem = options.KeyGroup[i];
                var keyname = KeyGroupItem.keyname;
                var editable = formData[keyname].editable;
                var target = dataFormObj.find("#" + keyname);
                var spanhelp = target.closest(".controls").find(".help-inline").hide();
                switch (options.KeyGroup[i].type) {
                    case "inputText":
                        target.val(formData[keyname].value);
                        (function () {
                            var local_keyname = keyname;
                            target.formValidate({
                                callback: function (value) {
                                    $.ajax({
                                        type: "get",//使用get方法访问后台
                                        dataType: "json",//返回json格式的数据
                                        url: options.DataServerUrl + "?Method=SetPanelData",//要访问的后台地址
                                        data: { Field: options.FieldName, KeyName: local_keyname, Value: value },//要发送的数据
                                        beforeSend: function () {
                                        },
                                        success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                        }
                                    });
                                }
                            });
                        })();
                        break;
                    case "textarea":
                        target.text(formData[keyname].value);
                        (function () {
                            var local_keyname = keyname;
                            target.change(function (event) {
                                var value = this.value;
                                $.ajax({
                                    type: "get",//使用get方法访问后台
                                    dataType: "json",//返回json格式的数据
                                    url: options.DataServerUrl + "?Method=SetPanelData",//要访问的后台地址
                                    data: { Field: options.FieldName, KeyName: local_keyname, Value: value },//要发送的数据
                                    beforeSend: function () {
                                    },
                                    success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                    }
                                });
                            })
                        })();
                        break;
                    case "selector":
                        var DropSelectorObj = target;
                        var valueSpan = DropSelectorObj.children("span");
                        valueSpan.text(formData[keyname].value);
                        var ul = DropSelectorObj.children("ul");
                        for (var j in formData[keyname].options) {
                            $("<li>" + formData[keyname].options[j] + "</li>").appendTo(ul);
                        }
                        (function () {
                            var local_keyname = keyname;
                            DropSelectorObj.DropSelector(function (key, value) {
                                $.ajax({
                                    type: "get",//使用get方法访问后台
                                    dataType: "json",//返回json格式的数据
                                    url: options.DataServerUrl + "?Method=SetPanelData",//要访问的后台地址
                                    data: { Field: options.FieldName, KeyName: local_keyname, Value: value },//要发送的数据
                                    beforeSend: function () {
                                    },
                                    success: function (msg) {//msg为返回的数据，在这里做数据绑定
                                    }
                                });
                            });
                        })();
                        break;
                    case "img":
                        target.attr("src", formData[KeyGroupItem.keyname].value);
                        if (editable) {
                            target.wrap("<div class='imgBox editable'></div>");
                        }
                        break;
                    case "text":
                        target.text(formData[KeyGroupItem.keyname].value);
                        break;
                }
            }
        }

        dataFormObj.test = function (data) {
            fillForm(data);
        }
        dataFormObj.LoadingData = function () {
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: DataServerUrl + "?Method=GetPanelData",//要访问的后台地址
                data: {//要发送的数据
                    Field: options.FieldName,
                    KeyGroup: options.KeyGroup,
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    fillForm(msg[options.FieldName]);
                }
            });
        };
    }
})(jQuery);

//编辑页面
(function ($) {
    $.fn.EditPage = function (options) {
        var defaults = {
            DataServerUrl: "",
            FieldName: "",//这里FieldName指的同时是传过来的data的对象名
        }
        var options = $.extend(defaults, options);
        //下拉选择器
        var EditPage = this;
        var LoadingBubble;
        EditPage.find(".DropSelector.DataLabel").DropSelector();
        //富文本编辑器
        var ArticalEditorObj = EditPage.find(".ArticalEditor");
        if (ArticalEditorObj[0] != null) {
            var dimensions = "default";
            if (ArticalEditorObj.hasClass("simpleEditor")) {
                dimensions = "simple";
            }
            ArticalEditorObj.ArticalEditor({
                InitDoc: "",
                dimensions: dimensions,
            })
        }
        var ID;
        var Method = getQueryString("Method");
        var url = options.DataServerUrl + "?Method=SetEditPageData&Field=" + options.FieldName;
        var data = {};
        if (Method == "Edit") {
            ID = getQueryString("ID");
            url += "&Operate=Edit",
            url += "&ID=" + ID;
        }
        else if (Method == "Add") {
            url += "&Operate=Add";
        }
        $(".SubmitDoc").click(function () {
            EditPage.find(".DropSelector.DataLabel").each(function () {
                var DropSelector = $(this);
                data[DropSelector.attr("ID")] = DropSelector.find("label").text();
            });
            EditPage.find(".InputText.DataInput").each(function () {
                var input = $(this);
                data[input.attr("ID")] = input.val();
            });
            EditPage.find(".DataInput.data").each(function () {
                var dataGroup = $(this);
                data[dataGroup.attr("ID")] = dataGroup.find("input.year").val() + "-" + dataGroup.find("input.month").val() + "-" + dataGroup.find("input.day").val();
            });
            if (ArticalEditorObj[0] != null) {
                data.Doc = ArticalEditorObj.GetDoc();
            }
            $.ajax({
                type: "get",//使用get方法访问后台
                dataType: "json",//返回json格式的数据
                url: url,//要访问的后台地址
                data: data,//要发送的数据
                beforeSend: function () {
                    LoadingBubble = $("<div class='flickr-spinner'></div>").appendTo(EditPage)
                },
                success: function (msg) {//msg为返回的数据，在这里做数据绑定
                    if (Method == "Add") {
                        ID = msg.ID;
                        Method = "Edit";
                    }
                    LoadingBubble.remove();
                }
            });
        });
    }
})(jQuery);