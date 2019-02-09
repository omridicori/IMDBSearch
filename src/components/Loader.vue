<template>
    <div class="loader">
        <img src="../assets/loader.gif" alt="">
    </div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped lang="scss">
    .loader {
        position: fixed;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        z-index: 99999;
        background: rgba(255, 255, 255, 0.5);
    }
</style>