import { http } from "./index";
// 获取歌曲地址
export const songUrl = (params) => uni.$kmir.http.request({
    url: `song/url/v1?id=${params.id}&level=exhigh`
});
// banner图
export const banner = () => uni.$kmir.http.request({
    url: `banner?type=2`
});
// cloudsearch搜索
export const cloudsearch = (data) => uni.$kmir.http.request({
    url: `cloudsearch`,
    data
});
// banner图
export const newMusic = () => uni.$kmir.http.request({
    url: `personalized/newsong`
});
// songPlaylist
export const songPlaylist = (data) => uni.$kmir.http.request({
    url: `top/playlist`,
    data
});
// 游客登陆
export const anonimous = (data) => uni.$kmir.http.request({
    url: `register/anonimous`,
    data
});
/**
 * 
 * @param {*} 可选参数 :
                countrycode: 国家码，用于国外手机号登录，例如美国传入：1
                md5_password: md5 加密后的密码,传入后 password 参数将失效
                captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效 
 * @description 手机登录
 */
export const cellphone = (data) => uni.$kmir.http.request({
    url: `login/cellphone`,
    data
});
/**
 * 
 * @param {*} 必选参数 : phone: 手机号码
              可选参数 : ctcode: 国家区号,默认 86 即中国 
 * @returns 
 * @description   
 */
export const captcha = (data) => uni.$kmir.http.request({
    url: `captcha/sent`,
    data
});
/**
 * 
 * @param {*} 必选参数 : phone: 手机号码
              captcha: 验证码 
 * @description 验证验证码
 */
export const verify = (data) => uni.$kmir.http.request({
    url: `captcha/verify`,
    data
});
// 退出登录
export const logout = () => uni.$kmir.http.request({
    url: `logout`,
});
// 歌单详情
export const playListDetail = (data) => uni.$kmir.http.request({
    url: `playlist/detail`,
    data
});
// 歌单tag
export const catlist = () => uni.$kmir.http.request({
    url: `playlist/catlist`,
});
// 歌词tag
export const lyric = (id) => uni.$kmir.http.request({
    url: `lyric?id=${id}`,
});
// 歌曲评论
export const commentMusic = (data) => http.request({
    url: `comment/music`,
    data
});
// // 最新mv
export const newMV = () => http.request({
    url: `mv/first`,
});
// mvUrl
export const mvUrl = (id) => http.request({
    url: `mv/url?id=${id}`,
});
// mvDetail
export const mvDetail = (id) => http.request({
    url: `mv/detail?mvid=${id}`,
});
// mvDetail
export const commentMV = (data) => http.request({
    url: `comment/mv`,
    data
});
// 动漫搜索
export const videoSearch = (data) => http.request({ url: `video/search`, data })
// 获取动漫Url
export const videoUrl = (data) => http.request({ url: `video/chapter`, data })
//状态
export const loginStatus = () => http.request({
    url: `login/status`,
});
//获取用户歌单
export const userPlaylist = (id) => http.request({
    url: `user/playlist?uid=${id}`,
});
//获取热搜列表(简略)
export const searchHot = () => http.request({
    url: `search/hot`,
});
//每日歌曲
export const recommendSongs = () => http.request({
    url: `recommend/songs`,
});
//每日歌单
export const getdaylist = () => http.request({
    url: `recommend/resource`,
});
