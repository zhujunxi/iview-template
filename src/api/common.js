import axios from '@/utils/request'

// 获取Demo数据
export const getDemoData = data => {
    return axios.request({
        url: 'axios3',
        method: 'get',
        data
    })
}
