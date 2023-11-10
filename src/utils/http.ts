import axios, { AxiosInstance } from 'axios';
type ResponseData<T> = {
    data: T;
    code: number;
    result: string;
};
const instance: AxiosInstance = axios.create({
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
    (response) => { // 使用泛型指定返回类型
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 封装get方法
export const httpGet = <T>(url: string, params?: object): Promise<ResponseData<T>> => {
    return instance.get<T>(url, {params});
};
// 封装post方法
export const httpPost = <T>(url: string, data?: object): Promise<ResponseData<T>> => {
    return instance.post<T>(url, data);
};
