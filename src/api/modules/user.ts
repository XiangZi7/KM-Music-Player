import API from '@/config/methods'
import { AxiosResponse } from "axios";



export const userAPI = {
    login(): Promise<AxiosResponse<any>> {
        return API.get('/login/status');
    },
    logout(): Promise<AxiosResponse<any>> {
        return API.get('/logout');
    },
    getQrKey(): Promise<AxiosResponse<any>> {
        return API.get('/login/qr/key');
    },
    getQrCode(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/login/qr/create', params)
    },
    loginByQrCode(params: Rc<string, any>): Promise<AxiosResponse<LoginByQrCodeResponse>> {
        return API.get('/login/qr/check', params);
    },
    // 验证验证码
    verifyCode(data: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.post('/captcha/verify', data);
    },
    // 验证码登录
    loginByVerCode(data: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.post('/login/cellphone', data);
    },
    // 发送验证码
    sendCaptcha(data: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.post('/captcha/sent', data);
    }
}

interface LoginByQrCodeResponse {
    code: number,
    nickname: string,
    avatarUrl: string,

    [property: string]: any
}