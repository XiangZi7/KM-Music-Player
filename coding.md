## build&coding
```tsx
npm init vite@latest
npm i
npm i react-router-dom
npm i @types/node --save-dev
npm i react-redux @reduxjs/toolkit redux-persist --save-dev
npm i unplugin-auto-import --save-dev
npm i node-sass sass-loader --save-dev //?
npm install antd @ant-design/icons --save-dev
```

```tsx
vite.config.ts:
resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
}
plugins: [
  AutoImport({
    imports: ["react"],
    dirs: [
      // 'src/utils/**',
      // 'src/stores/**',
      // 'src/hooks/**'
    ],
    dts: 'src/types/imports.d.ts',
    eslintrc: {
      enabled: true
    }
  }),
],
build: {
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: "esbuild",
    rollupOptions: {
      // rollup 进行静态资源分包
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.toString().indexOf('.yarn/') !== -1) {
              return id.toString().split('.yarn/')[1].split('/')[0].toString()
            } else if (id.toString().indexOf('node_modules/') !== -1) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false
}


tsconfig.json:
"baseUrl": "./",
"paths": {
  "@/*": [
    "src/*"
  ]
}
```

```tsx
api:
import axios, { InternalAxiosRequestConfig } from 'axios'


const request = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    timeout: 10000,
    withCredentials: true, //?
});

// 请求拦截器
request.interceptors.request.use(
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
request.interceptors.request.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default request;
export { request };

import request from './request'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export default {
    get(url: string, params: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return request.get(url, { ...config, params });
    },
    post(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return request.post(url, data.config);
    },
    put(url: string, data: Record<string, any>, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
        return request.put(url, data, config);
    },
    delete(url: string, data: Record<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.delete(url, { ...config, data });
    },
    patch(url: string, data: Record<string, string>, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.patch(url, { ...config, data });
    },
    head(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<any>> {
        return request.head(url, config);
    }
}
```
```tsx
store:
// 出口文件
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
// 导入子模块
// ...

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({

}));
const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: persistedReducer
});
const persistor = persistStore(store);

// 导出
export { store, persistor };
export default store;

// module
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
}
const Store = createSlice({
    name,
    initialState,
    reducers: {
    }
})

const { 
} = Store.actions;
const reducer = Store.reducer;

// actions导出
export { 
}
// reducer导出
export default reducer;

```


## todo
```tsx
musicPlayer type (@/utils/usePlayerMusic) (√)
store / api vite 自动导入导出
qcode_login (√)
loading animal
将只要数据预存入，避免切换回路由时，数据的重新请求
search接口测试 (√)
背景页面切换
无法重新刷新useTabsItem
search 样式问题
```

## question
```tsx

1. persist & redux-tookit
2. useSelector, useDispatch
3. audio
4. RegExc
5. useNavigate
6. ReturenType<(xxx)=>(T)>
7. video
8. Suspense (react)
9. ConfugProvider
10. padStart
```

## or Bug
```tsx
pages/home:
headerLink?

video source
```
