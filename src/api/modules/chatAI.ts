import { getRequestInstance } from "@/config/request";
import { getAPIMethodInstance } from "@/config/methods";
import { AxiosResponse } from "axios";

const config = {
    baseURL: import.meta.env.VITE_API_AIURL,
};
const API = getAPIMethodInstance(getRequestInstance({ config }));

export const ChatAPI = {
    chatWithAI(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/chat', params)
    },
    getModelList(): Promise<AxiosResponse<any>> {
        return API.get('/models')
    }
}
