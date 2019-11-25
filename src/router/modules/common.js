/*
 *  通用路由表
 */

export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    }
]
