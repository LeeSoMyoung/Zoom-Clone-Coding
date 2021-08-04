// front-end

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open",()=>{
    console.log('connected to the server');
    socket.send('hello!');
});

 socket.addEventListener('message', (message) => {
    const translatedMessageData = message.toString('utf8');
    console.log(translatedMessageData);
  });

socket.addEventListener('close',()=>{
    console.log('the server is disconnected.');
});

setTimeout(()=>{
    socket.send("hello from the browser");
},5000);