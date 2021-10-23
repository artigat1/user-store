import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'add',
        component: () => import('../components/user-create.vue'),
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('../components/user-list.vue'),
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../components/user-edit.vue'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
