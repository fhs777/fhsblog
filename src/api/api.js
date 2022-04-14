import http from  '../utils/http'

export function login(params) {
    return http.post('/api/login', params)
}

export function getuser(params) {
    return http.get('/api/user', params)
}

export function accountSubmit(params) {   //账号注册
    return http.post('/api/user', params)
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

export function get_comments(id) {
    return http.get('/api/comment/'+id)
}

export function comment_write(params) {
    return http.post('/api/comment_write', params)
}

export function getIpName() {
    return http.get('/getIpName')
}


