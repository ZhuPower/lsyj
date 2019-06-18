import {urlPath7,getJson2,setList2,oPermission} from '@/assets/js/base'
//import {appHtml,pcHtml,template} from '@/assets/js/template'
export const scheduleList = {
	data(){
		return{
            storeList:null,
            mallList:{},
            listLen:0,
            urlPath:'',
            show:true,
            isDetails:false,
            index:0,
            sName:'',
            upOff:false,
		}
	},
    watch: {},
    created(){
        this.bPermission = oPermission[sessionStorage.permission].schedule2List
       this.getData()
       this.urlPath = urlPath7
    },
    updated(){
        if(!this.show && this.$route.path == '/schedule2List'){this.show = true}
        if(this.upOff){this.getData();this.upOff = false;}
    },
    methods: {
        getData() {
            getJson2('store').then((res) => {
                this.storeList = res
                this.mallList = res.items
                this.listLen = res.items.length
            })

        },
        setShow(msg){
            this.show = msg.show
            this.isDetails = !msg.show
            this.index = msg.index
            this.sName = msg.name
        },
        delList(msg){
            if(confirm("删除是不可恢复的，你确认要删除吗？")){
                let arr = this.mallList
                let mallName = arr.splice(msg,1)[0].id
                this.storeList.items = this.mallList
                let jsonStr2 = JSON.stringify(this.storeList)
                let param = {
                    action:'scheduleList',
                    schedule:mallName,
                    list:jsonStr2,
                    t:Math.random()
                }
                setList2(param) 
            }
        },
        addList(){
            this.$router.push({
                path:`${this.$route.path}/${this.storeList.number+1}`
            })
            this.sName = ''
            this.isDetails = true
            this.show = false
            this.index = -1
        },
        updata(msg){
            this.upOff = msg
        }
    },
    components:{}
}
