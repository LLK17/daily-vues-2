import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import { firestorePlugin } from 'vuefire'
import * as firebase from "firebase/app"
import "firebase/auth"

Vue.config.productionTip = false

Vue.use(firestorePlugin)

let app
firebase.auth().onAuthStateChanged(user => {
  console.log(user.email)
  if (!app){
    app = 
    
    new Vue({
      router,
      render: h => h(App),
    }).$mount("#app")
  }
})
