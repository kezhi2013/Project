(function ($) {
    $.fn.jCarouselLite = function (o) {
        o = $.extend({              // Set defaults for options that the caller didn't specify
            btnGo: [],              // selector for go. [".carousel .1", ".carousel .2", ...]
            visible: 3,             // total number of items that will be visible at a time - default 3
            speed: 200,             // speed of animation.
            easing: null,           // if you have registered easing methods, then supply the string reprenting the easing
            beforeStart: null,      // function to callback before the animation starts
            afterEnd: null,         // function to callback after the animation ends
            vertical: false,        // Do you want the carousel horizontal or vertical. It is horiziontal by default.
            itemMargin: 0           // Specify a margin for the item. Defaults to 10px.
        }, o || {});
        var extra = o.itemMargin * 2,
            curr = 0;
        var div = $(this),
            ul = div.find("ul"),
            li = div.find("li"),
            img=div.find("img"),
            itemLength = li.size();
        var btnPrev = div.find("button.prev"),
            btnNext = div.find("button.next");
        var animCss = o.vertical ? "top" : "left",
            sizeCss = o.vertical ? "height" : "width";
        var liSize = o.vertical ? img.height() + extra : img.width() + extra;// Full li size(incl margin)-Used for animation
        var ulSize = liSize * itemLength; // size of entire ul(total length, not just for the visible items)
        var divSize = liSize * o.visible; // size of entire div(total length for just the visible items)
        
        var getVisibleElements = function () {
            var arr = [];
            li.children().each(function (i) {
                if (i >= curr && i < curr + o.visible)
                    arr.push(this);
            });
            return arr;
        };
        var go = function (to) {
            if (o.beforeStart)
                o.beforeStart.call(this, getVisibleElements(curr, o.visible));// callback
            if (to < 0 && curr == 0)
                curr = itemLength - o.visible;// If the pointer is in the first, then goto last
            else if (to >= itemLength - o.visible && curr + o.visible >= itemLength)
                curr = 0; // If the pointer is in the last, then goto first
            else
                curr = to;
            ul.animate(// animate
                animCss == "left" ? { left: -(curr * liSize) } : { top: -(curr * liSize) }
                , o.speed, o.easing,
                function () {
                    ul.css(animCss, -(curr * liSize) + "px");// For some reason the animation was not making left:0
                    if (o.afterEnd)
                        o.afterEnd.call(this, getVisibleElements(curr - 1, o.visible));// callback
                }
            );
            return false;
        };
        div.addClass("PictureGalleryBox");
        div.css("overflow", "hidden")// Overflows - works in FF
            .css("position", "relative")// position relative and z-index for IE
            .css(sizeCss, divSize + "px")// Width of the DIV. length of visible images

        ul.css("position", "relative")// IE BUG - width as min-width
            .css(sizeCss, ulSize + "px")// Width of the UL is the full length for all the images
            .css(animCss, -(curr * liSize))// Set the starting item
            .css("list-style-type", "none")// We dont need any icons representing each list item.

        li.css("overflow", "hidden")// If the list item size is bigger than required
            .css("margin", o.itemMargin);// User specified margin.
        if (!o.vertical)
            li.css("float", "left");// Horizontal list
        li.children().css("overflow", "hidden");// If the item within li overflows its size, hide'em
        btnPrev.click(function () { return go(curr - 1); });
        btnNext.click(function () { return go(curr + 1); });
        $.each(o.btnGo, function (i, val) {
            $(val).click(function () {
                return go(i);
            });
        });
        div.removeClass("lock");
        return this;
    }

})(jQuery);