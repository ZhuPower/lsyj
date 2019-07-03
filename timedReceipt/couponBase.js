(function() {
	var nTime1 = setInterval(function() {
		if (oData) {
			clearInterval(nTime1);
			var into = {
				oJson: {},
				aStarTime: [],
				nIndex: 0,
				temIndex: 0,
				onOff: false,
				bLogin: false,
				accessToken: '',
				timeCoupon: function(that) {
					var oWrap = document.getElementById('couponWrap');
					var oA = oWrap.children[0];
					var oImg = oA.children[0];
					var obj = that.oJson.couponInfo[that.nIndex];

					oA.setAttribute("rel", obj.couponId);
					oA.style.background = obj.imgBj;

					var aTime = this.getNtime(obj.startTime, obj.takeTime, obj.spaceTime);

					var oItem = {};
					oItem.oImg = oImg;
					oItem.imgSrc = obj.imgSrc;
					oItem.aTime = aTime;
					oItem.total = that.oJson.couponInfo.length;
					oItem.num = that.nIndex;
					oItem.onCoupon = that.onCoupon;

					that.changeFn(oItem);
					var nTime2 = setInterval(function() {
						that.changeFn(oItem, nTime2);
					},
					1000);

					getCoupon(aTime);
				},
				changeFn: function(obj, id) {
					var nowTime = new Date().getTime();
					if (nowTime < obj.aTime[0]) {
						if (obj.num == 0) {
							obj.oImg.src = obj.imgSrc.ing;
						}
					} else if (nowTime >= obj.aTime[0] && nowTime < obj.aTime[1]) {
						var onCoupon = eval(obj.oImg.getAttribute("onCoupon"));
						onCoupon = (onCoupon == null) ? true: onCoupon;
						if (onCoupon) {
							obj.oImg.src = obj.imgSrc.ing;
						} else {
							obj.oImg.src = obj.imgSrc.end;
						}
					} else if (nowTime >= obj.aTime[1] && nowTime < obj.aTime[2]) {
						obj.oImg.src = obj.imgSrc.end;
					} else if (nowTime >= obj.aTime[2]) {
						if (id) {
							clearInterval(id);
						}

						if (obj.num == obj.total - 1) {
							obj.oImg.src = obj.imgSrc.end;
						}
					}
				},
				getIndex: function(that, arr) {
					var num = new Date().getTime();
					for (var i = 0; i < arr.length; i++) {
						if (i < arr.length - 1) {
							if (num >= arr[i] && num < arr[i + 1]) {
								that.nIndex = i;
							}
						} else {
							if (num >= arr[i]) {
								that.nIndex = i;
								that.onOff = true;
							}
						}
					}
				},
				getStarTime: function(arr) {
					for (var i = 0; i < arr.length; i++) {
						var time = this.getTimes(arr[i].startTime);
						this.aStarTime.push(time);
					}
				},
				getNtime: function(str1, str2, str3) {
					var aDate = [];
					aDate[0] = this.getTimes(str1);
					aDate[1] = this.getTimes(str2);
					aDate[2] = this.getTimes(str3);
					return aDate;
				},
				getTimes: function(str) {
					var arr = str.split('-');
					var y = parseInt(arr[0]),
					m = parseInt(arr[1]) - 1,
					d = parseInt(arr[2]),
					h = parseInt(arr[3]),
					mi = parseInt(arr[4]),
					s = parseInt(arr[5]);
					var nTime = new Date(y, m, d, h, mi, s).getTime();
					return nTime;
				},
				onLogin: function() {
					var that = this;
					that.isLogin();
					if (that.bLogin) {
						var id = that.oJson.couponInfo[that.nIndex].couponId;
						that.hasCoupon(id, that.accessToken);
					} else {
						var nTime4 = setInterval(function() {
							that.isLogin();
							if (that.bLogin) {
								clearInterval(nTime4);
								var id = that.oJson.couponInfo[that.nIndex].couponId;
								that.hasCoupon(id, that.accessToken);
							}
						},
						200)
					}
				},
				hasCoupon: function(id, str) {
					var xml = new XMLHttpRequest();
					var sUrl = 'http://www.yijiago.com/index.php/topapi?method=member.coupon.couponpreferlist&coupon_type=market&page_no=1&showLoading=true&source_from=wap&v=v3&_rand=' + Math.random() + '&accessToken=' + str;
					xml.open("GET", sUrl, true);
					xml.send();
					xml.onreadystatechange = function() {
						if (xml.readyState == 4 && xml.status == 200) {
							var meg = eval('(' + xml.responseText + ')');
							if (meg.data.couponList) {
								var arr = meg.data.couponList;
								for (var i = 0; i < arr.length; i++) {
									if (id == arr[i].coupon_id) {
										var oWrap = document.getElementById('couponWrap');
										var oA = oWrap.children[0];
										var oImg = oA.children[0];
										if (arr[i].max_gen_quantity == arr[i].send_couponcode_quantity) {
											oImg.setAttribute("onCoupon", "false");
										} else {
											oImg.setAttribute("onCoupon", "true");
										}
									}
								}
							}
						}
					}
				},
				isLogin: function() {
					var user = null;
					var jObj = localStorage;
					if (jObj.user) {
						user = JSON.parse(jObj.user);
						this.bLogin = true;
						this.accessToken = user.accessToken;
					}
				},
				setTitle: function(str) {
					var oH = document.getElementsByClassName('header')[0];
					var oTit = oH.getElementsByClassName('tit')[0];
					oH.style.display = 'block';
					var oWrap = document.getElementById('couponWrap');
					var oA = oWrap.children[0];

					oTit.innerHTML = str;

					var nh = parseInt(this.getStyle(oH, 'height'));
					oA.style.minHeight = (document.body.clientHeight - nh) + 'px';
				},
				getParameter: function() {
					var _hash = window.location.hash;
					var _str = _hash.split("?")[1];
					var aParameter = _str.split("&");
					var oParameter = {};
					for (var i = 0; i < aParameter.length; i++) {
						var _key = aParameter[i].split("=")[0];
						var _value = aParameter[i].split("=")[1];
						oParameter[_key] = _value;
					}
					return oParameter;
				},
				getStyle: function(element, attr) {
					if (window.getComputedStyle) {
						return window.getComputedStyle(element, null)[attr];
					} else {
						return element.currentStyle[attr];
					}
				},
				run: function() {
					var that = this;

					that.oJson = oData[that.getParameter().name];
					console.log(that.oJson);

					that.setTitle(that.oJson.title);

					that.getStarTime(that.oJson.couponInfo);

					that.getIndex(that, that.aStarTime);
					that.onLogin();
					that.timeCoupon(that);
					that.temIndex = that.nIndex;
					var nTime3 = setInterval(function() {
						that.getIndex(that, that.aStarTime);
						if (that.onOff) {
							clearInterval(nTime3);
						}

						if (that.nIndex != that.temIndex) {
							that.onLogin();
							that.timeCoupon(that);
							that.temIndex = that.nIndex;
						}
					},
					1000);
				}
			};
			into.run();
		}
	},
	200);
})();