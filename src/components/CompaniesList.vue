<template lang="pug">
    .list-companies.w-96
      .text-xl.border-b-4.p-4.flex.flex-col.pb-2.font-bold.border-gray-900
        | Empresas
        span.font-normal.text-sm.italic Acompanhe as vendas das empresas cadastradas.
        
      div.my-2.px-4(v-for="(company, indx) in companies" :key="indx")
        .flex.py-2.px-4.rounded-t-md.flex-row.justify-between.items-center.cursor-pointer(:class="{ 'bg-gray-800': company.check }")(@click="toggleCompany(company)")
          .flex.flex-row.justify-between.items-center
            div
              span.text-xl.font-bold {{ company.name }}
              div.text-sm.italic Total de vendas: {{ company.totalSales }}
          
          div
            i(:class="company.check ? 'bi bi-chevron-up' : 'bi bi-chevron-down'")
  
        div.flex.flex-col.gap-1.px-4.pt-1.pb-4.bg-gray-800.rounded-b-md(v-if="company.check")
          div
            span.w-32.inline-block.font-semibold Nome:
            span {{ companySelected.name }}
          div
            span.w-32.inline-block.font-semibold Total:
            span.text-slate-400 {{ companySelected.totalSales }}
          div
            span.w-32.inline-block.font-semibold Meta:
            span.text-emerald-300 {{ companySelected.goal }}
          div
            span.w-32.inline-block.font-semibold País/estado:
            span {{ companySelected.country }}/{{ companySelected.state }}
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const companies = computed(() => store.getters.allCompanies);
    const companySelected = computed(() => store.getters.selectedCompany);

    const toggleCompany = (selectedCompany) => {
      store.dispatch('toggleCompany', selectedCompany);
    };

    onMounted(() => {
      store.dispatch('fetchCompanies');
    });

    return {
      companies,
      companySelected,
      toggleCompany
    };
  }
};

</script>
