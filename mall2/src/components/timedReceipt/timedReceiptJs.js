import {urlPath8,getJson2,setList2,oPermission} from '@/assets/js/base'
//import {appHtml,pcHtml,template} from '@/assets/js/template'
export const timedReceipt = {
    data(){
        return{
            oJsonAll:{},
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
                let str = '/timedReceipt/' + this.pathName
                //console.log(str)
                this.$router.push(str)
                this.isDetails=true
                this.show=false
                this.ok = false
            } 
        }
    },
    created(){
        this.bPermission = oPermission[sessionStorage.permission].timedReceipt
       this.getData()
       this.urlPath = urlPath8
    },
    updated(){
        if(!this.show && this.$route.path == '/timedReceipt'){this.show = true}
        if(this.upOff){this.getData();this.upOff = false;}
    },
    methods: {
        getData() {
            getJson2('couponInfo').then((res) => {
                this.oJsonAll = res
                var  arr = []
                for(var key in res){
                    var oItem = {}
                    oItem.title = res[key].title
                    oItem.name = key
                    oItem.uptime = res[key].date
                    arr.unshift(oItem)

                    this.aName.unshift(key)
                }
                this.mallList = arr
                this.listLen = arr.length
                console.log(this.mallList)
            }) 
        },
        setShow(msg){
            this.show = msg.show
            this.isDetails = !msg.show
            this.index = msg.index
        },
        delList(msg){
            if(confirm("删除是不可恢复的，你确认要删除吗？")){
                delete this.oJsonAll[this.aName[msg]]

                this.mallList.splice(msg,1)
                this.listLen = this.mallList.length
                let jsonStr = JSON.stringify(this.oJsonAll)
                let param = {
                    action:'fightGroup',
                    setData:jsonStr,
                    schedule:'couponInfo',
                    t:Math.random()
                }
                setList2(param) 
            }
        },
        addList(){
            this.name = ''
            this.$refs.popCreate.style.display='block'
        },
        saveCreate(){
            if(this.name == ''){
                alert('名称不能为空！')
            }else if(this.aName.indexOf(this.name) >-1){
                alert('该名称已存在请重新输入！')
                this.name = ''
            }else{
                let str = '/timedReceipt/' + this.name
                this.$router.push(str)
                this.isDetails=true
                this.show=false
                this.ok = false
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