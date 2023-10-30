import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: "counter",
    // 初始化 state
    initialState: {
        count: 0,
    },
    // 修改状态的方法 同步方法，可以直接修改值
    reducers: {
        addCount(state) {
            state.count++;
        },
        decreaseCount(state) {
            state.count--;
        },
        // 接收传参
        addTonum(state, action) {
            // action.payload 可以获取到传入的参数
            state.count = action.payload;
        },
    },
});

// 解构出来 actionCreater函数
const { addCount, decreaseCount, addTonum } = counterStore.actions;
// 获取 reducer
// 用于定义如何更新应用的状态。它接收两个参数：当前的状态（state）和即将执行的 action，并返回一个新的状态。
const reducer = counterStore.reducer;

// 按需导出
export { addCount, decreaseCount, addTonum };
// 默认导出
export default reducer;

