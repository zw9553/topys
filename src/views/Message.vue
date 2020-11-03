<template>
<!-- 我的消息页面 -->
    <div class="message">
        我的消息
    </div>
</template>

<script>
export default {
    name:'Message'
}
</script>

<style scoped>
    .message {
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