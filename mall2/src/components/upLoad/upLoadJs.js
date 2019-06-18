import {upImage2,oPermission} from '@/assets/js/base'
export const upLoad = {
	data(){
		return{
            filePath:''  
		}
	},
    created(){
        this.bPermission = oPermission[sessionStorage.permission].upLoad
    },
    methods: {
        upFile(){
            let oInput = this.$refs.upInput
            let that = this
            oInput.click()
            oInput.onchange = function(){
                let str = this.files[0].name
                upImage2(this).then(res => {
                    if(str == 'changeConfig.js'){
                        that.filePath = 'https://test.yijiago.com/gly/yiJiaGo/activity/changeConfig.js'
                    }else if(str == 'setFunction.js'){
                        that.filePath = 'https://test.yijiago.com/gly/yiJiaGo/activity/setFunction.js'
                    }else if(str == 'changeStyle.css'){
                        that.filePath = 'https://test.yijiago.com/gly/yiJiaGo/activity/changeStyle.css'
                    }else if(str.indexOf('_schedule')>-1){
                        that.filePath = 'https://test.yijiago.com/gly/yiJiaGo/schedule/'+str
                    }else{
                        alert('请上传规定的文件！')
                    }
                })  
            }
        }
    },
    components:{}
}
