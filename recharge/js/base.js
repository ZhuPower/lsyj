window.onload = function(){
	var oTel = document.getElementById('tel');
	var oUl = document.getElementById('selectMoney');
	var aLi = oUl.children;
	var nLen = aLi.length;
	var oMoney = document.getElementById('payMoney');
	var oBtn = document.getElementById('rechargeBtn');
	var accessToken = '';
	var verifySmsToken = '';
	var isVcode = true;
	var money = 0;
	var tel = '';

	var _hash = window.location.href;
             var _str = _hash.split("?")[1];
             var aParameter = _str.split("&");
             var oParameter = {};

             for(var i=0;i<aParameter.length;i++){
             		var _key = aParameter[i].split("=")[0];
                           var _value = aParameter[i].split("=")[1];
                           oParameter[_key] = _value;
             }

             tel = oParameter.mobile;
             oTel.innerText = tel;

             var url_1 = 'http://util.yijiago.com:8098/effectivePlatform/getUserInfo.jsp?action=getUserInfo&mobile='+tel;
             ajaxFn(url_1,function(res){
             		if(res.code == 0){
             			var password = res.info.password;
             			var url_2 = 'http://www.yijiago.com/index.php/topapi?method=user.login&account='+tel+'&password='+password+'&deviceid='+Math.random()+'&v=v3&_rand='+Math.random();
             			ajaxFn(url_2,function(res){
		             		if(res.errorcode==0){
		             			accessToken = res.data.accessToken
		             		}
		             });
             		}else if(res.code == 1){
             			var oPopWrap= document.getElementById('popWrap');
             			var oInputTel = document.getElementById('inputTel');
             			var oInputVcode = document.getElementById('inputVcode');
             			var oVcode = document.getElementById('vcode');
             			var oReg = document.getElementById('registered');
             			oInputTel.value = tel;
             			oPopWrap.style.display = 'block';

             			oVcode.onclick = function(){
             				if(isVcode){
             					isVcode = false;
             					tel = oInputTel.value;
	             				var url_01 = 'http://www.yijiago.com/index.php/topapi?format=json&v=v3&type=signup&method=user.sendSms&debug=0&mobile='+tel+'&send_vcode=1234&send_vcode_time='+Math.random();
	             				ajaxFn(url_01,function(res){
	             					if(res.errorcode==0){
	             						var nTime = 60;
	             						var bTime = setInterval(function(){
	             							nTime--;
	             							if(nTime>0){
	             								oVcode.innerText=nTime+'秒后重试';
	             							}else{
	             								oVcode.innerText='获取验证码';
	             								isVcode = true;
	             								clearInterval(bTime);
	             							}
	             							
	             						},1000)
	             					}
	             				});	
             				}
             				
             			}

             			oReg.onclick = function(){
         				var url_02 = 'http://www.yijiago.com/index.php/topapi?format=json&v=v3&type=signup&method=user.verifySms&mobile='+tel+'&vcode='+oInputVcode.value;
				ajaxFn(url_02,function(res){
					console.log(res);
					if(res.errorcode==0){
						verifySmsToken = res.data.verifySms_token;
						var url_03 = 'http://www.yijiago.com/index.php/topapi?format=json&v=v3&method=user.signup&account='+tel+'&password='+oInputVcode.value+'&pwd_confirm='+oInputVcode.value+'&type=signup&license=1&login_vode='+oInputVcode.value+'&verifySms_token='+verifySmsToken+'&deviceid='+Math.random();
						ajaxFn(url_03,function(res){
							if(res.errorcode==0){
					             			accessToken = res.data.accessToken
					             			oTel.innerText = tel;
					             			oPopWrap.style.display = 'none';
					             		}
						});
					}
				});
			}		
             		}
             });


	for(var i=0;i<nLen;i++){
		aLi[i].onclick = function(){
			for(var ii=0;ii<nLen;ii++){aLi[ii].className = '';}
			oBtn.className ="cur";
			this.className ="cur";
			money = this.getElementsByTagName('span')[0].innerText;
			oMoney.innerText = money
		}
	}


	oBtn.onclick = function(){
		if(oBtn.getAttribute("class") == 'cur'){
			recharge(tel,money)
		}
	}


	function recharge(tel,money){
		var _url = 'https://www.yijiago.com/index.php/topapi?method=smalldeposit.payRecharge&mobile='+tel+'&money='+money+'&pay_app_id=sdfsf&platform=iswap&showLoading=true&return_url=http:%2F%2Fwww.yijiago.com%2Fh5%2F%23%2Fmember-change&v=v3&_rand='+Math.random()+'&accessToken='+accessToken;
		ajaxFn(_url,function(res){
			var  payId = res.data.paymentId;
			var _url2 = 'http://www.yijiago.com/index.php/topapi?method=payment.pay.do&payment_id='+payId+'&pay_app_id=cmbpay&returnPayData=0&return_url=http:%2F%2Fwww.yijiago.com%2Fh5%2F%23%2Fmember-change&code=&isSer=0&v=v3&_rand='+Math.random()+'&accessToken='+accessToken;
			window.location.href=_url2;
		});
	}

	function ajaxFn(url,endFn){
		var xml = new XMLHttpRequest();
		xml.open("GET",url,true);
		xml.send();
		xml.onreadystatechange = function() {
			if (xml.readyState == 4 && xml.status == 200) {
				var meg = eval('(' + xml.responseText + ')');
				endFn&&endFn(meg);
			}
		}
	}	
}

