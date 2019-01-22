import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: 'generate'
        },
        {
            path: '/generate',
            name: 'generate',
            component: () => import(/* webpackChunkName: "generate" */ './pages/Generate.vue')
        },
        {
            path: '/scan',
            name: 'scan',
            component: () => import(/* webpackChunkName: "scan" */ './pages/Scan.vue')
        }
    ]
})
