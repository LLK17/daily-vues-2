<template>
    <div>
        <navbar></navbar>
        Log In

        <form @submit.prevent="logIn">
            <input type="text" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <br>
            <button type="submit">Log In!</button>
            
        </form>
    </div>
</template>


<script>
import Navbar from './Navbar'
import * as firebase from "firebase/app"
import "firebase/auth"

    export default{
        components:{
            Navbar
        },

        data(){
            return{
                email: "",
                password: "",
                error: "",
            }
        },

        methods:{
             async logIn(){
                try{
                    const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    console.log(val)
                    this.$router.replace({name: "home"})
                }catch(error){
                    console.log(error)
                }
            }
        }
    }
</script>