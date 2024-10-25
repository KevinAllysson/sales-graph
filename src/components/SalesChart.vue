<template lang="pug">
    section.box-default
      div.border-b.border-gray-700
       span.text-xl Vendas por Empresa
      .chart-container.my-4
        canvas#barChart
  </template>

<script>
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { formatCurrency } from '../store/index';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
    name: 'SalesChart',
    setup() {
        const chart = ref(null);
        const chartData = ref(null);

        const predefinedColors = [
            '#8e44ad',
            '#2980b9',
            '#1abc9c',
            '#34495e',
            '#3498db',
            '#2ecc71',
            '#27ae60',
            '#16a085',
            '#9b59b6',
            '#2c3e50'
        ];

        const monthOrder = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/empresas');
                const empresas = response.data;

                empresas.forEach(empresa => {
                    empresa.months.sort((a, b) =>
                        monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
                    );
                });

                const labels = empresas[0].months.map(month => month.month);

                const datasets = empresas.map((empresa, index) => ({
                    label: empresa.name,
                    backgroundColor: predefinedColors[index] || '#bdc3c7',
                    data: empresa.months.map(month => month.value)
                }));

                chartData.value = {
                    labels: labels,
                    datasets: datasets
                };
            } catch (err) {
                console.error('Erro ao carregar os dados:', err);
            }
        };


        const setupChart = () => {
            const ctx = document.getElementById('barChart').getContext('2d');
            chart.value = new Chart(ctx, {
                type: 'bar',
                data: chartData.value,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    aspectRatio: 0.8,
                    borderRadius: 7,
                    plugins: {
                        legend: {
                            display: true,
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
                                label: (context) => {
                                    const value = context.raw;
                                    return formatCurrency(value);
                                }
                            }
                        }
                    },
                },
            });
        };

        onMounted(async () => {
            await fetchData();
            setupChart();
        });

        return {
            chartData,
            chart,
        };
    },
};
</script>