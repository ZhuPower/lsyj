import {getJson,setList,upImage} from '@/assets/js/base'
export const editMall = {
	data(){
		return{
           mallTitle:'',
           name:'',
           info:{},
           bannerNum:0,
           bannerShow:true,
           bannerSrc:'',
           activityNum:'javascript:;',
           floorTotal:0,
           floorNum:'floor1',
           storeList:{},
           storeNum:0,
           storeInfo:{},
           storeName:'',
           storeShow:true,
           storeHui:true,
           storeQmd:true,
           storeSrc:'',
           storeHref:'',
           newActivityNum:'javascript:;',
           newBanner:{
                show: false,
                aHref: 'javascript:;',
                imgSrc: ''
           },
           newFloorNum:'floor1',
           newStore:{
                show: false,
                sale: false,
                qmd: false,
                aHref: 'javascript:;',
                name: 'default',
                imgSrc: ''
           }
		}
	},
    props: ['isDetails','index'],
    created(){
        if(!this.isDetails){
            this.$router.push('/lsMall')
        }else{
            this.getData()
        }
    },
    watch:{
        bannerNum(){ this.setDefault() },
        floorNum(){
            this.storeList = this.info.floorList[this.floorNum].storeList
            this.storeNum = 0
            this.selectStore()
        },
        storeNum(){ this.selectStore() },
        mallTitle(){ this.info.title = this.mallTitle },
        bannerShow(){ this.info.banner[this.bannerNum].show = this.bannerShow },
        bannerSrc(){ this.info.banner[this.bannerNum].imgSrc = this.bannerSrc },
        activityNum(){this.info.banner[this.bannerNum].aHref = this.activityNum},
        storeName(){ this.info.floorList[this.floorNum].storeList[this.storeNum].name = this.storeName },
        storeShow(){ this.info.floorList[this.floorNum].storeList[this.storeNum].show = this.storeShow },
        storeHui(){ this.info.floorList[this.floorNum].storeList[this.storeNum].sale = this.storeHui },
        storeQmd(){ this.info.floorList[this.floorNum].storeList[this.storeNum].qmd = this.storeQmd },
        storeSrc(){ this.info.floorList[this.floorNum].storeList[this.storeNum].imgSrc = this.storeSrc },
        storeHref(){ this.info.floorList[this.floorNum].storeList[this.storeNum].aHref = this.storeHref },
        newActivityNum(){
            this.newBanner.aHref = this.newActivityNum
        }
    },
    methods: {
        getData() {
            this.name = this.$route.path.replace(/\/lsMall\//ig,'')
            getJson(this.name).then((res) => {
                this.info = res
                this.floorTotal = this.info.floorList.floorNumber
                this.storeList = this.info.floorList.floor1.storeList
                this.mallTitle = this.info.title
                this.setDefault()
                this.selectStore()
            })
        },
        upBanner(str){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        if(str.indexOf('.')>-1){
                            let arr = str.split('.')
                            that[arr[0]][arr[1]] = res.name
                        }else{
                           that[str] = res.name 
                       } 
                    }
                })  
            }
        },
        setDefault(){
            this.bannerShow = this.info.banner[this.bannerNum].show
            this.bannerSrc = this.info.banner[this.bannerNum].imgSrc
            this.activityNum = this.info.banner[this.bannerNum].aHref
        },
        selectStore(){
            this.storeInfo = this.storeList[this.storeNum]
            this.storeName = this.storeInfo.name
            this.storeShow = this.storeInfo.show
            this.storeHui = this.storeInfo.sale
            this.storeQmd = this.storeInfo.qmd
            this.storeHref = this.storeInfo.aHref
            this.storeSrc = this.storeInfo.imgSrc
        },
        _submit(){
            let d = new Date()
            let time = d.getFullYear() + '-' + (d.getMonth()+1) +'-' + d.getDate()
            let n = this.index
            let jsonStr = JSON.stringify(this.info)
            
            getJson('floor').then((res) => {
                res[n].title = this.info.title
                res[n].uptime = time
                let jsonStr2 = JSON.stringify(res)
                let param = {
                    action:'mallDetails',
                    setData:jsonStr,
                    mall:this.name,
                    list:jsonStr2,
                    t:Math.random()
                }
                setList(param)
            })
            this.$emit('updata',true) 
        },
        addBanner(){
            this.$refs.popBanner.style.display = "block"
        },
        saveBanner(){
            if(this.newBanner.imgSrc){
                let newBanner = this.newBanner
                let oBanner = {
                    show:newBanner.show,
                    aHref:newBanner.aHref,
                    name:newBanner.name,
                    imgSrc:newBanner.imgSrc
                }
                
                this.info.banner.push(oBanner)
                this.clearBanner()
            }else{
                alert('请填写图片链接')
            }
        },
        cancelBanner(){
            this.clearBanner()
        },
        clearBanner(){
            this.$refs.popBanner.style.display = "none"
            this.newActivityNum = 'javascript:;',
            this.newBanner.show = false
            this.newBanner.imgSrc = ''
        },
        addStore(){
            this.$refs.popStore.style.display = "block"
        },
        saveStore(){
            let newStore = this.newStore
            let oStore = {
                show:newStore.show,
                sale:newStore.sale,
                qmd:newStore.qmd,
                aHref:newStore.aHref,
                name:newStore.name,
                imgSrc:newStore.imgSrc
            }
            this.info.floorList[this.newFloorNum].storeList.push(oStore)
            this.clearStore()
        },
        cancelStore(){
            this.clearStore()
        },
        clearStore(){
            this.$refs.popStore.style.display = "none"
            this.newStore.show = false
            this.newStore.sale = false
            this.newStore.qmd = false
            this.newStore.aHref = 'javascript:;'
            this.newStore.name = 'default'
            this.newStore.imgSrc = ''
        },
        delBanner(){
            let arr = this.info.banner
            arr.splice(this.bannerNum,1)
            this.bannerNum = 0
            
            if(arr.length>0){
                this.setDefault()
            }else{
                arr.push(this.newBanner)
                this.setDefault()
            }
        },
        delStore(){
            let arr = this.info.floorList[this.floorNum].storeList
            arr.splice(this.storeNum,1)
            this.storeNum = 0
            
            if(arr.length>0){
                this.selectStore()
            }else{
                arr.push(this.newStore)
                this.selectStore()
            }
        }
    },
    components:{}
}
