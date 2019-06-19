import {js_beautify,style_html} from '@/assets/js/formatCode'
import {upImage,urlPath,urlPath2,oPermission} from '@/assets/js/base'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const codeBuilder2 = {
	data(){
		return{
                                typeTemplat:'txt',
                                sOption:'<option value="0">请选择</option>',
                                createCode:'',
                                completeHtml:'',
                                templateNumber:0,
                                num:0,
                                background:'',
                                nameClass:'',
                                titleInput:'',
                                banner:'',
                                clientKey:'0',
                                columnKey:'0',
                                templateKey:'0',
                                appHtml:{},
                                pcHtml:{},
                                template:{},
                                rowNum:1,
                                couponOn:false,
                                aTime:[],
                                aPrompt:[],
                                aStyle:[],
                                repeatArr:[],
                                activityData:{
                                    template:[],
                                    background:'',
                                    banner:'',
                                    port:false,
                                    items:[]
                                },
                                tabInput:false,
                                sTabLi:'',
                                aTabLi:[],
                                arrNo:[],
                                headBackground:'',
                                bPermission:false,
                                bCheck:false
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
        },
        tabInput(){
            let oWrap = this.$refs.proWrap
            if(!this.tabInput){
                let aSelect = oWrap.getElementsByClassName("tabSelect")
                for(let i=0;i<aSelect.length;i++){
                    aSelect[i].parentNode.style.display='none'
                }
                this.headBackground = ''
            }else{
                let aSelect = oWrap.getElementsByClassName("tabSelect")
                for(let i=0;i<aSelect.length;i++){
                    aSelect[i].parentNode.style.display='block'
                }
            }
        }
    },
	created(){
        console.log('2019.6.19 15:38')
              this.bPermission = oPermission[sessionStorage.permission].codeBuilder2
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

            this.activityData.template = []
            this.activityData.items = []

            if(this.tabInput){
                for(let i=0;i<this.aTabLi.length;i++){
                    let oTabLi = {
                        type:'tab',
                        name:this.aTabLi[i],
                        content:[]
                    }
                    this.activityData.items.push(oTabLi)
                    this.arrNo[i] = 0
                }

                this.arrNo[this.aTabLi.length] = this.aTabLi.length
            }

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

                    if(this.bCheck){
                            let _obj = this.activityData

                            _obj.template.push(this.clientKey)
                            _obj.template.push(this.columnKey)
                            _obj.template.push(this.num)

                            _obj.background = this.background
                            _obj.banner = this.banner
                            this.headBackground ? _obj.headBackground = this.headBackground : false


                            console.log(_obj)

                            let sData = JSON.stringify(_obj)

                            //console.log(sData)
                            let _className = ''
                            let _className2 = ''
                            let _titleInput = ''

                            if(this.nameClass){
                                _className = 'article_'+this.nameClass+' article_'+new Date().getTime()
                            }else{
                                _className = 'article_'+new Date().getTime()
                            }

                            this.titleInput ? _titleInput+='title="'+this.titleInput+'"' : ''


                            let _html = '<div id="articleContent" class="'+_className+'" '+_titleInput+'></div><script type="text/javascript" src="http://www.yijiago.com/promotion/ho-jquery/axios.min.js"></script><script type="text/javascript">var jData = '+sData+'</script>'
                            _html += '<script type="text/javascript"id="clearCache">var oScript=document.getElementById("clearCache");var cScript1=document.createElement("script");cScript1.type="text/javascript";cScript1.src="https://test.yijiago.com/gly/yiJiaGo/mall/template_mall.js?t1="+Math.random();var cScript2=document.createElement("script");cScript2.type="text/javascript";cScript2.src="https://test.yijiago.com/gly/yiJiaGo/activity/changeConfig.js?t2="+Math.random();var cScript3=document.createElement("script");cScript3.type="text/javascript";cScript3.src="https://test.yijiago.com/gly/yiJiaGo/activity/goodsPort.js?t3="+Math.random();var cLink4=document.createElement("link");cLink4.rel="stylesheet";cLink4.type="text/css";cLink4.href="https://test.yijiago.com/gly/yiJiaGo/activity/changeStyle.css?t4="+Math.random();oScript.parentNode.insertBefore(cScript1,oScript);oScript.parentNode.insertBefore(cScript2,oScript);oScript.parentNode.insertBefore(cScript3,oScript);oScript.parentNode.insertBefore(cLink4,oScript);</script>'

                            let timeScript = ''
                            if(this.aTime.length>0){
                                timeScript += '<script type="text/javascript" src="https://test.yijiago.com/gly/yiJiaGo/activity/setTiming.js"></script>'
                                timeScript += '<script type="text/javascript">'
                                for(let x=0;x<this.aTime.length; x++ ){
                                    timeScript +='var '+this.aTime[x]+' = setInterval(function(){var oDiv = document.getElementsByClassName("'+this.aTime[x]+'")[0];if(oDiv){clearInterval('+this.aTime[x]+');setTiming(oDiv);}},200);'
                                }
                                timeScript += '</script>'
                            }

                            if(this.tabInput){
                                timeScript +='<script type="text/javascript" src="https://test.yijiago.com/gly/yiJiaGo/activity/setTab.js"></script>'
                                timeScript +='<script type="text/javascript">var _w = document.body.clientWidth*0.9;setTab(_w);</script>'
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
                                
                                that.createCode = _style + _html + timeScript 
                                if(that.couponOn){
                                    that.createCode = that.createCode + appHtml.scriptHtml
                                    that.createCode += '<script type="text/javascript">getCoupon();</script>'
                                }

                                that.$refs.createCode.value = that.do_js_beautify(that.createCode)   
                                that.completeHtml = appHtml.headHtml+that.createCode+appHtml.footHtml
                            }else if(that.clientKey=='pc'){
                                

                                that.createCode = _style + _html + timeScript
                                that.$refs.createCode.value = that.do_js_beautify(that.createCode)
                                that.completeHtml = pcHtml.headHtml+that.createCode+pcHtml.footHtml
                            }

                            this.aPrompt = []
                            this.repeatArr = []
                            this.aStyle = []
                    }else{
                        let sPrompt = '' 
                        for(let y=0; y<this.aPrompt.length; y++){
                            sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                        }
                        alert(sPrompt)
                    }
                    
                },1000)  
            }  
        },
        createHtml(){
            let newWindow = window.open();
            newWindow.document.write(this.completeHtml)
        },
        do_js_beautify(str){
            let html = ''
            let js_source = str.replace(/^\s+/, '')
            let tabsize = 1
            let tabchar = ' '
            if (tabsize == 1) {
                tabchar = '\t'
            }
            if (js_source && js_source.charAt(0) === '<') {
                html = style_html(js_source, tabsize, tabchar, 80);
            } else {
                html = js_beautify(js_source, tabsize, tabchar);
            }
            return html;
        },
        getStr(str){
            if(str.indexOf(',,')>0){
                str = str.replace(/,,/ig,',')
            }
            return str
        },
        getComposition(sProId,bOdd,arr){
            let aProId = sProId.split(',')
            if(this.clientKey=='app'){ 
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
        },
        _getComposition(sProId,arr){
            let aProId = sProId.split(',')
            if(this.clientKey=='app'){
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
        },
        getIndex(arr){
            for(let i=0; i<arr.length; i++){arr[i].index = i}
        },
        addProduct(){
            let oWrap = this.$refs.proWrap
            let node = this.$refs.proTemplate.children[0].cloneNode(true)
            if(this.tabInput){
                if(this.sTabLi){
                    this.getTabLi()
                    node = this.$refs.proTemplate.children[0].cloneNode(true)
                    oWrap.appendChild(node) 
               }else{
                    alert('请先输入TAB类别！');
               }
            }else{
              oWrap.appendChild(node)  
            }


            let aBtn = oWrap.getElementsByClassName("delPor")
            let cBtn = oWrap.getElementsByClassName("halfPrice")
            let that = this
            this.getIndex(aBtn)

            for(let i=0; i<aBtn.length; i++){
                aBtn[i].onclick = function(){
                    oWrap.removeChild(oWrap.children[this.index])
                    that.getIndex(aBtn)
                }
            }

            for(let i=0; i<cBtn.length; i++){
                cBtn[i].onclick = function(){
                    if(this.checked){
                        this.nextSibling.style.display='none'
                    }else{
                        this.nextSibling.style.display='inline-block'
                    }
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
        setAproduct(){
            let oWrap = this.$refs.proWrap
            let aDiv = oWrap.children
            
            for(let i=0; i<aDiv.length; i++){
                if(aDiv[i].className == 'cList'){
                    let oSelect = aDiv[i].getElementsByClassName("tabSelect")[0] || false
                    let tabSelect = oSelect ? oSelect.value : 0  
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value  
                    let inputOdd = aDiv[i].getElementsByClassName("odd")[0].checked  
                    let inputJiekou = aDiv[i].getElementsByClassName("jiekou")[0].checked  
                    let inputHalfPrice = aDiv[i].getElementsByClassName("halfPrice")[0].checked
                    let inputHalfPrices = aDiv[i].getElementsByClassName("halfPrices")[0].value
                    let inputMarkWord = aDiv[i].getElementsByClassName("markWord")[0].value  
                    let inputFontSize = aDiv[i].getElementsByClassName("fontSize")[0].value
                    inputProId = this.getStr(inputProId.replace(/\s/ig,',').replace(/no,/ig,'').replace(/,no/ig,''))
                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aProId2 = inputProId.split(',')
                    let onHalf = false

                    if(inputFontSize){
                        this.aStyle.push(inputFontSize)
                    }

                    if(inputHalfPrice){
                        onHalf = true
                    }else{
                        if(inputHalfPrices){
                            inputHalfPrices = this.getStr(inputHalfPrices.replace(/\s/ig,','))
                            onHalf = inputHalfPrices.split(',')
                        }
                    }

                    this.activityData.port = inputJiekou

                    this.getNumber(i,aDiv)


                    this.getComposition(inputProId,inputOdd,aComposition)

                    if(inputProId && this.isRepeat(aProId2)){
                        this.getProduct(inputProId).then(res => {
                            let aInfo = res.info

                            if((typeof res).toLowerCase() == 'string'){
                                for(let z=0;z<aProId.length;z++){
                                    ((num) =>{
                                        this.getProduct(aProId[num]).then(res => {
                                            if((typeof res).toLowerCase() == 'string'){
                                                this.aPrompt.push('请检查id：'+aProId[num]+"是否正确！")
                                            }
                                        })
                                    })(z)
                                }
                            }else{
                                if(aProId.length == aInfo.length){
                                    this.bCheck = true
                                    let oItem = {}

                                    oItem.type = 'txt'
                                    oItem.markWord = inputMarkWord ? inputMarkWord:'售价'
                                    oItem.productIds = aProId
                                    oItem.aPrice = []
                                    oItem.aMarketPrice = []
                                    oItem.aHalfPrice = onHalf
                                    oItem.rowNum = aComposition

                                    if(parseInt(tabSelect)){
                                        this.activityData.items[parseInt(tabSelect)-1].content[aDiv[i].num] = oItem
                                    }else{
                                        this.activityData.items[aDiv[i].num] = oItem
                                    }

                                }
                            }
                        })
                    }else{
                        if(this.repeatArr.length>0){
                            alert('id：'+ this.repeatArr+ '重复了')
                        }else{
                            alert('请填写商品id')
                        } 
                    }

                    
                }else if(aDiv[i].className == 'cList imageWrap'){
                    let aBox = aDiv[i].children[0].children
                    let aLen = aBox.length
                    this.bCheck = true

                    this.getNumber(i,aDiv)

                    for(let ii=0; ii<aLen; ii++){
                        let aSiteInput = aBox[ii].children[1].getElementsByTagName("input")
                        let oItem = {}
                        oItem.type = 'image'
                        oItem.rowNum = aLen
                        oItem.imageSrc = aSiteInput[0].value
                        oItem.aHref = aSiteInput[1].value
                        oItem.couponId = aSiteInput[2].value
                        if(aSiteInput[2].value){
                            this.couponOn = true
                        }
                        
                        this.activityData.items[aDiv[i].num + ii] = oItem 
                    }
                }else if(aDiv[i].className == 'cList imageWrap2'){
                    let aComposition = []
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value
                    let inputImgSrc = aDiv[i].getElementsByClassName("imgSrc")[0].value
                    let inputRowNum = aDiv[i].getElementsByClassName("rowNum")[0].value

                    inputProId = this.getStr(inputProId.replace(/\s/ig,','))
                    inputImgSrc = this.getStr(inputImgSrc.replace(/\s/ig,','))
                    
                    let aProId = inputProId.split(',')
                    let aImgSrc = inputImgSrc.split(',')
                    this.bCheck = true
                    
                    if(inputRowNum){
                        inputRowNum = this.getStr(inputRowNum.replace(/\s/ig,','))
                        let aRowNum = inputRowNum.split(',') 
                        aComposition = aRowNum
                    }else{
                        this.getComposition(inputProId,false,aComposition)
                    }

                    this.getNumber(i,aDiv)

                    for(let ii=0;ii<aProId.length;ii++){
                        let oItem = {}
                        oItem.type = 'image'
                        oItem.rowNum = aComposition[ii]
                        oItem.imageSrc = aImgSrc[ii]
                        oItem.aHref = '#/goods/'+aProId[ii]
                        oItem.couponId = ''

                        this.activityData.items[aDiv[i].num + ii] = oItem 
                    }

                }else if(aDiv[i].className == 'cList timeWrap'){
                    let inputStartDate = aDiv[i].getElementsByClassName("startDate")[0].value  
                    let inputEndDate = aDiv[i].getElementsByClassName("endDate")[0].value
                    let hour = 3600000
                    let startDate = new Date(inputStartDate).getTime() - 8*hour
                    let endDate = new Date(inputEndDate).getTime() + 16*hour
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value
                    inputProId = this.getStr(inputProId.replace(/\s/ig,','))
                    
                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aProId2 = inputProId.split(',')

                    if(startDate&&endDate){
                        if(startDate>endDate){
                            this.aPrompt.push('定时商品的开始时间不能大于结束时间')
                        }
                    }else{
                        this.aPrompt.push('请填写定时商品的开始时间及结束时间')
                    }

                    //this.getNumber(i,aDiv)

                    this._getComposition(inputProId,aComposition)

                    if(inputProId && this.isRepeat(aProId2)){
                        this.getProduct(inputProId).then(res => {

                            let aInfo = res.info

                            if(aProId.length == aInfo.length){
                                let oItem = {}
                                this.bCheck = true

                                oItem.type = 'timing'
                                oItem.starteTime = inputStartDate
                                oItem.endTime = inputEndDate
                                oItem.productIds = aProId
                                oItem.aPrice = []
                                oItem.aMarketPrice = []
                                oItem.rowNum = aComposition

                                this.activityData.items[aDiv[i].num] = oItem

                                let sClassName = 'timing_'+aDiv[i].num
                                this.aTime.push(sClassName)
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
                        if(this.repeatArr.length>0){
                            alert('id：'+ this.repeatArr+ '重复了')
                        }else{
                            alert('请填写商品id')
                        }
                    }
                }
            }
        },
        getNumber(n,arr){
            if(this.tabInput){
                if(arr[n].className == 'cList'){
                   let valueSelect = arr[n].getElementsByClassName("tabSelect")[0].value
                   if(valueSelect!='0'){
                        arr[n].num = this.arrNo[parseInt(valueSelect)-1]
                        this.arrNo[parseInt(valueSelect)-1]=arr[n].num+1
                   }else{
                        arr[n].num = this.arrNo[this.arrNo.length-1] 
                        this.arrNo[this.arrNo.length-1] = arr[n].num+1 
                   }
                }else if(arr[n].className == 'cList imageWrap'){

                }
            }else{
                if(n!=0){
                    if(arr[n-1].className == 'cList imageWrap'){
                        let aBox = arr[n-1].children[0].children
                        let aLen = aBox.length

                        if(aLen>1){
                            arr[n].num = arr[n-1].num+aLen
                        }else{
                           arr[n].num = arr[n-1].num+1 
                        }
                    }else if(arr[n-1].className == 'cList imageWrap2'){
                        let inputProId = arr[n-1].getElementsByClassName("proId")[0].value
                        inputProId = this.getStr(inputProId.replace(/\s/ig,','))
                        let aProId = inputProId.split(',')
                        let aLen = aProId.length
                        if(aLen>1){
                            arr[n].num = arr[n-1].num+aLen
                        }else{
                           arr[n].num = arr[n-1].num+1 
                        }
                    }else{
                        arr[n].num = arr[n-1].num+1
                    }
                }else{
                   arr[n].num = 0 
                }  
            } 
        },
        getProduct(str){
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
        },
        getTabLi(){
            this.sTabLi = this.getStr(this.sTabLi.replace(/\s/ig,','))
            this.aTabLi = this.sTabLi.split(',')

            let oWrap1 = this.$refs.proTemplate
            let aDivLength = oWrap1.children.length;
            let str = ''
            for(let i=0;i<this.aTabLi.length;i++){
                str+='<option value="'+(i+1)+'">'+this.aTabLi[i]+'</option>'
            }
            this.$refs.tabSelect.innerHTML = this.sOption + str
        }
    },
    components:{}
}
