import express from 'express';
import http from 'http';
import {initDatabase} from './db';
import dotenv from 'dotenv';
import socketIO from 'socket.io';
import cookieParser from 'cookie-parser';
import cookie from 'cookie';
import applicationRoutes from './modules/application/routes/application-routes';
import cors from 'cors';
import {RedisSubscriber} from "./listeners/redis-subscriber";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();

initDatabase();

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