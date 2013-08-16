$(document).ready(function () {
    var TimeAxisBox = $(".TimeAxisBox");
    $(TimeAxisBox).find("ul.TimeAxisUl>li").each(function () {
        var ul = $(this).find("ul");
        ul.OpenState = true;
        $(this).find(".Year").click(function () {
            if (ul.OpenState) {
                ul.OpenHeight = ul.height();
                ul.slideUp(500, "jswing",
                    function () {
                        ul.OpenState = false;
                    }
                );
            }
            else {
                ul.slideDown(500, "jswing",
                    function () {
                        ul.OpenState = true;
                    }
                );
            }
        });
    })
});