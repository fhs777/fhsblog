import request from './request'

const http = {
    post(url, params) {
        const config = {
            method: 'post',
            url: url
        }
        if(params) config.data = params
        return request(config)
    },
    get(url, params) {
        const config = {
            method: 'get',
            url: url,
        }
        if(params) config.params = params
        return request(config)
    },
    put(url, params) {
        const config = {
            method: 'put',
            url: url,
        }
        if(params) config.data = params
        return request(config)
    },
}

export default http