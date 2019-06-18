import {upImage,oPermission} from '@/assets/js/base'
export const eventDetails = {
	data(){
		return{
            banner:'http://www.yijiago.com/promotion/app/ho-img/storeFloor/storeFloor/banner5.jpg',
            title:'请输入活动标题',
            subtitle:'请输入活动小标题',
            date:'请输入活动时间',
            place:'请输入活动地点',
            member:'不限',
            content:'',
            placeholder:'输入活动内容',
            setStyle:'',
            template:{
                header:'<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"name="viewport"><meta content="yes"name="apple-mobile-web-app-capable"><meta content="black"name="apple-mobile-web-app-status-bar-style"><meta content="telephone=no"name="format-detection"></head><body><link rel="stylesheet"type="text/css"href="http://www.yijiago.com/promotion/app/ho-css/storeFloor/app.css"><div class="header"><div class="bar-left"><a class="a-back"onclick="window.history.go(-1);"></a></div><div class="tit">{$title}</div><div class="bar-right"></div></div>',
                content:'<link rel="stylesheet"type="text/css"href="http://www.yijiago.com/promotion/app/ho-css/eventDetails/eventDetails.css"><div class="Topic_144"><div class="bannerWrap"><img src="{$imgSrc}"></div><div class="detailsWrap"><div class="detailsTitle">{$subtitle}</div><div class="detailsInfo"><div class="detailsTime"><span>◎</span>活动时间：{$date}</div><div class="detailsPlace"><span>◎</span>活动地点：{$place}</div><div class="detailsObject"><span>◎</span>参与对象：{$member}</div></div><div class="activityWrap"><h2>活动详情</h2><div class="detailsCon">{$content}</div></div><div class="foot"><img src="http://www.yijiago.com/promotion/app/ho-img/eventDetails/eventDetails/bottom.jpg"></div></div></div>',
                foot:'</body></html>'
            },
            _html:''  
		}
	},
    watch:{
        title(){this.$refs.title.className = 'on'},
        subtitle(){this.$refs.subtitle.className = 'on'},
        date(){this.$refs.date.className = 'on'},
        place(){this.$refs.place.className = 'on'},
        member(){this.$refs.member.className = 'on'}
    },
    created(){
              this.bPermission = oPermission[sessionStorage.permission].eventDetails
    },
    methods: {
        setFocus(e){
            if(e.target.value == e.target.title){
                e.target.value = ''
            }
        },
        setBlur(e){
            if(e.target.value == ''){
                e.target.value = e.target.title
                e.target.className = ''
            }else{
                e.target.className = 'on'
            }
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
        },
        handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            upImage(false,file).then((res) => {
                if(res.code == 0){
                    let url = res.name 
                    Editor.insertEmbed(cursorLocation, 'image', url);
                    resetUploader();
                }
            })
        },
        getCode(){

            let sCode = this.template.content
            let sHeader = this.template.header
            sHeader = sHeader.replace(/\{\$title\}/,this.title)
            sCode = sCode.replace(/\{\$imgSrc\}/,this.banner)
            sCode = sCode.replace(/\{\$subtitle\}/,this.subtitle)
            sCode = sCode.replace(/\{\$date\}/,this.date)
            sCode = sCode.replace(/\{\$place\}/,this.place)
            sCode = sCode.replace(/\{\$member\}/, this.member)
            sCode = sCode.replace(/\{\$content\}/,this.content)

            let _style = ''
            if(this.setStyle){
                _style += '<style type="text/css">'+this.setStyle+'</style>'
            }

            sCode += _style
            this.$refs.createCode.value = sCode
            this._html = sHeader + sCode + this.template.foot

        },
        createHtml(){
            let newWindow = window.open();
            newWindow.document.write(this._html)
        },
        _reset(){
            this.banner = 'http://www.yijiago.com/promotion/app/ho-img/storeFloor/storeFloor/banner5.jpg'
            this.title = '请输入活动标题'
            this.subtitle = '请输入活动小标题'
            this.date = '请输入活动时间'
            this.place = '请输入活动地点'
            this.member = '不限'
            this.content = '请输入活动内容'
            this.$refs.createCode.value = ''
            this.$refs.title.className = ''
            this.$refs.subtitle.className = ''
            this.$refs.date.className = ''
            this.$refs.place.className = ''
            this.$refs.member.className = ''
        }
    },
    components:{}
}
