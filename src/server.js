import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import { Server } from 'socket.io';
import { Socket } from 'dgram';
// 백엔드 소켓 상황을 보여주는 admin ui
import { instrument } from '@socket.io/admin-ui';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");

app.use('/public', express.static(__dirname + '/public'));

app.get("/", (_, res) => res.render("home"));

const SERVERNUM = 3000;
const serverAddress = `http://localhost:${SERVERNUM}`;
const handleListen = () => console.log(`Listening on ${serverAddress}`);



const server = http.createServer(app); // http 서버

const io = new Server(server, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});

io.on('connection',(socket)=>{
    socket.on('join_room',(roomName, done)=>{
        socket.join(roomName);
        done();
        socket.to(roomName).emit('welcome');
    });

    socket.on('offer',(offer, roomName)=>{
        socket.to(roomName).emit('offer',offer);
    });
});

server.listen(SERVERNUM, handleListen);
