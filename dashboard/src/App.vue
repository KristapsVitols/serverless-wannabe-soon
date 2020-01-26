<template>
    <div id="app" class="d-flex">
        <DashboardSidebar/>
        <div class="d-flex min-vh-100 justify-content-center flex-column flex-fill">
            <DashboardHeader/>
            <main class="bw-bg-secondary flex-grow-1 d-flex">
                <router-view class="container my-5"/>
            </main>
            <DashboardFooter/>
        </div>
    </div>
</template>
<script>
    import DashboardHeader from '@/layout/DashboardHeader';
    import DashboardFooter from '@/layout/DashboardFooter';
    import DashboardSidebar from '@/layout/DashboardSidebar';

    export default {
        name: 'Index',
        components: {
            DashboardHeader,
            DashboardFooter,
            DashboardSidebar,
        },
    }
</script>
<style lang="scss" scoped>
    .trigger-x {}
</style>