$(document).ready(function () {
    $(function () {
        var ProjectCaseImg = $(".ProjectCaseImg");
        $.each(ProjectCaseImg, function (i, val) {
            $(val).jCarouselLite({
                visible: 2,
            });
        });
    });
});