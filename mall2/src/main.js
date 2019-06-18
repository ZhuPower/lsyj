// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    const isLogin = sessionStorage.login
    if (!isLogin && to.path != '/login') {
        next({ path: '/login' })
    }else if(isLogin && to.path == '/login'){
        next({ path: '/codeBuilder2' })
    }else{
        next()
    }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


