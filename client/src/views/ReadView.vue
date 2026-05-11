<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Reader from '@/components/Reader.vue';
</script>

<template>
    <main>
        <Sidebar />
        <Reader />
    </main>
</template>

<style scoped>
    main {
        display: flex;
        height: 100vh;
        overflow: hidden;
    }
</style>