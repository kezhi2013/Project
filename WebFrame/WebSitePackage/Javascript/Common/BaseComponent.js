/************************************************************
  Copyright (C), 2003-2007, BLOGCN
  FileName: jqury.Componet.js
  Author: Kezhi       
  Date:2013-07-12
  Description: jquery Component    
  Version:1.0.0 
  License:This plugin is licensed under the GNU General Public License: http://www.gnu.org/licenses/gpl.html
  Function List:
    1. -------
  History:
      <author>    <time>      <version >     <desc>
        macy    2007/08/27      1.0.0          ……  
***********************************************************/

/* 
JQuery DropSelector
*/
(function ($) {
    $.fn.DropSelector = function (callback) {
        var DropSelector = this;
        var span = DropSelector.children("span");
        var ul = DropSelector.children("ul");
        span.click(function () {
            DropSelector.toggleClass("active");
        });
        ul.find("li").each(function (key, value) {
            $(this).click(function () {
                span.text($(this).text());
                if (callback != null) {
                    callback(key, $(this).text());
                }
            })
        });
        DropSelector.getValue = function () {
            return span.text();
        }
        $(document).click(function (event) {
            var DropSelectors = $(".DropSelector");
            DropSelectors.each(function (index, element) {
                if (!$(event.target).IsChildOf(element)) {
                    $(element).removeClass("active");
                }
            });
        });
    }
})(jQuery);

/* 
JQuery fileSelector
*/
(function ($) {
    $.fn.fileSelector = function () {
        var FileSelector = this;
        var label = FileSelector.find("label")
        FileSelector.find("input[type='file']").change(function () {
            label.text($(this).val());
        })
    };
})(jQuery);

/* 
JQuery ColorPicker
*/
(function ($) {
    $.fn.ColorPicker = function (options) {
        var defaults = {
            success: function () { }, //回调函数
            reset: function () { },
            triggerEvent: "click",
        }
        var options = $.extend(defaults, options);
        var Target = this;
        Target.actived = false;
        Target.ColorPickerObj = null;
        var DrawColorPicker = function () {
            Target.ColorPickerObj = $("<div class='ColorPicker'></div>").appendTo($("body"));
            //定位
            var ttop = Target.offset().top;     //控件的定位点高
            var thei = Target.height();  //控件本身的高
            var tleft = Target.offset().left;    //控件的定位点宽
            Target.ColorPickerObj.css({
                top: ttop + thei,
                left: tleft
            });
            {
                var BaseColorPanel = $("<div class='BaseColorPanel'></div>").appendTo(Target.ColorPickerObj);
                var BaseColorBox = $("<div class='BaseColorBox'></div>").appendTo(BaseColorPanel);
                var BaseColorTable = $("<table class='BaseColorTable'></table>").appendTo(BaseColorBox);
                var Footer = $("<div class='ColorPickerFooter'></div>").appendTo(BaseColorPanel);
                var SelectedColorLabel = $("<label class='SelectedColorLabel'></label>").appendTo(Footer);
                var OkButton = $("<button class='iconButton x24 icon-checkmark  OkButton'></button>").appendTo(Footer);
                var CancelButton = $("<button class='iconButton x24 icon-x  CancelButton'></button>").appendTo(Footer).click(function () {
                    Target.ColorPickerObj.remove();
                });
                var transToPaletteButton = $("<button class='iconButton x24 icon-checkmark  OkButton'></button>").appendTo(Footer);
                transToPaletteButton.click(function () {

                })
                OkButton.click(function () {
                    options.success(SelectedColorLabel.css("background-color"));
                    Target.ColorPickerObj.remove();
                });
                for (var i in ArticalCommonColor) {
                    var BaseColorRow = $("<tr></tr>").appendTo(BaseColorTable);
                    for (var j in ArticalCommonColor[i]) {
                        var BaseColorTd = $("<td></td>").appendTo(BaseColorRow);
                        BaseColorTd.css("background-color", ArticalCommonColor[i][j].value);
                        BaseColorTd.attr("title", ArticalCommonColor[i][j].key);
                        BaseColorTd.click(function () {
                            SelectedColorLabel.css("background-color", $(this).css("background-color"));
                            SelectedColorLabel.SettedColor = $(this).css("background-color");
                        });
                    }
                }
            }
            {
                var PalettePanel = $("<div class='BaseColorPanel'></div>").appendTo(Target.ColorPickerObj);
                var PaletteBox = $("<div class='BaseColorBox'></div>").appendTo(PalettePanel);
                var Footer = $("<div class='ColorPickerFooter'></div>").appendTo(PalettePanel);
                var SelectedColorLabel = $("<label class='SelectedColorLabel'></label>").appendTo(Footer);
                var OkButton = $("<button class='iconButton x24 icon-checkmark  OkButton'></button>").appendTo(Footer);
                var CancelButton = $("<button class='iconButton x24 icon-x  CancelButton'></button>").appendTo(Footer).click(function () {
                    Target.ColorPickerObj.remove();
                });
                OkButton.click(function () {
                    options.success(SelectedColorLabel.css("background-color"));
                    Target.ColorPickerObj.remove();
                });
            }
        };
        Target.bind(options.triggerEvent, function () {
            if (!Target.actived) {
                DrawColorPicker();
                Target.actived = true;
            }
            else {
                Target.ColorPickerObj.remove();
                Target.actived = false;
            }
        });
    }
})(jQuery);

