import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AvgLap from '../views/AvgLap'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/avglap',
    name: 'AvgLap',
    component: AvgLap
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
