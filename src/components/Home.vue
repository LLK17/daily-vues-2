<template>
    <div>
        <navbar></navbar>
            <div id="sidebar">
                <form id="new-item-form" @submit.prevent="newItem">
                    <input id="title-field" type="text" required maxlength="50" name="title" placeholder ="Give Me A Title!" v-model="formData.title">
                    <textarea id="description-field" required maxlength="150" name="description" placeholder="Describe Me" v-model="formData.description"></textarea>
                    <div id="form-categories">
                        <!-- Item Categories -->
                        <p>Categories</p>
                        <input type="checkbox" name="Health" v-model="formData.health" value="Health"> Health
                        <input type="checkbox" name="Fun" v-model="formData.fun" value="Fun"> Fun
                        <input type="checkbox" name="Work" v-model="formData.work" value="Work"> Work
                        <input type="checkbox" name="School" v-model="formData.school" value="School"> School
                    </div>
                    <input type="date" required name="Due Date" v-model="formData.dueDate">
                    <button type="submit">Submit!</button>
                </form>

                <form id="filters" @submit.prevent="runFilter(listData)">
                    <p>Filters</p>
                    <input type="checkbox" name="Health" v-model="filter.health" value="Health"> Health
                    <input type="checkbox" name="Fun" v-model="filter.fun" value="Fun"> Fun
                    <input type="checkbox" name="Work" v-model="filter.work" value="Work"> Work
                    <input type="checkbox" name="School" v-model="filter.school" value="School"> School
                    <button id="filter-button" type="submit">Fitler!</button>
                </form>
            </div>

                <!-- list display -->
                <div id="list-container">
                    <h3>My List</h3>
                    <div id="my-list">
                        <div class="list-item" v-for="(listData) in myList" :key='listData.id'>
                            <span class="title">{{listData.title}}</span> <span class="completion-marker" v-show="listData.completion !== null">(Done!)</span>
                            <br>
                            <p class="description">{{listData.description}}</p>
                            <br>
                            <span class="category" v-if="listData.health == true">Health </span>
                            <span class="category" v-if="listData.fun == true">Fun </span>
                            <span class="category" v-if="listData.work == true">Work </span>
                            <span class="category" v-if="listData.school == true">School </span>
                            <br>
                            <span class="category">Due: {{listData.dueDate}}</span>
                            <br>
                            <button class="compButton" v-show="listData.completion == null" v-on:click="complete(listData.id)">Complete!</button>
                            <button class="compButton" v-show="listData.completion !== null" v-on:click="unComplete(listData.id)">Undo Complete</button>
                            <br>
                            <button id="delete" v-on:click="deleteItem(listData.id)">Delete Item</button>
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

//the collection of list items in firebase
const toDoLists = db.collection('lists')

export default{
    components: {
        Navbar
    },

    data(){
        return{
            listData: [],
            myList: [],
            formData: {},
            done: [],
            filter: {
                health : true,
                fun : true,
                work : true,
                school : true,
            },
            user: [],
            }
    },
//grabs items that the current user authored from firebase inside each of these methods
    mounted(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                return {
                        myList: toDoLists.where("madeBy", "==", user.uid)
                    }
            }
        })
    },

    updated(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                return {
                        myList: toDoLists.where("madeBy", "==", user.uid)
                    }
            }
        })      
    },

    firestore(){
        let user = firebase.auth().currentUser
        return {
            myList: toDoLists.where("madeBy", "==", user.uid)
        }
    },

    methods:{

        //Item filtering
        runFilter(){
            //This is gross and I'm sorry but it works, tried using v-show for a while but wasn't getting what I wanted
            try{
                //Grabs each list item and the desired filters entered by the user
                let items = document.getElementsByClassName("list-item")
                let input = this.filter
                items.forEach( element => {
                    //Looks inside each list item and sets variables based on the indexes of the categories
                    let health = element.childNodes[6]
                    let fun = element.childNodes[7]
                    let work = element.childNodes[8]
                    let school = element.childNodes[9]
                    console.log(school)

                    //filtering logic
                    if (input.health !== true ||
                        input.fun !== true ||
                        input.work !== true ||
                        input.school !== true
                    ){
                        element.classList.add("hide")
                        if (input.health == true && health.innerText == "Health " ||
                            input.fun == true && fun.innerText == "Fun " ||
                            input.work == true && work.innerText == "Work " ||
                            input.school == true && school.innerText == "School "
                        ){
                            if (element.classList.contains("hide")){
                                element.classList.remove("hide")
                            }
                        } 
                    }

  

                    else{
                         element.classList.remove("hide")
                    }
            })
            }catch(error){
                console.log(error)
            }
        },

    // adds a new item to the to do list
        async newItem() {
            if(this.formData.health == null && this.formData.fun == null && this.formData.work == null && this.formData.school == null ){
                alert("Please select at least one category")
            }
            else{
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
                    completion: null,
                })
                }catch(error){
                    console.log(error)
                }
            }
        },

        //removes an item from the to do list
        async deleteItem(id){
            toDoLists.doc(id).delete().then(function(){
            }).catch(function(error){
                console.error("Error removing document", error)
            })
        },

        //marks an item as completed, shows undo button
        async complete(id){
            try{
                    toDoLists.doc(id).update({
                        completion: 'Complete'
                    })
                    console.log(toDoLists.doc(id))
                }catch(error){
                console.log(error)
            }
        },

        //marks an item as incomplete, shows complete button
        async unComplete(id){
            try{
                    toDoLists.doc(id).update({
                        completion: null
                    })
                    console.log(toDoLists.doc(id))
                }catch(error){
                console.log(error)
            }
        }

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
        gap: 5em 0;
        grid-template-columns: 100%;
        padding: 1em;
        background-color: #fafafa;
        border-radius: 0 4% 4% 0;
    }

    #new-item-form{
        width: 100%;
        display: grid;
        gap: 1em 0;
    }

    #title-field{
        margin-bottom: 1em;
    }

    #description-field{
    height: 6em;
    resize: none;
    }

    #filter-button{
        width: 100%;
        margin-top: 1em;
        margin-bottom: 1em;
    }

    .description{
        word-wrap: break-word;
        height: fit-content;
    }
    .title{
        word-wrap: break-word;
        height: fit-content;
    }

    .completion-marker{
        color: #4ff0a7
    }

    #list-container{
        margin-top: 8em;
    }

    #my-list{
        justify-content: center;
        width: auto;
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 2em;
    }

    .list-item{
        width: 16em;
        height: auto;
        background-color: #fafafa;
        border-radius: 8%;
        padding: 1em;
    }

    .hide{
        display: none;
    }

    .compButton{
        margin-top: 1em
    }

    #delete{
        background-color: darkgrey;
        margin-top: 1em;
    }

    @media screen and (max-width: 1660px){
        #my-list{
            grid-template-columns: auto auto;
        }
    }

    @media screen and (max-width: 1340px){
        #my-list{
            justify-content: right;
        }
    }

    @media screen and (max-width: 768px){
        #sidebar{
            width: 100%;
            padding-left: 0;
            padding-right: 0;
            grid-template-columns: auto auto;
            position: static;
            border-radius: 0 0 4% 4%;
        }

        #list-container{
            margin-top: 1em;
        }
        
        #my-list{
            justify-content: center;
        }

        #filters{
            align-self: end;
        }

        #filter-button{
            width: 90%;
            margin-bottom: 0;
        }
    }

    @media screen and (max-width: 650px){
        .list-item{
            width: 8em;
        }
    }

</style>