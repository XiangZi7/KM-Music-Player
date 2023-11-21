import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const generalAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 20000,
    withCredentials: true, //?
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.params = {
        ...config.params,
        timestamp: Date.now()
      };
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => response
    ,
    (error) => {
      return Promise.reject(error);
    }
  )
  return instance;
}

const getRequestInstance /* 基于默认，自定义Axios实例 */ = ({ config, requestConfig, responseConfig }: any) => {
  const instance = generalAxiosInstance();
  if (config && Object.keys(config).length > 0) {
    instance.defaults = { ...config }
  }
  if (requestConfig && requestConfig.length > 0) {
    requestConfig.forEach((fns: Rc<any, any>) => {
      instance.interceptors.request.use(fns.cf, fns.err);
    })
  }
  if (responseConfig && responseConfig.length > 0) {
    responseConfig.forEach((fns: Rc<any, any>) => {
      instance.interceptors.response.use(fns.cf, fns.err);
    })
  }
  return instance;
}

const request /* 默认Axios实例 */ = generalAxiosInstance();

export default request;
export { request, getRequestInstance };
