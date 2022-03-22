<template>
  <div v-if="authenticated">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" v-if="role == 'petugas'">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/transaksi">Transaksi</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/histori_petugas">Histori</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-on:click="logout()">Logout</a>
          </li>
          
        </ul>
        <ul class="navbar-nav mr-auto" v-if="role == 'admin'">
          <li class="nav-item active">
            <router-link to="/" class="nav-link" >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/histori">Histori</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" v-on:click="logout()">Logout</a>
          </li>
          
        </ul>
        <ul class="nav justify-content-end">
          <li class="nav-item">
            {{nama}}
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
  <div v-else>
    <router-view @authenticated="setAuthenticated"></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      authenticated: localStorage.getItem('status'),   
      nama: '',
      role: '',
    }
  },
  methods:{
    logout(){
      this.authenticated=false;
      localStorage.clear();
      this.redirectlogin()
    },
    redirectlogin(){
      if(!this.authenticated){
        this.$router.replace({name:"Login"})
      }
    },
    setAuthenticated(status){
      this.authenticated=status
    }
  },
  mounted(){
    this.redirectlogin()
    if(JSON.parse(localStorage.getItem('user'))!=null){
      this.nama=JSON.parse(localStorage.getItem('user')).nama_petugas
      this.role=JSON.parse(localStorage.getItem('user')).role
    }
  }
}
</script>