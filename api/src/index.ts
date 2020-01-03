import express, {Request, Response} from 'express';
import http from 'http';
import {initDatabase} from './db';
import dotenv from 'dotenv';
import socketIO from 'socket.io';
import redis from 'redis';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());

dotenv.config();

initDatabase();

let status = '';

// Redis Client Setup
const redisClient = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST);

const redisPublisher = redisClient.duplicate();
const subscriber = redisClient.duplicate();

app.get('/api/server-status', (req, res) => {
    res.status(200).json({status});
});

app.post('/api/create-server', (req: Request, res: Response): void => {
    const {serverName} = req.body;
    // TODO: server name / whatever
    redisPublisher.publish('buildServer', serverName);

    status = 'Server is building....';
    res.status(200).json({status});
});

server.listen(5000, () => {
    console.log('Server listening on port 5000');
});

subscriber.on('message', (channel: string, serverInfo: string) => {
    io.emit('finished', {serverInfo: JSON.parse(serverInfo)});
});

subscriber.subscribe('finished');