<template>
    <div class="home">
        <Button>Default</Button>
        <Button type="primary">Primary</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="text">Text</Button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'home',
    mounted() {
        this.getDemoData()
            .then(res => {
                console.log(res)
                this.$Notice.success({
                    title: 'Demo接口请求成功',
                    desc: res.data.content
                })
            })
            .catch(err => {
                this.$Notice.error({
                    title: 'Demo接口请求失败',
                    desc: err
                })
            })
    },
    methods: {
        ...mapActions(['getDemoData'])
    }
}
</script>
