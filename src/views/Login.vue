<template lang="pug">
    .login-container
      .view-login
        .box-login
          span.welcome
            | Boas-vindo!
            span.text-base.font-normal
              | Acesse sua plataforma e explore as análises detalhadas das empresas cadastradas.
          div
            .flex.flex-col
              input.sty-input(
                type="text"
                v-model="username"
                placeholder="Seu nome de usuário..."
                autocomplete="off"
              )
            .flex.flex-col
              input.sty-input(
                type="password"
                v-model="password"
                placeholder="Digite sua senha..."
                autocomplete="off"
              )
            .my-4
              button.btn-login(@click="handleLogin") Acessar
    </template>


<script>
import { ref, getCurrentInstance } from 'vue';

export default {
    setup() {
        const username = ref('');
        const password = ref('');
        const { proxy } = getCurrentInstance();

        const handleLogin = () => {
            if (username.value) {
                proxy.$toast.success(`Bem-vindo, ${username.value}!`);
                proxy.$router.push('/dashboard');
            } else {
                proxy.$toast.error('Por favor, digite um nome de usuário.');
            }
        };

        return {
            username,
            password,
            handleLogin,
        };
    },
};
</script>

<style>
.login-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../assets/wallpaper.jpg') no-repeat center center;
    background-size: cover;
    z-index: 0;
    opacity: 0.4;
}

.view-login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(43, 50, 78, 0.9);
    padding: 40px;
    border-radius: 10px;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-login {
    width: 350px;
}

.welcome {
    font-size: 32px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    text-align: start;
    margin: 15px 0;
}

.sty-input {
    background-color: #404668;
    padding: 17px;
    border-radius: 2px;
    margin: 1px 0;
    color: white;
    outline: none;
}

.sty-input:focus {
    border-left: 6px solid #1c2029;
}

.btn-login {
    background-color: #1c2029;
    padding: 10px 0;
    text-align: center;
    border-radius: 7px;
    font-weight: bold;
    width: 100%;
}

.btn-login:hover {
    background-color: #282e3b;
    cursor: pointer;
}

.btn-login:active {
    position: relative;
    top: 2px;
}
</style>