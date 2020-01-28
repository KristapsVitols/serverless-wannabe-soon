<template>
    <div class="text-center d-flex flex-column align-items-center justify-content-center">
        <h4>Do it!</h4>
        <input type="text" v-model="appName">
        <button @click="initApp" class="bw-btn">Set up new application</button>
    </div>
</template>
<script>
    import axios from 'axios';

    export default {
        name: 'Applications',
        data: () => ({appName: ''}),
        methods: {
            async initApp() {
                await axios.post('/api/applications', {name: this.appName});
            },
        }
    }
</script>
<style lang="scss" scoped>
    .trigger {}
</style>