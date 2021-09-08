import { createRouter, createWebHistory } from 'vue-router'
import frame from '../views/frame.vue'

const routes = [
  {
    path: '/',
    name: 'frame',
    component: frame,
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
      },
      {
        path: 'technology',
        component: () => import(/* webpackChunkName: "about" */ '../views/technology.vue')
      },
      {
        path: 'daily',
        component: () => import(/* webpackChunkName: "about" */ '../views/daily.vue')
      },
      {
        path: 'time_line',
        component: () => import(/* webpackChunkName: "about" */ '../views/time_line.vue')
      },
      {
        path: 'article',
        component: () => import(/* webpackChunkName: "about" */ '../views/article.vue')
      },
      {
        path: 'maodian',
        component: () => import(/* webpackChunkName: "about" */ '../views/maodian.vue')
      },
      {
        path: 'category',
        component: () => import(/* webpackChunkName: "about" */ '../views/category.vue'),
      },
      {
        path:'category/:cate',
        component: () => import(/* webpackChunkName: "about" */ '../views/catearticle.vue'),
      },
      {
        path:'tags',
        component: () => import(/* webpackChunkName: "about" */ '../views/tags.vue'),
      },
      {
        path:'tags/:cate',
        component: () => import ('../views/tagsarticle.vue'),
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
