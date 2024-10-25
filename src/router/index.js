import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/MainPage.vue';
import LoginView from '../views/Login.vue';

// Configuração das rotas
const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/dashboard',
        name: 'home',
        component: HomeView
    }
];

// Criação do router
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
