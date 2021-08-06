import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import SocketIo from 'socket.io';
import { Socket } from 'dgram';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + "/views");

app.use('/public', express.static(__dirname + '/public'));

app.get("/", (_, res) => res.render("home"));
//app.get("/*",(_,res)=>res.redirect("/"));


const SERVERNUM = 3000;
const serverAddress = `http://localhost:${SERVERNUM}`;
const handleListen = () => console.log(`Listening on ${serverAddress}`);

const server = http.createServer(app); // http 서버
const io = SocketIo(server);

io.on('connection',(socket)=>{
    
    socket.on('enter_room',(msg, done)=>{
        console.log(msg);
        setTimeout(done,2000);
    });

});

/*
const wss = new WebSocket.Server({ server }); // 웹 소켓 서버 : http 서버를 돌리면 웹 소켓 서버도 실행

const sockets = []; // 여러 사람이 서버에 들어올 수도 있으므로 그걸 저장하는 배열이 된다.

// 누가 서버와 연결되었을 때
wss.on("connection", (socket) => {
    sockets.push(socket); // 유저가 접속하면 접속 소켓 목록에 추가한다.
    socket["nickname"]="Anon";
    socket.on('close', () => {
        console.log('disconnected from the client');
    });
    socket.on('message', (message) => {
        const msg = JSON.parse(message);
        sockets.forEach((aSocket) => {
            switch (msg.type) {
                case 'new message':
                    aSocket.send(`${socket.nickname}:${msg.payload}`);
                    break;

                case 'nickname':
                    socket["nickname"]=msg.payload;
                    break;
            }
        });
    });
});

server.listen(SERVERNUM, handleListen);

/*
app.listen(SERVERNUM, handleListen);
*/

server.listen(SERVERNUM, handleListen);

