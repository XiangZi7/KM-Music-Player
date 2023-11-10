// 异步封装的实现
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//createSlice 用于定义 Redux 的状态和操作。它使用了一种更简洁的语法来定义 reducer 和 action，并自动处理了不可变性的问题。
const channelStore = createSlice({
    name: "channel",
    // 初始值
    initialState: {
        channelList: [],
    },
    reducers: {
        setChannels(state, action) {
            state.channelList = action.payload;
        },
    },
});


// 异步请求部分
// http://geek.itheima.net/v1_0/channels
const { setChannels } = channelStore.actions;

const fetchChannlList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://geek.itheima.net/v1_0/channels");
        dispatch(setChannels(res.data.data.channels));
    };
};

export { fetchChannlList };

const reducer = channelStore.reducer;
export default reducer;
