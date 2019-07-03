var into = {
 	is_weixin:false,
 	oParameter:{},
 	userId:0,
 	accessToken:'',
 	oldToNew:false,
 	jl:0,
 	bClose:true,
 	apiUrl:'http://pre.yijiago.com/index.php/topapi',
 	imgUrl:'http://util.yijiago.com:8097/yiJiaGo/test/inviteFriends/images/',
 	oImg:{
 		bj1:'bj.png?t='+Math.random(),
 		fx:'fx.png?t='+Math.random(),
 		gb:'gb.png?t='+Math.random(),
 		tc:'tc.png?t='+Math.random(),
 		wz:'wz.png?t='+Math.random(),
 		yhq:'yhq.png?t='+Math.random(),
 		flq:'flq.png?t='+Math.random(),
 		gwq:'jfq.png?t='+Math.random(),
 		yhqbj:'yhqbj.png?t='+Math.random(),
 		yq:'yq.png?t='+Math.random(),
 		fgx:'fgx.png?t='+Math.random(),
 		hb:'hb.png?t='+Math.random(),
 		text1:'text1.png?t='+Math.random(),
 		text2:'text2.png?t='+Math.random(),
 		text3:'text3.png?t='+Math.random(),
 		text4:'text4.png?t='+Math.random(),
 		icon:'icon.png?t='+Math.random()
 	},
 	inviteFriends:function(){
 		var that = this;
 		return {
 			data:function(){
 				return {
 					aFriends:[],
 					isFriends:false,
 					nFriends:0,
 					is_weixin:that.is_weixin,
 					prizeMoney:0,
 					is_yhq:false,
 					is_flq:false,
 					is_gwq:false,
 					yhq_mj:'',
 					prizeClass:''
 				}
 			},
	 		template: that.inviteHtml(),
	 		created:function(){
	 			var vm = this;
	 			this.createQRcode();
	 			if(that.accessToken){
	 				vm.getInvitePrize();
	 				vm.getInviteList();
	 			}else{
	 				var nTime = setInterval(function(){
		 				if(that.accessToken){
		 					clearInterval(nTime);
			 				vm.getInvitePrize();
	 						vm.getInviteList();
			 			}
		 			},200);	
	 			}
	 		},
	 		methods: {
	 			createQRcode:function(){

	 				if(localStorage.user && that.jl){
 						that.userId = JSON.parse(localStorage.user).user_id;
 						var str1 = window.location.href;
		 				var n1 = str1.indexOf('?');
		 				var n2 = str1.indexOf('#');
		 				if(n2>n1){
		 					var _str = str1.substring(n1,n2);
		 					str1 = window.location.href.replace(_str,'');
		 				}
		 				str1 = str1.substring(0,str1.indexOf('?'));
		 				str1 = str1+"?userId="+that.userId+"&jl="+that.jl+"&invite=false";
		 					that.elDoing("qrcode",function(obj){
			 					new QRCode(obj,{
									text:str1
								});
			 				})
 					}else{
 						var n = setInterval(function(){
		 					if(localStorage.user && that.jl){
		 						clearInterval(n);
		 						that.userId = JSON.parse(localStorage.user).user_id;
		 						var str1 = window.location.href;
				 				var n1 = str1.indexOf('?');
				 				var n2 = str1.indexOf('#');
				 				if(n2>n1){
				 					var _str = str1.substring(n1,n2);
				 					str1 = window.location.href.replace(_str,'');
				 				}
				 				str1 = str1.substring(0,str1.indexOf('?'));
				 				str1 = str1+"?userId="+that.userId+"&jl="+that.jl+"&invite=false";
		 						that.elDoing("qrcode",function(obj){
				 					new QRCode(obj,{
										text:str1
									});
				 				})
		 					}
		 				},200);	
 					}		
	 			},
	 			getInviteList:function(){
	 				var vm = this;
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'inivite.getinvitelist',
							invite_id:that.userId,
							accessToken:that.accessToken,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						console.log(res.data.data)
						if(res.data.data.error == 0){
							var arr = res.data.data.data;
							if(arr.length>0){
								var arr2 = [];
								vm.nFriends = 0;
								for(var i=0;i<arr.length;i++){
									var oItem = {};
									var tel='';
									var reward='';
									var status='';
									var time='';

									var str1 = arr[i].cover_invite_mobile;
									tel = str1.substr(0,3)+'****'+str1.substr(-4);

									var str2 = arr[i].prize_money;
									var type2 = arr[i].prize_type;
									var typeName ='元优惠券';

									if(type2 == '2'){
										typeName = '元返利券';
									}else if(type2 == '3'){
										typeName = '积分券';
									}

									reward = (str2==null) ? 0 : str2;
									reward = parseFloat(reward)+typeName;

									var str3 = arr[i].is_invite; 
									if(str3==0 || str3==1){
										status = '邀请进行中';
									}else if(str3==2){
										vm.nFriends++;
										status = '邀请成功';
									}else if(str3==3){
										status = '邀请失败';
									}

									var str4 = arr[i].prize_account_time;
									if(str4){
										str4 = new Date(str4*1000);
										var y = str4.getFullYear();
										var m = str4.getMonth()+1;
										var d = str4.getDate();
										time = y+'.'+m+'.'+d;	
									}else{
										time = '------';	
									}
									

									oItem.tel = tel;
									oItem.reward = reward;
									oItem.status = status;
									oItem.time = time;

									arr2.push(oItem);
								}

								vm.aFriends = arr2;
		 						vm.isFriends = true;
							}else{
								vm.isFriends = false;	
							}
							

						}
					})
	 			},
	 			getInvitePrize:function(){
	 				var vm = this;
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'invite.getinviteprize',
							accessToken:that.accessToken,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						if(res.data.data.error == 0){
							vm.prizeMoney = parseInt(res.data.data.data.prize_money);
							that.jl = vm.prizeMoney;

							if(res.data.data.data.prize_type == '1'){
								vm.is_yhq = true;
								vm.is_flq = false;
								vm.is_gwq = false;
								vm.yhq_mj = res.data.data.data.remak;
								vm.prizeClass = 'prizeMoney';
							}else if(res.data.data.data.prize_type == '2'){
								vm.is_yhq = false;
								vm.is_flq = true;
								vm.is_gwq = false;
								vm.prizeClass = 'prizeMoney2';
							}else if(res.data.data.data.prize_type == '3'){
								vm.is_yhq = false;
								vm.is_flq = false;
								vm.is_gwq = true;
								vm.prizeClass = 'prizeMoney3';
							}
						}
						
						//console.log(res.data.data)
					})
	 			},
	 			popShow:function(){
	 				that.inviteShow();
	 			},
	 			closeFace:function(){
	 				var oPop = document.getElementById('popBackground');
	 				var oFace = document.getElementById('faceMain');
	 				oPop.style.display = 'none';
	 				oFace.style.display = 'none';
	 				that.bClose = true;	
	 			},
	 			faceInviting:function(){
	 				that.bClose = false;
	 				var oPop = document.getElementById('popBackground');
	 				var oFace = document.getElementById('faceMain');
	 				oPop.style.display = 'block';
	 				oFace.style.display = 'block';
	 			},
	 			onTab:function(num){
	 				var aLi = document.getElementById('tabUl').children;
	 				var aDiv = document.getElementById('tabCon').children;
	 				for(var i=0;i<aLi.length;i++){
	 					aLi[i].className = '';
	 					aDiv[i].style.display = 'none';
	 				}
	 				aLi[num].className = 'cur';
	 				aDiv[num].style.display = 'block';
	 			}
	 		}	
 		}
 	},
 	friendsRegistered:function(){
 		var that = this;
 		return {
 			data:function(){
 				return {
 					isNewUuser:true,
 					isReward:false,
 					inputYzm:'',
 					inputVCode:'',
 					inputTel:'',
 					isCheck:false,
 					vcodeImg:'',
 					sendVcodeTime:0,
 					accessToken:'',
 					userId:0,
 					openid:'',
 					couponName:'',
 					deductMoney:0,
 					prizeMoney:0
 				}
 			},
 			props: ['bLogin'],
	 		template: that.registeredHtml(),
	 		watch:{},
	 		created:function(){
	 			//console.log(that.oParameter);
	 			this.prizeMoney = that.oParameter.jl

	 			if(that.oParameter.openId){
	 				document.getElementsByTagName('title')[0].innerHTML = '易佳购新人大礼包';

	 				//this.openid = that.oParameter.openId;
	 				this.openid = that.oParameter.openId+Math.random().toString(36).substr(2,6);
	 				this.checkOpenId(this);
	 			}else{

	 				var str1 = window.location.href;
	 				var n1 = str1.indexOf('?');
	 				var n2 = str1.indexOf('#');
	 				if(n2>n1){
	 					var _str = str1.substring(n1,n2);
	 					str1 = window.location.href.replace(_str,'');
	 				}
	 				
	 				str1 = str1.substring(0,str1.indexOf('?'));
	 				str1 = str1+"?userId="+that.oParameter.userId+"&jl="+that.oParameter.jl+"&invite=false";
	 				var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxecf06a4829133fc6&redirect_uri=http://www.yijiago.com/promotion/fenxiang/getUserInfo.php&response_type=code&scope=snsapi_userinfo&state='+window.btoa(str1)+'&connect_redirect=1#wechat_redirect';
	 				location.href = url;
	 			}
	 		},
	 		methods: {
	 			getVCode:function(){
	 				this.inputTel = document.getElementById('tel').value;
	 				if(/^1[3456789]\d{9}$/.test(this.inputTel)){ 
					        this.signupCheck(this.inputTel);
					}else{
						that.setMsg("请填写有效的手机号码");	
					}
	 			},
	 			inputBlur:function(){
	 				setTimeout(function(){
	 					var x = document.activeElement.id;
	 					if(!x){
	 						window.scrollTo(0, 0);
	 					}
	 				},200);
	 			},
	 			createBindRelation:function(obj){
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'inivite.createbindrelation',
							accessToken:obj.accessToken,
							invite_id:that.oParameter.userId,
							cover_invite_mobile:obj.inputTel,
							cover_invite_wx_id:obj.openid,
							cover_user_id:obj.userId,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						console.log(res.data.data)
					})
	 			},
	 			sendConpon:function(obj){
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'inivite.sendconpon',
							accessToken:obj.accessToken,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						if(res.data.data.error == 0){
							//obj.couponName = res.data.data.data.coupon_name;
							obj.deductMoney = res.data.data.data;
						}

						if(!res.data.data.data){
							alert(res.data.data.data)
						}
					})
	 			},
	 			verifySmsToken:function(str,obj){
	 				var  password = Math.random().toString(36).substr(2,6);
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'user.signup',
							account:obj.inputTel,
							password:password,
							pwd_confirm:password,
							type:'signup',
							license:1,
							verifySms_token:str,
							deviceid:new Date().getTime(),
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						console.log(res.data.data)
						obj.accessToken = res.data.data.accessToken;
						obj.userId = res.data.data.user_id;
						obj.isReward = true;
						obj.createBindRelation(obj);
						obj.sendConpon(obj);
					})
	 			},
	 			verifySms:function(){
	 				var vm = this;
	 				vm.inputTel = document.getElementById('tel').value;
	 				vm.inputVCode = document.getElementById('vCode').value;
	 				if(vm.inputVCode && vm.inputTel){
				        		axios({
							method: 'get',
							url:that.apiUrl,
							params: {
								method:'user.verifySms',
								vcode:vm.inputVCode,
								mobile:vm.inputTel,
								type:'signup',
								v:'v3',
								_rand:Math.random()
							}
						}).then(function(res){
							if(res.data.errorcode == 0){
								vm.verifySmsToken(res.data.data.verifySms_token,vm);
							}else{
								if(res.data.msg){
		 							that.setMsg(res.data.msg);
		 						}else{
		 							that.setMsg('验证码输入错误');
		 						}
							}
						})
				        	}else{
				        		if(!vm.inputTel){
				        			that.setMsg("请输入正确的手机号码");
				        		}else if(!vm.inputVCode){
				        			that.setMsg("验证码不能为空");
				        		}
				        	}	
	 			},
	 			sendSms:function(){
	 				var vm = this;
	 				vm.inputYzm = document.getElementById('yzm').value;
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'user.sendSms',
							mobile:vm.inputTel,
							type:'signup',
							showLoading:true,
							send_vcode_time: vm.sendVcodeTime,
							send_vcode:vm.inputYzm,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
	 					if(res.data.errorcode==0){
	 						vm.isCheck = false;
	 						var oA = document.getElementById('getVCode');
			 				var num = 59;
			 				oA.innerHTML = num+'秒后重试';
			 				var n = setInterval(function(){
			 					num--;
			 					if(num<1){
			 						oA.innerHTML = '获取验证码';
			 					}else{
			 						oA.innerHTML = num+'秒后重试';	
			 					}
			 					
			 				},1000)
	 					}else{
	 						if(res.data.msg){
	 							if(res.data.msg == '参数 mobile 必须为一个有效的手机号.'){
	 								that.setMsg("请填写有效的手机号码");
	 							}else{
	 								that.setMsg(res.data.msg);
	 							}
	 						}else{
	 							that.setMsg('验证码填写错');
	 						}
	 						vm.signupCheck(vm.inputTel);
	 					}
					})
	 			},
	 			vcode:function(obj){
	 				obj.sendVcodeTime = new Date().getTime();
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'user.vcode',
							vcode_type: obj.sendVcodeTime,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						obj.vcodeImg = res.data.data.base64Image;
					})
	 			},
	 			signupCheck:function(tel){
	 				var vm = this;
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'user.signupCheck',
							account: tel,
							showLoading:true,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						console.log(res.data);
						if(res.data.data.error ==0){
							vm.isCheck = true;
							vm.vcode(vm);
						}else{
							if(res.data.data.message = '该手机号已注册！'){
								vm.isNewUuser = false;
							}
						}
					})
	 			},
	 			checkOpenId:function(obj){
	 				axios({
						method: 'get',
						url:that.apiUrl,
						params: {
							method:'inivite.checkopenid',
							cover_invite_wx_id: obj.openid,
							v:'v3',
							_rand:Math.random()
						}
					}).then(function(res){
						if(res.data.data.error != 0){
							obj.isNewUuser = false;
						}
					})
	 			},
	 			closeBtn:function(){
	 				this.isCheck = false;
	 			},
	 			popShow:function(){
	 				that.oldToNew = true;
	 				if(localStorage.user){
	 					that.inviteShow();	
	 				}else{
	 					var tourl = '#/passport-signin';
						location.href = tourl;
	 				}
	 			}
	 		}	
 		}	
 	},
 	indexLayout:function(){
 		var that = this;
 		return {
 			data:function(){
	 			return {
	 				phpUrl:'http://www.yijiago.com/promotion/fenxiang/getSign.php',
					curUrl:'',
					title:'易佳购送你30元新人专享红包',
					desc:'易佳购精选优质商品，1小时速达，新人注册即享超值大礼包，快来领取吧！',
					imgUrl:that.oImg.icon,
					is_weixin:that.is_weixin,
					invite: (that.oParameter.invite == 'false' || that.oParameter.invite == 'true') ?  eval(that.oParameter.invite) : false,
					bLogin:false
	 			}
	 		},
	 		template: that.indexHtml(),
	 		watch:{
	 			bLogin:function(){
	 				if(this.bLogin && this.invite){
	 					this.setBj();
	 				}
	 			}
	 		},
	 		created:function(){
	 			var vm = this;
	 			var oTitle = document.getElementsByTagName('title')[0];
	 			var oH = document.getElementsByClassName('header')[0];
	 			var oTit = oH.getElementsByClassName('tit')[0];
	 			//var oMain = document.getElementsByClassName('app-body')[0];

	 			if(!this.is_weixin){
	 				document.getElementsByClassName('header')[0].style.fontSize="0.4rem";
 					document.getElementsByClassName('header')[0].style.display="block";
 				}

	 			if(this.invite){
	 				this.onLogin();
	 				if(that.userId){
	 					oTit.innerHTML = '邀请好友';
	 					oTitle.innerHTML = '邀请好友';	
	 				}
	 				
	 			}else{
	 				// oTit.innerHTML = this.title;
	 				// oTitle.innerHTML = this.title;	
	 			}

	 			this.setBj();

	 			this.getSign(function(res){
	 				//console.log(res)
	 				var oConfig = {
	 					appId: res.appId,  
						timestamp: res.timestamp, 
						nonceStr: res.nonceStr, 
						signature: res.signature,
						jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems','checkJsApi','openAddress']	
	 				}
	 				
	 				wx.config(oConfig);
	 				vm.shareInfo();
	 			})
	 		},
	 		methods:{
	 			setBj:function(){
	 				var vm = this;
	 				var oH = document.getElementsByClassName('header')[0];
	 				//var oTit = oH.getElementsByClassName('tit')[0];
	 				//var oMain = document.getElementsByClassName('app-body')[0];
	 				var nh = 0;

	 				if(!this.is_weixin){
	 					nh = parseInt(that.getStyle(oH,'height'));
	 				}

	 				if(this.invite){
	 					if(this.bLogin){
	 						that.elDoing("layout",function(obj){
				 				obj.style.minHeight = (document.body.clientHeight - nh)+'px';
			 				})
	 					}
	 					
	 				}else{
	 					if(this.is_weixin){
	 						if(that.oParameter.openId){
	 							that.elDoing("layout",function(obj){
					 				obj.style.minHeight = (document.body.clientHeight - nh)+'px';
				 				})
	 						}	
	 					}
	 				}
	 			},
	 			onLogin:function(){
			 		var vm = this;
			 		vm.isLogin();
			 		var iTime = setInterval(function(){
			 			//console.log(that.bLogin)
			 			if(vm.bLogin){
			 				clearInterval(iTime);
			 			}else{
			 				vm.isLogin();
			 			}
			 		},200);
			 	},
			 	isLogin:function(){
				 	//var bLogin = false;
				 	var _hash = window.location.hash;
					var _str = _hash.split("?")[0];
					var user = null;
				             var jObj = localStorage;
				        	if (jObj.user) {
				            		user = JSON.parse(jObj.user);
				             		this.bLogin = true;
				             		that.userId = user.user_id;
				             		that.accessToken = user.accessToken
				            		//console.log(user);
				             }

				             	if(!this.bLogin){
				             		setTimeout(function(){
				             			if(_str !='#/passport-signin'){
				             				var active_url = window.location.href;
							            	var tourl = '#/passport-signin';
							            	// tourl = tourl + '?tourl=' + encodeURIComponent(active_url.slice(active_url.indexOf('/h5/#') + 5));
							            	location.href = tourl;
				             			}	
				             		},200)
				             	}
				},
	 			shareInfo:function(){
	 				var vm = this;
	 				wx.ready(function(){
	 					wx.showOptionMenu();
	 					// wx.hideMenuItems({
	 					// 	menuList : [ "menuItem:share:qq","menuItem:share:weiboApp", "menuItem:favorite","menuItem:share:facebook", "menuItem:share:QZone","menuItem:jsDebug", "menuItem:editTag","menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode","menuItem:openWithQQBrowser","menuItem:openWithSafari", "menuItem:share:email","menuItem:share:brand" ]
	 					// });


	 					var oOption = {
		 					title: vm.title,
							desc: vm.desc,
							link: vm.curUrl,
							imgUrl: vm.imgUrl,
							success: function () {
								that.inviteHide(true);
							},
							cancel: function () {}
		 				}


		 				if(vm.invite){
		 					shareStatus();
		 				}else{
		 					if(that.oldToNew){
		 						shareStatus();
		 					}else{
		 						shareOption();
		 					}	
		 				}



		 				function shareStatus(){
		 					if(localStorage.user && that.jl){
		 						shareOption();
		 					}else{
		 						var n = setInterval(function(){
				 					if(localStorage.user && that.jl){
				 						clearInterval(n);
				 						shareOption();
				 					}
				 				},200);	
		 					}
		 				}

		 				function shareOption(){
		 					if(localStorage.user){
		 						var userId = JSON.parse(localStorage.user).user_id
		 					}else{
		 						var userId = that.oParameter.userId;
		 					}
		 					
		 					var jl = that.jl || that.oParameter.jl;
		 					that.userId = userId;
	 						var str1 = window.location.href;
			 				var n1 = str1.indexOf('?');
			 				var n2 = str1.indexOf('#');
			 				if(n2>n1){
			 					var _str = str1.substring(n1,n2);
			 					str1 = window.location.href.replace(_str,'');
			 				}
			 				str1 = str1.substring(0,str1.indexOf('?'));
			 				str1 = str1+"?userId="+userId+"&jl="+jl+"&invite=false";
	 						oOption.link = str1;
	 						console.log(oOption.link);
	 						wx.onMenuShareTimeline(oOption);
							wx.onMenuShareAppMessage(oOption);
		 				}
	 				})
	 			},
	 			getSign:function(endFn){
	 				var params = new URLSearchParams();
					params.append('url',this.curUrl);
					params.append('t',Math.random());
					return axios({
						method: 'post',
						url:this.phpUrl,
						data:params
					}).then(function(res){
						var sRes = res.data;
						sRes ='{'+sRes.replace(/{/gi,"").replace(/}/gi,",").substr(0,sRes.length-1)+'}';
						var oSign = eval('(' + sRes + ')');

						endFn&&endFn(oSign);
					})
	 			}
	 		},
	 		components:{
	 			inviteFriends:that.inviteFriends(),
				friendsRegistered:that.friendsRegistered()
	 		}
 		}
 	},
 	indexHtml:function(){
 		//v-if="!is_weixin"
 		var sHtml = '<div id="layout"><invite-friends v-if="invite && bLogin"></invite-friends><friends-registered v-if="!invite" :bLogin="bLogin"></friends-registered><div id="popBackground" @click="into.inviteHide(into.bClose)"></div><div id="shareMain"><img :src="into.oImg.fx" @click="into.inviteHide(true)"/></div></div>';
 		return sHtml;
 	},
 	inviteHtml:function(){
 		var sHtml = '<div class="inviteFriends">'+
 				'<div class="txtWrap">'+
			 		'<p class="text1"><img :src="into.oImg.text1" /></p>'+
			 		'<p class="text2"><span v-text="prizeMoney"></span><img :src="into.oImg.text2" /></p>'+
		 		'</div>'+
	 			'<div class="yhqWrap">'+
	 				'<img :src="into.oImg.yhqbj" class="yhqbj" />'+
	 				'<img :src="into.oImg.yhq" v-if="is_yhq" class="yhq"/>'+
	 				'<img :src="into.oImg.flq" v-if="is_flq" class="yhq"/>'+
	 				'<img :src="into.oImg.gwq" v-if="is_gwq" class="yhq"/>'+
	 				'<p :class="prizeClass"><a v-if="!is_gwq">￥</a><span v-text="prizeMoney"></span></p>'+
	 				'<p class="yhq_mj" v-text="yhq_mj" v-if="is_yhq"></p>'+
	 			'</div>'+
	 			'<div class="btnWrap">'+
			 		'<a href="javascript:;" class="invitingNow" v-if="is_weixin" @click="popShow()">立即邀请</a>'+
			 		'<a href="javascript:;" class="faceInviting" @click="faceInviting()">面对面邀请</a>'+
		 		'</div>'+
		 		'<div class="tabWrap">'+
			 		'<ul id="tabUl">'+
				 		'<li class="cur" @click="onTab(0)">我的邀请</li>'+
				 		'<li @click="onTab(1)">活动规则</li>'+
			 		'</ul>'+
			 		'<div id="tabCon">'+
				 		'<div class="list">'+
					 		'<div class="friendList" v-if="isFriends">'+
						 		'<h3>您已成功邀请<span v-text="nFriends"></span>位好友</h3>'+
						 		'<div class="fgx"><img :src="into.oImg.fgx" /></div>'+
						 		'<div class="friendsList">'+
							 		'<p>'+
							 			'<span>手机号码</span>'+
							 			'<span>奖励券</span>'+
							 			'<span>邀请状态</span>'+
							 			'<span>到账时间</span>'+
							 		'</p>'+
							 		'<div class="pList">'+
								 		'<p v-for="item in aFriends">'+
								 			'<span v-text="item.tel"></span>'+
								 			'<span v-text="item.reward"></span>'+
								 			'<span v-text="item.status"></span>'+
								 			'<span v-text="item.time"></span>'+
								 		'</p>'+
							 		'</div>'+
						 		'</div>'+
					 		'</div>'+
					 		'<img :src="into.oImg.yq" v-if="!isFriends" />'+
				 		'</div>'+
				 		'<div class="list">'+
					 		'<p>1.邀请好友成为易佳购新用户，好友领取新新人礼包并完成首单，您即可获得奖励金。</p>'+
					 		'<p>2.您的好友必须是从未注册易佳购的新用户</p>'+
					 		'<p>3.好友领取礼包后需在7天内完成首单付款成功</p>'+
					 		'<p>4.好友下单途径仅限易佳购APP。</p>'+
					 		'<p>5.奖励券在好友下单签收1天后发送到您的账户中，请在易佳购APP</p>'+
					 		'<p>6.如有其它疑问请咨询易佳购客服。</p>'+
				 		'</div>'+
			 		'</div>'+
		 		'</div>'+
		 		'<div id="faceMain">'+
		 			'<div class="ewm">'+
		 				'<img :src="into.oImg.tc" />'+
		 				'<div id="qrcode"></div>'+
		 				'<div id="wxText">邀请好友微信扫码<p>领取<span>30</span>元新人大礼包</p></div>'+
		 			'</div>'+
		 			'<a href="javascript:;" class="closeBtn" @click="closeFace()"><img :src="into.oImg.gb" /></a>'+
		 		'</div>'+
	 		'</div>';
 		return sHtml;
 	},
 	registeredHtml:function(){
 		var sHtml = '<div class="friendsRegistered" v-if="into.is_weixin && into.oParameter.openId">'+
 				'<img :src="into.oImg.wz"/>'+
	 			'<div class="regMain" v-if="(isNewUuser && !isReward)">'+
	 				'<h4>易佳购送你30元新人大礼包，快来领取吧！</h4>'+
		 			'<ul>'+
		 				'<li>'+
		 					'<input type="tel" id="tel" placeholder="请输入手机号码" @blur="inputBlur()" />'+
		 					'<a href="javascript:;" id="getVCode" @click="getVCode()">获取验证码</a>'+
		 				'</li>'+
		 				'<li>'+
		 					'<input type="text" id="vCode" placeholder="请输入短信验证码" @blur="inputBlur()" />'+
		 				'</li>'+
		 				'<li>'+
		 					'<a href="javascript:;" id="receiveBtn" @click="verifySms()">立即领取</a>'+
		 				'</li>'+
		 			'</ul>'+
	 			'</div>'+
	 			'<div class="promptMain" v-if="!isNewUuser">'+
	 				'<h4>老用户你好！</h4>'+
		 			'<p>您已经领过新人礼包，无法重复领取哦~<br/>快去邀请好友，{{prizeMoney}}元推荐红包等你来拿</p>'+
		 			'<a href="javascript:;" id="inviteBtn" @click="popShow()">去邀请好友</a>'+
	 			'</div>'+
	 			'<div class="rewardMain" v-if="isReward">'+
	 				'<h4>易佳购送你{{deductMoney}}元新人大礼包，快来领取吧！</h4>'+
		 			'<div class="hongbao">'+
			 			'<img :src="into.oImg.hb" />'+
			 			'<p>恭喜您领取成功<br/><span v-text="deductMoney"></span>元大礼包</p>'+
			 			'<a href="http://go.appurl.cc/79811638524">快去APP内使用</a>'+
		 			'</div>'+
	 			'</div>'+
	 			'<div class="mu-overlay" style="opacity: 0.4; background-color: rgb(0, 0, 0); position: fixed; z-index: 9998;" v-if="isCheck"></div>'+
	 			'<div class="ui-modal-wrapper dialog-wrap tanchu" style="z-index: 9999; align-items: center; bottom: 0px;" v-if="isCheck"><div class="ui-modal"><div class="dialog image-code-dialog"><h2>请输入图形验证码，点击发送</h2> <div class="icd-main"><img :src="vcodeImg" @click="getVCode()"> <input type="text" placeholder="请输入验证码" id="yzm" @blur="inputBlur()"></div> <div class="dialog-button"><button class="cancel-btn" @click="closeBtn()">取消</button> <button class="confirm-btn" @click="sendSms()">发送</button></div></div></div></div>'+
 			'</div>';
 		return sHtml;	
 	},
 	inviteHide:function(b){
 		if(b){
 			var oBj = document.getElementById('popBackground');
	 		var oPop = document.getElementById('shareMain');
	 		oBj.style.display='none';
	 		oPop.style.display='none';
 		}
 	},
 	inviteShow:function(){
 		var oBj = document.getElementById('popBackground');
 		var oPop = document.getElementById('shareMain');
 		oBj.style.display='block';
 		oPop.style.display='block';
 	},
 	isWeixin:function(){
 		return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
 	},
 	getParameter:function(){
 		var _hash = window.location.hash;
		var _str = _hash.split("?")[1];
		var aParameter = _str.split("&");
		var oParameter = {};
		for(var i=0;i<aParameter.length;i++){
		    var _key = aParameter[i].split("=")[0];
		    var _value = aParameter[i].split("=")[1];
		    oParameter[_key] = _value;
		}
		return oParameter;	
 	},
 	setImgUrl:function(){
 		for(var key in this.oImg){
 			this.oImg[key]=this.imgUrl+this.oImg[key];
 		}	
 	},
 	elDoing:function(id,endFn){
 		var iTime = setInterval(function(){
			var oDiv = document.getElementById(id);
			//console.log(id)
			if(oDiv){
				clearInterval(iTime);
				endFn&&endFn(oDiv);
			}
		},20);
 	},
 	setMsg:function (str) {
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
                        	},2000);
 	},       
 	getStyle: function(element, attr) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(element, null)[attr];
		} else {
			return element.currentStyle[attr];
		}
	},
 	run:function(){
 		axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

 		var oH = document.getElementsByClassName('header')[0];
		var oMain = document.getElementsByClassName('app-body')[0];

		this.is_weixin = this.isWeixin();	

		if(this.is_weixin){
			oMain.style.paddingTop = '0px';
			oH.style.display = 'none';
		}

 		this.setImgUrl();
 		this.oParameter = this.getParameter();

 		//console.log(this.oParameter);
 		var that = this;

 		new Vue({
		 	el: '#inviteFriends',
			template: '<index></index>',
		 	components: {
				index:that.indexLayout()
			}
		});
 	}
}

into.run();
