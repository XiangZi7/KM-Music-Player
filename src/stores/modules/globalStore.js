import {createSlice} from "@reduxjs/toolkit";

const globalStore = createSlice({
    name: "global",
    // 初始化 state
    initialState: {
        sideIdx: 0,
    },
    // 修改状态的方法 同步方法，可以直接修改值
    reducers: {
        setSideIdx(state, idx) {
            state.sideIdx = idx.payload;
        },
    },
});

// 解构出来 actionCreater函数
const {setSideIdx} = globalStore.actions;
// 获取 reducer
// 用于定义如何更新应用的状态。它接收两个参数：当前的状态（state）和即将执行的 action，并返回一个新的状态。
const reducer = globalStore.reducer;

// 按需导出
export {setSideIdx};
// 默认导出
export default reducer;

