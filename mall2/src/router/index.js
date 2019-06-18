import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import codeBuilder from '@/components/codeBuilder/codeBuilder'
import codeBuilder2 from '@/components/codeBuilder/codeBuilder2'
import scheduleList from '@/components/schedule/scheduleList'
import editSchedule from '@/components/schedule/editSchedule'
import scheduleList2 from '@/components/schedule2/scheduleList'
import editSchedule2 from '@/components/schedule2/editSchedule'
import lsMall from '@/components/lsMall/lsMall'
import editMall from '@/components/lsMall/editMall'
import eventDetails from '@/components/activity/eventDetails'
import fightGroup from '@/components/fightGroup/fightGroup'
import upLoad from '@/components/upLoad/upLoad'
import timedReceipt from '@/components/timedReceipt/timedReceipt'
import editTimedReceipt from '@/components/timedReceipt/editTimedReceipt'
import overseas from '@/components/overseas/overseas'
import editOverseas from '@/components/overseas/editOverseas'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect: '/codeBuilder'
    },
    {
      path: '/login',
      component: login
    },
    {
      path:'/codeBuilder',
      component: codeBuilder
    },
    {
      path:'/codeBuilder2',
      component: codeBuilder2
    },
    {
      path: '/scheduleList',
      component: scheduleList,
      children:[
        {
          path:':id',
          component:editSchedule
        }
      ]
    },
    {
      path: '/schedule2List',
      component: scheduleList2,
      children:[
        {
          path:':id',
          component:editSchedule2
        }
      ]
    },
    {
      path: '/lsMall',
      component: lsMall,
      children:[
        {
          path:':id',
          component:editMall
        }
      ]
    },
    {
      path:'/eventDetails',
      component: eventDetails
    },
    {
      path:'/fightGroup',
      component: fightGroup
    },
    {
      path:'/upLoad',
      component: upLoad
    },
    {
      path:'/timedReceipt',
      component: timedReceipt,
      children:[
        {
          path:':id',
          component:editTimedReceipt
        }
      ]
    },
    {
      path:'/overseas',
      component: overseas,
      children:[
        {
          path:':id',
          component:editOverseas
        }
      ]
    }
  ]
})
