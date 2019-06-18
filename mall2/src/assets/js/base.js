import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// export const urlPath = 'http://127.0.0.1/test/mall/app/rearEnd/mall2/'
// export const urlPath2 = 'http://127.0.0.1/test/mall/app/rearEnd/mall2/getData.php?name='
// export const urlPath3 = 'http://127.0.0.1/test/mall/app/rearEnd/mall2/getData2.php?name='
// export const urlPath6 = 'http://127.0.0.1/test/mall/app/rearEnd/mall2/getData3.php?name='
// export const urlPath4 = 'http://127.0.0.1/test/mall/html/lsMall.html?place='
// export const urlPath5 = 'http://127.0.0.1/test/mall/html/eventDetails.html?activity='
// export const urlPath7 = 'http://127.0.0.1/test/mall/html/storeLink.html?activityName='
// export const urlPath8 = 'http://www.yijiago.com/h5/#/member-help-detail/5855?name='
// export const urlPath9 = 'http://www.yijiago.com/h5/#/member-help-detail/5862?name='





export const urlPath = '../'
export const urlPath2 = '../json/'
export const urlPath3 = '../../../../html/js/'
export const urlPath6 = '../../../../html/js/lsMall/'
export const urlPath4 = 'http://www.yijiago.com/promotion/html/lsMall.html?place='
export const urlPath5 = 'http://www.yijiago.com/promotion/html/eventDetails.html?activity='
export const urlPath7 = 'http://www.yijiago.com/promotion/html/storeLink.html?activityName='
export const urlPath8 = 'http://www.yijiago.com/h5/#/member-help-detail/5855?name='
export const urlPath9 = 'http://www.yijiago.com/h5/#/member-help-detail/5862?name='



export const oPermission = {
     root_a:{
        "codeBuilder2":true,
        "schedule2List":true,
        "overseas":true,
        "timedReceipt":true,
        "fightGroup":true,
        "lsMall":true,
        "eventDetails":true,
        "upLoad":true
    },
    b1:{
        "codeBuilder2":true,
        "overseas":true,
        "fightGroup":true,
        "lsMall":true,
        "eventDetails":true
    },
    c1:{
        "codeBuilder2":true,
        "overseas":true,
        "fightGroup":true,
        "eventDetails":true
    },
    c2:{
        "codeBuilder2":true,
        "overseas":true,
        "lsMall":true,
        "eventDetails":true
    },
    c3:{
        "codeBuilder2":true,
        "fightGroup":true,
        "lsMall":true,
        "eventDetails":true
    },
    d1:{
        "codeBuilder2":true,
        "fightGroup":true,
        "eventDetails":true
    },
    d2:{
       "codeBuilder2":true,
        "lsMall":true,
        "eventDetails":true
    },
    d3:{
        "codeBuilder2":true,
        "overseas":true,
        "eventDetails":true
    }
}

export function getJson3(name){
    let data = null
    let parameter = urlPath + 'setData2.php'

    let params = new URLSearchParams()
    params.append('action','scheduleData')    
    params.append('scheduleName',name)
    params.append('t',Math.random())

    return axios({
        method: 'post',
        url:parameter,
        data:params
    }).then((res)=>{
        eval(res.data+';data = aName')
        return Promise.resolve(data)
    })
}


export function getJson2(name){
    let data = null
    let parameter = urlPath + 'setData2.php'

    let params = new URLSearchParams()
    params.append('action','scheduleData')    
    params.append('scheduleName',name)
    params.append('t',Math.random())

    return axios({
        method: 'post',
        url:parameter,
        data:params
    }).then((res)=>{
        eval(res.data+';data = oData')
        return Promise.resolve(data)
    })
}


export function setList2(data,endFn){
    let sUrl = urlPath+'setData2.php'
    let typeStr = data.action
    let onOff = data.onSave

    let params = new URLSearchParams()
    for(let key in data){
        params.append(key, data[key])
    }

    return axios({
        method: 'post',
        url:sUrl,
        data:params
    }).then((res)=>{
        alert('恭喜，操作成功！')

        if(typeStr == 'fightGroup'){endFn&&endFn()}

        if(onOff){endFn&&endFn()}
    })
}


export function getJson(name){
    let data = null
    let parameter = urlPath + 'setData.php'

    let params = new URLSearchParams()
    params.append('action','mallData')    
    params.append('mallName',name)
    params.append('t',Math.random())

    return axios({
        method: 'post',
        url:parameter,
        data:params
    }).then((res)=>{
        eval(res.data+';data = jData')
        return Promise.resolve(data)
    })
}


export function setList(data){
    let sUrl = urlPath+'setData.php'

    let typeStr = data.action
    
    let params = new URLSearchParams()
    for(let key in data){
        params.append(key, data[key])
    }

    return axios({
        method: 'post',
        url:sUrl,
        data:params
    }).then((res)=>{
        if(typeStr == 'eventDetails' || typeStr == 'mallDetails' ){
        	alert('恭喜，修改成功！')
        }else if( typeStr == 'mallList'){
        	//alert('恭喜，删除成功！')
        }else if(typeStr == 'createmall' || typeStr == 'createactivity'){
        	return Promise.resolve(true)
        }
    })
}


export function upImage2(obj,oFile){
    let file = oFile || obj.files[0]
    let image = new FormData()
    image.append('uploadFile', file);
    //image.append('t',Math.random())
    
    return axios({
        method:'post',
        url:'https://test.yijiago.com/gly/yiJiaGo/api.php',
        data:image,
        headers:{
          "Content-Type": "multipart/form-data",
        }
    }).then((res)=>{
        return Promise.resolve(res.data)
    })
}

export function upImage(obj,oFile){
    let file = oFile || obj.files[0]
    let image = new FormData()
    image.append('upload_item', file);
    //image.append('t',Math.random())
    
    return axios({
        method:'post',
        url:'http://www.yijiago.com/index.php/shopadmin?app=image&ctl=admin_manage&act=image_upload&callbackfunc=upImageCallBack',
        data:image,
        headers:{
          "Content-Type": "multipart/form-data",
        }
    }).then((res)=>{
        let arr = res.data.slice(36,-74).replace(/'/ig,'').split(',')
        console.log(arr)
        let msg = {}
        msg.code = 0
        if(arr[0]){
            msg.name = arr[0]
        }else{
            msg.name = arr[1]
        }
        return Promise.resolve(msg)
    })
}






