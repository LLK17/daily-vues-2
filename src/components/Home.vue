<template>
    <div>
        <navbar></navbar>
            <div id="sidebar">
                <form id="new-item-form" @submit.prevent="newItem">
                    <input id="title-field" type="text" maxlength="50" name="title" placeholder ="Give Me A Title!" v-model="formData.title">
                    <textarea id="description-field" maxlength="150" name="description" placeholder="Describe Me" v-model="formData.description"></textarea>
                    <div id="form-categories">
                        <!-- Categories are used for filtering -->
                        <p>Categories</p>
                        <input type="radio" name="Health" v-model="formData.health" value="Health"> Health
                        <input type="radio" name="Fun" v-model="formData.fun" value="Fun"> Fun
                        <input type="radio" name="Work" v-model="formData.work" value="Work"> Work
                        <input type="radio" name="School" v-model="formData.school" value="School"> School
                    </div>
                    <input type="date" name="Due Date" v-model="formData.dueDate">
                    <button type="submit">Submit!</button>
                </form>
            </div>

                <!-- list display -->
                <div id="list-container">
                    <h3>My List</h3>
                    <div id="my-list">
                        <div id="list-item" v-for="(listData) in myList" :key='listData.id'>
                            <span class="title">{{listData.title}}</span>
                            <br>
                            <p class="description">{{listData.description}}</p>
                            <br>
                            <span class="category" v-if="listData.health == 'Health'">{{listData.health}} </span>
                            <span class="category" v-if="listData.fun == 'Fun'">{{listData.fun}} </span>
                            <span class="category" v-if="listData.work == 'Work'">{{listData.work}} </span>
                            <span class="category" v-if="listData.school == 'School'">{{listData.school}} </span>
                            <br>
                            <span class="category">Due: {{listData.dueDate}}</span>
                            <br>
                            <button v-on:click="deleteItem(listData.id)">Delete Item</button>
                        </div>
                    </div>
                </div>
    </div>

</template>

<script>
// database reference
import { db } from '../db'
import Navbar from './Navbar'
import * as firebase from "firebase/app"
import "firebase/auth"

const toDoLists = db.collection('lists')

export default{
    components: {
        Navbar
    },

    data(){
    return{
      myList: [],
      formData: {},
      user: []
    }
  },

    firestore(){
        //grabs items that the current user authored from firebase
        let user = firebase.auth().currentUser
        return{
             myList: toDoLists.where("madeBy", "==", user.uid)
         }

    },

  methods:{

   // adds a new item to the to do list
    async newItem() {
        try{
            let user = firebase.auth().currentUser
            db.collection('lists').add({
            title: this.formData.title,
            description: this.formData.description,
            health: this.formData.health,
            fun: this.formData.fun,
            work: this.formData.work,
            school: this.formData.school,
            dueDate: this.formData.dueDate,
            madeBy: user.uid,
          })
        }catch(error){
            console.log(error)
        }
    },

    //removes an item from the to do list
    async deleteItem(id){
      db.collection('lists').doc(id).delete().then(function(){
      }).catch(function(error){
        console.error("Error removing document", error)
      })
    },

  },
}

</script>

<style scoped>
    #sidebar{
        position: fixed;
        top:4em;
        width: 20em;
        height: auto;
        display: grid;
        grid-template-columns: 100%;
        padding: 1em;
        background-color: #fafafa;
        border-radius: 0 4% 4% 0;
    }

    #new-item-form{
    width: 20em;
    display: grid;
    gird-template-rows: auto auto auto auto auto auto;
    gap: 1em 0;
    }

    .description{
        word-wrap: break-word;
        height: fit-content;
    }

    #title-field{
    margin-bottom: 1em;
    }

    #description-field{
    height: 6em;
    resize: none;
    }

    #list-container{
        margin-top: 8em;
    }

    #my-list{
    align-self: bottom;
    justify-content: center;
    width: auto;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 2em;
    }

    #list-item{
        width: 20em;
        height: auto;
        background-color: #fafafa;
        border-radius: 8%;
        padding: .5em;
    }

</style>