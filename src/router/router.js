import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import splashPage from '../components/SplashPage'
// import * as firebase from "firebase/app"
// import "firebase/auth"

Vue.use(Router)

 const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [

        {
            path: '/home',
            name: 'home',
            component: Home,
            // meta: {requiresAuth: true}
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


    // router.beforeEach((to, from, next)=>{
    //     try{
    //         const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    //         const isAuthenticated = firebase.auth().currentUser
    //         if(requiresAuth && !isAuthenticated){
    //             next("/login")
    //         }
    //     }catch(error){
    //         console.log(error)
    //     }
    // })


export default router

