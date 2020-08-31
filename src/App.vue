<template>
  <div id="app">
    <router-view>
    </router-view>


  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  },
}

</script>

<style>
  a{
    text-decoration: none;
  }

  a:visited{
    color: black
  }

 #app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 4em;
  height: auto
 }

 body{
   margin: 0;
   margin-bottom: 4em;
 }

 button{
   background-color: #4ff0a7;
   border: none;
   padding: .6em;
   cursor: pointer;
 }

</style>