<template lang="pug">
  div.design-page
    template(v-if="isLoading")
      Loading
    template(v-else)
      mainPage
</template>

<script>
import { ref, onMounted } from 'vue';
import mainPage from '/src/views/MainPage.vue';
import Loading from './assets/Loading.vue';

export default {
  components: { mainPage, Loading },
  setup() {
    const isLoading = ref(true);

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 2000); 
    });

    return {
      isLoading,
    };
  },
};
</script>
