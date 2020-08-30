import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import splashPage from '../components/SplashPage'


Vue.use(Router)

 const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/home',
            name: 'home',
            component: Home,
        },

        {
            path: '/login',
            name: 'login',
            component: Login,
        },

        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path:'*',
            name: 'catchAll',
            component: splashPage
        }

    ]
    
})

export default router

