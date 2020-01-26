<template>
    <div id="app" class="d-flex">
        <DashboardSidebar/>
        <div class="d-flex min-vh-100 justify-content-center flex-column bg-light flex-fill">
            <DashboardHeader/>
            <main class="flex-grow-1">
                <router-view/>
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