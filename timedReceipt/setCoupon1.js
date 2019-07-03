function getCoupon(arr) {
    var isLogin = false;
    var user = null;

    bLogin();

    var timing_1 = setInterval(function() {
        var aBtn = document.getElementsByClassName("couponsBtn");
        if (aBtn.length > 0) {
            clearInterval(timing_1);
            for (var i = 0; i < aBtn.length; i++) {
                aBtn[i].onclick = function() {
                    var nowTime = new Date().getTime();
                    if (nowTime < arr[0]) {
                        var h = new Date(arr[0]).getHours();
                        setMsg2("亲，" + h + "点准时开抢的哦!");
                    } else if (nowTime >= arr[0] && nowTime < arr[1]) {
                        hasCoupon(this);
                    } else if (nowTime >= arr[1]) {
                        setMsg2("券已领完");
                    }
                }
            }
        }
    },
    200);

    function hasCoupon(obj) {
        bLogin();
        if (isLogin) {
            var couponsId = obj.getAttribute("rel");
            var aCouponsId = couponsId.split(',');

            for (var ii = 0; ii < aCouponsId.length; ii++) {
                var xml = new XMLHttpRequest();
                var sUrl = 'http://www.yijiago.com/index.php/topapi?method=member.coupon.getusercoupon&coupon_id=' + aCouponsId[ii] + '&showLoading=false&v=v3&_rand=' + Math.random() + '&accessToken=' + user.accessToken;
                xml.open("GET", sUrl, true);
                xml.send();
                xml.onreadystatechange = function() {
                    if (xml.readyState == 4 && xml.status == 200) {
                        var meg = eval('(' + xml.responseText + ')');
                        var oWrap = document.body;
                        var div = document.createElement("div");
                        div.className = 'ui-msgbox-wrap';

                        if (typeof meg.data.message == 'number') {
                            setMsg(div, "领取成功!");
                        } else {
                            if (meg.data.message == '券已领完，谢谢惠顾' || meg.data.message == '优惠券领取时间已过，不能领取！') {
                                setMsg(div, "券已领完");
                            } else if (meg.data.message == '您的领用次数已过！') {
                                setMsg(div, "优惠券限领1次，您已领取过");
                            } else {
                                if (meg.data.message) {
                                    setMsg(div, meg.data.message);
                                } else {
                                    setMsg(div, "券已领完");
                                }
                            }
                        }

                        oWrap.appendChild(div);
                        setTimeout(function() {
                            var msgbox = document.getElementsByClassName("ui-msgbox-wrap")[0];
                            oWrap.removeChild(msgbox);
                        },
                        2000);
                    }
                }
            }

        } else {
            var active_url = window.location.href;
            var tourl = '#/passport-signin';
            tourl = tourl + '?tourl=' + encodeURIComponent(active_url.slice(active_url.indexOf('/h5/#') + 5));
            location.href = tourl;
        }
    }

    function setMsg(para, str) {
        var box = document.createElement("div");
        var node = document.createTextNode(str);
        box.appendChild(node);
        box.className = 'ui-msgbox';
        para.appendChild(box);
    }

    function setMsg2(str) {
        var oWrap = document.body;
        var div = document.createElement("div");
        div.className = 'ui-msgbox-wrap';

        var box = document.createElement("div");
        var node = document.createTextNode(str);

        box.appendChild(node);
        box.className = 'ui-msgbox';
        div.appendChild(box);

        oWrap.appendChild(div);
        setTimeout(function() {
            var msgbox = document.getElementsByClassName("ui-msgbox-wrap")[0];
            oWrap.removeChild(msgbox);
        },
        2000);
    }

    function bLogin() {
        isLogin = false;
        var jObj = localStorage;
        if (jObj.user) {
            user = JSON.parse(jObj.user);
            isLogin = true;
            //console.log(user);
        }
    }

}