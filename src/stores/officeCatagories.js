import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useOfficeCategoriesStore = defineStore('OfficeCategories', () => {
  const officeCategories = ref([]);
  const officeCategory = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all office categories (index)
  const fetchOfficeCategories = async () => {
    try {
      const response = await api.get('/office-category', { headers });
      officeCategories.value = response.data.data;
      console.log('officessssssssssssssss',response.data)
    } catch (error) {
      console.error('Error fetching office categories:', error.response?.data || error.message);
    }
  };

  // Fetch a single office category by ID (show)
  const fetchOfficeCategory = async (id) => {
    try {
      const response = await api.get(`/office-categories/${id}`, { headers });
      officeCategory.value = response.data;
    } catch (error) {
      console.error(`Error fetching office category ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new office category (store)
  const createOfficeCategory = async (data) => {
    try {
      const response = await api.post('/office-categories', data, { headers });
      officeCategories.value.push(response.data); // Add the new office category to the list
    } catch (error) {
      console.error('Error creating office category:', error.response?.data || error.message);
    }
  };

  // Update an existing office category by ID (update)
  const updateOfficeCategory = async (id, data) => {
    try {
      const response = await api.put(`/office-categories/${id}`, data, { headers });
      // Update the local data with the response
      const index = officeCategories.value.findIndex((oc) => oc.id === id);
      if (index !== -1) {
        officeCategories.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating office category ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete an office category by ID (destroy)
  const deleteOfficeCategory = async (id) => {
    try {
      await api.delete(`/office-categories/${id}`, { headers });
      // Remove the deleted office category from the list
      officeCategories.value = officeCategories.value.filter((oc) => oc.id !== id);
    } catch (error) {
      console.error(`Error deleting office category ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    officeCategories,
    officeCategory,
    fetchOfficeCategories,
    fetchOfficeCategory,
    createOfficeCategory,
    updateOfficeCategory,
    deleteOfficeCategory,
  };
});
