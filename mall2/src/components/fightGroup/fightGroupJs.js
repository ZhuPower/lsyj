import {upImage,getJson2,getJson3,setList2,oPermission} from '@/assets/js/base'
export const fightGroup = {
	data(){
		return{
                                    goodsName:'',
                                    goodsNameList:{},
                                    banner:'',
                                    oJson:{},
                                    arrId:[],
                                    strId:'',
                                    activityLink0:'http://www.yijiago.com/h5/',
                                    activityLink:'',
                                    activityLink2:'',
                                    bNew:false,
                                    aStoreName:[],
                                    aGoodsName:[],
                                    newName1:'',
                                    newName2:'',
                                    aPrompt:[]
		}
	},
    watch:{
        banner(){
            if(this.goodsName){this.oJson[this.goodsName].banner = this.banner} 
        },
        strId(){
            if(this.strId){
                this.arrId = this.getStr(this.strId.replace(/\s/ig,',')).split(',')
            }else{
                this.arrId = []
            }
            if(this.goodsName){this.oJson[this.goodsName].id = this.arrId}
        },
        goodsName(){
            if(this.goodsName){
                this.bNew = false
                this.banner = this.oJson[this.goodsName].banner
                this.strId = this.oJson[this.goodsName].id.join(',')
                this.activityLink = this.activityLink0 + '#/member-help-detail/5805?goodsName='+this.goodsName
                this.activityLink2 = '#/member-help-detail/5805?goodsName='+this.goodsName
            }else{
                this.bNew = true
                this.banner = ''
                this.strId = ''
                this.activityLink = ''
                this.activityLink2 = ''
            }
        }
    },
    created(){
        this.bPermission = oPermission[sessionStorage.permission].fightGroup
        this.getData()
    },
    methods: {
        getData(){
            getJson2('fightGroupGoodsId').then((res) => {
                this.oJson = res

                let oItem = {}
                this.aGoodsName = []
                for (let key in this.oJson){
                  oItem[key] = this.oJson[key].name
                  this.aGoodsName.push(key)
                }
                this.goodsNameList = oItem
                this.goodsName = this.aGoodsName[0]
            })

            getJson3('fightGroupStoreName').then((res) => {
                this.aStoreName = res
            })
        },
        addGoods(){
            this.goodsName = ''
            this.newName1 = ''
            this.newName2 = ''
        },
        delGoods(){
            delete this.oJson[this.goodsName]
            delete this.goodsNameList[this.goodsName]
            if(this.aGoodsName.length>0){
                if(this.goodsName == this.aGoodsName[0]){
                     this.aGoodsName.splice(0,1)
                }else{
                    let n = this.aGoodsName.indexOf(this.goodsName)
                    this.aGoodsName.splice(n,1) 
                }
                this.aGoodsName[0] ? (this.goodsName = this.aGoodsName[0]) : (this.goodsName = '')
            }
        },
        bSubmit(){
            this.aPrompt = []
            if(this.bNew){
                if(this.newName1 == ''){this.aPrompt.push('请填写商品名')}
                if(this.newName2 == ''){
                    this.aPrompt.push('请填写name')
                }else{
                    if(this.aGoodsName.indexOf(this.newName2)>-1){
                        this.aPrompt.push('name 已存在请重新填写')
                    }
                }
            }
            if(this.banner == ''){this.aPrompt.push('请上传头图')}
            if(this.strId == ''){this.aPrompt.push('请填写商品id')}

            if(this.aPrompt.length>0){
                let sPrompt = '' 
                for(let y=0; y<this.aPrompt.length; y++){
                    sPrompt += (y+1) +'.'+this.aPrompt[y]+'。'+'\n'
                }
                alert(sPrompt)
            }else{
                if(this.bNew){
                    let oItem = {}
                    oItem.name = this.newName1
                    oItem.banner = this.banner
                    oItem.id= this.arrId
                    this.oJson[this.newName2] = oItem
                }

                let jsonStr = JSON.stringify(this.oJson)
                let param = {
                    action:'fightGroup',
                    setData:jsonStr,
                    schedule:'fightGroupGoodsId',
                    t:Math.random()
                }
                
                let setUp = ()=>{
                    if(this.bNew){
                        setTimeout(()=>{
                           this.bNew = false 
                           getJson2('fightGroupGoodsId').then((res) => {
                                this.oJson = res

                                let oItem = {}
                                this.aGoodsName = []
                                for (let key in this.oJson){
                                  oItem[key] = this.oJson[key].name
                                  this.aGoodsName.push(key)
                                }
                                this.goodsNameList = oItem
                                this.goodsName = this.newName2
                            })
                        },1000)
                    }
                }

                setList2(param,setUp)
            }
        },
        bCancel(){
             this.bNew = false
            if(this.goodsName == this.aGoodsName[0]){
                 if(this.aGoodsName.length>1){
                        this.goodsName = this.aGoodsName[1]
                 }
            }else{
                this.goodsName = this.aGoodsName[0]   
            }
        },
        getStr(str){
            if(str.indexOf(',,')>0){
                str = str.replace(/,,/ig,',')
            }
            return str
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
        }
    },
    components:{}
}
