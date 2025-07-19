import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: () => import('../views/TaskList.vue')
    }
  ]
});