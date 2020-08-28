<template>
    <div>
        <navbar></navbar>
        <div v-if="error" class="error">{{error.message}}</div>
        Register

        <form @submit.prevent="registerUser">
            <input type="text" placeholder="Email" v-model="email">
            <input type="password" placeholder="Password" v-model="password">
            <br>
            <button type="submit">Register!</button>

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
            //creates a new user
            async registerUser(){
                try{
                    const user = firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    console.log(user)
                    this.$router.replace({name: "home"})
                }catch(error){
                    console.log(error)
                }
            }
        },
    }
</script>