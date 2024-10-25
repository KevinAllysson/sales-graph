<template lang="pug">
    .box-default.mb-4
      canvas(ref="chartCanvas")
  </template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
    setup() {
        const chart = ref(null);
        const chartCanvas = ref(null);
        const predefinedColors = [
            '#8e44ad',
            '#2980b9',
            '#e74c3c',
            '#16a085',
            '#3498db',
            '#9b59b6',
            '#2ecc71',
            '#27ae60',
            '#34495e',
            '#2c3e50',
        ];

        const fetchProductsAndRenderChart = async () => {
            try {
                const response = await axios.get('http://localhost:3000/produtos');
                const products = response.data;

                const salesData = agruparVendasPorRegiao(products);
                renderChart(salesData);
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        const agruparVendasPorRegiao = (products) => {
            const salesByRegion = products.reduce((acc, product) => {
                const { location, value } = product;
                if (!acc[location]) acc[location] = 0;
                acc[location] += value;
                return acc;
            }, {});

            const totalSales = Object.values(salesByRegion).reduce((acc, val) => acc + val, 0);

            return Object.entries(salesByRegion).map(([region, total]) => ({
                region,
                percentage: ((total / totalSales) * 100).toFixed(2),
                totalSales: total,
            }));
        };

        const renderChart = (data) => {
            if (chart.value) {
                chart.value.destroy();
            }

            const ctx = chartCanvas.value.getContext('2d');

            chart.value = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: data.map(item => item.region),
                    datasets: [
                        {
                            data: data.map(item => item.totalSales),
                            backgroundColor: predefinedColors.slice(0, data.length),
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 0.9,
                    borderRadius: 7,
                    borderColor: '#1C2029',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: {
                                    size: 16,
                                },
                                usePointStyle: true,
                                pointStyle: "circle",
                                boxWidth: 8,
                                boxHeight: 8,
                            },
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => {
                                    const region = data[tooltipItem.dataIndex];
                                    return `${region.region}: ${region.percentage}% (${formatCurrency(region.totalSales)})`;
                                },
                            },
                        },
                    },
                },
            });
        };

        const formatCurrency = (value) => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(value);
        };

        onMounted(() => {
            fetchProductsAndRenderChart();
        });

        return {
            chartCanvas,
        };
    },
};
</script>
