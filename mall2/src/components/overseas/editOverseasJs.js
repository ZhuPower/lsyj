import {js_beautify,style_html} from '@/assets/js/formatCode'
import {upImage,urlPath,urlPath2,oPermission,getJson2,setList2} from '@/assets/js/base'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const editOverseas = {
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
                                    title:'',
                                    date:'',
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
                                title:'',
                                oJson:{},
                                name:'',
                                bPermission:false,
                                aOnOff:[],
                                popShow:false,
                                sPrompt:'',
                                popBtnShow:true,
                                errorArr:[],
                                typeTab:false,
                                typeTab2:false
        }
    },
    props: ['isDetails','index', 'sName','isNew'],
    watch:{
        templateKey(){
            let _str = this.$refs.proWrap.className
            if(this.templateKey == 'template-2-app/1' || this.templateKey == 'template-2-pc/1'){
                this.$refs.proWrap.className = _str + ' markWordOn' 
            }else{
                this.$refs.proWrap.className = _str.replace(/\smarkWordOn/,'')
            }
        },
        typeTab(){
            if(this.typeTab){
                this.typeTab2 = false;
            }
        },
        typeTab2(){
            if(this.typeTab2){
                this.typeTab = false;
            }
        }
    },
    created(){
              if(!this.isDetails){
                    this.$router.push('/overseas')
             }else{
                this.name = this.$route.path.replace(/\/overseas\//ig,'')
                    this.getData()
                    if(!this.isNew){
                        this.getData2()
                    }   
             }
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

                    let template = _this.template
                    _this.$refs.template.innerHTML = _this.sOption
                    let obj = template["app"].templateColumn["globalPurchase"]
                    let str = ''
                    for(let i=0;i<obj.templateNumber.length;i++){
                            str+='<option value="template-'+obj.templateNumber[i]+'-app/'+i+'">模板'+(i+1)+'</option>'
                     }
                    _this.$refs.template.innerHTML = _this.sOption + str
                    _this.templateKey = '0'
                }
            }
        },
        getData2(){
            getJson2('qqg_'+this.name).then((res) => {
                this.oJson = res
                this.getInfo()
             })
        },
        getInfo(){
            let that = this
            let oWrap = this.$refs.proWrap
            let aDiv = oWrap.children
            let template = this.template
            this.title = this.oJson.title
            this.background = this.oJson.background
            this.banner = this.oJson.banner

            if(this.oJson.typeTab){
                this.typeTab = this.oJson.typeTab;
            }

            if(this.oJson.typeTab2){
                this.typeTab2 = this.oJson.typeTab2;
            }

             if(template["app"]){
                        let obj = template["app"]["templateColumn"]["globalPurchase"]
                        let n = this.oJson.template[2]
                        this.templateKey = 'template-'+obj.templateNumber[n]+'-app/'+n
             }else{
                let n2 = setInterval(()=>{
                    let template = this.template
                    if(template["app"]){
                       let obj = template["app"]["templateColumn"]["globalPurchase"]
                        let n = this.oJson.template[2]
                        this.templateKey = 'template-'+obj.templateNumber[n]+'-app/'+n
                        if(this.templateKey){ 
                            clearInterval(n2)
                        }
                    }
                },200)
             }

             let _num = 0
             let _num2 = 0
             let _num3 = 0
             let _on= true
             let _nDiv = 0
             let box2 = []


            for(let i=0; i<this.oJson.items.length;i++){

                 setTimeout(()=>{
                        let obj = this.oJson.items[i]
                        this.typeTemplat = obj.type
                        if(obj.rowNum){this.rowNum = obj.rowNum}

                        if(obj.type == 'txt'){

                            setTimeout(()=>{
                                 this.addProduct()
                                 let oDiv = aDiv[_nDiv]
                                 let oInput = oDiv.getElementsByClassName('proId')[0]
                                 oInput.value = obj.productIds.join(',')
                                 _nDiv++
                            })

                        }else if(obj.type == 'image'){

                            setTimeout(()=>{

                                if(_on){
                                    that.addProduct()
                                    _num = obj.rowNum
                                    _num2 = i+_num
                                    _num3 = 0
                                    _on = false

                                    let oDiv = aDiv[_nDiv]
                                    let str = 'col-'+_num+'-list'
                                    let box1 = oDiv.getElementsByClassName(str)[0]
                                    box2 = box1.children
                                    _nDiv++
                                    
                                }

                                if(i==_num2-1){_on = true}

                                let _img1 = box2[_num3].getElementsByTagName('img')[0]
                                let _img2 = box2[_num3].getElementsByTagName('input')[0]
                                let _href = box2[_num3].getElementsByTagName('input')[1]
                                let _id = box2[_num3].getElementsByTagName('input')[2]
                                _img1.src= obj.imageSrc
                                _img2.value = obj.imageSrc
                                _href.value = obj.aHref
                                _num3++

                            })

                        }
                        
                    },100*i)
            }
        },
        bSubmit(){
            let template = this.template
            let appHtml = this.appHtml
            let pcHtml = this.pcHtml
            let that = this
            //this.$refs.createCode.value = ''
            let aInfo = this.templateKey.split('/');
            this.templateNumber = aInfo[0]
            this.num = aInfo[1]
            this.aPrompt = []
            this.repeatArr = []

            this.activityData.template = []
            this.activityData.items = []



            if(this.templateKey == '0'){this.aPrompt.push('请选择模板')}

            if(!this.title){this.aPrompt.push('请填写标题')}

            if(!this.background){this.aPrompt.push('请填写背景颜色')}

            if(!this.banner){this.aPrompt.push('请上传banner')}

            this.setAproduct()

            console.log(this.repeatArr);
            if(this.aPrompt.length>0 || this.repeatArr.length>0){
                if(this.aPrompt.length>0){
                    let sPrompt = '' 
                    for(let y=0; y<this.aPrompt.length; y++){
                        sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                    }
                    console.log(sPrompt)
                    alert(sPrompt)
                }else if(this.repeatArr.length>0){
                    this.sPrompt = ((this.repeatArr.length==1)?'这些':'这个') + 'ID' + '重复了：' + '<br/>' + this.repeatArr;
                    this.popBtnShow = true;
                    this.popShow = true;
                }
                
            }else{
                this.sPrompt = '数据生成中。。。';
                this.popBtnShow = false;
                this.popShow = true;
                let time_id = setInterval(() => {
                    if(this.aOnOff.join(",").indexOf('0') == -1){
                        clearInterval(time_id);
                        
                        let _obj = this.activityData

                        console.log(_obj)

                       _obj.template.push("app")
                       _obj.template.push("globalPurchase")
                       _obj.template.push(this.num)

                        let d = new Date()
                        let time = d.getFullYear() + '-' + (d.getMonth()+1) +'-' + d.getDate()
                        let n = this.index

                        _obj.background = this.background
                        _obj.banner = this.banner
                        _obj.title = this.title
                        if(this.typeTab){
                            _obj.typeTab = this.typeTab;
                        }
                        if(this.typeTab2){
                            _obj.typeTab2 = this.typeTab2;
                        }
                        _obj.date = time
                        this.headBackground ? _obj.headBackground = this.headBackground : false

                       console.log(_obj)

                        let jsonStr = JSON.stringify(_obj)


                        getJson2('qqg_list').then((res) => {

                            if(!this.isNew){
                                res.items[n].title = this.title
                                res.items[n].uptime = time    
                            }else{
                               let oStoreInfo = {
                                        title:this.title,
                                        name:this.name,
                                        uptime:time
                                    }

                              res.items.unshift(oStoreInfo)
                            }

                            let jsonStr2 = JSON.stringify(res)
                            let param = {
                                action:'overseasDetails',
                                setData:jsonStr,
                                schedule:'qqg_'+this.name,
                                list:jsonStr2,
                                onSave:true,
                                t:Math.random()
                            }
                            let backFn = ()=>{
                                this.$router.push('/overseas')
                            }
                            setList2(param,backFn)
                            
                            this.popBtnShow = true;
                            this.popShow = false;

                            this.$emit('updata',true)
                            
                        })
                    }else{
                        let sPrompt = '' 
                        for(let y=0; y<this.aPrompt.length; y++){
                            sPrompt += (y+1) +'.'+this.aPrompt[y]+'。<br/>';
                        }

                        if(sPrompt){
                            clearInterval(time_id);
                            this.sPrompt = sPrompt;
                            this.popBtnShow = true;
                            this.popShow = true;
                        }else{
                            let cw = this.aOnOff.join("").indexOf('0')+1;
                            console.log("请确保第"+cw+"栏的数据的正确")
                        }
                    }
                    
                },1000)  
            }  
        },
        bCancel(){
            this.$router.push('/overseas')
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
        },
        _getComposition(sProId,arr){
            let aProId = sProId.split(',')
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
            this.aOnOff = []
            for(let i=0; i<aDiv.length; i++){
                this.aOnOff[i]='1'
                if(aDiv[i].className == 'cList'){
                    this.aOnOff[i]='0'
                    let oSelect = aDiv[i].getElementsByClassName("tabSelect")[0] || false
                    let tabSelect = oSelect ? oSelect.value : 0  
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value  
                    let inputOdd = aDiv[i].getElementsByClassName("odd")[0].checked  
                    let inputJiekou = aDiv[i].getElementsByClassName("jiekou")[0].checked  
                    let inputHalfPrice = aDiv[i].getElementsByClassName("halfPrice")[0].checked
                    let inputHalfPrices = aDiv[i].getElementsByClassName("halfPrices")[0].value
                    let inputMarkWord = aDiv[i].getElementsByClassName("markWord")[0].value  
                    //let inputFontSize = aDiv[i].getElementsByClassName("fontSize")[0].value
                    inputProId = this.getStr(inputProId.replace(/\s/ig,',').replace(/no,/ig,'').replace(/,no/ig,''))
                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aProId2 = inputProId.split(',')
                    let onHalf = false

                    // if(inputFontSize){
                    //     this.aStyle.push(inputFontSize)
                    // }

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

                    if(inputProId && this.isRepeat(aProId2,i)){
                        this.getProduct(inputProId).then(res => {
                            let aInfo = res.info
                            console.log(res)
                            if((typeof res).toLowerCase() == 'string'){
                                for(let z=0;z<aProId.length;z++){
                                    ((num) =>{
                                        this.getProduct(aProId[num]).then(res => {
                                            if((typeof res).toLowerCase() == 'string'){
                                                this.aPrompt.push('请检查id：'+aProId[num]+"是否正确！")
                                                if(this.errorArr[i]){
                                                    this.errorArr[i].push(aProId[num]);
                                                }else{
                                                    this.errorArr[i] = [];
                                                    this.errorArr[i].push(aProId[num])
                                                }
                                            }
                                        })
                                    })(z)
                                }

                            }else{
                                if(aProId.length == aInfo.length){
                                    this.aOnOff[i]='1'
                                    
                                    let oItem = {}

                                    oItem.type = 'txt'
                                    oItem.markWord = inputMarkWord ? inputMarkWord:'售价'
                                    oItem.productIds = aProId
                                    oItem.aPrice = []
                                    oItem.aMarketPrice = []
                                    oItem.aHalfPrice = onHalf
                                    oItem.rowNum = aComposition

                                    this.activityData.items[aDiv[i].num] = oItem

                                }else{
                                    for(let z=0;z<aProId.length;z++){
                                        ((num) =>{
                                            this.getProduct(aProId[num]).then(res => {
                                                if((typeof res).toLowerCase() == 'string'){
                                                    this.aPrompt.push('请检查id：'+aProId[num]+"是否正确！")
                                                    if(this.errorArr[i]){
                                                        this.errorArr[i].push(aProId[num]);
                                                    }else{
                                                        this.errorArr[i] = [];
                                                        this.errorArr[i].push(aProId[num])
                                                    }
                                                }
                                            })
                                        })(z)
                                    }
                                }
                            }
                        })
                    }else{
                        if(this.repeatArr.length>0){
                            // this.sPrompt = 'id：'+ this.repeatArr+ '重复了';
                            // this.popBtnShow = true;
                            // this.popShow = true;
                            
                        }else{
                            this.aPrompt.push('请填写商品id');
                        }
                        
                    }

                    
                }else if(aDiv[i].className == 'cList imageWrap'){
                    let aBox = aDiv[i].children[0].children
                    let aLen = aBox.length
                    

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

                    if(inputProId && this.isRepeat(aProId2,i)){
                        this.getProduct(inputProId).then(res => {

                            let aInfo = res.info

                            if(aProId.length == aInfo.length){
                                
                                let oItem = {}

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

                                                this.aPrompt.push('请检查id：'+aProId[num]+"是否正确！")

                                                if(this.errorArr[i]){
                                                    this.errorArr[i].push(aProId[num]);
                                                }else{
                                                    this.errorArr[i] = [];
                                                    this.errorArr[i].push(aProId[num])
                                                }

                                            }
                                        })
                                    })(z)
                                }
                            }
                        })
                    }else{
                        if(this.repeatArr.length>0){
                            // this.sPrompt = 'id：'+ this.repeatArr+ '重复了';
                            // this.popBtnShow = true;
                            // this.popShow = true;
                            
                        }else{
                            this.aPrompt.push('请填写商品id');
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
                let json = eval("(" + res.data + ")");
                return Promise.resolve(json);
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
        isRepeat(arr,num){
            let nary = arr.sort()
            for (var i = 0; i < arr.length; i++) {
                if (nary[i] == nary[i + 1]) {
                    if(this.repeatArr[num]){
                        this.repeatArr[num].push(nary[i]);
                    }else{
                        this.repeatArr[num] = [];
                        this.repeatArr[num].push(nary[i])
                    }
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
        },
        iKnow(){
            this.popShow = false;
            this.popBtnShow = false;
        },
        iDelete(){
            let oWrap = this.$refs.proWrap;
            let aDiv = oWrap.children;

            if(this.errorArr.length>0){
                for(let i=0;i<this.errorArr.length;i++){
                    if(this.errorArr[i]){
                        let inputProId = aDiv[i].getElementsByClassName("proId")[0].value;
                        let _value = '';
                        for(let ii=0;ii<this.errorArr[i].length;ii++){
                            inputProId = inputProId.replace(new RegExp(this.errorArr[i][ii],'ig'),'');
                        }
                        inputProId = this.getStr(inputProId.replace(/\s/ig,',').replace(/no,/ig,'').replace(/,no/ig,''))


                        if(inputProId.charAt(0)==','){
                            inputProId = inputProId.substring(1);
                        }

                        if(inputProId.indexOf(',,')>0){
                            let itime = setInterval(()=>{
                                inputProId = this.getStr(inputProId);
                                if(inputProId.indexOf(',,')==-1){
                                    clearInterval(itime)
                                    aDiv[i].getElementsByClassName("proId")[0].value = inputProId;
                                }
                            },200)
                        }else{
                            aDiv[i].getElementsByClassName("proId")[0].value = inputProId;
                        }
                    }
                }
                this.errorArr = [];
            }else if(this.repeatArr.length>0){
                for(let i=0;i<this.repeatArr.length;i++){
                    if(this.repeatArr[i]){
                        let inputProId = aDiv[i].getElementsByClassName("proId")[0].value;
                        let _value = '';
                        for(let ii=0;ii<this.repeatArr[i].length;ii++){
                            inputProId = inputProId.replace(new RegExp(this.repeatArr[i][ii],'i'),'');
                        }
                        inputProId = this.getStr(inputProId.replace(/\s/ig,',').replace(/no,/ig,'').replace(/,no/ig,''))


                        if(inputProId.charAt(0)==','){
                            inputProId = inputProId.substring(1);
                        }

                        if(inputProId.indexOf(',,')>0){
                            let itime = setInterval(()=>{
                                inputProId = this.getStr(inputProId);
                                if(inputProId.indexOf(',,')==-1){
                                    clearInterval(itime)
                                    aDiv[i].getElementsByClassName("proId")[0].value = inputProId;
                                }
                            },200)
                        }else{
                            aDiv[i].getElementsByClassName("proId")[0].value = inputProId;
                        }
                    }
                }
                this.repeatArr = [];
            }

            
            this.popShow = false;
            this.popBtnShow = false;
        }
    },
    components:{}
}
