<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import RegTerms from './components/RegTerms.vue'
import RegForm from './components/RegForm.vue'
import VueRouter from 'vue-router'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path:'/', component: Login},
        {path:'/register', component: RegTerms},
        {path: '/regForm', component: RegForm}
    ]
})

export default {
  name: 'App',
  router
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 140px;}
</style>
