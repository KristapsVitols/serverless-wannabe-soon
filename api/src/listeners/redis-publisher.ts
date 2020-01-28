import redis, {RedisClient} from 'redis';

export class RedisPublisher {
    redisPublisher: RedisClient;

    constructor() {
        this.redisPublisher = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST).duplicate();
    }

    publish(channel: string, data: string) {
        this.redisPublisher.publish(channel, data);
    }
}