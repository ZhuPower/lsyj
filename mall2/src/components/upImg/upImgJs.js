import {upImage,getJson2,setList2,oPermission} from '@/assets/js/base'
export const upImg = {
	data(){
		return{
            filePath:'',
            oData:[] 
		}
	},
    created(){
        this.bPermission = oPermission[sessionStorage.permission].upImg;
        this.getData();
    },
    methods: {
        getData(){
            getJson2('recharge').then((res) => {
                this.oData = res;
            })
        },
        addBanner(){
            let obj = {
                aLink:'javascript:;',
                imgSrc:''
            }

            this.oData.aImg.push(obj);
        },
        delBanner(n){
            this.oData.aImg.splice(n,1);
        },
        upBanner(oSrc){
            let oInput = this.$refs.fileBanner
            let that = this
            oInput.click()
            oInput.onchange = function(){
                upImage(this).then(res => {
                    if(res.code == 0){
                        oSrc.imgSrc = res.name+'?t='+Math.random();
                    }
                })  
            }
        },
        close(){
            this.$router.go(0);
        },
        confirm(){
            let jsonStr = JSON.stringify(this.oData)
            let param = {
                action:'fightGroup',
                setData:jsonStr,
                schedule:'recharge',
                t:Math.random()
            }
            
            let setUp = ()=>{
                setTimeout(()=>{
                   this.$router.go(0);
                },1000)
            }

            setList2(param,setUp)
        }
    },
    components:{}
}
