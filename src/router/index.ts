import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import store from '@/store'
import { GET_IS_AUTHENTICATED } from '@/store/getters'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/login.vue'),
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/add',
        name: 'add',
        component: () => import('../components/user-create.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../components/user-edit.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '*',
        name: 'list',
        component: () => import('../components/user-list.vue'),
        meta: {
            requiresAuth: false,
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach(async (to, from, next) => {
    const isAuthenticated = store.getters[GET_IS_AUTHENTICATED]

    if (isAuthenticated) {
        // If authenticated, then user can go anywhere
        next()
    } else if (to.matched.some(record => record.meta.requiresAuth === false)) {
        // If the page doesn't require authentication, then user can view it
        next()
    } else {
        // Otherwise go to the login page
        next('/login')
    }
})

export default router
