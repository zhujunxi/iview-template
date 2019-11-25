import Vue from 'vue'
import Router from 'vue-router'
import common from './modules/common'

Vue.use(Router)

const router = new Router({
    routes: common
})

// router.beforeEach((to, from, next) => {})
export default router