/* 
JQuery Alert
*/
(function ($) {
    $.Alert = function (options) {
        var defaults = {
            title: "警告",
            content: "",
            callback: function () {
            },
        }
        var options = $.extend(defaults, options);
        var cover = $("<div class='cover'></div>").appendTo('body');
        cover.css("height", $(document).height());
        var Confirm = $("<div class='Dialog'></div>").appendTo('body');
        var Header = $("<div class='Header'><h1>" + options.title + "</h1></div>").appendTo(Confirm);
        var Body = $("<div class='Body'><div class='content'>" + options.content + "</div></div>").appendTo(Confirm);
        var Footer = $("<div class='Footer cf'></div>").appendTo(Confirm);
        var OkButton = $("<button class='TextButton OkButton'>确认</button>").appendTo(Footer);
        Confirm.css({ "top": -$(Confirm).height() });
        Confirm.animate({ 'top': 0 }, 500);
        OkButton.click(function () {
            Confirm.animate({ "top": -Confirm.height() }, function () {
                cover.remove();
                options.callback();
            });
        });
    }
})(jQuery);

/* 
JQuery Confirm
*/
(function ($) {
    $.Confirm = function (options) {
        var defaults = {
            title: "确认对话框",
            content: "",
            callback: null,
        }
        var options = $.extend(defaults, options);
        var cover = $("<div class='cover'></div>").appendTo('body');
        cover.css("height", $(document).height());
        var Confirm = $("<div class='Dialog'></div>").appendTo('body');
        var Header = $("<div class='Header'><h1>" + options.title + "</h1></div>").appendTo(Confirm);
        var Body = $("<div class='Body'><div class='content'>" + options.content + "</div></div>").appendTo(Confirm);
        var Footer = $("<div class='Footer cf'></div>").appendTo(Confirm);
        var CancelButton = $("<button class='TextButton  CancelButton'>取消</button>").appendTo(Footer);
        var OkButton = $("<button class='TextButton OkButton'>确认</button>").appendTo(Footer);
        Confirm.css({ "top": -$(Confirm).height() });
        Confirm.animate({ 'top': 0 }, 500);
        CancelButton.click(function () {
            Confirm.animate({ "top": -Confirm.height() }, function () {
                cover.remove();
                Confirm.remove();
            })
        });
        OkButton.click(function () {
            Confirm.animate({ "top": -Confirm.height() }, function () {
                cover.remove();
                options.callback();
            });
        });
    }
})(jQuery);

