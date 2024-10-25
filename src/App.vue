<template lang="pug">
  div.design-page
    template(v-if="isLoading")
      Loading
    template(v-else)
      router-view
  </template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from './assets/Loading.vue';

export default {
  components: { Loading },
  setup() {
    const isLoading = ref(false); 
    const router = useRouter();
    const route = useRoute();

    router.beforeEach((to, from, next) => {
      if (to.path === '/dashboard') {
        isLoading.value = true; 
      }
      next(); 
    });

    router.afterEach(() => {
      setTimeout(() => {
        isLoading.value = false; 
      }, 3000); 
    });

    return {
      isLoading,
    };
  },
};
</script>