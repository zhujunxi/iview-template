import { getDemoData } from '@/api/common'
export default {
    state: {
        demo: 'hello vuex'
    },
    mutations: {
        setDemo(state, demo) {
            state.demo = demo
        }
    },
    actions: {
        // 获取demo数据
        getDemoData(param) {
            return new Promise((resolve, reject) => {
                getDemoData(param)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    }
}
