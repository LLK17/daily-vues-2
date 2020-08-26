<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <form @submit.prevent="newItem">
      <input id="titleField" type="text" name="title" placeholder ="Give Me A Title!">
      <br>
      <textarea id="descriptionField" maxlength="100" name="description" placeholder="Describe Me"></textarea>
      <p>Categories</p>
      <input type="radio" name="Health"> Health
      <input type="radio" name="Fun"> Fun
      <input type="radio" name="Work"> Work
      <input type="radio" name="School"> School
    </form>
  </div>
</template>

<script>

// import { db } from './db'

export default {
  name: 'App',
  components: {
    
  },


  newItem(){
    console.log("hi")
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#titleField{
  margin-bottom: 1em;
}

#descriptionField{
height: 6em;
resize: none;
}

</style>
