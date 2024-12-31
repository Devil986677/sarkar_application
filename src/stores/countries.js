// import { defineStore } from 'pinia';
// import api from '../boot/axios';
// import { ref } from 'vue';
//
// import { useRouter } from 'vue-router';
//
// export const UseCountriesStore= defineStore('Countries',()=>{
//   const countries= ref([]);
//
//   const token = localStorage.getItem('token');
//   console.log('sasa',token)
//    const fetchData=async ()=>{
//      try{
//        const response = await api.get('/countries', {
//          headers: {
//            Authorization: `Bearer ${token}`,
//          },
//        });
//        countries.value =response.data;
// //
//
//      }catch (error){
//        console.error('error',error)
//      }
//
//    }
//   return{
//
//
//     countries,fetchData,
//
//   }
// });




import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useCountriesStore = defineStore('Countries', () => {
  const countries = ref([]);
  const country = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all countries (index)
  const fetchData = async () => {
    try {
      const response = await api.get('/countries', { headers });
      countries.value = response.data;
    } catch (error) {
      console.error('Error fetching countries:', error.response?.data || error.message);
    }
  };

  // Fetch a single country by ID (show)
  const fetchCountry = async (id) => {
    try {
      const response = await api.get(`/countries/${id}`, { headers });
      country.value = response.data;
    } catch (error) {
      console.error(`Error fetching country ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new country (store)
  const createCountry = async (data) => {
    try {
      const response = await api.post('/countries', data, { headers });
      countries.value.push(response.data);
    } catch (error) {
      console.error('Error creating country:', error.response?.data || error.message);
    }
  };

  // Update an existing country by ID (update)
  const updateCountry = async (id, data) => {
    try {
      const response = await api.put(`/countries/${id}`, data, { headers });
      // Update the local data with the response
      const index = countries.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        countries.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating country ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a country by ID (destroy)
  const deleteCountry = async (id) => {
    try {
      await api.delete(`/countries/${id}`, { headers });
      // Remove the deleted country from the list
      countries.value = countries.value.filter((c) => c.id !== id);
    } catch (error) {
      console.error(`Error deleting country ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    countries,
    country,
    fetchData,
    fetchCountry,
    createCountry,
    updateCountry,
    deleteCountry,
  };
});













//
// import {defineStore} from 'pinia'
// import useCommonStore from "stores/common/CommonStore";
// import {ref} from "vue";
// import {api} from "boot/axios";
//
// export const useForcedLabourStore = defineStore('useForcedLabourStore', () => {
//
//   const storeUrl = ref('forced-labours')
//
//   const {
//     serverPagination,
//     filters,
//     loading,
//     all,
//     t,
//     q,
//     formRef,
//     formDialog,
//     formData,
//     detailData,
//     detailDialog,
//     errors,
//     filterDialog,
//     getAll,
//     fetchDataById,
//     onRequest,
//     store,
//     update,
//     remove,
//     createFunction,
//     clearFunction,
//     closeFunction,
//     exportFunction,
//     edit,
//     submitFormData,
//     confirmDelete,
//     fetchPaged,
//     toggleStatus,
//     closeFilterDialog,
//     importDialog,
//     closeImportForm,
//     importFile,
//     importFunction,
//
//
//   } = useCommonStore(storeUrl.value)
//
//   const resetFormData = () => {
//     formData.value = {
//       address: {},
//       extras: {}
//     }
//   }
//
//   return {
//     storeUrl,
//     serverPagination,
//     filters,
//     loading,
//     all,
//     t,
//     q,
//     formRef,
//     formDialog,
//     formData,
//     detailData,
//     detailDialog,
//     errors,
//     filterDialog,
//     getAll,
//     fetchDataById,
//     onRequest,
//     store,
//     update,
//     remove,
//     createFunction,
//     closeFunction,
//     exportFunction,
//     edit,
//     submitFormData,
//     confirmDelete,
//     fetchPaged,
//     clearFunction,
//     toggleStatus,
//     resetFormData,
//     closeFilterDialog,
//     importDialog,
//     importFile,
//     closeImportForm,
//     importFunction,
//
//
//   }
// })