/* 
JQuery Prompt
*/
(function ($) {
    $.Prompt = function (options) {
        var defaults = {
            title: "确认对话框",
            note: "",
            callback: null,
        }
        var options = $.extend(defaults, options);
        var cover = $("<div class='cover'></div>").appendTo('body');
        cover.css("height", $(document).height());
        var Confirm = $("<div class='Dialog'></div>").appendTo('body');
        var Header = $("<div class='Header'><h1>" + options.title + "</h1></div>").appendTo(Confirm);
        var Body = $("<div class='Body'><div class='note'>" + options.note + "</div></div>").appendTo(Confirm);
        var input = $("<input type='text'/>").appendTo(Body);
        var Footer = $("<div class='Footer cf'></div>").appendTo(Confirm);
        var CancelButton = $("<button class='TextButton  CancelButton'>取消</button>").appendTo(Footer);
        var OkButton = $("<button class='TextButton OkButton'>确认</button>").appendTo(Footer);
        Confirm.css({ "top": -$(Confirm).height() });
        Confirm.animate({ 'top': 0 }, 500);
        CancelButton.click(function () {
            Confirm.animate({ "top": -Confirm.height() }, function () {
                cover.remove();
                Confirm.remove();
            })
        });
        OkButton.click(function () {
            Confirm.animate({ "top": -Confirm.height() }, function () {
                cover.remove();
                options.callback(input.val());
            });
        });
    }
})(jQuery);

/* 
JQuery verticalNav handle
*/
(function ($) {
    $.fn.VerticalNavHandle = function (options) {
        var defaults = {
        }
        var options = $.extend(defaults, options);
        var handle = this;
        var target = $("#" + handle.attr("data-target"));
        target.width = target.width();
        target.openState = false;
        handle.click(function () {
            if (!target.openState) {
                target.animate({ left: 0 },500)
                target.openState = true;
            }
            else {
                target.animate({ left: -target.width },500)
                target.openState = false;
            }
        })
    }
})(jQuery);

/* 
JQuery Tooltip
*/
(function ($) {
    $.fn.Tooltip = function (options) {
        var defaults = {
            type: "text",
            content: "确认对话框",
            displayEvent: "progress",//"hover","click"
            time: 5000,//为程序中气泡持续时间
            direction: "top",
        }
        var options = $.extend(defaults, options);
        var Target = this;
        Target.actived = false;
        Target.TooltipObj = $("<div class='TooltipObj'></div>").appendTo('body');
        Target.TooltipObj.addClass(options.direction);
        var Bubble = Target.TooltipObj;
        var Body = $("<div class='Body'><div class='Content'>" + options.content + "</div></div>").appendTo(Bubble);
        //定位
        var ttop = Target.offset().top;     //控件的定位点高
        var thei = Target.height();  //控件本身的高
        var tleft = Target.offset().left;    //控件的定位点宽
        if (options.direction == "top") {
            Bubble.css({
                top: ttop + thei,
                left: tleft
            });
        }
        if (options.displayEvent == "progress") {
            Bubble.animate({ opacity: 0 }, 5000, function () {
                Bubble.remove();
            });
        }
    }
})(jQuery);

