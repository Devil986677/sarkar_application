import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useCitiesStore = defineStore('Cities', () => {
  const cities = ref([]);
  const city = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all cities (index)
  const fetchCities = async () => {
    try {
      const response = await api.get('/cities', { headers });
      cities.value = response.data;
    } catch (error) {
      console.error('Error fetching cities:', error.response?.data || error.message);
    }
  };

  // Fetch a single city by ID (show)
  const fetchCity = async (id) => {
    try {
      const response = await api.get(`/cities/${id}`, { headers });
      city.value = response.data;
    } catch (error) {
      console.error(`Error fetching city ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new city (store)
  const createCity = async (data) => {
    try {
      const response = await api.post('/cities', data, { headers });
      cities.value.push(response.data); // Add the new city to the list
    } catch (error) {
      console.error('Error creating city:', error.response?.data || error.message);
    }
  };

  // Update an existing city by ID (update)
  const updateCity = async (id, data) => {
    try {
      const response = await api.put(`/cities/${id}`, data, { headers });
      // Update the local data with the response
      const index = cities.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        cities.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating city ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a city by ID (destroy)
  const deleteCity = async (id) => {
    try {
      await api.delete(`/cities/${id}`, { headers });
      // Remove the deleted city from the list
      cities.value = cities.value.filter((c) => c.id !== id);
    } catch (error) {
      console.error(`Error deleting city ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    cities,
    city,
    fetchCities,
    fetchCity,
    createCity,
    updateCity,
    deleteCity,
  };
});
