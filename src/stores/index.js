// 出口文件
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用localStorage
// 导入子模块
import counterStore from "./modules/counterStore.js";
import channelStore from "./modules/channelStore.js";
import playerStore from "./modules/playerStore.js";
import globalStore from "./modules/globalStore.js";
// 配置持久化
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
    counter: counterStore,
    channel: channelStore,
    player: playerStore,
    global: globalStore
}));

const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: persistedReducer,
});

const persistor = persistStore(store);

// 导出
export {store, persistor};
// 导出
export default store;

