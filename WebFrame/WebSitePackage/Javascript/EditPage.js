$(function () {
    $(".EditPage").each(function () {
        var EditPageObj = $(this);
        var ID = EditPageObj.attr("ID");
        var FieldName = ID.Left(ID.length - 4);
        EditPageObj.EditPage({
            DataServerUrl: "",
            FieldName: FieldName,
        });
    });
});