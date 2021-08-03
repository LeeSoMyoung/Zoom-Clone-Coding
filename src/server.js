import express from 'express';

const app = express();

app.set('view engine','pug');
app.set('views', __dirname+"/views");

app.use('/public',express.static(__dirname+'/public'));

app.get("/",(req,res) => res.render("home"));

const SERVERNUM=3000;
const server = `http://localhost:${SERVERNUM}`;
const handleListen = () => console.log(`Listening on ${server}`);

app.listen(SERVERNUM, handleListen);