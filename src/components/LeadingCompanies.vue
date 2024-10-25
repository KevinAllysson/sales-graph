<template lang="pug">
  .box-default.leading
    .border-b.border-gray-700
      span.text-xl Empresas Líderes

    .mt-4
      div(
        v-for="(company, index) in sortedCompanies"
        :key="company.id"
        class="mb-2"
      )
        .box-leading
          .flex.justify-between.items-center.pb-1
            span.text-xl.font-bold.tracking-wide 
              | {{ index + 1 }}° {{ company.name }}
            .flex.items-center.space-x-2
              i(:class="['bi', index % 3 === 1 ? 'bi-chevron-down text-red-500' : 'bi-chevron-up text-green-500']")
              span {{ getRandomGrowthPercentage() }}%

          span.text-gray-400.italic {{ formatCurrency(company.totalSales) }}
</template>



<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { formatCurrency } from "../store/index"; 

export default {
  setup() {
    const companies = ref([]);

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/empresas");
        companies.value = response.data;
      } catch (error) {
        console.error("Erro ao carregar as empresas:", error);
      }
    };

    const sortedCompanies = computed(() =>
      companies.value.sort((a, b) => b.totalSales - a.totalSales)
    );

    const getRandomGrowthPercentage = () => {
      return Math.floor(Math.random() * 20) + 1; 
    };

    onMounted(() => {
      fetchCompanies();
    });

    return {
      sortedCompanies,
      formatCurrency,
      getRandomGrowthPercentage,
    };
  },
};
</script>