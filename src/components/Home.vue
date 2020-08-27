<template>
    <div>
        <form id="new-item-form" @submit.prevent="newItem">
            <input id="title-field" type="text" maxlength="25" name="title" placeholder ="Give Me A Title!" v-model="formData.title">
            <textarea id="description-field" maxlength="100" name="description" placeholder="Describe Me" v-model="formData.description"></textarea>
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

            <!-- list display -->
            <h3>My List</h3>
            <div id="my-list">
            <div id="list-item" v-for="(listData) in toDoLists" :key='listData.id'>
                {{listData.title}}
                <br>
                {{listData.description}}
                <br>
                {{listData.health}}
                {{listData.fun}}
                {{listData.work}}
                {{listData.school}}
                <br>
                Due: {{listData.dueDate}}
                <br>
                <button v-on:click="deleteItem(listData.id)">Delete Item</button>
            </div>
            </div>
    </div>

</template>

<script>
import { db } from '../db'
export default{
    name: 'Home',

    data(){
    return{
      toDoLists: null,
      formData: {},
      state: 'loading',
    }
  },

  firestore(){
    return{
      toDoLists: db.collection('lists'),
    }
  },

  methods:{
    // adds a new item to the to do list
    async newItem() {
        db.collection('lists').add({
          title: this.formData.title,
          description: this.formData.description,
          health: this.formData.health,
          fun: this.formData.fun,
          work: this.formData.work,
          school: this.formData.school,
          dueDate: this.formData.dueDate,
          }).catch(function(error){
        this.errorMessage = JSON.stringify(error)
        this.state = 'error'
      })
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
    #new-item-form{
    width: 20em;
    display: grid;
    gird-template-rows: auto auto auto auto auto auto;
    gap: 1em 0;
    }

    #title-field{
    margin-bottom: 1em;
    }

    #description-field{
    height: 6em;
    resize: none;
    }

    #my-list{
    display: grid;
    grid-template-columns: auto auto auto
    }
</style>