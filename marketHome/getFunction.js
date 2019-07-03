var oScript = document.getElementById("clearCache");
var _hash = window.location.hash;
var _str = _hash.split("?")[1];
var aParameter = _str.split("&");
var oParameter = {};

for(var i=0;i<aParameter.length;i++){
    var _key = aParameter[i].split("=")[0];
    var _value = aParameter[i].split("=")[1];
    oParameter[_key] = _value;
}

console.log(oParameter);
if(JSON.stringify(oParameter)!="{}"){
    var jsName = oParameter.number + "_" + oParameter.activityName + "_schedule.js"
    var cScript1 = document.createElement("script");
    cScript1.type = "text/javascript";
    cScript1.src = "https://test.yijiago.com/gly/yiJiaGo/schedule/"+jsName+"?t1=" + Math.random();

    oScript.parentNode.insertBefore(cScript1, oScript);
}

var cScript2 = document.createElement("script");
cScript2.type = "text/javascript";
cScript2.src = "https://test.yijiago.com/gly/yiJiaGo/mall/template_mall.js?t2=" + Math.random();

var cScript3 = document.createElement("script");
cScript3.type = "text/javascript";
cScript3.src = "https://test.yijiago.com/gly/yiJiaGo/activity/setFunction.js?t3=" + Math.random();

var cLink4 = document.createElement("link");
cLink4.rel = "stylesheet";
cLink4.type = "text/css";
cLink4.href = "https://test.yijiago.com/gly/yiJiaGo/activity/changeStyle.css?t4=" + Math.random();

oScript.parentNode.insertBefore(cScript2, oScript);
oScript.parentNode.insertBefore(cScript3, oScript);
oScript.parentNode.insertBefore(cLink4, oScript);