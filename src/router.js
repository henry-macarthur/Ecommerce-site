import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import addPost from './views/AddPost.vue'
import signup from './views/Signup.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/addPost',
      name: 'addPost',
      component: addPost
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    }
  ]
})
