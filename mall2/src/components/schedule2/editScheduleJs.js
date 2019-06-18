import {js_beautify,style_html} from '@/assets/js/formatCode'
import {upImage,upImage2,urlPath,urlPath2,getJson2,setList2} from '@/assets/js/base'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const editSchedule = {
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
            tabInput:false,
            sTabLi:'',
            aTabLi:[],
            arrNo:[],
            headBackground:'https://test.yijiago.com/gly/yiJiaGo/images/20190314/11-37-10.png',
            href:'http://www.yijiago.com/h5/#/member-help-detail/5803',
            href2:'#/member-help-detail/5803',
            scheduleData:null,
            scheduleInfo:{
                title:'',
                number:0,
                activityName:'',
                leiBie:'dd',
                template:['0','0','0'],
                background:'',
                banner:'',
                port: true,
                storeList:{}
            },
            chooseStore:'0',
            aStoreName:[],
            items:[],
            storeList:null,
            aStoreList:[],
            chooseStore1:'DeHua',
            oStoreInfo:{},
            storeLink:'',
            storeLink2:'',
            isFresh:false,
            timeInput:false,
            sTimeLi:'',
            aTimeLi:[],
            activityNameArr:[],
            csvInput:'',
            csvPosition:'',
            storeTemplate:{},
            sortInput:false,
            sImgSrc:'',
            aImgSrc:[],
            sImgHref:'',
            aImgHref:[],
            halfPriceInput:''
        }
    },
    props: ['isDetails','index', 'sName'],
    watch:{
        clientKey(){
            let template = this.template
            this.$refs.column.innerHTML = this.sOption
            this.$refs.template.innerHTML = this.sOption
            let key = this.clientKey
            this.scheduleInfo.template[0] = key
            if(key!='0'){
                let obj = template[key]
                let str = ''
                for(let i=0;i<obj.templateName.length;i++){
                    str += '<option value="' + obj.templateValue[i] + '">' + obj.templateName[i] + '</option>'
                }
                this.$refs.column.innerHTML = this.sOption + str
            }
            this.columnKey = '0'
            this.scheduleInfo.template[1] = '0'

            let _str = this.$refs.proWrap.className
            if(key == 'app'){
                this.$refs.proWrap.className = _str + ' oddOn' 
            }else{
                this.$refs.proWrap.className = _str.replace(/\soddOn/,'')
            }
        },
        columnKey(){
            let template = this.template
            this.$refs.template.innerHTML = this.sOption
            let key = this.clientKey
            let key1 = this.columnKey
            this.scheduleInfo.template[0] = key
            this.scheduleInfo.template[1] = key1
            if(key1!='0'){
                let obj = template[key].templateColumn[key1]
                let str = ''
                for(let i=0;i<obj.templateNumber.length;i++){
                    str+='<option value="template-'+obj.templateNumber[i]+'-'+key+'/'+i+'">模板'+(i+1)+'</option>'
                }
                this.$refs.template.innerHTML = this.sOption + str
            }
            this.templateKey = '0'
            this.scheduleInfo.template[2] = '0'
        },
        templateKey(){
            let _str = this.$refs.proWrap.className
            let key2 = this.scheduleInfo.template[2]
            if(key2 == 'template-2-app/1' || key2 == 'template-2-pc/1'){
                this.$refs.proWrap.className = _str + ' markWordOn' 
            }else{
                this.$refs.proWrap.className = _str.replace(/\smarkWordOn/,'')
            }
            this.scheduleInfo.template[2] = this.templateKey.split('/')[1]
        },
        chooseStore(){
            this.setStoreInfo(this.scheduleInfo.storeList,this.chooseStore)
        },
        timeInput(){
            if(this.timeInput == true){
                this.tabInput = this.sortInput = this.halfPriceInput = false 
                this.clientKey = "app"
                setTimeout(()=>{
                    this.columnKey = "supermarketHome"
                    setTimeout(()=>{
                        this.templateKey = "template-11-app/3"
                    },100)
                },100)
            }
        },
        tabInput(){
            if(this.tabInput == true){
                this.timeInput = this.sortInput = this.halfPriceInput = false
                 this.clientKey = "app"
                 setTimeout(()=>{
                    this.columnKey = "supermarketHome"
                    setTimeout(()=>{
                        this.templateKey = "template-2-app/1"
                    },100)
                },100)
            }
        },
        sortInput(){
            if(this.sortInput == true){
                this.tabInput = this.timeInput = this.halfPriceInput = false
                 this.clientKey = "app"
                 setTimeout(()=>{
                    this.columnKey = "supermarketHome"
                    setTimeout(()=>{
                        this.templateKey = "template-2-app/1"
                    },100)
                },100)
            }
        },
        halfPriceInput(){
            if(this.halfPriceInput == true){
                this.tabInput = this.timeInput = this.sortInput = false
                 this.clientKey = "app"
                 setTimeout(()=>{
                    this.columnKey = "supermarketHome"
                    setTimeout(()=>{
                        this.templateKey = "template-2-app/1"
                    },100)
                },100)
            }
        }
    },
    created(){
        if(!this.isDetails){
            this.$router.push('/schedule2List')
        }else{
            this.getData()
        }
    },
    methods:{ 
        getData(){
            let _this = this
            let url = urlPath + 'setData.php'
            let xmlhttp = new XMLHttpRequest()
            xmlhttp.open("POST",url,true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send("action=mallData&mallName=template");
            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState==4 && xmlhttp.status==200){
                    eval(xmlhttp.responseText+';_this.appHtml = appHtml;_this.pcHtml = pcHtml;_this.template = template;')
                    if(_this.sName){
                        getJson2(_this.sName).then((res) => {
                            _this.scheduleData = res
                            _this.setInfo(res)
                        })
                    }
                }
            }

            getJson2('storeList').then((res) => {
                this.storeList = res
                for (let key in this.storeList){
                  this.aStoreList.push(key)
                }
            })
            getJson2('storeTemplate').then((res) => {
                this.storeTemplate = res
            })
        },
        setInfo(obj2){
            let _this = this
            _this.scheduleInfo.title = obj2.title
            _this.scheduleInfo.number = obj2.number
            _this.scheduleInfo.leiBie = obj2.leiBie || 'dd'
            _this.scheduleInfo.activityName = obj2.activityName
            _this.scheduleInfo.background = obj2.background
            _this.scheduleInfo.banner = obj2.banner
            _this.scheduleInfo.storeList = obj2.storeList

            _this.getStoreList(_this.scheduleInfo.storeList)

            let key0 = obj2.template[0]
            let key1 = obj2.template[1]
            let key2 = obj2.template[2]


            _this.scheduleInfo.template[0] = key0
            let obj = _this.template[key0]
            _this.clientKey = key0

            setTimeout(()=>{
                _this.scheduleInfo.template[1] = key1
                let obj1 = _this.template[key0].templateColumn[key1]
                _this.columnKey = key1

                setTimeout(()=>{
                    _this.scheduleInfo.template[2] = key2
                    let template = this.template
                    let obj = template[key0].templateColumn[key1]
                    let strKey = 'template-'+obj.templateNumber[key2]+'-'+key0+'/'+key2
                    _this.templateKey = strKey
                },100)
            
            },100)
        },
        getStoreList(obj){
            this.aStoreName = []
            for(let key in obj){this.aStoreName.push(key)}
            this.chooseStore = this.aStoreName[0]
            this.setStoreInfo(obj,this.aStoreName[0])
        },
        setStoreInfo(obj,key){
            let oWrap = this.$refs.storeMain
            oWrap.innerHTML = ''
            if(key && key!='0'){
                let leiBie = ''
                if(this.scheduleInfo.leiBie != 'dd'){ leiBie = this.scheduleInfo.leiBie+'_'}
                let href = this.href+'?number='+this.scheduleInfo.number+'&activityName='+leiBie+this.scheduleInfo.activityName+'&storeName='+key
                let href3 = this.href2+'?number='+this.scheduleInfo.number+'&activityName='+leiBie+this.scheduleInfo.activityName+'&storeName='+key
                let href2 = 'http://www.yijiago.com/h5/'
                let aItems = obj[key].items
                this.storeLink = href
                this.storeLink2 = href3
                let oDiv = this.$refs.storeList.cloneNode(true)
                for(let i=0;i<aItems.length;i++){
                    if(aItems[i].type == 'txt'){
                        oDiv = this.$refs.storeList.cloneNode(true)
                        let _aHalfPrice = aItems[i].aHalfPrice ? aItems[i].aHalfPrice : ''
                        this.creatDiv(oDiv,'商品ID：',aItems[i].productIds.join(','))
                        //this.creatDiv(oDiv,'列数：',aItems[i].rowNum.join(','))
                        this.creatDiv(oDiv,'半价：',_aHalfPrice)
                        this.creatDiv(oDiv,'标识词：',aItems[i].markWord)  
                    }else if(aItems[i].type == 'fresh'){
                        oDiv = this.$refs.storeList.cloneNode(true)
                        this.creatDiv(oDiv,'商品ID：',aItems[i].productIds.join(','))
                    }
                    oWrap.appendChild(oDiv) 
                }
            }
        },
        creatDiv(obj,value1,value2){
            let node = this.$refs.storeDiv.cloneNode(true)
            let aChild = node.children
            let node1=document.createTextNode(value1);
            let node2=document.createTextNode(value2);
            aChild[0].appendChild(node1);
            aChild[1].appendChild(node2);
            obj.appendChild(node);
        },
        creatDiv2(obj,n,h,s){
            let oWrap = this.$refs.storeListWrap
            let aA = oWrap.getElementsByTagName('a')
            let node = aA[parseInt(n)-1].cloneNode(true) 
            node.href = h
            node.children[0].src = s
            obj.appendChild(node);
        },
        addStore(){
            this.isPrompt(()=>{
                let oDiv = this.$refs.proWrap
                let oWrap = this.$refs.popStore;
                oDiv.innerHTML = ''
                if(this.chooseStore == '0'){
                    this.chooseStore1 = 'DeHua'
                }else{
                    let _n = this.aStoreList.indexOf(this.chooseStore)
                    if(_n==(this.aStoreList.length-1)){
                        this.chooseStore1 = 'DeHua'
                    }else{
                        this.chooseStore1 = this.aStoreList[(parseInt(_n)+1)]
                    }
                }
                
                this.$refs.createCode.value = ''

                if(this.templateKey == 'template-11-app/3'){ 
                    this.isFresh = true;
                    this.typeTemplat = 'fresh' 
                }

                if(this.tabInput){
                    this.sTabLi = this.getStr(this.sTabLi.replace(/\s/ig,','))
                    this.aTabLi = this.sTabLi.split(',')
                    let nTAB = 0;
                    let iTab = setInterval(()=>{
                        this.$refs.tabSelect.value = this.aTabLi[nTAB]
                        this.addProduct()
                        nTAB++
                        if(nTAB==this.aTabLi.length){
                            clearInterval(iTab)
                        }
                    },200)
                }else if(this.timeInput){
                    this.sTimeLi = this.getStr(this.sTimeLi.replace(/\s/ig,','))
                    this.aTimeLi = this.sTimeLi.split(',')
                    let nTIME = 0;
                    let iTIME = setInterval(()=>{
                        this.$refs.proTime.value = this.aTimeLi[nTIME]
                        this.addProduct()
                        nTIME++
                        if(nTIME==this.aTimeLi.length){
                            clearInterval(iTIME)
                        }
                    },200)
                }else if(this.sortInput){
                    this.typeTemplat = 'txt2' 
                    this.sImgSrc = this.getStr(this.sImgSrc.replace(/\s/ig,','))
                    this.aImgSrc = this.sImgSrc.split(',')

                    if(this.sImgHref){
                        this.sImgHref = this.getStr(this.sImgHref.replace(/\s/ig,','))
                        this.aImgHref = this.sImgHref.split(',')
                    }

                    if(this.sTimeLi){
                        this.sTimeLi = this.getStr(this.sTimeLi.replace(/\s/ig,','))
                        this.aTimeLi = this.sTimeLi.split(',')
                    }

                    let nTIME = 0;
                    let iTIME = setInterval(()=>{
                        this.$refs.proSrc.value = this.aImgSrc[nTIME]
                        this.$refs.proHref.value = this.aTimeLi[nTIME] ? this.aTimeLi[nTIME] : 'javascript:;'
                        this.$refs.proTime.value = this.aImgHref[nTIME] ? this.aImgHref[nTIME] : ''
                        
                        this.addProduct()
                        nTIME++
                        if(nTIME==this.aImgSrc.length){
                            clearInterval(iTIME)
                        }
                    },200)
                }else{
                    if(this.halfPriceInput){
                        this.$refs.halfPrice.checked = true
                        this.$refs.halfPrice.nextSibling.style.display='none'
                    }
                    setTimeout(()=>{this.addProduct()},200)
                }

                oWrap.style.display = 'block'
            })
        },
        delStore(){
            if(this.chooseStore == '0'){
                alert('未选择门店或没有门店可删除')
            }else{
                let n = this.aStoreName.indexOf(this.chooseStore)
                delete this.scheduleInfo.storeList[this.chooseStore]
                if(n>0){
                    this.chooseStore = this.aStoreName[0]  
                }else if(n == 0){
                    if(this.aStoreName.length == 1){
                        this.chooseStore = '0'
                    }else{
                        this.chooseStore = this.aStoreName[1]
                    }
                }
                this.aStoreName.splice(n,1)
            }
        },
        save(){
            this.scheduleInfo.storeList[this.chooseStore1] = this.oStoreInfo
            this.aStoreName = []
            for(let key in this.scheduleInfo.storeList){this.aStoreName.push(key)}
            let oWrap = this.$refs.popStore
            oWrap.style.display = 'none'
            if(this.chooseStore == this.chooseStore1){this.chooseStore = '0'}
            setTimeout(()=>{
                this.chooseStore = this.chooseStore1
            },200)
        },
        save2(){
            this.isPrompt(()=>{
                if(JSON.stringify(this.scheduleInfo.storeList) == "{}"){
                    if(this.csvInput){
                        this.getCsv().then((res)=>{
                           // console.log(res) 
                            let aJson = []
                            let storeKey = []
                            let storeValue = []
                            //console.log(this.storeList)

                            for(let key in this.storeList){
                                storeKey.push(key)
                                storeValue.push(this.storeList[key].replace(/店/g,""))
                            }
                            //console.log(storeValue)

                            for(let i = 0; i<res.length;i++){
                                aJson[i] = []
                                for(let ii=0;ii<res[i].length;ii++){
                                    if(i==0){
                                        if(ii%2==0){
                                           for(let iii=0;iii<storeValue.length;iii++){
                                
                                            let sResValue = res[i][ii].replace(/\s*/g,"").replace(/\d*/g,"").replace(/店/g,"")

                                            if(sResValue == storeValue[iii]){
                                                //console.log(sResValue)
                                                aJson[i].push(storeKey[iii])
                                            }

                                           }
                                        } 
                                    }else{
                                        if(ii%2==1){
                                            aJson[i].push(res[i][ii])
                                        } 
                                    }
                                }
                            }

                            console.log(aJson)

                            if(aJson[0].length == aJson[1].length){

                                 let _arr2 = []
                                if(this.csvPosition){
                                    _arr2 = this.csvPosition.split(",")
                                }

                                let json_0 = this.scheduleInfo.storeList = this.storeTemplate

                                for(let i=0;i<_arr2.length-1;i++){
                                    this.treatArr(aJson,parseInt(_arr2[i]),parseInt(_arr2[i+1]),json_0,i)
                                }

                                for(let key in json_0){
                                    if(json_0[key].items.length<1){
                                        delete json_0[key]
                                    }
                                }
                                 
                                console.log(json_0)  
                               this.saveFn()

                            }else{
                                alert('门店个数不对，请检查门店名称')
                            }
                            
                        })
                    }else{
                        alert('请添加门店数据')
                    }
                }else{
                    this.saveFn()
                } 
            })
        },
        saveFn(){
            let d = new Date()
            let time = d.getFullYear() + '-' + (d.getMonth()+1) +'-' + d.getDate()
            let n = this.index
            let sName = this.sName
            let jsonStr = JSON.stringify(this.scheduleInfo)
            let onSave = false
            let onSave2 = false
            
            getJson2('store').then((res) => {

                for(let i=0;i<res.items.length;i++){
                    this.activityNameArr.push(res.items[i].id)
                }

                if(n>-1){
                    res.items[n].title = this.scheduleInfo.title
                    res.items[n].uptime = time
                    onSave = true
                }else{
                    let leiBie = ''
                    if(this.scheduleInfo.leiBie != 'dd'){ leiBie = this.scheduleInfo.leiBie+'_'}
                    sName =`${this.scheduleInfo.number}_${leiBie}${this.scheduleInfo.activityName}`
                    let n1 =this.activityNameArr.indexOf(sName)
                    if(n1>-1){
                        alert('name:'+sName+'，已被使用，请重新输入！')
                    }else{
                        let oStoreInfo = {
                            title:this.scheduleInfo.title,
                            id:sName,
                            name:res.number + 1,
                            uptime:time
                        }

                        res.items.unshift(oStoreInfo)
                        res.number = res.number +1
                        onSave = true
                        onSave2 = true
                    }
                }

                if(onSave){
                    let jsonStr2 = JSON.stringify(res)
                    let param = {
                        action:'scheduleDetails',
                        setData:jsonStr,
                        schedule:sName,
                        list:jsonStr2,
                        onSave:onSave2,
                        t:Math.random()
                    }
                    let backFn = ()=>{
                        this.$router.push('/schedule2List')
                    }
                    setList2(param,backFn)
                    this.$emit('updata',true)
                }
            })
        },
        cancel(){
            let oWrap = this.$refs.popStore
            oWrap.style.display = 'none'
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

            this.items = []

            if(this.tabInput){
                for(let i=0;i<this.aTabLi.length;i++){
                    let oTabLi = {
                        type:'tab',
                        name:this.aTabLi[i],
                        content:[]
                    }
                    this.items.push(oTabLi)
                }
            }

            if(this.chooseStore1 == '0'){this.aPrompt.push('请选择门店')}


            this.setAproduct()

            if(this.aPrompt.length>0){
                let sPrompt = '' 
                for(let y=0; y<this.aPrompt.length; y++){
                    sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                }
                alert(sPrompt)
            }else{
                setTimeout(() => {
        
                    this.oStoreInfo = {}

                    this.oStoreInfo['storeName'] = this.storeList[this.chooseStore1]
                    this.oStoreInfo['items'] = this.items

                    that.$refs.createCode.value = that.do_js_beautify(JSON.stringify(this.oStoreInfo))

                    this.aPrompt = []
                    this.repeatArr = []
                    this.aStyle = []
                },1000)  
            }  
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
            if(this.scheduleInfo.template[0]=='app'){ 
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
            }else if(this.scheduleInfo.template[0]=='pc'){      
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
        getIndex(arr){
            for(let i=0; i<arr.length; i++){arr[i].index = i}
        },
        addProduct(){
            let oWrap = this.$refs.proWrap
            let node = this.$refs.proTemplate.children[0].cloneNode(true)

            oWrap.appendChild(node) 

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
                    let tabSelect = oSelect ? oSelect.value : ''
                    let inputProId = aDiv[i].getElementsByClassName("proId")[0].value 
                    inputProId = this.getStr(inputProId.replace(/\s/ig,',').replace(/no,/ig,'').replace(/,no/ig,''))
                    let onHalf = false
                    //let inputOdd = false
                    let inputHalfPrice = false
                    let inputHalfPrices = ''
                    let inputMarkWord = ''
                    let inputProTime = ''
                    let inputProSrc = ''
                    let inputProHref = ''
                    if(this.isFresh){
                        //inputOdd = true
                        inputProTime = aDiv[i].getElementsByClassName("proTime")[0].value
                    }else if(this.sortInput){
                        inputProTime = aDiv[i].getElementsByClassName("proTime")[0].value
                        inputProSrc = aDiv[i].getElementsByClassName("proSrc")[0].value
                        inputProHref  = aDiv[i].getElementsByClassName("proHref")[0].value
                    }else{
                        //inputOdd = aDiv[i].getElementsByClassName("odd")[0].checked   
                        inputHalfPrice = aDiv[i].getElementsByClassName("halfPrice")[0].checked
                        inputHalfPrices = aDiv[i].getElementsByClassName("halfPrices")[0].value
                        inputMarkWord = aDiv[i].getElementsByClassName("markWord")[0].value 

                        if(inputHalfPrice){
                            onHalf = true
                        }else{
                            if(inputHalfPrices){
                                inputHalfPrices = this.getStr(inputHalfPrices.replace(/\s/ig,','))
                                onHalf = inputHalfPrices.split(',')
                            }
                        }
                    } 

                    let aComposition = []
                    let aProId = inputProId.split(',')
                    let aProId2 = inputProId.split(',')

                    this.getNumber(i,aDiv)

                    //this.getComposition(inputProId,inputOdd,aComposition)

                    if(inputProId && this.isRepeat(aProId2)){
                        this.getProduct(inputProId).then(res => {
                           
                            if ((typeof res).toLowerCase() == 'string'){
                                res = eval('('+res+')')
                            }

                             let aInfo = res.info

                            if(aProId.length == aInfo.length){
                                let oItem = {}

                                if(this.isFresh){
                                    let arrTime = this.getTimes(inputProTime)
                                    oItem.type = 'fresh'
                                    oItem.proTime = inputProTime
                                    oItem.starttime = arrTime[0]
                                    oItem.endtime = arrTime[1]
                                    oItem.productIds = aProId
                                }else if(this.sortInput){
                                     oItem.type = 'txt2'
                                     if(inputProTime){
                                        let arrTime = this.getTimes(inputProTime)
                                        oItem.starttime = arrTime[0]
                                        oItem.endtime = arrTime[1]
                                     }
                                    oItem.imgsrc=inputProSrc
                                    oItem.href=inputProHref
                                    oItem.productIds = aProId
                                }else{
                                    oItem.type = 'txt'
                                    oItem.markWord = inputMarkWord ? inputMarkWord:'售价'
                                    oItem.productIds = aProId
                                    oItem.aHalfPrice = onHalf
                                    //oItem.rowNum = aComposition
                                }

                                if(tabSelect){
                                    this.items[aDiv[i].num].content[0] = oItem
                                }else{
                                    this.items[aDiv[i].num] = oItem
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
            if(n!=0){
                arr[n].num = arr[n-1].num+1
            }else{
               arr[n].num = 0 
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
                        that.scheduleInfo.banner = res.name
                    }
                })  
            }
        },
        upCsv(){
            let oInput = this.$refs.fileCsv
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage2(this).then(res => {
                    if(res.code == 0){
                        that.csvInput = res.name
                    }
                })  
            }
        },
        getCsv(){
            return axios({
                method: 'get',
                url:'https://test.yijiago.com/gly/yiJiaGo/getCsv2.php',
                params: {
                    name: this.csvInput,
                    t:Math.random()
                }
            }).then((res)=>{
                return Promise.resolve(res.data)
            })
        },
        treatArr(arr,sn,en,json,num){
            if(!sn){sn=1}
            if(!en){en=arr.length}

            for(let i=0;i<arr[0].length;i++){
                let obj_0 = this.createJson(num)
                let arr_0 = []

                for(let ii=sn;ii<en;ii++){
                    if(arr[ii][i] && arr[ii][i].toLowerCase()!='no'){
                        arr_0.push(arr[ii][i])
                    }
                }

                if(arr_0.length>0){
                    if(this.tabInput){
                        obj_0.content[0].productIds = arr_0
                    }else{
                        obj_0.productIds = arr_0
                    }
                    json[arr[0][i]].items.push(obj_0)
                }
             }
        },
        createJson(num){
            let json = {}
            if(this.timeInput){
                if(this.sTimeLi){
                    this.sTimeLi = this.getStr(this.sTimeLi.replace(/\s/ig,','))
                    this.aTimeLi = this.sTimeLi.split(',')
                }
                
                json = {
                    "type": "fresh",
                    "proTime": this.aTimeLi[num] || '',
                    "starttime": this.aTimeLi[num] ? this.getTimes(this.aTimeLi[num])[0] : 0,
                    "endtime": this.aTimeLi[num] ? this.getTimes(this.aTimeLi[num])[1] :0,
                    "productIds": []
                }
            }else if(this.tabInput){
                this.sTabLi = this.getStr(this.sTabLi.replace(/\s/ig,','))
                this.aTabLi = this.sTabLi.split(',')
                json = {
                    "type": "tab",
                    "name": this.aTabLi[num],
                    "content": [{
                        "type": "txt",
                        "markWord": "售价",
                        "productIds": [],
                        "aHalfPrice": false
                    }]
                }
            }else if(this.sortInput){
                this.sImgSrc = this.getStr(this.sImgSrc.replace(/\s/ig,','))
                this.aImgSrc = this.sImgSrc.split(',')

                if(this.sImgHref){
                    this.sImgHref = this.getStr(this.sImgHref.replace(/\s/ig,','))
                    this.aImgHref = this.sImgHref.split(',')
                }

                if(this.sTimeLi){
                    this.sTimeLi = this.getStr(this.sTimeLi.replace(/\s/ig,','))
                    this.aTimeLi = this.sTimeLi.split(',')
                }
                json = {
                    "type": "txt2",
                    "starttime": this.aTimeLi[num] ? this.getTimes(this.aTimeLi[num])[0] : 0,
                    "endtime": this.aTimeLi[num] ? this.getTimes(this.aTimeLi[num])[1] : 0,
                    "imgsrc":this.aImgSrc[num],
                    "productIds": [],
                    "href":this.aImgHref[num] ? this.aImgHref[num] : 'javascript:;'
                }
            }else{
                json = {
                    "type": "txt",
                    "markWord": "售价",
                    "productIds": [],
                    "aHalfPrice": false
                }
                if(this.halfPriceInput){
                    json.aHalfPrice = true
                }
            }
            return json
        },
        isRepeat(arr){
            let nary = arr.sort()
            for (let i = 0; i < arr.length; i++) {
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
        isPrompt(endFn){
            this.aPrompt = []

            if(this.scheduleInfo.title == ''){this.aPrompt.push('请填写标题')}

            if(this.scheduleInfo.number == 0 || this.scheduleInfo.number == ''){this.aPrompt.push('请填写档期')}

            if(this.scheduleInfo.activityName == ''){this.aPrompt.push('请填写name')}

            if(this.scheduleInfo.template[0] == '0'){this.aPrompt.push('请选择客户端')}

            if(this.scheduleInfo.template[1] == '0'){this.aPrompt.push('请选择栏目')}

            if(this.templateKey == '0'){this.aPrompt.push('请选择模板')}

            if(!this.scheduleInfo.background){this.aPrompt.push('请填写背景颜色')}

            if(!this.scheduleInfo.banner){this.aPrompt.push('请上传banner')}

             if(this.tabInput){if(!this.sTabLi){ this.aPrompt.push('请先输入TAB类别')}}
             if(this.timeInput){if(!this.sTimeLi){ this.aPrompt.push('请先输入时间段')}}
             if(this.sortInput){if(!this.sImgSrc){ this.aPrompt.push('请先输入栏目图片')}}

            if(this.aPrompt.length>0){
                let sPrompt = '' 
                for(let y=0; y<this.aPrompt.length; y++){
                    sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                }
                alert(sPrompt)
            }else{
                endFn&&endFn()
            }
        },
        getTimes(str){
            let arrTime = []
            let arr1 = str.split('-')
            if(arr1.length == 2){
                let arr2 = []
                for(let i=0; i<arr1.length;i++){
                    let arr3 = arr1[i].replace(/月/, ",").replace(/日/, "").split(',')
                    arr2.push(arr3)
                }
                let d = new Date()
                let m = d.getMonth()
                let y1 =d.getFullYear() 
                let y2 = y1
                let m1 = parseInt(arr2[0][0]) -1
                let m2 = parseInt(arr2[1][0]) -1
                let d1 = parseInt(arr2[0][1])
                let d2 = parseInt(arr2[1][1])

                if( m1==11 && m2 == 0 ){
                    y2 = y1+1
                    if(m2==m){
                        y2 = y
                        y1 = y2-1
                    }
                }
                arrTime[0]= new Date(y1,m1,d1,0,0,0).getTime()
                arrTime[1]= new Date(y2,m2,d2,23,59,59).getTime()
            }else{
                arrTime = ['','']
            }
            return arrTime
        }
    },
    components:{}
}

