import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'def',
    component: () => import(/* webpackChunkName: "home" */ '../views/twoside.vue'),
    children: [
          {
            path: '/',
            components: {
              default: () => import(/* webpackChunkName: "card_list" */ '../views/card_list.vue'),
              blogInfo: () => import(/* webpackChunkName: "bloginfo" */ '../components/blogInfo.vue'),
              tagsCloud: () => import(/* webpackChunkName: "tagsCloud" */ '../components/tagsCloud.vue'),
            } 
          },      
          {
            path: 'home',
            components: {
              default: () => import(/* webpackChunkName: "card_list" */ '../views/card_list.vue'),
              blogInfo: () => import(/* webpackChunkName: "bloginfo" */ '../components/blogInfo.vue'),
              tagsCloud: () => import(/* webpackChunkName: "tagsCloud" */ '../components/tagsCloud.vue'),
            } 
          },
          {
            path: '/about',
            component: () => import(/* webpackChunkName: "tech" */ '../views/about.vue')
          },
          {
            path: 'article',
            components: {
              default: () => import(/* webpackChunkName: "new_articlie" */ '../views/article.vue'),
              sider_anchors: () => import(/* webpackChunkName: "sider_anchors" */ '../views/anchors.vue'),
            }
            
          },
          {
            path: 'time_line',
            component: () => import(/* webpackChunkName: "time" */ '../views/time_line.vue')
          },
          {
            path: '/category',
            component: () => import(/* webpackChunkName: "cate" */ '../views/category.vue'),
          },
          {
            path:'/category/:cate',
            components: {
              default: () => import(/* webpackChunkName: "cate_art" */ '../views/catearticle.vue'),
              blogInfo: () => import(/* webpackChunkName: "bloginfo" */ '../components/blogInfo.vue'),
              tagsCloud: () => import(/* webpackChunkName: "tagsCloud" */ '../components/tagsCloud.vue'),
            } 
          },
          {
            path:'/tags',
            component: () => import(/* webpackChunkName: "tags" */ '../views/tags.vue'),
          },
          {
            path:'/tags/:cate',
            components: {
              default: () => import (/* webpackChunkName: "tags_cate" */'../views/tagsarticle.vue'),
              blogInfo: () => import(/* webpackChunkName: "bloginfo" */ '../components/blogInfo.vue'),
              tagsCloud: () => import(/* webpackChunkName: "tagsCloud" */ '../components/tagsCloud.vue'),
            } 
          },
          {
            path: '/interact',
            component: () => import(/* webpackChunkName: "friends" */ '../views/friends.vue')
          },
        ]
      },

      
      
      {
        path: '/test',
        component: () => import(/* webpackChunkName: "maodian" */ '../views/test.vue')
      },
     
      
  {
    path: '/:pathMatch(.*)*',
    name: 'notfound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/yibu.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.onError((error) => {
  console.log('error',error)
})

export default router
