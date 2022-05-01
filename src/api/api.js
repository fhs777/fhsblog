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

export function gettest1() {    //死数据-测试接口
    return http.get('/api/articles/test1')
}

export function get_friends(param) {    
    return http.get('/api/friend'+ param)
}

export function apply_friend(params) {     //申请友链
    return http.post('/api/friend_write/', params)
}

export function get_bloginfo(param) {   //获取博客基本信息
    return http.get('/api/bloginfo/' + param)
}

export function set_articleViews(param) {   //更新博客浏览量
    return http.post('/api/article_views/' + param.article_id, param)
}

export function set_articleComments(param) {   //更新博客评论量
    return http.post('/api/article_comments/' + param.article_id, param)
}

export function get_about() {
    return http.get('/api/bloginfo/about')
}
