import axios from "axios";

const API = axios.create({
  baseURL: "https://backendprojects-9fw1.onrender.com", 
  withCredentials: true,
});

export default API;



