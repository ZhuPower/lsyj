import {urlPath,oPermission} from '@/assets/js/base'
export const login = {
	data() {
		return {}
	},
	methods: {
		login() {
			let that = this 
			let name = this.$refs.userName.value 
			let password = this.$refs.password.value
			if (name && password) {
				let parameter = 'action=login&userName=' + name + '&password=' + password + '&t=' + Math.random() 
				let xml = new XMLHttpRequest() 
				xml.open('POST', urlPath + 'login.php', true) 
				xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
				xml.send(parameter) 
				xml.onreadystatechange = function() {
					if (xml.readyState == 4 && xml.status == 200) {
						let data = eval('(' + xml.responseText + ')') 

						if (data.login) {
							sessionStorage.login = 'Please contact customer service' 
							sessionStorage.permission = data.oPermission
							let  json = oPermission[data.oPermission]
							let arr = []
							for(let key in json){
								arr.push(key)
							}
							that.$emit('setLogin', true) 
							that.$router.push('/'+arr[0])
						} else {
							alert('密码或用户名错误！')
						}
					}
				}
			} else {
				alert('请输入用户名及密码！')
			}
		}

	},
	components: {}
}


