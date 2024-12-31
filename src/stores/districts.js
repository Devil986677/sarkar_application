import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useDistrictsStore = defineStore('Districts', () => {
  const districts = ref([]);
  const district = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all districts (index)
  const fetchDistricts = async () => {
    try {
      const response = await api.get('/districts', { headers });
      districts.value = response.data;
    } catch (error) {
      console.error('Error fetching districts:', error.response?.data || error.message);
    }
  };

  // Fetch a single district by ID (show)
  const fetchDistrict = async (id) => {
    try {
      const response = await api.get(`/districts/${id}`, { headers });
      district.value = response.data;
    } catch (error) {
      console.error(`Error fetching district ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new district (store)
  const createDistrict = async (data) => {
    try {
      const response = await api.post('/districts', data, { headers });
      districts.value.push(response.data); // Add the new district to the list
    } catch (error) {
      console.error('Error creating district:', error.response?.data || error.message);
    }
  };

  // Update an existing district by ID (update)
  const updateDistrict = async (id, data) => {
    try {
      const response = await api.put(`/districts/${id}`, data, { headers });
      // Update the local data with the response
      const index = districts.value.findIndex((d) => d.id === id);
      if (index !== -1) {
        districts.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating district ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a district by ID (destroy)
  const deleteDistrict = async (id) => {
    try {
      await api.delete(`/districts/${id}`, { headers });
      // Remove the deleted district from the list
      districts.value = districts.value.filter((d) => d.id !== id);
    } catch (error) {
      console.error(`Error deleting district ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    districts,
    district,
    fetchDistricts,
    fetchDistrict,
    createDistrict,
    updateDistrict,
    deleteDistrict,
  };
});
