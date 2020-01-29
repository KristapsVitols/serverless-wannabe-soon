// Libs
import express from 'express';
import http from 'http';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import socketIO from 'socket.io';
import cookie from 'cookie';
import cors from 'cors';
import {initDatabase} from './db';
config();

import applicationRoutes from './modules/application/routes/application-routes';
import {RedisSubscriber} from './listeners/redis-subscriber';

// App setup
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

(async () => await initDatabase())();

// Routes
app.use('/api/applications', applicationRoutes);

// SocketIO
io.on('connection', socket => {
    const cookiesString = socket.handshake.headers.cookie;

    const cookies = cookie.parse(cookiesString);

    console.log(cookies);
});

// Init Server
server.listen(5000, () => {
    console.log('Server listening on port 5000!');
});

(new RedisSubscriber(io, 'finished'));