<template>
	<div class="container">
		<h1>Login Pages</h1>
		Email: 
		<input name="username" v-model="username" type="text" class="form-control">
		<br>
		Password:
		<input name="password" v-model="password" type="password" class="form-control">
		<input type="button" name="login" value="Login" class="btn btn-success" v-on:click="login()">
	</div>
</template>

<script>
	export default{
		name : "Login",
		data(){
			return {
				username:'',
				password:'',
			}
		},
		methods:{
			login(){
				var datalogin={
					username: this.username,
					password: this.password,
				};
				this.axios.post("http://localhost:81/spp_app/public/api/login", datalogin).then((response)=>{
					localStorage.setItem('token',response.data.token)
					localStorage.setItem('user',JSON.stringify(response.data.datauser))
					localStorage.setItem('status',true)
					console.log(response)
					this.$emit('authenticated',true)
					//this.$router.push('/')
					location.href="/"
				}).catch(error=>{
				console.log(error)
					alert('Password Salah')
				})
				
			}
		},
		mounted(){
			this.$emit('authenticated',false)
		}
	}
</script>