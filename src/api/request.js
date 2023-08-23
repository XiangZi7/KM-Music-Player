// request.js
export default class Request {
    constructor() {
        this._queue = []
        this._interceptor = {
            request: null,
            response: null
        }
    }

    interceptor() {
        return this._interceptor
    }

    request(options = {}) {
        // 添加到请求队列
        this._queue.push(options)
        if (this._queue.length === 1) uni.showLoading({ title: '加载中...' })

        options.header = options.header || {}

        // 请求拦截
        if (this._interceptor.request) {
            let temp = this._interceptor.request(options)
            if (temp) options = temp
        }

        // 发起请求
        return new Promise((resolve, reject) => {
            options.success = (response) => {
                if (this._interceptor.response) {
                    let res = this._interceptor.response(response)
                    if (res) resolve(res)
                } else {
                    resolve(response)
                }
            }
            options.fail = (response) => {
                reject(response)
            }
            options.complete = () => {
                // 从请求队列中移除
                this._queue.splice(this._queue.findIndex(item => item === options), 1)
                if (this._queue.length === 0) uni.hideLoading()
            }
           
            uni.request(options);
        })
    }
}