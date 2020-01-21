import express, {Request, Response} from 'express';
import http from 'http';
import {initDatabase} from './db';
import dotenv from 'dotenv';
import socketIO from 'socket.io';
import redis from 'redis';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import {InstanceService} from './modules/instance/services/instance-service';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();

initDatabase();

let status = '';

// Redis Client Setup
const redisClient = redis.createClient(+process.env.REDIS_PORT!, process.env.REDIS_HOST);

const redisPublisher = redisClient.duplicate();
const subscriber = redisClient.duplicate();

// mock auth for ws
app.post('/api/auth', (req, res) => {
    res.cookie('jwt', '1234', {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
    });

    res.status(200).json({success: 1});
});

app.post('/api/validate-instance', async (req, res) => {
    const {instanceId} = req.body;
    const instanceService = new InstanceService();
    const instance = await instanceService.getInstanceById(instanceId);

    if (!instance) {
        return res.status(401).json({success: 0});
    }

    // @ts-ignore
    return res.status(200).json({server: {instanceId: instance.id, instanceUrl: instance.url}});
});

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

io.on('connection', socket => {
    const cookiesString = socket.handshake.headers.cookie;

    const cookies = cookie.parse(cookiesString);

    console.log(cookies);
});

server.listen(5000, () => {
    console.log('Server listening on port 5000!');
});

subscriber.on('message', async (channel: string, serverInfo: string) => {
    const server = JSON.parse(serverInfo);
    const instanceService = new InstanceService();
    await instanceService.addInstance(server.host, server.url);

    io.emit('finished', {serverInfo: server});
});

subscriber.subscribe('finished');