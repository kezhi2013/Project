﻿//页面基本颜色生成器
var ColorPickerColor = [
    { key: "aliceblue", value: "#F0F8FF" },
    { key: "aquamarine", value: "#7FFFD4" },
    { key: "beige", value: "#F5F5DC" },
    { key: "black", value: "#000000" },
    { key: "blue", value: "#0000FF" },
    { key: "brown", value: "#A52A2A" },
    { key: "cadetblue", value: "#5F9EA0" },
    { key: "chocolate", value: "#D2691E" },
    { key: "darkgray", value: "#A9A9A9" },
    { key: "darkcyan", value: "#008B8B" },
    { key: "red", value: "#FF6C6C" },
    { key: "azure", value: "#F0FFFF" },
    { key: "bisque", value: "#FFE4C4" },
    { key: "blanchedalmond", value: "#FFEBCD" },
    { key: "blueviolet", value: "#8A2BE2" },
    { key: "burlywood", value: "#DEB887" },
    { key: "chartreuse", value: "#7FFF00" },
    { key: "coral", value: "#FF7F50" },
    { key: "cornsilk", value: "#FFF8DC" },
    { key: "darkblue", value: "#00008B" },
    { key: "darkgoldenrod", value: "#B8860B" },
    { key: "deeppink", value: "#FF1493" },
    { key: "darkolivegreen", value: "#556B2F" },
    { key: "darkorchid", value: "#9932CC" },
    { key: "darksalmon", value: "#E9967A" },
    { key: "darkslateblue", value: "#483D8B" },
    { key: "darkturquoise", value: "#00CED1" },
    { key: "forestgreen", value: "#228B22" },
    { key: "dimgray", value: "#696969" },
    { key: "firebrick", value: "#B22222" },
    { key: "darkgreen", value: "#006400" },
    { key: "darkmagenta", value: "#8B008B" },
    { key: "dodgerblue", value: "#1E90FF" },
    { key: "darkred", value: "#8B0000" },
    { key: "darkseagreen", value: "#8FBC8F" },
    { key: "darkslategray", value: "#2F4F4F" },
    { key: "darkviolet", value: "#9400D3" },
    { key: "floralwhite", value: "#FFFAF0" },
    { key: "gainsboro", value: "#DCDCDC" },
    { key: "deepskyblue", value: "#00BFFF" },
    { key: "green", value: "#008000" },
    { key: "honeydew", value: "#F0FFF0" },
    { key: "indianred", value: "#CD5C5C" },
    { key: "khaki", value: "#F0E68C" },
    { key: "lightcyan", value: "#E0FFFF" },
    { key: "lightgreen", value: "#90EE90" },
    { key: "lavenderblush", value: "#FFF0F5" },
    { key: "lemonchiffon", value: "#FFFACD" },
    { key: "lightcoral", value: "#F08080" },
    { key: "lightpink", value: "#FFB6C1" },
    { key: "gold", value: "#FFD700" },
    { key: "gray", value: "#808080" },
    { key: "greenyellow", value: "#ADFF2F" },
    { key: "hotpink", value: "#FF69B4" },
    { key: "ivory", value: "#FFFFF0" },
    { key: "lavender", value: "#E6E6FA" },
    { key: "lawngreen", value: "#7CFC00" },
    { key: "lightblue", value: "#ADD8E6" },
    { key: "lightgrey", value: "#D3D3D3" },
    { key: "lightskyblue", value: "#87CEFA" },
    { key: "lightseagreen", value: "#20B2AA" },
    { key: "lightsteelblue", value: "#B0C4DE" },
    { key: "limegreen", value: "#32CD32" },
    { key: "mintcream", value: "#F5FFFA" },
    { key: "moccasin", value: "#FFE4B5" },
    { key: "magenta", value: "#FF00FF" },
    { key: "mediumaquamarine", value: "#66CDAA" },
    { key: "mediumorchid", value: "#BA55D3" },
    { key: "mediumseagreen", value: "#3CB371" },
    { key: "mediumspringgreen", value: "#00FA9A" },
    { key: "lightsalmon", value: "#FFA07A" },
    { key: "lightslategray", value: "#778899" },
    { key: "lightyellow", value: "#FFFFE0" },
    { key: "linen", value: "#FAF0E6" },
    { key: "mediumturquoise", value: "#48D1CC" },
    { key: "maroon", value: "#800000" },
    { key: "mediumblue", value: "#0000CD" },
    { key: "mediumvioletred", value: "#C71585" },
    { key: "mediumslateblue", value: "#7B68EE" },
    { key: "mistyrose", value: "#FFE4E1" },
    { key: "navajowhite", value: "#FFDEAD" },
    { key: "navy", value: "#000080" },
    { key: "oldlace", value: "#FDF5E6" },
    { key: "orange", value: "#FFA500" },
    { key: "palegreen", value: "#98FB98" },
    { key: "palevioletred", value: "#DB7093" },
    { key: "peachpuff", value: "#FFDAB9" },
    { key: "pink", value: "#FFC0CB" },
    { key: "powderblue", value: "#B0E0E6" },
    { key: "red", value: "#FF0000" },
    { key: "midnightblue", value: "#191970" },
    { key: "olive", value: "#808000" },
    { key: "olivedrab", value: "#6B8E23" },
    { key: "orchid", value: "#DA70D6" },
    { key: "paleturquoise", value: "#AFEEEE" },
    { key: "papayawhip", value: "#FFEFD5" },
    { key: "peru", value: "#CD853F" },
    { key: "plum", value: "#DDA0DD" },
    { key: "purple", value: "#800080" },
    { key: "rosybrown", value: "#BC8F8F" },
    { key: "royalblue", value: "#4169E1" },
    { key: "salmon", value: "#FA8072" },
    { key: "seagreen", value: "#2E8B57" },
    { key: "sienna", value: "#A0522D" },
    { key: "slateblue", value: "#6A5ACD" },
    { key: "snow", value: "#FFFAFA" },
    { key: "steelblue", value: "#4682B4" },
    { key: "silver", value: "#C0C0C0" },
    { key: "thistle", value: "#D8BFD8" },
    { key: "turquoise", value: "#40E0D0" },
    { key: "saddlebrown", value: "#8B4513" },
    { key: "sandybrown", value: "#F4A460" },
    { key: "seashell", value: "#FFF5EE" },
    { key: "skyblue", value: "#87CEEB" },
    { key: "slategray", value: "#708090" },
    { key: "springgreen", value: "#00FF7F" },
    { key: "tan", value: "#D2B48C" },
    { key: "teal", value: "#008080" },
    { key: "tomato", value: "#FF6347" },
    { key: "violet", value: "#EE82EE" },
    { key: "whitesmoke", value: "#F5F5F5" },
    { key: "yellow", value: "#FFFF00" },
    { key: "wheat", value: "#F5DEB3" },
    { key: "yellowgreen", value: "#9ACD32" },
];
var ArticalCommonColor=[
    [
        { key: "black", value: "#000000"},
        { key: "burntorangre", value: "#993300"},
        { key: "darkolive", value: "#333300"},
        { key: "darkgreen", value: "#003300"},
        { key: "darkozure", value: "#003366"},
        { key: "navyblue", value: "#000080"},
        { key: "indigo", value: "#333399"},
        { key: "verydarkgray", value: "#333333"},
    ],
    [
        { key: "maroon", value: "#800000"},
        { key: "orange", value: "#ff6600"},
        { key: "olive", value: "#808000"},
        { key: "green", value: "#008000"},
        { key: "teal", value: "#008080"},
        { key: "blue", value: "#0000ff"},
        { key: "grayishblue", value: "#666699"},
        { key: "gray", value: "#808080"},
    ],
    [
        { key: "red", value: "#ff0000"},
        { key: "amber", value: "#ff9900"},
        { key: "green", value: "#99cc00"},
        { key: "seagreen", value: "#339966"},
        { key: "turquoise", value: "#33cccc"},
        { key: "royalblue", value: "#3366ff"},
        { key: "purple", value: "#800080"},
        { key: "mediumgray", value: "#999999"},
    ],
    [
        { key: "magenta", value: "#ff00ff"},
        { key: "gold", value: "#ffcc00"},
        { key: "yellow", value: "#ffff00"},
        { key: "lime", value: "#00ff00"},
        { key: "aqua", value: "#00ffff"},
        { key: "skyblue", value: "#00ccff"},
        { key: "brown", value: "#993366"},
        { key: "sliver", value: "#c0c0c0"},
    ],
    [
        { key: "pink", value: "#ff99cc"},
        { key: "peach", value: "#ffcc99"},
        { key: "yellow", value: "#ffff99"},
        { key: "palegreen", value: "#ccffcc"},
        { key: "palecyan", value: "#ccffff"},
        { key: "light-skyblue", value: "#99ccff"},
        { key: "plum", value: "#cc99ff"},
        { key: "white", value: "#ffffff"},
    ],
]

