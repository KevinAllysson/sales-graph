import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { store } from './store';
import router from './router'; 

import ptBr from 'element-plus/es/locale/lang/pt-br';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'leaflet/dist/leaflet.css';

import Toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// Criação da instância do aplicativo
const app = createApp(App);

// Registro dos plugins e dependências
app.use(ElementPlus, { locale: ptBr });
app.use(Toast);
app.use(store);
app.use(router);

// Monta o aplicativo
app.mount('#app');
