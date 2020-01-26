<template>
    <div class="home">
        <button @click="createServer">Create Server</button>
        <div v-if="serverInfo.status">
            <p>Server status: {{ serverInfo.status }}</p>
            <p>Server host: {{ serverInfo.host || '...' }}</p>
            <p>Server username: {{ serverInfo.username || '...' }}</p>
            <p>Server password: {{ serverInfo.password || '...' }}</p>
            <p>Server URL: {{ serverInfo.url || '...' }}</p>
        </div>
    </div>
</template>
<script>
    import io from 'socket.io-client';

    export default {
        name: 'home',
        data: () => ({
            serverInfo: {
                status: '',
                host: '',
                username: '',
                password: '',
                url: '',
            },
            socket: io(),
        }),
        async mounted() {
            await this.getInstance();
            await this.auth();

            const res = await fetch('/api/server-status');
            const data = await res.json();
            this.serverInfo.status = data.status;

            this.socket.on('finished', ({serverInfo}) => {
                this.serverInfo.status = 'Server is ready!!';
                this.serverInfo.host = serverInfo.host;
                this.serverInfo.username = serverInfo.username;
                this.serverInfo.password = serverInfo.password;
                this.serverInfo.url = serverInfo.url;
            });
        },
        methods: {
            async createServer() {
                const res = await fetch('/api/create-server', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify({serverName: 'my-first-server-via-api'})
                });

                const data = await res.json();

                this.serverInfo.status = data.status;
            },
            async auth() {
                const res = await fetch('/api/auth', {method: 'POST'});
                const data = await res.json();

                console.log(data);
            },
            async getInstance() {
                const res = await fetch('/api/validate-instance', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({instanceId: '45.79.129.169'}),
                });

                const data = await res.json();

                console.log(data);
            },
        }
    }
</script>
