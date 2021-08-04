import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();

app.set('view engine','pug');
app.set('views', __dirname+"/views");

app.use('/public',express.static(__dirname+'/public'));

app.get("/",(_,res) => res.render("home"));
//app.get("/*",(_,res)=>res.redirect("/"));


const SERVERNUM=3000;
const serverAddress = `http://localhost:${SERVERNUM}`;
const handleListen = () => console.log(`Listening on ${serverAddress}`);

const server = http.createServer(app); // http 서버
const wss = new WebSocket.Server({server}); // 웹 소켓 서버 : http 서버를 돌리면 웹 소켓 서버도 실행

// 누가 서버와 연결되었을 때
wss.on("connection", (socket)=>{
    socket.on('close',()=>{
        console.log('disconnected from the client');
    });
    socket.on('message',(message)=>{
        console.log(message);
    });
    socket.send("hello!"); // 데이터를 socket에 보낸다.
});

server.listen(SERVERNUM, handleListen);

/*
app.listen(SERVERNUM, handleListen);
*/