/* 
JQuery DateSelector
*/
(function ($) {
    $.fn.DateSelector = function (options) {
        var defaults = {
            dateFormat: "YYYY-DD-MM",
            initDate:"",
            defaultView: "month",
            triggerEvent: "click",
            callback: function () { }
        }
        var options = $.extend(defaults, options);
        var target = this;
        target.actived = false;
        var currentView = options.defaultView;
        var weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        if(target.is("input")){
            target.blur();
            target.keydown(function (event) {
                return false;
            })
        }
        //function drawDateSelector
        target.drawDateSelector = function () {
            //current date
            var now = new Date();
            var day = now.getDate();
            var month = now.getMonth() + 1;
            var year = now.getFullYear();
            //draw UI
            var dateSelectorObj = $("<div class='dateSelector'></div>").appendTo("body");
            //dateNav
            var dateNav = $("<div class='dateNav cf'></div>").appendTo(dateSelectorObj);
            var buttonPre = $("<button class='iconButton x24 buttonPre icon-arrow-left'></div>").appendTo(dateNav);
            var currentRange = $("<label class='currentRange'></label>").appendTo(dateNav);
            var buttonNext = $("<button class='iconButton x24 buttonNext icon-arrow-right'></div>").appendTo(dateNav);
            //datePanel
            var datePanel = $("<div class='datePanel'></div>").appendTo(dateSelectorObj);
            var datePanelBox = $("<div class='datePanelBox'></div>").appendTo(datePanel);
            //centuryViewPanel
            var centuryViewPanel = $("<div class='centuryViewPanel'></div>").appendTo(datePanelBox);
            var centuryViewBox = $("<div class='centuryViewBox'></div>").appendTo(centuryViewPanel);
            var centuryUl = $("<ul class='centuryUl'></ul>").appendTo(centuryViewBox);
            //shortCenturyViewPanel
            var shortCenturyViewPanel = $("<div class='shortCenturyViewPanel'></div>").appendTo(datePanelBox);
            var shortCenturyViewBox = $("<div class='shortCenturyViewBox'></div>").appendTo(shortCenturyViewPanel);
            var yearUl = $("<ul class='yearUl'></ul>").appendTo(shortCenturyViewBox);
            //yearViewPanel
            var yearViewPanel = $("<div class='yearViewPanel'></div>").appendTo(datePanelBox);
            var yearViewBox = $("<div class='yearViewBox'></div>").appendTo(yearViewPanel);
            var monthUl = $("<ul class='monthUl'></ul>").appendTo(yearViewBox); 
            //monthViewPanel
            var monthViewPanel = $("<div class='monthViewPanel'></div>").appendTo(datePanelBox);         
            var monthViewBox = $("<div class='monthViewBox'></div>").appendTo(monthViewPanel);
            var monthViewHead = $("<ul class='monthViewHead'></ul>").appendTo(monthViewBox);
            $.each(weeks, function (index, value) {
                $("<li></li>").text(value).appendTo(monthViewHead);
            });
            var monthViewBody = $("<ul class='monthViewBody'></ul>").appendTo(monthViewBox);
            //position
            var ttop = target.offset().top; 
            var thei = target.outerHeight();
            var tleft = target.offset().left; 
            dateSelectorObj.css({
                top: ttop + thei,
                left: tleft
            });
            //switch to centuryView
            dateSelectorObj.ToCenturyView = function (century) {
                if (currentView == "century") {

                }
                else if (currentView == "shortCentury") {
                    shortCenturyViewPanel.hide();
                }
                centuryViewPanel.show();
                currentView = "century";
                currentRange.text(century + " Century");
                centuryUl.html("");
                for (i = 0; i < 12; i++) {
                    var li = $("<li></li>").appendTo(centuryUl);
                    if (i > 0 & i < 11) {
                        var shortCentury = i - 1;
                        li.text((century * 100 + shortCentury * 10) + "-" + (century * 100 + shortCentury * 10+9));
                        li.click(function (shortCentury) {
                            return function () {
                                dateSelectorObj.ToShortCenturyView(century,shortCentury);
                            }
                        }(shortCentury));
                    }
                }
                buttonPre.unbind();
                buttonNext.unbind();
                buttonPre.click(function () {
                    var toCentury = century - 1;
                    dateSelectorObj.ToCenturyView(toCentury);
                });
                buttonNext.click(function () {
                    var toCentury = century + 1;
                    dateSelectorObj.ToCenturyView(toCentury);
                });
                currentRange.unbind();
            }
            //switch to shortCenturyView
            dateSelectorObj.ToShortCenturyView = function (century,shortCentury) {
                if (currentView == "century") {
                    centuryViewPanel.hide();
                }
                if (currentView == "year") {
                    yearViewPanel.hide();
                }
                shortCenturyViewPanel.show();
                currentView = "shortCentury";
                var shortCenturyBaseYear = century * 100 + shortCentury * 10;//shortCentury from 0
                currentRange.text(shortCenturyBaseYear+"-"+(shortCenturyBaseYear+9));
                yearUl.html("");
                for (i = 1; i <= 12; i++) {
                    var yearValue = shortCenturyBaseYear + i - 2;
                    var li = $("<li></li>").appendTo(yearUl);
                    if (i > 1 & i < 12) {
                        li.text(yearValue);
                        li.click(function (year) {
                            return function () {
                                dateSelectorObj.ToYearView(year);
                            } 
                        }(yearValue));
                    }
                }
                buttonPre.unbind();
                buttonNext.unbind();
                buttonPre.click(function () {
                    var toShortCentury = shortCentury - 1;
                    dateSelectorObj.ToShortCenturyView(century, toShortCentury);
                });
                buttonNext.click(function () {
                    var toShortCentury = shortCentury + 1;
                    dateSelectorObj.ToShortCenturyView(century, toShortCentury);
                });
                currentRange.unbind();
                currentRange.click(function () {
                    dateSelectorObj.ToCenturyView(century);
                });
            }           
            //switch to yearView
            dateSelectorObj.ToYearView = function (year) {
                currentRange.text(year);
                if (currentView == "month") {
                    monthViewPanel.hide();                 
                }
                else if(currentView == "shortCentury"){
                    shortCenturyViewPanel.hide();
                }
                yearViewPanel.show();
                currentView = "year";
                monthUl.html("");
                for (i = 1; i <= 12; i++) {
                    var li = $("<li></li>").text(i + "月").appendTo(monthUl);
                    li.click(function (month) {
                        return function () {
                            dateSelectorObj.ToMonthView({ year: year, month: month });
                        }
                    }(i))
                }
                buttonPre.unbind();
                buttonNext.unbind();
                buttonPre.click(function () {
                    var toYear = year-1;
                    dateSelectorObj.ToYearView(toYear);
                });
                buttonNext.click(function () {
                    var toYear = year + 1;
                    dateSelectorObj.ToYearView(toYear);
                });
                currentRange.unbind();
                currentRange.click(function () {
                    var century = parseInt(year / 100);
                    var shortCentury = parseInt((year % 100) / 10);
                    dateSelectorObj.ToShortCenturyView(century, shortCentury);
                });
            }
            //switch to monthView
            dateSelectorObj.ToMonthView = function (date) {
                currentRange.text(date.year + "-" + date.month);
                if (currentView == "month") {
                    
                }
                if (currentView == "year") {
                    yearViewPanel.hide();
                }
                monthViewPanel.show();
                currentView = "month";
                monthViewBody.html("");
                var firstday = new Date(date.year, date.month -1  ,1).getDay();//求出当月的第一天是星期几
                var lastday = new Date(date.year, date.month, 0).getDate();//上月的第0天就是今月的最后一天
                var dates = lastday;//最后一天的号数就是这个月的天数
                var daysArr = new Array(35);//用来装载日期的数组，日期以‘xxxx-xx-xx’的形式表示 
                for (i = 0, j = firstday; i < dates ; i++, j++) {
                    daysArr[j] = date.year + '-' + date.month + '-' + (i + 1);
                }
                for (i = 0; i < 35; i++) {
                    var td = $("<li></li>").appendTo(monthViewBody);
                    if (daysArr[i] == undefined) {
                    }
                    else {
                        var dayValue = daysArr[i].split('-')[2];
                        td.text(dayValue);
                        if (date.month == month&dayValue == day) {
                            td.addClass("currentDay");
                        }
                        td.bind("click", function (date) {
                            return function () {
                                if (target.is("input")) {
                                    target.val(date);
                                }
                                options.callback();
                                dateSelectorObj.remove();
                            }
                        }(daysArr[i]));
                    }
                }
                buttonPre.unbind();
                buttonNext.unbind();
                buttonPre.click(function () {
                    var year = date.year;
                    var month = date.month - 1;
                    if (month == 0) {
                        month = 12;
                        year--;
                    }
                    dateSelectorObj.ToMonthView({year:year,month:month});
                });
                buttonNext.click(function () {
                    var year = date.year;
                    var month = date.month + 1;
                    if (month == 13) {
                        month = 1;
                        year++;
                    }
                    dateSelectorObj.ToMonthView({ year: year, month: month });
                });
                currentRange.unbind();
                currentRange.click(function () {
                    dateSelectorObj.ToYearView(date.year);
                });
            };
            //switch View
            switch (options.defaultView) {
                case "month":
                    dateSelectorObj.ToMonthView({ year: year, month: month });
                    break;
            }
            $(document).bind("click", function (event) {
                if (!dateSelectorObj.has($(event.target))[0]) {
                    dateSelectorObj.remove();
                    target.actived = false;
                }
            });
            target.actived = true;
        }
        //trigger drawDateSelector
        target.bind(options.triggerEvent, function (event) {
            if (!target.actived) {
                target.drawDateSelector();
            }
            target.blur();
            event.stopPropagation();
        });
    }
})(jQuery);

