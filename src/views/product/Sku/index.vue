<template>
    <div style="display: flex; justify-content: center ;align-items: center;">
        <el-card>
            <span style="display: block;">底数：{{ this.base }}</span>
            <span>指数：{{ this.index }}</span>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Sku",
    data() {
        return {
            sum: 0,
            Factorial: 0,
            Scientific: 0,
            base: 0,
            index: 0

        }
    },
    methods: {
        Factor(n) {
            if (n == 1) {
                return 1
            }
            else {
                return n * this.Factor(n - 1)
            }
        },
        calSum() {
            let i = 1
            let result = this.sum
            for (i; i <= 30; i++) {
                result += this.Factor(i)
            }
            this.sum = result
            console.log(this.sum.toLocaleString())
            console.log(this.sum)
        },
        ScientificNotation() {
            this.calSum()
            let result = this.sum
            result = result.toLocaleString().toString()
            this.base = result.substring(0, 1).concat('.',result.substring(1, 3))
            this.index = result.replace(/,/g, "").length - 1
        }
    },
    mounted() {
        this.ScientificNotation()
    },


}
</script>


<style scoped>
</style>