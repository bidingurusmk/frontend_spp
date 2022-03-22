import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import {createWebHistory,createRouter} from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Transaksi from './components/Transaksi.vue';
import Histori from './components/Histori.vue';
import Histori_petugas from './components/Histori_petugas.vue';

const router = createRouter({
	history : createWebHistory(),
	routes : [
		{path: '/', name: "Home", component : Home},
		{path: '/login', name: "Login", component : Login},
		{path: '/transaksi', name: "Transaksi", component : Transaksi},
		{path: '/histori', name: "Histori", component : Histori},
		{path: '/histori_petugas', name: "Histori_petugas", component : Histori_petugas},
	],
	base : '/'
});

var app=createApp(App)
app.use(router)
app.config.globalProperties.axios = axios
app.mount('#app');
