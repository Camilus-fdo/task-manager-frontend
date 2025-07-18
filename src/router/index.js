import Vue from 'vue'
import Router from 'vue-router'
import BlogCreate from '@/views/BlogCreate.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/blogs', name: 'blogs.index', component: BlogCreate},
  ]
});