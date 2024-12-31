// src/utils/auth.js
export const getToken = () => {
  return localStorage.getItem('authToken');  // Get token from localStorage
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && token !== '';  // Check if token exists and is valid
};
