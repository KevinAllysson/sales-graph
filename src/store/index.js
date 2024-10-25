import { createStore } from 'vuex';
import axios from 'axios';

export const store = createStore({
    state: {
        companies: [],
        companySelected: {}
    },
    mutations: {
        SET_COMPANIES(state, companies) {
            state.companies = companies;
        },
        SET_COMPANY_SELECTED(state, company) {
            state.companySelected = company;
        },
        CLEAR_COMPANY_SELECTED(state) {
            state.companySelected = {};
        }
    },
    actions: {
        async fetchCompanies({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/empresas');
                const formattedCompanies = response.data.map(company => {
                    company.totalSales = formatCurrency(company.totalSales.toString());
                    company.goal = formatCurrency(company.goal.toString());
                    return company;
                });
                commit('SET_COMPANIES', formattedCompanies);
            } catch (err) {
                console.error(err);
            }
        },
        toggleCompany({ commit, state }, selectedCompany) {
            const isSameCompany = state.companySelected.id === selectedCompany.id;

            const updatedCompanies = state.companies.map(company => {
                company.check = company.id === selectedCompany.id ? !company.check : false;
                return company;
            });

            if (isSameCompany) {
                commit('CLEAR_COMPANY_SELECTED');
            } else {
                commit('SET_COMPANY_SELECTED', selectedCompany);
            }

            commit('SET_COMPANIES', updatedCompanies);
        }
    },
    getters: {
        allCompanies: state => state.companies,
        selectedCompany: state => state.companySelected
    }
});

export function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(Number(value))) return "R$ 0,00";

    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