var MetroColor = [
    { key: "gray", value: "#DEDFDE", name: "灰色" },
    { key: "white", value: "#FFFFFF", name: "白色" },
    { key: "black", value: "#000000", name: "黑色" },
    { key: "red", value: "#E51400", name: "红色" },
    { key: "green", value: "#339933", name: "绿色" },
    { key: "blue", value: "#1BA1E2", name: "蓝色" },
    { key: "orange", value: "#F09609", name: "橙色" },
    { key: "prasinous", value: "#8CBF26", name: "草绿" },
    { key: "lightblue", value: "#00ABA9", name: "湖蓝" },
    { key: "magenta", value: "#FF0097", name: "洋红" },
    { key: "pink", value: "#E671B8", name: "粉色" },
    { key: "brown", value: "#996600", name: "棕色" },
    { key: "purple", value: "#A200FF", name: "紫色" },
    { key: "darkpurple", value: "#260930", name: "暗紫" },
];
var BaseColor = [
    { key: "transparent", value: "transparent", name: "透明" },
    { key: "lightred", value: "#EE1111", name: "淡红" },
    { key: "teal", value: "#00ABA9", name: "深湖蓝色" },
    { key: "darkgray", value: "#525252", name: "深灰色" },
    { key: "lighten", value: "#d5e7ec", name: "" },
    { key: "darken", value: "#1d1d1d", name: "" },
    { key: "darkorange", value: "#da532c", name: "深橙色" },
    { key: "yellow", value: "#ffc40d", name: "黄色" },
    { key: "lime", value: "#96b232", name: "青橙绿色" },
    { key: "skyblue", value: "#00ccff", name: "天蓝色" },
    { key: "lightblue", value: "#eff4ff", name: "淡蓝色" },
];

var commonReg = {
    Phone : /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/,    
    Mobile: /^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$/,
    Url: /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
    IdCard: /^\d{15}(\d{2}[A-Za-z0-9])?$/,
    QQ: /^[1-9]\d{4,8}$/
}