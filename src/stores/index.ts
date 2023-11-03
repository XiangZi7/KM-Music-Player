// 出口文件
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用localStorage
// 导入子模块
import counterStore from "./modules/counterStore";
import channelStore from "./modules/channelStore";
import playerStore from "./modules/playerStore";
import globalStore from "./modules/globalStore";
import {PlayerState} from './interface/index'
// 配置持久化
const persistConfig = {
    key: 'root',
    storage,
};
// 模块的数据类型
export type RootState = {
    player: PlayerState;
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

