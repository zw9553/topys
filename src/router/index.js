import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Creative from '../views/Creative.vue'
import Collect from '../views/Collect.vue'
import Mine from '../views/Mine.vue'
import Register from '../views/Register.vue'
import Message from '../views/Message'
import Class from '../views/Class'
import Order from '../views/Order'
import Adress from '../views/Adress'
import Acount from '../views/Acount'
import Ticket from '../views/Ticket'
import Detail from '../views/Detail'
import ClassDetail from '../views/ClassDetail'
import Comment from '../views/Comment.vue'
import Bank from '../views/Bank.vue'
import MyBank from '../views/MyBank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/detail/:id',
    name:'Detail',
    component:Detail
  },
  {
    path:'/comment/:id',
    name:'Comment',
    component:Comment
  },
  {
    path:'/classdetail/:id',
    name:'ClassDetail',
    component:ClassDetail
  },
  {
    path: '/creative',
    name: 'Creative',
    component: Creative
  },
  {
    path: '/collect',
    name: 'Collect',
    component: Collect
  },
  {
    path: '/bank/:id',
    name: 'Bank',
    component: Bank
  },
  {
    path: '/mine',
    name: 'Mine',
    component: Mine
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/class/:type',
    name: 'Class',
    component: Class
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/ticket',
    name: 'Ticket',
    component: Ticket,
    meta: {
      auth: true
    }
  },
  {
    path: '/adress',
    name: 'Adress',
    component: Adress,
    meta: {
      auth: true
    }
  },
  {
    path: '/acount',
    name: 'Acount',
    component: Acount,
    meta: {
      auth: true
    }
  },
  {
    path:'/mybank/:id',
    name:'MyBank',
    component:MyBank
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=> {
  if (to.matched.some(val=>val.meta.auth)) {
    if (localStorage.getItem('islogin')) {
      next()
    }else {
      next('/register?returnUrl='+to.path)
    }
  }else {
    next()
  }
})

export default router
