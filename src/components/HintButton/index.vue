<template>
    <a :title="title" style='margin:10px'>
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
        <!-- v-bind="$attrs" 将父组件 未使用的参数用于这里  $listeners 是将监听事件作用与这上面 -->
    </a>
</template>

<script>
export default {
    name: 'HintButton',
    props: ['title'],



}
</script>


<style scoped>
</style>