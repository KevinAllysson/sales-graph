<template lang="pug">
    .analytics-display
      companies
      .w-full.page
        .font-black.text-3xl.w-full.text-start.flex.flex-col.pt-1.pb-2.pl-4
          | Bem-vindo
          span.font-normal.text-base.pt-2.leading-tight
            | Esse sistema proporcionará uma gestão mais eficiente e automatizada das análises de vendas realizadas pelas empresas, permitindo maior agilidade na tomada de decisões estratégicas.
        salesChart
        div(class="grid lg:grid-cols-4 grid-cols-1")
          .col-span-3
            productTable
          div
            leadingCompanies
        heatMap
  </template>
<script>
import companies from '../components/CompaniesList.vue';
import salesChart from '../components/SalesChart.vue';
import productTable from '../components/ProductTable.vue';
import heatMap from '../components/HeatMap.vue';
import leadingCompanies from '../components/LeadingCompanies.vue';

export default {
    components: {
        companies,
        salesChart,
        productTable,
        heatMap,
        leadingCompanies
    }
}
</script>