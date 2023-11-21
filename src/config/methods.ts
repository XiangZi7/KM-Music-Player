import request from './request'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const getAPIMethodInstance = (instance: AxiosInstance) => {
    return {
        get(url: string, params: Rc<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.get(url, { params, ...config });
        },
        post(url: string, data: Rc<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.post(url, data, config);
        },
        put(url: string, data: Rc<string, any>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.put(url, data, config);
        },
        delete(url: string, data: Rc<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.delete(url, { ...config, data });
        },
        patch(url: string, data: Rc<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.patch(url, { ...config, data });
        },
        head(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
            return instance.head(url, config);
        }
    }
}


export default {
    get(url: string, params: Rc<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.get(url, { params, ...config });
    },
    post(url: string, data: Rc<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.post(url, data, config);
    },
    put(url: string, data: Rc<string, any>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.put(url, data, config);
    },
    delete(url: string, data: Rc<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.delete(url, { ...config, data });
    },
    patch(url: string, data: Rc<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.patch(url, { ...config, data });
    },
    head(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.head(url, config);
    }
}
