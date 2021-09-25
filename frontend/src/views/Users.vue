<template>
<div >
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-primary navbar-toggler position-relative">
        <div class="container-fluid ">
            <a class="navbar-brand position-absolute top-50 start-50 translate-middle" href="#">Painel de usuarios</a>
    <h5 class="card-header" ></h5>
    </div>
    </nav>
        <div  v-for="user in users" :key="user.id" > 
            <b-avatar  variant="success" style="max-width: 300px;"  ></b-avatar>
                <h5 class="card-title">Nome: {{user.nome}}</h5>
                <p class="card-text">Idade: {{user.age}}</p><hr>  
        </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    created(){

        
        axios.get("http://localhost:45678/users").then(res => {
            console.log(res)
            this.users = res.data.users
        }).catch(err =>{
            console.log(err)
        })
        console.log("Requisião Ok!")
    },
    data(){
        return{
            users:[],
            
        }
    },
      
    
}
</script>

<style scoped>
</style>