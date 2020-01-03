import redis from 'redis';
import dotenv from 'dotenv';
import {Bootstrap} from './bootstrap';

dotenv.config();

const redisClient = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST);

const sub = redisClient.duplicate();

sub.on('message', async (channel: string, message: string) => {
    console.log('Starting background process.... ' + message);
    (new Bootstrap()).initialize();
});

sub.subscribe('buildServer');