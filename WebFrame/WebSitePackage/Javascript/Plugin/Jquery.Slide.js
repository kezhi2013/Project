(function($) {
    $.fn.Slide = function (options) {
        //默认参数
        var defaults = {
        };
        var settings = $.extend(defaults, options || {});
        //计算相关数据
        var SlideBox = $(this),
            ul = SlideBox.children('ul'),
            lis = ul.find('li'),
            firstPic = lis.first().find('img');
        var t = n = 0,
            count = lis.length;
        if (!SlideBox.size()) {
            return false;
        }
        ul.find('li:first()').addClass('active');
        var Bar = $('<div class="Bar"></div>').css('opacity', 0.6).appendTo(SlideBox);
        var Summary = $('<label class="Summary"></label>').html(function () {
            var active = ul.find('li.active').find('a'),
                text = active.attr('title');
            return text;
        }).appendTo(Bar);
        var Nav = $('<div class="Nav"></div>').appendTo(Bar);
        //开始轮播
        function showAuto() {
            n = n >= (count - 1) ? 0 : ++n;
            var NavItem = $(Nav).find("span").eq(n);
            $(NavItem).trigger('click');
        }
        //初始化
        lis.each(function (i, li) {
            var a = $(li).find('a'),
                text = a.attr('title');
            var NavItem = $('<span>').text(i + 1);
            if (i == 0) {
                $(NavItem).addClass("active");
            }
            $(NavItem).click(function () {
                var index = $(this).text() - 1;//获取Li元素内的值，即1，2，3，4 
                n = index;
                if (index >= count) return;
                Summary.html($("#banner_list a").eq(i).find("img").attr('alt'));
                lis.filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
                $(this).addClass("active").siblings().removeClass("active");
            }).appendTo(Nav);
        });
        t = setInterval(showAuto, 4000);
        $(SlideBox).hover(function () { clearInterval(t) }, function () { t = setInterval(showAuto, 4000); });
    }
})(jQuery);