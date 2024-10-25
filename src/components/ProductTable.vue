<template lang="pug">
  .box-default
    .border-b.border-gray-700
      span.text-xl Tabela de Produtos

    el-form.filters(label-position="top" size="mini")
      .flex.flex-row.justify-start.gap-2
        el-form-item(label="Data")
          el-date-picker.teste(
            v-model="filter.date"
            type="date"
            placeholder="Selecione a Data"
            format="DD/MM/YYYY"
            value-format="YYYY-MM-DD"
            :default-value="new Date()"
            :picker-options="{ firstDayOfWeek: 1 }"
          )
        el-form-item(label="Categoria")
          el-select(v-model="filter.category" placeholder="Selecione a Categoria")
            el-option(
              v-for="category in uniqueCategories"
              :key="category"
              :label="category"
              :value="category"
            )
        el-form-item(label="Região")
          el-select(v-model="filter.location" placeholder="Selecione a Região")
            el-option(
              v-for="region in uniqueRegions"
              :key="region"
              :label="region"
              :value="region"
            )

      .flex.flex-row.justify-center
        el-form-item
          el-button(@click="applyFilters" type="primary") Aplicar Filtros
        el-form-item
          el-button(@click="resetFilters") Resetar Filtros

    el-table(:data="paginatedData" style="width: 100%" v-if="filteredProducts.length > 0")
      el-table-column(prop="name" label="Nome do Produto" sortable)
      el-table-column(prop="category" label="Categoria" sortable)
      el-table-column(prop="location" label="Região" sortable)

      el-table-column(prop="value" label="Valor (R$)" sortable :sort-method="sortByValue")
        template(#default="{ row }") {{ formatCurrency(row.value) }}

      el-table-column(prop="data" label="Data" sortable :sort-method="sortByDate")
        template(#default="{ row }") {{ formatDate(row.data) }}

    el-pagination(
      v-if="filteredProducts.length > 0"
      layout="prev, pager, next"
      :total="filteredProducts.length"
      :page-size="pageSize"
      @current-change="handlePageChange"
    )

    p(v-else) Nenhum produto encontrado.
</template>
<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { formatCurrency } from '../store/index';
import dayjs from 'dayjs';

export default {
	setup() {
		const products = ref([]);
		const filteredProducts = ref([]);
		const currentPage = ref(1);
		const pageSize = ref(5);

		const filter = ref({
			date: null,
			category: '',
			location: '',
		});

		const uniqueCategories = computed(() =>
			products.value.length
				? [...new Set(products.value.map(product => product.category))]
				: []
		);

		const uniqueRegions = computed(() =>
			products.value.length
				? [...new Set(products.value.map(product => product.location))]
				: []
		);

		const fetchProducts = async () => {
			try {
				const response = await axios.get('http://localhost:3000/produtos');
				products.value = response.data;
				filteredProducts.value = response.data;
			} catch (error) {
				console.error('Erro ao carregar os produtos:', error);
			}
		};

		const applyFilters = () => {
			let result = [...products.value];

			if (filter.value.date) {
				const selectedDate = dayjs(filter.value.date).startOf('day');

				result = result.filter(product => {
					const productDate = dayjs(product.data).startOf('day');
					return productDate.isSame(selectedDate, 'day');
				});
			}

			if (filter.value.category) {
				result = result.filter(
					product => product.category === filter.value.category
				);
			}

			if (filter.value.location) {
				result = result.filter(
					product => product.location === filter.value.location
				);
			}

			filteredProducts.value = result;
			currentPage.value = 1; 
		};

		const resetFilters = () => {
			filter.value = { date: null, category: '', location: '' };
			filteredProducts.value = [...products.value];
		};

		const handlePageChange = page => {
			currentPage.value = page;
		};

		const paginatedData = computed(() => {
			const start = (currentPage.value - 1) * pageSize.value;
			return filteredProducts.value.slice(start, start + pageSize.value);
		});

		const formatDate = date => {
			return dayjs(date).format('DD/MM/YYYY');
		};

		const sortByDate = (a, b) => dayjs(a.data).unix() - dayjs(b.data).unix();
		const sortByValue = (a, b) => a.value - b.value;

		onMounted(() => {
			fetchProducts();
		});

		return {
			filter,
			uniqueCategories,
			uniqueRegions,
			filteredProducts,
			applyFilters,
			resetFilters,
			paginatedData,
			pageSize,
			handlePageChange,
			formatCurrency,
			formatDate,
			sortByDate,
			sortByValue,
		};
	},
};
</script>