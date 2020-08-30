import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import { firestorePlugin } from 'vuefire'
import * as firebase from "firebase/app"
import "firebase/auth"

Vue.config.productionTip = false

Vue.use(firestorePlugin)

firebase.auth().onAuthStateChanged(user =>{
  if(user) {
      console.log(user.email)
      new Vue({
        router,
        render: h => h(App),
      }).$mount("#app")
    }
  

  else{
    new Vue({
      router,
      render: h => h(App),
    }).$mount("#app")
  }

})