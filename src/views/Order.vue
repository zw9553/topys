<template>
<!-- 我的订单 -->
    <div class="order">
        我的订单
    </div>
</template>

<script>
export default {
    name:'Order'
}
</script>

<style scoped>
    .order {
        width: 100%;
        padding: 0 5%;
        position: absolute;
        overflow-y: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9;
        box-sizing: border-box;
    }
</style>