import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useOfficesStore = defineStore('Offices', () => {
  const offices = ref([]);
  const office = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all offices (index)
  const fetchOffices = async () => {
    try {
      const response = await api.get('/offices', { headers });
      offices.value = response.data;
    } catch (error) {
      console.error('Error fetching offices:', error.response?.data || error.message);
    }
  };

  // Fetch a single office by ID (show)
  const fetchOffice = async (id) => {
    try {
      const response = await api.get(`/offices/${id}`, { headers });
      office.value = response.data;
    } catch (error) {
      console.error(`Error fetching office ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new office (store)
  const createOffice = async (data) => {
    try {
      const response = await api.post('/offices', data, { headers });
      offices.value.push(response.data); // Add the new office to the list
    } catch (error) {
      console.error('Error creating office:', error.response?.data || error.message);
    }
  };

  // Update an existing office by ID (update)
  const updateOffice = async (id, data) => {
    try {
      const response = await api.put(`/offices/${id}`, data, { headers });
      // Update the local data with the response
      const index = offices.value.findIndex((o) => o.id === id);
      if (index !== -1) {
        offices.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating office ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete an office by ID (destroy)
  const deleteOffice = async (id) => {
    try {
      await api.delete(`/offices/${id}`, { headers });
      // Remove the deleted office from the list
      offices.value = offices.value.filter((o) => o.id !== id);
    } catch (error) {
      console.error(`Error deleting office ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    offices,
    office,
    fetchOffices,
    fetchOffice,
    createOffice,
    updateOffice,
    deleteOffice,
  };
});
