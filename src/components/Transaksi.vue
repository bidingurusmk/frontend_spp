<template>
	<div>
		<h1>Transaksi Pembayaran SPP</h1>
		<input type="text" v-model="nisn" class="form-control">
		<button class="btn btn-success" v-on:click="cari()">Cari</button>
		<div v-if="statusgetsiswa">
			<h3>Data Pribadi</h3>
			<table class="table table-hover table-striped">
				<tbody>
					<tr>
						<td>Nama Siswa</td><td>{{nama_siswa}}</td>
					</tr>
					<tr>
						<td>Nama Kelas</td><td>{{kelas}}</td>
					</tr>
					<tr>
						<td>BIAYA SPP</td><td>Rp. {{biaya}}</td>
					</tr>
				</tbody>
			</table>
			<h3>Tunggakan</h3>
			<table class="table table-hover table-striped">
				<thead>
					<tr>
						<th>NO</th><th>Bulan</th><th>Tahun</th><th>Bayar</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(tung,index) in tunggakan" :key="tung.id">
						<td>{{index+1}}</td><td>{{tung.bulan_spp}}</td><td>{{tung.tahun_spp}}</td><td><button class="btn btn-success" v-on:click="bayar(tung.bulan_spp,tung.tahun_spp)">Bayar</button></td>
					</tr>
				</tbody>
			</table>
			<div v-if="status_bayar=='berhasil'">
				<div class="alert alert-success">{{message}}</div>
			</div>
			<div v-if="status_bayar=='gagal'">
				<div class="alert alert-danger">{{message}}</div>
			</div>
		</div>
		<div v-else>
			<h4 align="center">Tidak Ada Data</h4>
		</div>
	</div>
</template>
<script>

	export default{
		name:"Transaksi_page",
		data(){
			return {
				nisn:'',
				statusgetsiswa:false,
				nama_siswa:'',
				kelas:'',
				tunggakan:[],
				biaya:0,
				status_bayar:'',
				message:'',
			}
		},
		methods:{
			cari:function(){
				if(this.nisn!=''){
					var option = {
						headers:{Authorization: "bearer "+localStorage.getItem('token')}
					};
					this.axios.get("http://localhost:81/spp_app/public/api/getsiswabynisn/"+this.nisn, option).then((result)=>{
						console.log(result)
						if(result.data!=null){
							this.statusgetsiswa=true
							this.nama_siswa=result.data.nama_siswa
							this.kelas=result.data.kelas+" "+result.data.jurusan
							this.tunggakan=result.data.tunggakan
							this.biaya=result.data.biaya.toLocaleString()
						} else {
							this.statusgetsiswa=false
						}
					})
				} else {
					this.statusgetsiswa=false
				}
			},
			bayar:function(bulan,tahun){
				var option = {
						headers:{Authorization: "bearer "+localStorage.getItem('token')}
					};
					var data_input={
						nisn: this.nisn,
						bulan_spp: bulan,
						tahun_spp: tahun,
					}
					this.axios.post("http://localhost:81/spp_app/public/api/pembayaran", data_input, option).then((result)=>{
						console.log(result)
						if(result.data.status==true){
							this.status_bayar="berhasil"
							this.message=result.data.message
							this.cari()
						} else {
							this.status_bayar="gagal"
							this.message=result.data.message
						}
					})
			}
		}
	}
</script>