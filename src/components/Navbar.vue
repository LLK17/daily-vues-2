<template>
    <div id="nav">
        <span id="site-name"><router-link to="/">Daily Vues 2</router-link></span>
        <div id="links">
            <span v-if="loggedIn"> Good To See You!</span>
            <router-link class="link" to="/home">Home</router-link>
            <router-link v-if="!loggedIn" class="link" to="/login">Login</router-link> 
            <router-link v-if="!loggedIn" class="link" to="register">Register</router-link>
            <button id="sign-out" v-if="loggedIn" @click="signOut">Sign Out</button> 
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
                user: {}
            }
        },
        methods:{
            //signs user out when clicked
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
                    this.loggedIn = false
                }
            })
        },
    }

</script>

<style scoped>
    #nav{
       width: 100%;
       height: 4em;
       display: grid;
       grid-template-columns: auto auto;
       align-items: center;
       background-color: #4ff0a7;
       position: fixed;
       top: 0
    }
    
    #site-name{
        justify-self: left !important;
        margin-left: 4em;
        font-weight: 700;
        text-decoration: none;
    }

    #links{
        justify-self: right;
        margin-right: 4em;
    }

    .link{
        margin: .6em
    }

    #sign-out{
        background-color: darkgrey;
    }

    @media screen and (max-width: 500px){
        #site-name{
            margin-left: .6em;
        }

        #links{
            margin-right: .6em;
        }

    }
</style>