import {getJson2,setList2,upImage} from '@/assets/js/base'
export const editTimedReceipt = {
    data(){
        return{
            oJsonAll:{},
            oJson:{
                title:'',
                date:'',
                type:false,
                targetUrl:'',
                successImg:''
            },
            couponInfo:{
                couponId:'',
                startTime:'',
                takeTime:'',
                spaceTime:'',
                imgSrc:{
                    ing:'',
                    end:''
                },
                imgBj:''
            },
            coupon:0,
            name:'',
            isAdd:false,
            aPrompt:[],
            isNew:false
        }
    },
    props: ['isDetails','index'],
    created(){
        if(!this.isDetails){
            this.$router.push('/timedReceipt')
        }else{
            this.name = this.$route.path.replace(/\/timedReceipt\//ig,'')
            this.getData()
        }
    },
    watch:{
        coupon(){
            this.getInfo(this.coupon)
        }
    },
    methods: {
        getData() {
            getJson2('couponInfo').then((res) => {
                this.oJsonAll = res
                if(this.oJsonAll[this.name]){
                    this.oJson = this.oJsonAll[this.name]
                    this.getInfo(this.coupon)
                }else{
                    this.isNew = true
                    var d = new Date()
                    var y = d.getFullYear()
                    var m = d.getMonth() +1
                    var _d = d.getDate()
                    this.oJson.date =y+'-'+m+'-'+_d
                    this.oJson.couponInfo = []
                    this.oJsonAll[this.name] = this.oJson
                }
                //console.log(this.oJson)   
            }) 
        },
        getInfo(num){
            var obj = this.oJson.couponInfo[num]
            this.couponInfo.couponId = obj.couponId
            this.couponInfo.startTime = obj.startTime
            this.couponInfo.takeTime = obj.takeTime
            this.couponInfo.spaceTime = obj.spaceTime
            this.couponInfo.imgSrc.ing = obj.imgSrc.ing
            this.couponInfo.imgSrc.end = obj.imgSrc.end
            this.couponInfo.imgBj = obj.imgBj
        },
        addCoupon(){
            this.isAdd = true
            this.couponInfo.couponId = ''
            this.couponInfo.startTime = ''
            this.couponInfo.takeTime = ''
            this.couponInfo.spaceTime = ''
            this.couponInfo.imgSrc = {ing:'',end:''}
            this.couponInfo.imgBj = ''
            //console.log(this.coupon)
        },
        delCoupon(){
           this.oJson.couponInfo.splice(this.coupon,1)
           if(this.oJson.couponInfo.length>0){
                this.getInfo(0)
           }else{
                this.addCoupon()
           } 
        },
        bSubmit(){

            this.aPrompt = []

             if(this.oJson.title == ''){this.aPrompt.push('请填写title')}

             if(this.couponInfo.couponId == ''){this.aPrompt.push('请填写优惠券ID')}

             if(this.couponInfo.startTime == ''){this.aPrompt.push('请填写开始时间')}

             if(this.couponInfo.takeTime == ''){this.aPrompt.push('请填写结束时间')}

             if(this.couponInfo.spaceTime == ''){this.aPrompt.push('请填写切换时间')}

             if(this.couponInfo.imgSrc.ing == ''){this.aPrompt.push('请填写未领完图')}

             if(this.couponInfo.imgSrc.end == ''){this.aPrompt.push('请填写已领完图')}

             if(this.couponInfo.imgBj == ''){this.aPrompt.push('请填写背景')}


            if(this.aPrompt.length>0){
                let sPrompt = '' 
                for(let y=0; y<this.aPrompt.length; y++){
                    sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                }
                alert(sPrompt)
             }else{
                var obj = {}
                obj.imgSrc = {ing:'',end:''}
               
                obj.couponId = this.couponInfo.couponId
                obj.startTime = this.couponInfo.startTime
                obj.takeTime = this.couponInfo.takeTime
                obj.spaceTime = this.couponInfo.spaceTime
                obj.imgSrc.ing = this.couponInfo.imgSrc.ing
                obj.imgSrc.end = this.couponInfo.imgSrc.end
                obj.imgBj = this.couponInfo.imgBj

                if(this.isAdd){
                    this.oJson.couponInfo.push(obj)
                 }else{
                     this.oJson.couponInfo[this.coupon] = obj
                 }

                let jsonStr = JSON.stringify(this.oJsonAll)

                let param = {
                    action:'fightGroup',
                    setData:jsonStr,
                    schedule:'couponInfo',
                    t:Math.random()
                }
                
                let setUp = ()=>{
                    if(this.isAdd || this.isNew){
                        setTimeout(()=>{
                           this.isAdd = false 
                           this.isNew = false 
                           this.coupon = this.oJson.couponInfo.length-1
                        },1000)
                    }else{


                        if(this.oJson.couponInfo.length>1){
                            let n = this.coupon
                            setTimeout(()=>{
                                if(n==0){
                                    this.getInfo(n+1)
                                }else{
                                    this.getInfo(0)
                                }
                               
                               setTimeout(()=>{this.getInfo(n)},200)
                            },800)

                           }else{
                                 this.$router.push('/timedReceipt')
                           }
                    }
                }

               setList2(param,setUp)
               this.$emit('updata',true)
            }

        },
        bCancel(){
            this.isAdd = false
            if(this.isNew){
                this.$router.push('/timedReceipt')
            }else{
                this.getInfo(this.coupon)
            }
        },
         upBanner(){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        //console.log(that.couponInfo.imgSrc)
                       that.couponInfo.imgSrc.ing = res.name
                    }
                })  
            }
        },
        upBanner2(){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        //console.log(that.couponInfo.imgSrc)
                        that.couponInfo.imgSrc.end = res.name
                    }
                })  
            }
        },
        upBanner3(){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        //console.log(that.couponInfo.imgSrc)
                        that.oJson.successImg = res.name
                    }
                })  
            }
        }
    },
    components:{}
}
