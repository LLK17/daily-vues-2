<template>
    <div>
        <navbar></navbar>
        <div id="container">
            <img src="../assets/logo.png">
            <h1>Welcome!</h1>

        </div>
    </div>

</template>

<script>
    import Navbar from './Navbar'
    export default{
        components:{
            Navbar
        } 
    }

</script>

<style scoped>
    #container{
        display: grid;
        height: 100%;
        width: 100%;
        justify-items: center;
        align-content: center;
    }
</style>