import http from  '../utils/http'

export function login(params) {
    return http.post('/api/login', params)
}

export function getuser(params) {
    return http.get('/api/user', params)
}

export function getarticles(params) {  //获取所有文章
    return http.get('/api/articles', params)
}

export function getarticle(params) {    //根据文章id获取文章
    return http.get('/api/articles/' + params)
}

export function article_write(params) {
    return http.post('/api/article_write', params)
}

export function categoryget() {
    return http.get('/api/get_category')
}

export function article_edit(params) {
    return http.put('/api/article_edit/'+params._id, params)
}

