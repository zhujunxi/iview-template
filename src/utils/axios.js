import axios from 'axios'
import store from '@/store'
import router from '@/router'
// import { setToken, getToken } from '@/utils/auth'

import { Message } from 'view-design'
const addErrorLog = errorInfo => {
    const {
        statusText,
        status,
        request: { responseURL }
    } = errorInfo
    let info = {
        type: 'ajax',
        code: status,
        mes: statusText,
        url: responseURL
    }
    if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                // token: getToken()
            },
            timeout: 100000
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors(instance, url) {
        // 请求拦截
        instance.interceptors.request.use(
            config => {
                // 添加全局的loading...
                if (!Object.keys(this.queue).length) {
                    // Spin.show() // 不建议开启，因为界面不友好
                }
                this.queue[url] = true

                // config.data = qs.stringify(config.data)
                return config
            },
            error => {
                return Promise.reject(error)
            }
        )
        // 响应拦截
        instance.interceptors.response.use(
            res => {
                this.destroy(url)
                const { data, status } = res
                // if (status !== 200) {
                //     Message.error({
                //         content: data.message || '服务器网络异常，请重试',
                //         duration: 4
                //     })
                //     return
                // }
                // if (data.code == 10000008) {
                //     router.push('/404')
                // }
                // if (data.code !== 0) {
                //     Message.error({
                //         content: data.message || '网络异常，请刷新重试',
                //         duration: 4
                //     })
                //     return Promise.reject(res)
                // } else {
                //     return { data, status }
                // }
                return { data, status }
            },
            error => {
                this.destroy(url)
                //addErrorLog(error.response)
                Message.error({
                    content: '网络异常，请检查网络连接',
                    duration: 4
                })
                return Promise.reject(error)
            }
        )
    }
    request(options) {
        const instance = axios.create()

        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}
export default HttpRequest
