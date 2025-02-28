import axios from 'axios';

// Set the backend as the base URL
const API = axios.create({ baseURL: "http://localhost:5003/" });

export const getBackendData = async () => {
  try {
    const response = await API.get("/"); // Calls the backend
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error loading data";
  }
};



