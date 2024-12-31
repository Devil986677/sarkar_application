import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useDashboardStore = defineStore('useDashboardStore', () => {
  // State for holding dashboard data
  const dashboardData = ref({ });

  // Actions
  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard count data from the API
      const response = await api.get('/complaints-count', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Store the count data in state
      dashboardData.value = response.data.data;

      console.log('Fetched Dashboard Data:', dashboardData.value);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Return state and actions
  return {
    dashboardData,
    fetchDashboardData,
  };
});
