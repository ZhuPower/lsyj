import {urlPath4,getJson,setList,oPermission} from '@/assets/js/base'
//import {appHtml,pcHtml,template} from '@/assets/js/template'
export const lsMall = {
	data(){
		return{
            mallList:{},
            listLen:0,
            urlPath:'',
            show:true,
            isDetails:false,
            index:0,
            aName:[],
            name:'',
            pathName:'',
            ok:false,
            upOff:false
		}
	},
    watch: {
        name(){
            if(this.ok){
                let str = '/lsMall/' + this.pathName
                console.log(str)
                this.$router.push(str)
                this.isDetails=true
                this.show=false
                this.ok = false
            } 
        }
    },
    created(){
        this.bPermission = oPermission[sessionStorage.permission].lsMall
       this.getData()
       this.urlPath = urlPath4
    },
    updated(){
        if(!this.show && this.$route.path == '/lsMall'){this.show = true}
        if(this.upOff){this.getData();this.upOff = false;}
    },
    methods: {
        getData() {
            getJson('floor').then((res) => {
                this.mallList = res
                this.listLen = res.length
                for(let i=0; i<this.listLen; i++){
                    this.aName.push(this.mallList[i].name)
                }
            }) 
        },
        setShow(msg){
            this.show = msg.show
            this.isDetails = !msg.show
            this.index = msg.index
        },
        delList(msg){
            if(confirm("删除是不可恢复的，你确认要删除吗？")){
                let arr = this.mallList
                let mallName = arr.splice(msg,1)[0].name
                this.aName.splice(msg,1)
                let jsonStr2 = JSON.stringify(this.mallList)
                let param = {
                    action:'mallList',
                    mall:mallName,
                    list:jsonStr2,
                    t:Math.random()
                }
                setList(param) 
            }
        },
        addList(){
            this.$refs.popCreate.style.display='block'
        },
        saveCreate(){
            if(this.name == ''){
                alert('名称不能为空！')
            }else if(this.aName.indexOf(this.name) >-1){
                alert('该名称已存在请重新输入！')
                this.name = ''
            }else{
                let d = new Date()
                let time = d.getFullYear() + '-' + (d.getMonth()+1) +'-' + d.getDate()
                let arr = this.mallList
                arr.unshift({"title":"新建活动","name":this.name,"uptime":time})
                this.aName.unshift(this.name)
                let jsonStr2 = JSON.stringify(this.mallList)
                let param = {
                    action:'createmall',
                    mall:this.name,
                    list:jsonStr2,
                    t:Math.random()
                }
                setList(param).then((res) => {
                    this.$refs.popCreate.style.display='none'
                    this.pathName = this.name
                    this.name = ''
                    this.ok = true
                }) 
            }
        },
        cancelCreate(){
            this.$refs.popCreate.style.display='none'
            this.name = ''
        },
        updata(msg){
            this.upOff = msg
        }
    },
    components:{}
}
