import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useComplaintFormStore = defineStore('ComplaintForm', () => {
  const complaints = ref([]); // List of complaints
  const complaint = ref(null); // Single complaint details
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const response = await api.get('/form-data', { headers });
      complaints.value = response.data.data;
      console.log('complaints',complaints)
    } catch (error) {
      console.error('Error fetching complaints:', error.response?.data || error.message);
    }
  };

  // Fetch a single complaint by ID
  const fetchComplaint = async (id) => {
    try {
      const response = await api.get(`/form-data/${id}`, { headers });
      complaint.value = response.data;
    } catch (error) {
      console.error(`Error fetching complaint ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new complaint
  const createComplaint = async (data) => {
    try {
      const response = await api.post('/form-data', data, { headers });
      complaints.value.push(response.data); // Add the new complaint to the list
    } catch (error) {
      console.error('Error creating complaint:', error.response?.data || error.message);
    }
  };

  // Update an existing complaint by ID
  const updateComplaint = async (id, data) => {
    try {
      const response = await api.put(`/form-data/${id}`, data, { headers });
      // Update the local data with the response
      const index = complaints.value.findIndex((c) => c.id === id);
      if (index !== -1) {
        complaints.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating complaint ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a complaint by ID
  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/form-data/${id}`, { headers });
      // Remove the deleted complaint from the list
      complaints.value = complaints.value.filter((c) => c.id !== id);
    } catch (error) {
      console.error(`Error deleting complaint ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    complaints,
    complaint,
    fetchComplaints,
    fetchComplaint,
    createComplaint,
    updateComplaint,
    deleteComplaint,
  };
});
