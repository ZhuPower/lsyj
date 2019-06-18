import {upImage,urlPath,urlPath2} from '@/assets/js/base'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const codeBuilder = {
	data(){
		return{
            typeTemplat:'txt',
            sOption:'<option value="0">请选择</option>',
            createCode:'',
            completeHtml:'',
            templateNumber:0,
            num:0,
            background:'',
            banner:'',
            href:'',
            clientKey:'0',
            columnKey:'0',
            templateKey:'0',
            appHtml:{},
            pcHtml:{},
            template:{},
            arrTem:[],
            rowNum:1,
            couponOn:false,
            aTime:[],
            aPrompt:[],
            aStyle:[],
            repeatArr:[]
		}
	},
    watch:{
        clientKey(){
            let template = this.template
            this.$refs.column.innerHTML = this.sOption
            this.$refs.template.innerHTML = this.sOption
            if(this.clientKey!='0'){
                let obj = template[this.clientKey]
                let str = ''
                for(let i=0;i<obj.templateName.length;i++){
                    str += '<option value="' + obj.templateValue[i] + '">' + obj.templateName[i] + '</option>'
                }
                this.$refs.column.innerHTML = this.sOption + str
            }
            this.columnKey = '0'

            let _str = this.$refs.proWrap.className
            if(this.clientKey == 'app'){
                this.$refs.proWrap.className = _str + ' oddOn' 
            }else{
                this.$refs.proWrap.className = _str.replace(/\soddOn/,'')
            }
        },
        columnKey(){
            let template = this.template
            this.$refs.template.innerHTML = this.sOption
            if(this.columnKey!='0'){
                let key = this.clientKey
                let obj = template[key].templateColumn[this.columnKey]
                let str = ''
                for(let i=0;i<obj.templateNumber.length;i++){
                    str+='<option value="template-'+obj.templateNumber[i]+'-'+key+'/'+i+'">模板'+(i+1)+'</option>'
                }
                this.$refs.template.innerHTML = this.sOption + str
            }
            this.templateKey = '0'
        },
        templateKey(){
            let _str = this.$refs.proWrap.className
            if(this.templateKey == 'template-2-app/1' || this.templateKey == 'template-2-pc/1'){
                this.$refs.proWrap.className = _str + ' markWordOn' 
            }else{
                this.$refs.proWrap.className = _str.replace(/\smarkWordOn/,'')
            }
        }
    },
	created(){
        this.getData()
	},
	methods:{ 
        getData(){
            let _this = this
            var url = urlPath + 'setData.php'
            var xmlhttp = new XMLHttpRequest()
            xmlhttp.open("POST",url,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send("action=mallData&mallName=template");
            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    eval(xmlhttp.responseText+';_this.appHtml = appHtml;_this.pcHtml = pcHtml;_this.template = template;')
                }
            }
        },
        getCode(){
            let template = this.template
            let appHtml = this.appHtml
            let pcHtml = this.pcHtml
        	let that = this
            this.$refs.createCode.value = ''
            let aInfo = this.templateKey.split('/');
            this.templateNumber = aInfo[0]
            this.num = aInfo[1]
            this.aPrompt = []

            if(this.clientKey == '0'){this.aPrompt.push('请选择客户端')}

            if(this.columnKey == '0'){this.aPrompt.push('请选择栏目')}

            if(this.templateKey == '0'){this.aPrompt.push('请选择模板')}

            if(!this.background){this.aPrompt.push('请填写背景颜色')}

            if(!this.banner){this.aPrompt.push('请上传banner')}

            this.setAproduct()

            if(this.aPrompt.length>0){
                let sPrompt = '' 
                for(let y=0; y<this.aPrompt.length; y++){
                    sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                }
                alert(sPrompt)
            }else{
                setTimeout(() => {
                    let _html = this.getTemHtml()

                    let timeScript = ''
                    if(this.aTime.length>0){
                        timeScript += appHtml.timingHtml
                        timeScript += '<script type="text/javascript">'
                        for(let x=0;x<this.aTime.length; x++ ){
                            timeScript +='var oDiv = document.getElementsByClassName("'+this.aTime[x]+'")[0];setTiming(oDiv);'
                        }
                        timeScript += '</script>'
                    }

                    let _style = ''
                    if(this.aStyle.length>0){
                        _style = '<style type="text/css">'
                        for(let x=0;x<this.aStyle.length; x++ ){
                            _style +=this.aStyle[x]
                        }
                        _style += '</style>'
                    }

                    if(that.clientKey=='app'){
                        let _styleHtml=appHtml.styleHtml.replace(/\{\$background\}/,that.background)
                        let _contentHtml=appHtml.contentHtml.replace(/\{\$templateNumber\}/,that.templateNumber)
                        _contentHtml=_contentHtml.replace(/\{\$imgSrc\}/,that.banner)
                        _contentHtml=_contentHtml.replace(/\{\$content\}/,_html)

                        if(that.columnKey=='supermarketHome'){
                            let _footImg = appHtml.footImg.replace(/\{\$background\}/,that.background)
                            that.createCode = _styleHtml+_contentHtml+timeScript+_style+_footImg
                        }else if(that.columnKey=='globalPurchase'){
                            let _footImg2 = appHtml.footImg2.replace(/\{\$background\}/,that.background)
                            that.createCode = _styleHtml+_contentHtml+timeScript+_style+_footImg2
                        }else{
                            that.createCode = _styleHtml+_contentHtml+timeScript+_style
                        }

                        if(that.couponOn){
                            that.createCode = appHtml.scriptHtml+that.createCode
                        }

                        that.$refs.createCode.value = that.createCode
                        that.completeHtml = appHtml.headHtml+that.createCode+appHtml.footHtml
                    }else if(that.clientKey=='pc'){
                        let _styleHtml=pcHtml.styleHtml.replace(/\{\$background\}/,that.background)
                        let _contentHtml=pcHtml.contentHtml.replace(/\{\$templateNumber\}/,that.templateNumber)
                        _contentHtml=_contentHtml.replace(/\{\$imgSrc\}/,that.banner)
                        _contentHtml=_contentHtml.replace(/\{\$content\}/,_html)
                        that.createCode = _styleHtml+_contentHtml+timeScript+_style
                        that.$refs.createCode.value = that.createCode
                        that.completeHtml = pcHtml.headHtml+that.createCode+pcHtml.footHtml
                    }
                },1000)  
            }  
        },
        createHtml(){
            let newWindow = window.open();
            newWindow.document.write(this.completeHtml)
        },
        getStr(str){
            if(str.indexOf(',,')>0){
                str = str.replace(/,,/ig,',')
            }
            return str
        },
        getnum(num){
            let result = ''
            let len = num.length
            let onOff = num.indexOf(".")
            let end = onOff+3

            if(onOff>-1){
                if(len<end){
                    result = num + '0'
                }else{
                   result = num.substring(0,end); 
                }
            }else{
                result = num + '.00'
            }

            return result
        },
        getComposition(sProId,sPrice,bOdd,arr){
            let onOff = true
            let aProId = sProId.split(',')
            let aPrice = sPrice.split(',')

            if(aProId.length==aPrice.length){
                if(this.clientKey=='app'){
                    this.href = '#/goods/'
                    if(bOdd){
                        for(let z=0;z<aProId.length;z++){
                            arr.push(1)
                        }
                    }else{
                       if(aProId.length % 2 == 0){
                            for(let z=0;z<aProId.length;z++){
                                arr.push(2)
                            }
                        }else{
                            for(let z=0;z<aProId.length;z++){
                                if(z==0){
                                    arr.push(1)
                                }else{
                                    arr.push(2)
                                } 
                            }
                        } 
                    }  
                }else if(this.clientKey=='pc'){
                    this.href = 'http://www.yijiago.com/index.php/item.html?item_id='
                    if(aProId.length/4>0){
                        if(aProId.length % 4 == 0){
                            for(let z=0;z<aProId.length;z++){
                                arr.push(4)
                            }
                        }else if(aProId.length % 4 == 1){
                            arr.push(2)
                            arr.push(2)
                            arr.push(3)
                            arr.push(3)
                            arr.push(3)
                            for(let z=5;z<aProId.length;z++){
                                arr.push(4)
                            }
                        }else if(aProId.length % 4 == 2){
                            arr.push(2)
                            arr.push(2)
                            for(let z=2;z<aProId.length;z++){
                                arr.push(4)
                            }
                        }else if(aProId.length % 4 == 3){
                            arr.push(3)
                            arr.push(3)
                            arr.push(3)
                            for(let z=3;z<aProId.length;z++){
                                arr.push(4)
                            }
                        }
                    }
                }else if(aProId.length/4<1){
                    if(aProId.length % 4 == 2){
                        arr.push(2)
                        arr.push(2)
                        for(let z=2;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }else if(aProId.length % 4 == 3){
                        arr.push(3)
                        arr.push(3)
                        arr.push(3)
                        for(let z=3;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }
                }
            }else{
               onOff = false 
            }
            return onOff
        },
        _getComposition(sProId,sPrice,arr){
            let onOff = true
            let aProId = sProId.split(',')
            let aPrice = sPrice.split(',')

            if(aProId.length==aPrice.length){
                if(this.clientKey=='app'){
                    this.href = '#/goods/'
                    if(aProId.length % 2 == 0){
                        for(let z=0;z<aProId.length;z++){
                            arr.push(2)
                        }
                    }else{
                        for(let z=0;z<aProId.length;z++){
                            if(z==0){
                                arr.push(1)
                            }else{
                                arr.push(2)
                            }
                            
                        }
                    }  
                }else if(this.clientKey=='pc'){
                    this.href = 'http://www.yijiago.com/index.php/item.html?item_id='
                    if(aProId.length % 4 == 0){
                        for(let z=0;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }else if(aProId.length % 4 == 1){
                        arr.push(1)
                        for(let z=1;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }else if(aProId.length % 4 == 2){
                        arr.push(2)
                        arr.push(2)
                        for(let z=2;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }else if(aProId.length % 4 == 3){
                        arr.push(1)
                        arr.push(2)
                        arr.push(2)
                        for(let z=3;z<aProId.length;z++){
                            arr.push(4)
                        }
                    }
                }
            }else{
               onOff = false 
            }
            return onOff
        },
        getIndex(arr){
            for(let i=0; i<arr.length; i++){arr[i].index = i}
        },
        addProduct(){
            let oWrap = this.$refs.proWrap
            let node = this.$refs.proTemplate.children[0].cloneNode(true)
            let oTem = {
                type:this.typeTemplat,
                aProduct:[]
            }
            this.arrTem.push(oTem)
            oWrap.appendChild(node)


            let aBtn = oWrap.getElementsByClassName("delPor")
            let that = this
            this.getIndex(aBtn)

            for(let i=0; i<aBtn.length; i++){
                aBtn[i].onclick = function(){
                    oWrap.removeChild(oWrap.children[this.index])
                    that.arrTem.splice(this.index,1)
                    that.getIndex(aBtn)
                }
            }

            let upBtn = oWrap.getElementsByClassName("upBtn")
            if(upBtn.length>0){
                for(let i=0; i<upBtn.length; i++){
                    upBtn[i].onclick = function(){
                        let oParent = this.parentNode
                        let ooParent = oParent.parentNode
                        let aInput = oParent.children
                        let oUpInput = aInput[aInput.length-1]
                        let oInput = oParent.getElementsByClassName("productImg")[0]
                        let oImg = ooParent.getElementsByTagName("img")[0]
                        oUpInput.click()
                        oUpInput.onchange = function(){
                            upImage(this).then(res => {
                                if(res.code == 0){
                                    oInput.value = res.name
                                    oImg.src = res.name
                                }
                            })  
                        }
                    }
                }
            }

            let aProductImg = oWrap.getElementsByClassName("productImg")
            if(aProductImg.length>0){
                for(let i=0; i<aProductImg.length; i++){
                    aProductImg[i].onchange = function(){
                        let oParent = this.parentNode.parentNode.parentNode
                        let oImg = oParent.getElementsByTagName("img")[0]
                        oImg.src = this.value
                    }
                }
            }
        },
        getTemHtml(){
            let setHtml = ''
            console.log(this.arrTem)
            this.aTime = []
            for(let i=0; i<this.arrTem.length; i++){
                if(this.arrTem[i].type == 'txt'){
                    let sInput = ''
                    if(this.templateKey == 'template-2-app/1' || this.templateKey == 'template-2-pc/1'){
                        let oWrap = this.$refs.proWrap
                        let aDiv = oWrap.children 
                        sInput = aDiv[i].getElementsByClassName("markWord")[0].value
                        if(sInput == ''){
                            sInput = '惊爆价'
                        }
                    }

                    setHtml += '<div class="txtMain proMain"><ul>'
                    for(let ii=0; ii<this.arrTem[i].aProduct.length; ii++){
                        setHtml +=this.getTxtHtml(this.arrTem[i].aProduct[ii]).replace(/惊爆价/,sInput)
                    }
                    setHtml += '</ul></div>'
                }else if(this.arrTem[i].type == 'image'){
                    setHtml += '<div class="imgMain">'
                    for(let ii=0; ii<this.arrTem[i].aProduct.length; ii++){
                        setHtml +=this.getImageHtml(this.arrTem[i].aProduct[ii])
                    }
                    setHtml += '</div>'
                }else if(this.arrTem[i].type == 'timing'){
                    let sClassName = 'timing_'+i
                    this.aTime.push(sClassName)
                    setHtml += '<div class="timeMain '+sClassName+'" sTime="'+this.arrTem[i].aProduct[0].starteTime+'" eTime="'+this.arrTem[i].aProduct[0].endTime+'"><div class="date">'+this.arrTem[i].aProduct[0].zStarteTime+'-'+this.arrTem[i].aProduct[0].zEndTime+'</div><ul>'
                    for(let ii=0; ii<this.arrTem[i].aProduct.length; ii++){
                        setHtml +=this.getTimingHtml(this.arrTem[i].aProduct[ii])
                    }
                    setHtml += '</ul></div>'
                }
            }
            return setHtml
        },
        getTxtHtml(obj){
            let that = this
            let template = this.template
            let _html2 = template[that.clientKey].templateColumn[that.columnKey].htmlCode[that.num]
            _html2 = _html2.replace(/\{\$column\}/,obj.rowNum)
            _html2 = _html2.replace(/\{\$href\}/,obj.aHref)
            _html2 = _html2.replace(/\{\$imgSrc\}/,obj.imageSrc)
            _html2 = _html2.replace(/\{\$proInfo\}/,obj.title)
            _html2 = _html2.replace(/\{\$del\}/, that.getnum(obj.marketPrice))
            _html2 = _html2.replace(/\{\$price\}/,that.getnum(obj.price))
            return _html2
        },
        getImageHtml(obj){
            let _html2 = ''
            if(obj.couponId){
                _html2 = '<a href="javascript:;" class="couponsBtn list-'+obj.rowNum+'-img" rel="'+obj.couponId+'"><img src="'+obj.imageSrc+'" /></a>'
                this.couponOn = true
            }else{
               _html2 = '<a href="'+obj.aHref+'" class="list-'+obj.rowNum+'-img"><img src="'+obj.imageSrc+'" /></a>' 
            }
            return _html2
        },
        getTimingHtml(obj){
            let _html2 = '<li class="list-'+obj.rowNum+'-time"><a href="'+obj.aHref+'" target="_blank"><div class="proImg"><img src="'+obj.imageSrc+'"></div><div class="proCon"><div class="proName"><b>生鲜精品</b><span>联盛优选</span></div><div class="date">'+obj.zStarteTime+'-'+obj.zEndTime+'</div><div class="proInfo">'+obj.title+'</div><div class="priceWrap"><div class="specialPrice">特惠价</div><div class="price"><b>￥</b><span>'+obj.price+'</span></div><span class="sBuy">点击购买</span></div></div></a></li>'
            if(this.clientKey == 'app'){
                _html2 = _html2.replace(/target="_blank"/,'')
            }
            return _html2
        },
        setAproduct(){
            let oWrap = this.$refs.proWrap
            let aDiv = oWrap.children
            
            for(let i=0; i<aDiv.length; i++){
                if(aDiv[i].className == 'cList'){
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value 
                    let inputPrice = aDiv[i].getElementsByClassName("price")[0].value  
                    let inputOdd = aDiv[i].getElementsByClassName("odd")[0].checked  
                    let inputMarkWord = aDiv[i].getElementsByClassName("markWord")[0].value  
                    let inputFontSize = aDiv[i].getElementsByClassName("fontSize")[0].value
                    inputProId = this.getStr(inputProId.replace(/\s/ig,','))
                    inputPrice = this.getStr(inputPrice.replace(/\s/ig,','))
                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aProId2 = inputProId.split(',')
                    let aPrice = inputPrice.split(',')
                    if(inputFontSize){
                        this.aStyle.push(inputFontSize)
                    }

                    if(this.isRepeat(aProId2)){
                        if(this.getComposition(inputProId,inputPrice,inputOdd,aComposition)){
                            this.getProduct(inputProId).then(res => {
                                //console.log(res.info)
                                let aInfo = res.info
                                let aId = []

                                if(aProId.length == aInfo.length){
                                    for(let ii=0;ii<aInfo.length;ii++){aId.push(aInfo[ii].item_id)}
                                    this.arrTem[i].aProduct = []
                                    for(let ii=0; ii<aInfo.length; ii++){
                                        let n = aId.indexOf(aProId[ii])

                                        let oProduct = {}

                                        oProduct.type = 'txt'
                                        oProduct.id = aProId[ii]
                                        oProduct.title = aInfo[n].title
                                        oProduct.price = aPrice[ii]
                                        oProduct.marketPrice = aInfo[n].mkt_prce
                                        oProduct.imageSrc = aInfo[n].image_url
                                        oProduct.aHref = this.href + aProId[ii]
                                        oProduct.rowNum = aComposition[ii]
                                        oProduct.markWord = inputMarkWord
                                        oProduct.fontSize = inputFontSize

                                        oProduct.show_mkt_prce = oProduct.marketPrice ==oProduct.price ? false : true

                                        this.arrTem[i].aProduct.push(oProduct) 
                                    }
                                }else{
                                    for(let z=0;z<aProId.length;z++){
                                        ((num) =>{
                                            this.getProduct(aProId[num]).then(res => {
                                                if((typeof res).toLowerCase() == 'string'){
                                                    alert('请检查id：'+aProId[num]+"是否正确！");
                                                }
                                            })
                                        })(z)
                                    }
                                } 
                            })

                        }else{
                           this.aPrompt.push('请检查文本类型中的商品id和商品价格的数量是否相等') 
                        }
                    }else{
                        alert('id：'+ this.repeatArr+ '重复了')
                    }

                    
                }else if(aDiv[i].className == 'cList imageWrap'){
                    let aBox = aDiv[i].children[0].children
                    let aLen = aBox.length
                    this.arrTem[i].aProduct = []
                    for(let ii=0; ii<aLen; ii++){
                        let aSiteInput = aBox[ii].children[1].getElementsByTagName("input")
                        let oProduct = {}
                        oProduct.type = 'image'
                        oProduct.rowNum = aLen
                        oProduct.imageSrc = aSiteInput[0].value
                        oProduct.aHref = aSiteInput[1].value
                        oProduct.couponId = aSiteInput[2].value

                        this.arrTem[i].aProduct.push(oProduct) 
                    }
                }else if(aDiv[i].className == 'cList timeWrap'){
                    let inputStartDate = aDiv[i].getElementsByClassName("startDate")[0].value  
                    let inputEndDate = aDiv[i].getElementsByClassName("endDate")[0].value
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value 
                    let inputPrice = aDiv[i].getElementsByClassName("price")[0].value
                    inputProId = this.getStr(inputProId.replace(/\s/ig,','))
                    inputPrice = this.getStr(inputPrice.replace(/\s/ig,','))
                    let hour = 3600000
                    let startDate = new Date(inputStartDate).getTime() - 8*hour
                    let endDate = new Date(inputEndDate).getTime() + 16*hour
                    let aDate1 = inputStartDate.split('-')
                    let aDate2 = inputEndDate.split('-')
                    let zStartDate = aDate1[1]+'月'+aDate1[2]+'日'
                    let zEndDate = aDate2[1]+'月'+aDate2[2]+'日'
                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aPrice = inputPrice.split(',')

                    if(startDate&&endDate){
                        if(startDate>endDate){
                            this.aPrompt.push('定时商品的开始时间不能大于结束时间')
                        }
                    }else{
                        this.aPrompt.push('请填写定时商品的开始时间及结束时间')
                    }

                    if(this._getComposition(inputProId,inputPrice,aComposition)){
                        this.getProduct(inputProId).then(res => {
                            //console.log(res.info)
                            let aInfo = res.info
                            let aId = []
                            for(let ii=0;ii<aInfo.length;ii++){aId.push(aInfo[ii].item_id)}
                            this.arrTem[i].aProduct = []
                            for(let ii=0; ii<aInfo.length; ii++){
                                let n = aId.indexOf(aProId[ii])

                                let oProduct = {}

                                oProduct.type = 'timing'
                                oProduct.id = aProId[ii]
                                oProduct.title = aInfo[n].title
                                oProduct.price = aPrice[ii]
                                oProduct.imageSrc = aInfo[n].image_url
                                oProduct.aHref = this.href + aProId[ii]
                                oProduct.rowNum = aComposition[ii]
                                oProduct.starteTime = startDate
                                oProduct.endTime = endDate
                                oProduct.zStarteTime = zStartDate
                                oProduct.zEndTime = zEndDate

                                this.arrTem[i].aProduct.push(oProduct) 
                            }
                        })
                    }else{
                       this.aPrompt.push('请检查定时类型中的商品id和商品价格的数量是否相等') 
                    }
                }
            }
        },
        getProduct(str){
            console.log(str);
            let url = urlPath + 'yjg.php'
            return axios.get(url,{
                params:{
                   productIds:str,
                   t:Math.random()
                }
            }).then(res => {
                return Promise.resolve(res.data)
            })
        },
        upBanner(){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        that.banner = res.name
                    }
                })  
            }
        },
        isRepeat(arr){
            let nary = arr.sort()
            for (var i = 0; i < arr.length; i++) {
                if (nary[i] == nary[i + 1]) {
                    this.repeatArr.push(nary[i])
                }
            }

            if(this.repeatArr.length>0){
                return false
            }else{
                return true
            }
        }
    },
    components:{}
}
