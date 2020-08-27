<template>
    <div id="nav">
        <div id="links">
            <span v-if="loggedIn"> Welcome! </span>
            <router-link class="link" to="/">Home</router-link>
            <router-link class="link" to="/login">Login</router-link> 
            <router-link class="link" to="register">Register</router-link>
            <span @click="signOut">Sign Out</span> 
        </div>
    </div>
</template>

<script>
    import * as firebase from "firebase/app"
    import "firebase/auth"
    export default{
        name: 'Navbar',

        data(){
            return{
                loggedIn: false,
            }
        },
        methods:{
            async signOut(){
                try{
                    await firebase.auth().signOut()
                    this.$router.replace({name:'login'})
                }catch(error){
                    console.log(error)
                }
            }
        },

        //Checks if user is logged in, enables greet message and sign out button if so
        created(){
            firebase.auth().onAuthStateChanged(user=>{
                if(user){
                    this.loggedIn = true
                    return{
                        user
                    }
                }
                else{
                    this.loggedIn=false
                }
            })
        },
    }

</script>

<style scoped>
    #nav{
       width: 100vw;
       height: 4em;
       display: grid;
       justify-items: right;
       align-items: center;
       background-color:darkgray;
       position: fixed;
       top: 0
    }
    
    #links{
        margin-right: 1em;
    }

    .link{
        margin: .6em
    }
</style>