/* 
JQuery Pagination
*/
(function ($) {
    $.fn.Pagination = function (options) {
        var defaults = {
            PageSize: 10,//一页的条数
            PageIndex: 1,
            PageNum: 1,
            ItemNum: 0,
            CurrentPage: 1,
            callback: function () { }
        };
        var options = $.extend(defaults, options);
        var Pagination = this;
        var FistPage = $("<a class='FistPage'><<</a>").appendTo($("<li></li>").appendTo(Pagination));
        var PreiviousPage = $("<a class='PreiviousPage'><</a>").appendTo($("<li></li>").appendTo(Pagination));
        var FirstPage = $("<a>1</a>").appendTo($("<li class='pager-current'></li>").appendTo(Pagination)).data("PageIndex", 1).click(function () {
            Pagination.find(".pager-current").removeClass("pager-current");
            $(this).parent().addClass("pager-current");
            options.callback(1);
        });
        var NextPage = $("<a class='NextPage'>></a>").appendTo($("<li></li>").appendTo(Pagination));
        var LastPage = $("<a class='LastPage'>>></a>").appendTo($("<li></li>").appendTo(Pagination));
        Pagination.SetPageNum = function (PageNum) {
            options.PageNum = PageNum;
            for (i = 2; i <= PageNum; i++) {
                $("<a>" + i + "</a>").appendTo($("<li></li>").insertBefore(NextPage.parent())).data("PageIndex", i).click(function () {
                    Pagination.find(".pager-current").removeClass("pager-current");
                    $(this).parent().addClass("pager-current");
                    options.callback(i);
                });
            }
        }
    }
})(jQuery);

