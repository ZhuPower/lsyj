export const list = {
	data(){
		return{
            num:10,
            onPage:1,
            numPage:0
        }
	},
    props: ['list','listLen','urlPath'],
    created(){
        this.setDefault()
    },
    watch:{
         onPage(){
            this.setNo()
         }
    },
    methods: {
        setDefault(){
            let b = setInterval(()=>{
                this.numPage = (this.listLen%this.num == 0 ? parseInt(this.listLen/this.num) : (parseInt(this.listLen/this.num)+1))
                this.setNo()
                if(this.numPage){
                    console.log(this.numPage)
                    clearInterval(b)
                }
            },200)
        },
        setNo(){
            if(this.onPage == 1){
                this.$refs.first.className = 'no'
                this.$refs.prve.className = 'no'
                this.$refs.next.className = ''
                this.$refs.last.className = '' 
            }else if(this.onPage == this.numPage){
                this.$refs.first.className = ''
                this.$refs.prve.className = ''
                this.$refs.next.className = 'no'
                this.$refs.last.className = 'no'
            }else{
                this.$refs.first.className = ''
                this.$refs.prve.className = ''
                this.$refs.next.className = ''
                this.$refs.last.className = ''
            }
        },
        firstBtn(){
            if(this.onPage!=1){
                this.onPage=1
            }
            console.log('firstBtn:'+this.onPage)
        },
        lastBtn(){
            if(this.onPage!=this.numPage){
                this.onPage=this.numPage
            }
            console.log('lastBtn:'+this.onPage+':'+this.numPage)
        },
        nextBtn(){
            if(this.onPage<this.numPage){
                this.onPage++
            }
            console.log('nextBtn:'+this.onPage+':'+this.numPage)
        },
        prveBtn(){
            if(this.onPage>1){
                this.onPage--
            }
            console.log('prveBtn:'+this.onPage)
        },
        editMall(msg,n,id){
            this.$router.push({
                path:`${this.$route.path}/${msg}`
            })
            if(id){
                this.$emit('setShow',{index:n,show:false,name:id})
            }else{
                this.$emit('setShow',{index:n,show:false})
            } 
        },
        delMall(n){
            this.$emit('delList',n)
        },
        addList(){
            this.$emit('addList',true)
        }
    },
    components:{}
}
