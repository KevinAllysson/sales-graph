<template lang="pug">
    .box-default.mb-4
      .border-b.border-gray-700.mb-4
        span.text-xl Vendas por região
  
      .grid.grid-cols-4.gap-1
        #map.col-span-3
        div
          productPieChart
  </template>

<script>
import L from 'leaflet';
import 'leaflet.heat';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import productPieChart from './ProductPieChart.vue';

export default {
    components: {
        productPieChart
    },
    setup() {
        const map = ref(null);

        const fetchDataAndPlotHeatmap = async () => {
            try {
                const response = await axios.get('http://localhost:3000/produtos');
                const data = response.data;

                const vendasPorRegiao = agruparVendasPorRegiao(data);

                const heatmapData = Object.entries(vendasPorRegiao).map(([region, totalVendas]) => {
                    const coordinates = getRegionCoordinates(region);
                    const intensity = totalVendas / 10000; 
                    return [...coordinates, intensity];
                });

                const heatLayer = L.heatLayer(heatmapData, {
                    radius: 50, 
                    blur: 15, 
                    maxZoom: 10,
                    max: 1, 
                    minOpacity: 0.5,  
                    gradient: {  
                        0.0: '#00f', 
                        0.5: '#0f0',  
                        0.8: '#ff0', 
                        1.0: '#f00',  
                    },
                });

                heatLayer.addTo(map.value); 
            } catch (error) {
                console.error('Erro ao carregar os dados:', error);
            }
        };

        const agruparVendasPorRegiao = (produtos) => {
            return produtos.reduce((acc, produto) => {
                const { location: regiao, value } = produto;
                if (!acc[regiao]) acc[regiao] = 0;
                acc[regiao] += value;
                return acc;
            }, {});
        };

        const getRegionCoordinates = (region) => {
            const regionsCoordinates = {
                'Sul': [-29.92, -51.18],
                'Sudeste': [-23.55, -46.63],
                'Nordeste': [-8.05, -34.9],
                'Centro-Oeste': [-15.78, -47.93],
                'Norte': [-1.45, -48.5],
            };
            return regionsCoordinates[region] || [-14.235, -51.9253]; 
        };

        onMounted(() => {
            map.value = L.map('map').setView([-14.235, -51.9253], 4);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map.value);

            fetchDataAndPlotHeatmap(); 
        });

        return {};
    },
};
</script>