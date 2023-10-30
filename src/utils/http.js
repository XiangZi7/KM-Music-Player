import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    changeOrigin: true,  //跨域
    withCredentials: true,
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理，例如添加时间戳
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
        // 在响应数据之前做一些处理
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 封装get方法
export const httpGet = (url, params) => {
    return instance.get(url, { params });
};

// 封装post方法
export const httpPost = (url, data) => {
    return instance.post(url, data);
};
