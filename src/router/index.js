import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'frame',
    component: () => import(/* webpackChunkName: "about" */ '../views/frame.vue'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
      },
      {
        path: 'technology',
        component: () => import(/* webpackChunkName: "about1" */ '../views/technology.vue')
      },
      {
        path: 'daily',
        component: () => import(/* webpackChunkName: "about1" */ '../views/daily.vue')
      },
      {
        path: 'time_line',
        component: () => import(/* webpackChunkName: "time" */ '../views/time_line.vue')
      },
      {
        path: 'article',
        component: () => import(/* webpackChunkName: "articlies" */ '../views/article.vue')
      },
      {
        path: 'maodian',
        component: () => import(/* webpackChunkName: "about1" */ '../views/maodian.vue')
      },
      {
        path: 'category',
        component: () => import(/* webpackChunkName: "cate" */ '../views/category.vue'),
      },
      {
        path:'category/:cate',
        component: () => import(/* webpackChunkName: "cate" */ '../views/catearticle.vue'),
      },
      {
        path:'tags',
        component: () => import(/* webpackChunkName: "tags" */ '../views/tags.vue'),
      },
      {
        path:'tags/:cate',
        component: () => import (/* webpackChunkName: "tags" */'../views/tagsarticle.vue'),
      }
    ]
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
