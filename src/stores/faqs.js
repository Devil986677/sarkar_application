import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useFaqsStore = defineStore('Faqs', () => {
  const faqs = ref([]);
  const faq = ref(null);
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all FAQs (index)
  const fetchFaqs = async () => {
    try {
      const response = await api.get('/faqs', { headers });
      faqs.value = response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error.response?.data || error.message);
    }
  };

  // Fetch a single FAQ by ID (show)
  const fetchFaq = async (id) => {
    try {
      const response = await api.get(`/faqs/${id}`, { headers });
      faq.value = response.data;
    } catch (error) {
      console.error(`Error fetching FAQ ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new FAQ (store)
  const createFaq = async (data) => {
    try {
      const response = await api.post('/faqs', data, { headers });
      faqs.value.push(response.data); // Add the new FAQ to the list
    } catch (error) {
      console.error('Error creating FAQ:', error.response?.data || error.message);
    }
  };

  // Update an existing FAQ by ID (update)
  const updateFaq = async (id, data) => {
    try {
      const response = await api.put(`/faqs/${id}`, data, { headers });
      // Update the local data with the response
      const index = faqs.value.findIndex((f) => f.id === id);
      if (index !== -1) {
        faqs.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating FAQ ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a FAQ by ID (destroy)
  const deleteFaq = async (id) => {
    try {
      await api.delete(`/faqs/${id}`, { headers });
      // Remove the deleted FAQ from the list
      faqs.value = faqs.value.filter((f) => f.id !== id);
    } catch (error) {
      console.error(`Error deleting FAQ ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    faqs,
    faq,
    fetchFaqs,
    fetchFaq,
    createFaq,
    updateFaq,
    deleteFaq,
  };
});
