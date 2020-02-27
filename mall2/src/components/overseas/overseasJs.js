import {urlPath9,getJson2,setList2,oPermission} from '@/assets/js/base'
//import {appHtml,pcHtml,template} from '@/assets/js/template'
export const overseas = {
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
            upOff:false,
            isNew:false
        }
    },
    watch: {
        name(){
            if(this.ok){
                let str = '/overseas/' + this.pathName
                //console.log(str)
                this.$router.push(str)
                this.isDetails=true
                this.show=false
                this.ok = false
            } 
        }
    },
    created(){
        this.bPermission = oPermission[sessionStorage.permission].overseas
       this.getData()
       this.urlPath = urlPath9
       //console.log(456)
    },
    updated(){
        if(!this.show && this.$route.path == '/overseas'){this.show = true}
        if(this.upOff){
            this.upOff = false;
            setTimeout(()=>{
                this.getData();
            },200)
        }
    },
    methods: {
        getData() {
            getJson2('qqg_list').then((res) => {
                this.oJsonAll = res
                this.mallList = res.items
                this.listLen = res.items.length

                for(let i=0;i<this.listLen;i++){
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
                this.oJsonAll.items = this.mallList
                let jsonStr2 = JSON.stringify(this.oJsonAll)
                let param = {
                    action:'overseasList',
                    schedule:'qqg_'+mallName,
                    list:jsonStr2,
                    t:Math.random()
                }
                //console.log(param.action)
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
                let str = '/overseas/' + this.name
                this.$router.push(str)
                this.isDetails=true
                this.show=false
                this.ok = false
                this.isNew = true
            }
        },
        cancelCreate(){
            this.$refs.popCreate.style.display='none'
            this.name = ''
        },
        updata(msg){
            this.upOff = msg
            this.isNew = false
        }
    },
    components:{}
}