/* 
JQuery Tab
*/
(function ($) {
    $.fn.Tab = function () {
        var TabObj = this;
        var lis = TabObj.children("ul").find("li");
        var tabpages = TabObj.find(".Tab");
        lis.each(function (index, element) {
            $(element).click(function () {
                $(element).addClass("Actived").siblings(".Actived").removeClass("Actived");
                tabpages.eq(index)[0].show();
            });
        });
        tabpages.each(function (index, element) {
            element.show = function () {
                $(element).show().addClass("ActivedTab").siblings(".ActivedTab").hide().removeClass("ActivedTab");
            }
        });
    };
})(jQuery);

/* 
JQuery Accordion
*/
(function ($) {
    $.fn.Accordion = function () {
        var Handle = this;
        var Target = document.getElementById(Handle.attr("AccordionTarget"));
        Target.OpenState = false;
        Handle.click(function () {
            if (!Target.OpenState) {
                $(Target).slideDown();
                Target.OpenState = true;
            }
            else {
                $(Target).slideUp();
                Target.OpenState = false;
            }
        })
    };
})(jQuery);

/* 
JQuery PasswordStrength
*/
(function ($) {
    $.fn.PasswordStrength = function (options) {
        var defaults = {
        };
        var options = $.extend(defaults, options);
        var PasswordStrengthDiv = this;
        var weekSpan = $("<span class='week'></span>").appendTo(PasswordStrengthDiv);
        var middleSpan = $("<span class='middle'></span>").appendTo(PasswordStrengthDiv);
        var strongSpan = $("<span class='strong'></span>").appendTo(PasswordStrengthDiv);
        PasswordStrengthDiv.setStrength = function (strengthValue) {
            if (strengthValue == -1) {
                weekSpan.removeClass("actived");
                middleSpan.removeClass("actived");
                strongSpan.removeClass("actived");
            }
            if (strengthValue == 0) {
                weekSpan.addClass("actived");
                middleSpan.removeClass("actived");
                strongSpan.removeClass("actived");
            }
            else if (strengthValue > 0 && strengthValue <= 3) {
                weekSpan.removeClass("actived");
                middleSpan.addClass("actived");
                strongSpan.removeClass("actived");
            }
            else if (strengthValue > 3) {
                weekSpan.removeClass("actived");
                middleSpan.removeClass("actived");
                strongSpan.addClass("actived");
            }
        }
    }
})(jQuery);

