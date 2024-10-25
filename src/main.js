import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { store } from './store';

import ptBr from 'element-plus/es/locale/lang/pt-br';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'leaflet/dist/leaflet.css';

const app = createApp(App);

app.use(ElementPlus, {
    locale: ptBr,
});
app.use(ElementPlus);
app.use(store);
app.mount('#app');
