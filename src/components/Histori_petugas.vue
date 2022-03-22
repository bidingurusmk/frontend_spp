<template>
	<div class="container">
		<h1>Histori Pembayaran</h1>
		<table class="table table-hover table-striped">
			<thead>
				<tr>
					<th>NO</th><th>Nama</th><th>Nominal</th><th>Bulan</th><th>Tahun</th><th>Status Bayar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(tm, index) in datahistori" :key="tm.id">
					<td>{{index+1}}</td><td>{{tm.nama}}</td><td>{{tm.nominal}}</td><td>{{tm.bulan_spp}}</td><td>{{tm.tahun_spp}}</td><td>{{tm.status_lunas}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>

	export default{
		name:"Histori_page",
		data(){
			return {
				datahistori:[]
			}
		},
		methods:{
			gethistori : function(){
				var option = {
						headers:{Authorization: "bearer "+localStorage.getItem('token')}
					};
				this.axios.get("http://localhost:81/spp_app/public/api/gethistori_petugas",option).then((result)=>{
					console.log(result)
					this.datahistori=result.data
				});
			}
		},
		mounted(){
			this.gethistori()
		}
	}
</script>