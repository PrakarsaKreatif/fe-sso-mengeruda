import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.DEV ? '' : (import.meta.env.VITE_PUBLIC_BACKEND_URL || 'http://localhost:8002'),
    headers: {
        'Accept': 'application/json'
    }
});

// Interceptor untuk menyisipkan token JWT ke setiap request API
api.interceptors.request.use(config => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('sso_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

// Interceptor untuk meredirect ke login jika token expired/tidak valid (401)
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
                localStorage.removeItem('sso_token');
                localStorage.removeItem('sso_user');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
