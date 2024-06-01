import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
