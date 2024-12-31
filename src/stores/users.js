import { defineStore } from 'pinia';
import api from '../boot/axios';
import { ref } from 'vue';

export const useUserStore = defineStore('Users', () => {
  const users = ref([]); // Stores the list of users
  const user = ref(null); // Stores a single user
  const token = localStorage.getItem('token');
  const links = ref(null); // Stores a single user


  const headers = {
    Authorization: `Bearer ${token}`,
  };

  // Fetch all users (index)
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users', { headers });
      users.value = response.data.data
      links.value=response.data.links
      console.log('datausers',links)
    } catch (error) {
      console.error('Error fetching users:', error.response?.data || error.message);
      console.log('ascdvfbgfdsa')
    }
  };

  // Fetch a single user by ID (show)
  const fetchUser = async (id) => {
    try {
      const response = await api.get(`/users/${id}`, { headers });
      user.value = response.data; // Adjust if API response differs
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error.response?.data || error.message);
    }
  };

  // Create a new user (store)
  const createUser = async (data) => {
    try {
      const response = await api.post('/users', data, { headers });
      users.value.push(response.data); // Add the new user to the list
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  // Update an existing user by ID (update)
  const updateUser = async (id, data) => {
    try {
      const response = await api.put(`/users/${id}`, data, { headers });
      // Update the local data with the response
      const index = users.value.findIndex((u) => u.id === id);
      if (index !== -1) {
        users.value[index] = response.data;
      }
    } catch (error) {
      console.error(`Error updating user ${id}:`, error.response?.data || error.message);
    }
  };

  // Delete a user by ID (destroy)
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`, { headers });
      // Remove the deleted user from the list
      users.value = users.value.filter((u) => u.id !== id);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error.response?.data || error.message);
    }
  };

  return {
    users,
    user,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    links,
  };
});
