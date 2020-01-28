import {Server} from 'socket.io';
import redis, {RedisClient} from 'redis';
import {ApplicationService} from '../modules/application/services/application-service';

export class RedisSubscriber {
    redisSubscriber: RedisClient;
    private readonly event: string;
    private readonly io: Server;
    applicationService: ApplicationService;

    constructor(io: Server, event: string) {
        this.redisSubscriber = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST).duplicate();
        this.event = event;
        this.io = io;
        this.applicationService = new ApplicationService();

        this.subscribe();
        this.listen();
    }

    subscribe() {
        this.redisSubscriber.subscribe(this.event);
    }

    listen() {
        this.redisSubscriber.on('message', async (channel: string, serverInfo: string) => {
            const server = JSON.parse(serverInfo);
            const app = await this.applicationService.updateApplication(server);
            console.log('done!', app);

            this.io.emit(this.event, {serverInfo: server});
        });
    }
}