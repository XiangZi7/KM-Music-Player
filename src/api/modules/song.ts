import API from '@/config/methods'
import { AxiosResponse } from 'axios'

export const songsAPI = {
    getSong(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/lyric', params);
    },
    // 获取歌单
    getPlaylist(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/playlist/track/all', params);
    },
    // 搜索歌单
    searchPlaylist(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/cloudsearch', params);
    },
    // 动漫视频接口
    searchVideo(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/video/search', params);
    },
    playMusic(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/song/url/v1', params);
    },
    // 获取评论
    getComment(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('/comment/playlist', params);
    },
    // 获取歌单具体信息
    getSimplePlaylistInfo(params: Rc<string, any>): Promise<AxiosResponse<any>> {
        return API.get('./playlist/detail', params);
    }

}
