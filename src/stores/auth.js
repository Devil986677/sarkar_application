import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export const useAuthStore = defineStore('useAuthStore', () => {
  // State
  const user = ref(null);
  const token = ref(null);
  // const username = ref(null);
  const router = useRouter();


  // Actions
  const login = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      token.value = response.data.token;

      // Save token in local storage for persistence
      localStorage.setItem('token', token.value);



      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call the logout API
      const response = await api.post('/logout');

      // Check if the API call was successful
      if (response.status === 200) {
        // Clear the local data
        token.value = null;
        user.value = null;
        // username.value = null;

        localStorage.removeItem('token');

        // Remove the authorization header
        delete api.defaults.headers.common['Authorization'];

        console.log('Logged out successfully');
      } else {
        console.error('Logout API responded with an error:', response);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  const loadUserFromStorage = async () => {
    try {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        token.value = storedToken;
        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        // Fetch user data after setting the token
        await fetchUser();
      } else {
        console.warn('No token found in localStorage.');
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  };

  const fetchUser = async () => {
    try {
      // Fetch user data from the API
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      });

      user.value = response.data.data;
      // username.value = response.data.data.username;

      console.log('Fetched User Data:', user.value);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
        await router.push('/login');


        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      } else {
        console.error('Error fetching user data:', error);
      }
    }
  };
  const updateUser = async (data) => {
    try {
      const response = await api.post('/user', data, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      // Update user data in state
      user.value = response.data.user;
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  // Return state and actions
  return {
    user,
    token,
    // username,
    login,
    logout,
    loadUserFromStorage,
    fetchUser,
    updateUser,
  };
});


















