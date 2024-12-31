import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useStatesStore = defineStore('States', () => {
  const states = ref([]);
  const state = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all states (index)
  const fetchStates = async () => {
    try {
      const response = await api.get('/states', { headers });
      states.value = response.data;
    } catch (error) {
      console.error('Error fetching states:', error.response?.data || error.message);
    }
  };

  // Fetch a single state by ID (show)
  const fetchState = async (id) => {
    try {
      const response = await api.get(`/states/${id}`, { headers });
      state.value = response.data;
    } catch (error) {
      console.error(`Error fetching state ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new state (store)
  const createState = async (data) => {
    try {
      const response = await api.post('/states', data, { headers });
      states.value.push(response.data); // Add the new state to the list
    } catch (error) {
      console.error('Error creating state:', error.response?.data || error.message);
    }
  };

  // Update an existing state by ID (update)
  const updateState = async (id, data) => {
    try {
      const response = await api.put(`/states/${id}`, data, { headers });
      // Update the local data with the response
      const index = states.value.findIndex((s) => s.id === id);
      if (index !== -1) {
        states.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating state ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a state by ID (destroy)
  const deleteState = async (id) => {
    try {
      await api.delete(`/states/${id}`, { headers });
      // Remove the deleted state from the list
      states.value = states.value.filter((s) => s.id !== id);
    } catch (error) {
      console.error(`Error deleting state ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    states,
    state,
    fetchStates,
    fetchState,
    createState,
    updateState,
    deleteState,
  };
});
