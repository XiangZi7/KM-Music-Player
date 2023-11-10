import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        config.params = {
            ...config.params,
            timestamp: Date.now(),
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 封装get方法
export const httpGet =(url, params)=> {
    return instance.get(url, {params});
};
// 封装post方法
export const httpPost = (url, data)=> {
    return instance.post(url, data);
};
