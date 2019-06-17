document.onreadystatechange = function(){
	//console.log(document.readyState);
	if(document.readyState == "complete"){
		var oMain= document.getElementById('main');
		var loading= document.getElementById('loader');
		loading.style.display = "none";
		oMain.style.display = "block";
		//autoPlayMusic();
	}
}

window.onload= function(){

            var _hash = window.location.href;
            var _str = _hash.split("?")[1];
            var aParameter = _str.split("&");
            var oParameter = {};

            for(var i=0;i<aParameter.length;i++){
                var _key = aParameter[i].split("=")[0];
                var _value = aParameter[i].split("=")[1];
                oParameter[_key] = _value;
            }

            var txtDate = document.getElementById('txtDate');
            var d = new Date();
            
            var y1 = d.getFullYear();
            var m1 = d.getMonth() +1+'';
            var d1 = d.getDate()+'';
            (m1.length==1) ? (m1 = '0'+m1) : (m1=m1);
            (d1.length==1) ? (d1 = '0'+d1) : (d1=d1);

            txtDate.innerHTML = y1+'/'+m1+'/'+d1;

            if(oParameter.grade && parseInt(oParameter.grade)>1){
                var coupon = document.getElementById('coupon');
                coupon.src="images/coupon2.png"
             }     


            
}



 //----------椤甸潰鍒濆鍖?-----------
        var oBtn= document.getElementById('yy');
        var oImg= oBtn.children[0];
        var audio = document.getElementById('music');
        if(sessionStorage.bgmusic=='pause'){
            playBgMusic(false);
        }else{
            playBgMusic(true);
             //----------澶勭悊鑷姩鎾斁------------
            //--鍒涘缓椤甸潰鐩戝惉锛岀瓑寰呭井淇＄椤甸潰鍔犺浇瀹屾瘯 瑙﹀彂闊抽鎾斁
            document.addEventListener('DOMContentLoaded', function () {
                function audioAutoPlay() {
                    playBgMusic(true);
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        playBgMusic(true);
                    }, false);
                }
                audioAutoPlay();
            });
            //--鍒涘缓瑙︽懜鐩戝惉锛屽綋娴忚鍣ㄦ墦寮€椤甸潰鏃讹紝瑙︽懜灞忓箷瑙﹀彂浜嬩欢锛岃繘琛岄煶棰戞挱鏀?
            function audioAutoPlay() {
                playBgMusic(true);
                document.removeEventListener('touchstart',audioAutoPlay);
            }
            document.addEventListener('touchstart', audioAutoPlay);
        }
        //----------澶勭悊椤甸潰婵€娲?-----------
        var hiddenProperty = 'hidden' in document ? 'hidden' :    
        'webkitHidden' in document ? 'webkitHidden' :    
        'mozHidden' in document ? 'mozHidden' :    
        null;
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        var onVisibilityChange = function(){
            if (!document[hiddenProperty]) {    
                if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
                    audio.play();
                }
            }else{
                audio.pause();
            }
        }
        document.addEventListener(visibilityChangeEvent, onVisibilityChange);

        oBtn.onclick = function(){
                  triggerBgMusic();
        }

        //---------鑳屾櫙闊充箰寮€鍏?---------
        function triggerBgMusic(){
            if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
                playBgMusic(false);
            }else{
                playBgMusic(true);
            }
        }
        //---------闊充箰鎾斁鍜屾殏鍋?---------
        function playBgMusic(val){
            if(val){
                audio.play();
                sessionStorage.bgmusic='play';
                oImg.src = 'images/music_on.png';
                oBtn.className = '';
                //document.getElementById('status').innerHTML='姝ｅ湪鎾斁';
            }else{
                audio.pause();
                sessionStorage.bgmusic='pause';
                oBtn.className = 'off';
                oImg.src = 'images/music_off.png';
                //document.getElementById('status').innerHTML='鍋滄鎾斁浜?;
            }
        } 


