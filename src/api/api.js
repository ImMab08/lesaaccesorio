import axios from "axios";

// Crear instancia de Axios
const api = axios.create({
    baseURL: 'http://localhost:8081',
})

// Crear interceptor
api.interceptors.request.use((config) => {
    // Agregar token de autenticación
    const tokenCookie = document.cookie.split(';').find(row => row.trim().startsWith('token='));

    // verificar si el token existe
    if (tokenCookie) {
        const token = tokenCookie.split('=')[1]; // Obtener el token
        console.log('Token encontrado:', token);
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log('Token no encontrado');
    }

    // config.withCredentials = true;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;