document.onreadystatechange = function(){
	//console.log(document.readyState);
	if(document.readyState == "complete"){
		var oMain= document.getElementById('main');
		var loading= document.getElementById('loader');
		loading.style.display = "none";
		oMain.style.display = "block";
		autoPlayMusic();
	}
}

window.onload= function(){
	var oBtn= document.getElementById('yy');
	var audio = document.getElementById('music');
	var oImg= oBtn.children[0];
	oBtn.onclick = function(){
		if(!audio.paused){
			audio.pause();
			oImg.className = 'on';
		}else{
			audio.play();
			oImg.className = '';	
		} 	 	
	}
}

// 闊充箰鎾斁
function autoPlayMusic() {
    // 鑷姩鎾斁闊充箰鏁堟灉锛岃В鍐虫祻瑙堝櫒鎴栬€匒PP鑷姩鎾斁闂
    function musicInBrowserHandler() {
        musicPlay(true);
        document.body.removeEventListener('touchstart', musicInBrowserHandler);
    }
    document.body.addEventListener('touchstart', musicInBrowserHandler);

    // 鑷姩鎾斁闊充箰鏁堟灉锛岃В鍐冲井淇¤嚜鍔ㄦ挱鏀鹃棶棰?
    function musicInWeixinHandler() {
        musicPlay(true);
        document.addEventListener("WeixinJSBridgeReady", function () {
            musicPlay(true);
        }, false);

        document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
    }
    document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
}


function musicPlay(isPlay) {
    var audio = document.getElementById('music');
    if (isPlay && audio.paused) {
        audio.play();
    }
    if (!isPlay && !audio.paused) {
        audio.pause();
    }
}
