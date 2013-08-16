function createMarker(map,point, code) {
    var marker = new google.maps.Marker( {  
        position: point,
        map : map,  
        title: code,
    });
    var yourInfoWindow;
    google.maps.event.addListener(marker, "click", function () {
        if (!yourInfoWindow) {  
            yourInfoWindow = new google.maps.InfoWindow( {});  
        }  
        yourInfoWindow.setContent(marker.title);
        yourInfoWindow.open(map, marker);

    });
    return marker;
}
var InitMap = function (MapBox, param) {
    var map = new google.maps.Map(MapBox, param);
    createMarker(map, param.center, param.StudioName);
}
$(document).ready(function () {
    var DataServerUrl = "";
    $.getJSON(DataServerUrl, function (param) {  
    });
    var param = {
        zoom: 10,
        center: new google.maps.LatLng(31.088431, 121.375602),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        StudioName:"零一工作室",
    };
    InitMap(document.getElementById("Map"), param);
});