/* 
JQuery formValidate
*/
(function ($) {
    $.fn.formValidate = function (options) {
        var defaults = {
            passwordStrengthCheck: false,
            passwordStrengthDisplayer:null,
            callback: function (value) {
                return false;
            },
            keyGroup:[]
        };
        var options = $.extend(defaults, options);
        var target = this;
        target[0].validateState = {};
        var controlGroup = target.closest(".control-group");
        var spanhelp = controlGroup.find(".help-inline").hide();
        //check passwordStrength
        function checkStrength(password) {
            var strength = 0;
            //if the password length is less than 6
            if (password.length < 6) {
                strength = -1;
            }
            //length is ok, lets continue.
            //if length is 8 characters or more, increase strength value
            if (password.length > 7) {
                strength += 1
            }
            //if password contains both lower and uppercase characters, increase strength value
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                strength += 1
            }
            //if it has numbers and characters, increase strength value
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                strength += 1
            }
            //if it has one special character, increase strength value
            if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1
            }
            //if it has two special characters, increase strength value
            if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,",%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1
            }
            return strength;
        }
        //server port validate function
        function serverPortValidate(value) {
            target[0].validateState.urlValidateState = false;
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                data: target.attr("id") + value,
                beforeSend: function (XMLHttpRequest) {
                    spanhelp.text("正在服务端查询输入有效性...").show();
                    //Pause(this,100000);
                },
                success: function (msg) {
                    spanhelp.text("输入有效").show();
                },
                complete: function (XMLHttpRequest, textStatus) {
                    //隐藏正在查询图片
                },
                error: function () {
                    //错误处理
                }
            });
        }
        if (target.is("input") && target.hasClass("textInput")) {
            var input = target;
            var tip = input.attr("tip");
            var reg = input.attr("reg");
            var url = input.attr("url");
            var required = input.attr("required");
            var surevalidatetargetID = input.attr("surevalidatetarget");
            var passwordstrengthchecktarget = input.attr("passwordstrengthchecktarget");
            if (typeof (tip) != "undefined") {
                input.bind("focus", function () {
                    if (typeof (tip) != "undefined") {
                        spanhelp.show().text(tip);
                    }
                });
                input.bind("blur", function () {
                    if (!(controlGroup.hasClass("error") || controlGroup.hasClass("warning"))) {
                        spanhelp.hide();
                    }
                });
            }
            if (typeof (required) != "undefined") {
                target[0].validateState.requriedValidateState = false;
                if (typeof (reg) != "undefined") {
                    target[0].validateState.regValidateState = false;
                }
                input.bind("change", function (event) {//reg
                    spanhelp.hide().text("");
                    var value = this.value.trim();
                    if (value.length == 0) {
                        target[0].validateState.requriedValidateState = false;
                        target[0].validateState.regValidateState = false;
                        if (typeof (surevalidatetargetID != "undefined")) {
                            $("#" + surevalidatetargetID).attr("readonly", "readonly");
                        }
                        controlGroup.removeClass("warning").removeClass("success").addClass("error");
                        spanhelp.text("不能为空！").show();
                    }
                    else {
                        target[0].validateState.requriedValidateState = true;
                        if (typeof (surevalidatetargetID != "undefined")) {
                            $("#" + surevalidatetargetID).removeAttr("readonly");
                        }
                        if (typeof (reg) != "undefined") {
                            target[0].validateState.regValidateState = false;
                            var pattern = new RegExp(reg);
                            if (!pattern.test(value)) {
                                if (typeof (surevalidatetargetID != "undefined")) {
                                    $("#" + surevalidatetargetID).attr("readonly", "readonly");
                                }
                                controlGroup.removeClass("warning").removeClass("success").addClass("error");
                                spanhelp.show().text("输入格式不正确！");
                                return;
                            }
                            else {
                                target[0].validateState.regValidateState = true;
                                if (typeof (surevalidatetargetID != "undefined")) {
                                    $("#" + surevalidatetargetID).removeAttr("readonly");
                                }
                                controlGroup.removeClass("error").removeClass("warning").removeClass("success");
                                spanhelp.hide().text("");
                                if (typeof (url) != "undefined") {
                                    serverPortValidate(value);
                                }
                                else {
                                    options.callback(value);
                                }
                            }
                        }
                        else {
                            serverPortValidate(value);
                        }
                    }
                    if (typeof (surevalidatetargetID) != "undefined") {
                        target[0].validateState.sureValidateState = false;
                        var surevalidateTarget = $("#" + surevalidatetargetID);
                        var target_controlGroup = surevalidateTarget.closest(".control-group");
                        var target_spanhelp = target_controlGroup.find(".help-inline").hide().text("");
                        if (this.value != surevalidateTarget.val()) {
                            target[0].validateState.sureValidateState = false;
                            target_controlGroup.removeClass("warning").removeClass("success").addClass("error");
                            target_spanhelp.show().text("输入不一致！");
                        }
                        else {
                            target[0].validateState.sureValidateState = true;
                            target_spanhelp.hide();
                        }
                    }
                });
            }
            if (input.attr("type") == "date") {
                input.attr("type", "text").addClass("date")
                input.DateSelector({
                    triggerEvent: "click",
                    callback: function () { }
                })
            }
            if (typeof (surevalidatetargetID) != "undefined") {
                target[0].validateState.sureValidateState = false;
                var surevalidateTarget = $("#" + surevalidatetargetID);
                var target_controlGroup = surevalidateTarget.closest(".control-group");
                var target_spanhelp = target_controlGroup.find(".help-inline").hide();
                surevalidateTarget.bind("change", function () {
                    if (this.value != input.val()) {
                        target[0].validateState.sureValidateState = false;
                        target_controlGroup.removeClass("warning").removeClass("success").addClass("error");
                        target_spanhelp.show().text("输入不一致！");
                    }
                    else {
                        target[0].validateState.sureValidateState = true;
                        target_spanhelp.hide();
                        target_controlGroup.removeClass("error").removeClass("warning").removeClass("success");
                    }
                });
            }
            if (typeof (passwordstrengthchecktarget) != "undefined") {
                var passwordStrengthDisplayer = $("#passwordStrengthDisplayer");
                passwordStrengthDisplayer.PasswordStrength();
                input.keyup(function () {
                    passwordStrengthDisplayer.setStrength(checkStrength(this.value))
                })
            }
        }
        //submit button
        else if (target.hasClass("submitButton")) {
            var submitButton = target;
            var form = submitButton.closest("form");
            var url = form.attr("action");
            var data = {};
            submitButton.click(function () {
                for (var value in options.keyGroup) {
                    var id=options.keyGroup[value];
                    var control = form.find("#" + id)[0];
                    data[id] = control.value;
                    var validateState = true;
                    for (var stateKey in control.validateState) {
                        if (!control.validateState[stateKey]) {
                            validateState = false;
                            break;
                        }
                    }
                    //if current control validate passed
                    if (!validateState) {
                        return false;
                    }
                }
                //if cycle passed,do submit
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: data,
                    beforeSend: function (XMLHttpRequest) {
                        //Pause(this,100000);
                    },
                    success: function (msg) {
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                    },
                    error: function () {
                        //错误处理
                    }
                })
                return false;
            })
        }
    };
})(jQuery);