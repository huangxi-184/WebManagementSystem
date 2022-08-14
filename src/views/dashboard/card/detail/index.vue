<template>
    <div>
        <div class="card-header">
            <span>{{ title }}</span>
            <svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        </div>
        <div class="card-content">{{ count }}</div>
        <div class="card-charts">
            <slot name="charts">
            </slot>
        </div>
        <div class="card-footer">
            <slot name="footer">
            </slot>
        </div>
    </div>
</template>

<script>

export default {
    name: '',
    props: ['title', 'count']

}
</script>

<style  scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}

.card-content {
    font-size: 30px;
    padding: 10px 0px;
}

.card-charts {
    height:50px;
}

.card-footer {
    border-top: 1px solid #eee;
    padding-top: 10px;
}
</style>
