import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'def',
    component: () => import(/* webpackChunkName: "home" */ '../views/twoside.vue'),
    children: [      
          {
            path: 'home',
            component: () => import(/* webpackChunkName: "card_list" */ '../views/card_list.vue')
          },
          {
            path: 'article',
            component: () => import(/* webpackChunkName: "new_articlie" */ '../views/article.vue')
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
            component: () => import(/* webpackChunkName: "cate_art" */ '../views/catearticle.vue'),
          },
          {
            path:'/tags',
            component: () => import(/* webpackChunkName: "tags" */ '../views/tags.vue'),
          },
          {
            path:'/tags/:cate',
            component: () => import (/* webpackChunkName: "tags_cate" */'../views/tagsarticle.vue'),
          },
        ]
      },

      {
        path: '/technology',
        component: () => import(/* webpackChunkName: "tech" */ '../views/technology.vue')
      },
      {
        path: '/daily',
        component: () => import(/* webpackChunkName: "daily" */ '../views/daily.vue')
      },
      {
        path: '/maodian',
        component: () => import(/* webpackChunkName: "maodian" */ '../views/maodian.vue')
      },
     
      
     
     
  {
    path: '/ab',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/anti',
    name: 'anti',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/main.vue')
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
