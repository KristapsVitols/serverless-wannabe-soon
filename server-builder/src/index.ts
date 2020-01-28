import redis from 'redis';
import dotenv from 'dotenv';
import {Bootstrap} from './bootstrap';

dotenv.config();

const redisClient = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST);

const sub = redisClient.duplicate();

sub.on('message', async (channel: string, applicationInfo: string) => {
    const application = JSON.parse(applicationInfo);
    console.log('Starting background process.... ' + application.name);
    (new Bootstrap(application.applicationToken, application.name, application.password)).initialize();
});

sub.subscribe('buildServer');