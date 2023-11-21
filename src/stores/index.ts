// 出口文件
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
// 导入子模块
// ...
import playerStore from './modules/playerStore'

/**
 * @description
*/

// 配置持久化
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, combineReducers({
    player: playerStore,
}));

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: persistedReducer
});
const persistor = persistStore(store);

type State = ReturnType<() => typeof store>
// 导出
export type { State };
export { store, persistor };
export default store;
