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



 //----------页面初始化------------
        var oBtn= document.getElementById('yy');
        var oImg= oBtn.children[0];
        var audio = document.getElementById('music');
        if(sessionStorage.bgmusic=='pause'){
            playBgMusic(false);
        }else{
            playBgMusic(true);
             //----------处理自动播放------------
            //--创建页面监听，等待微信端页面加载完毕 触发音频播放
            document.addEventListener('DOMContentLoaded', function () {
                function audioAutoPlay() {
                    playBgMusic(true);
                    document.addEventListener("WeixinJSBridgeReady", function () {
                        playBgMusic(true);
                    }, false);
                }
                audioAutoPlay();
            });
            //--创建触摸监听，当浏览器打开页面时，触摸屏幕触发事件，进行音频播放
            function audioAutoPlay() {
                playBgMusic(true);
                document.removeEventListener('touchstart',audioAutoPlay);
            }
            document.addEventListener('touchstart', audioAutoPlay);
        }
        //----------处理页面激活------------
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

        //---------背景音乐开关----------
        function triggerBgMusic(){
            if(!sessionStorage.bgmusic||sessionStorage.bgmusic=='play'){
                playBgMusic(false);
            }else{
                playBgMusic(true);
            }
        }
        //---------音乐播放和暂停----------
        function playBgMusic(val){
            if(val){
                audio.play();
                sessionStorage.bgmusic='play';
                oImg.src = 'images/music_on.png';
                oBtn.className = '';
                //document.getElementById('status').innerHTML='正在播放';
            }else{
                audio.pause();
                sessionStorage.bgmusic='pause';
                oBtn.className = 'off';
                oImg.src = 'images/music_off.png';
                //document.getElementById('status').innerHTML='停止播放了';
            }
        } 


